"""
MessageQueue Dashboard - Django Views
======================================
Architecture: Isolated per-site database deployment.
Each site runs its own Django instance and queries its own local default DB.
Data is naturally isolated as each server has access only to its site's data.
Matches the "On-board Device" (allonboard) dashboard pattern.
"""

import traceback
import json
from datetime import datetime, date, timedelta

from django.db import connections, connection, ProgrammingError, OperationalError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.utils import timezone

from .models import OrderLatencyModel, QueueLine1Model, QueueLine2Model

# ─── Data Helpers ──────────────────────────────────────────

def safe_float(val, default=0.0):
    try: return float(val) if val is not None else default
    except: return default

def fmt_date(val):
    if isinstance(val, (date, datetime)): return val.strftime('%Y-%m-%d')
    return str(val) if val else None

def percentile(sorted_list, p):
    """Return p-th percentile from a pre-sorted list."""
    if not sorted_list:
        return 0.0
    n = len(sorted_list)
    return sorted_list[min(int(n * p / 100), n - 1)]


def rnd(val, digits=2):
    """round() that passes None/False through, so 'not computed' stays distinct from 0."""
    if val is None or val is False:
        return None
    return round(val, digits)


_PERCENTILE_COLUMNS = ('oms_latency', 'oms_exch_confirmation')

# Above this many rows in the window, skip exact percentiles.
#
# Each percentile is an index range-scan + filesort costing ~4s regardless of
# segment size, and a full stats response needs ~16 of them. On a full trading
# day (4.4M rows) that exceeds gunicorn's 120s timeout, so every worker gets
# SIGKILLed and the whole UI -- not just APM -- stops responding. MySQL 5.7 has
# no window functions, so there is no cheap exact answer; the real fix is a
# summary table written by the ETL. Until then, return null (the UI renders
# '--') rather than hang. avg/max/total_orders are plain aggregates and stay
# accurate at any size.
MAX_PERCENTILE_ROWS = 400_000


def sql_percentile(column, extra_where, params, p, total):
    """p-th percentile of `column` over order_latency, computed in the DB.

    Returns None when the window is too large to compute safely -- callers
    must pass that through as null rather than substituting a zero, which
    would render as a real measurement.

    MySQL 5.7 has no percentile function, so seek to the nth smallest row with
    ORDER BY + OFFSET. This uses constant memory: the alternative -- pulling
    the column into Python and sorting -- allocates millions of Decimals and
    OOM-kills the container.

    FORCE INDEX because the optimiser otherwise full-scans all 5.7M rows once
    the range exceeds roughly a quarter of the table (EXPLAIN: type=ALL,
    key=NULL), which is ~3x slower than the index range scan.

    `column` is whitelisted; `extra_where` must be a literal fragment whose
    placeholders are supplied via `params` (never interpolate user input).
    """
    if column not in _PERCENTILE_COLUMNS:
        raise ValueError('unsupported percentile column: %r' % (column,))
    if not total:
        return 0.0
    if total > MAX_PERCENTILE_ROWS:
        return None
    offset = min(int(total * p / 100), total - 1)
    sql = (
        "SELECT {col} FROM order_latency FORCE INDEX (idx_order_latency_time) "
        "WHERE oms_update_time_conv BETWEEN %s AND %s AND {col} IS NOT NULL {extra} "
        "ORDER BY {col} LIMIT 1 OFFSET {off}"
    ).format(col=column, extra=extra_where, off=offset)
    with connection.cursor() as cur:
        cur.execute(sql, params)
        row = cur.fetchone()
    return safe_float(row[0]) if row else 0.0


HISTOGRAM_BUCKETS = 7


def _fmt_bound(v):
    """Compact axis label for a raw oms_latency bound (1516760 -> '1.5M')."""
    v = float(v)
    for div, suf in ((1e9, 'B'), (1e6, 'M'), (1e3, 'K')):
        if abs(v) >= div:
            return ('%.1f%s' % (v / div, suf)).replace('.0', '')
    return '%d' % int(round(v))


def latency_histogram(t_s, t_e):
    """Distribution of oms_latency over the window, as (labels, percentages).

    Bucket bounds come from the data's own min/max rather than fixed ranges.
    The chart used to be hardcoded to 0-50/50-100/.../500+ 'µs' while actual
    values run to ~17,000,000 -- so every order fell in the last bucket and the
    shape was meaningless. Labels are raw magnitudes with no unit asserted:
    the column's unit is unverified (values fit nanoseconds, not the µs the old
    UI text claimed), and that needs the feed owner, not a guess here.

    Counted in one GROUP BY so nothing is materialised in Python.
    """
    with connection.cursor() as cur:
        cur.execute(
            "SELECT MIN(oms_latency), MAX(oms_latency), COUNT(oms_latency) FROM order_latency "
            "FORCE INDEX (idx_order_latency_time) "
            "WHERE oms_update_time_conv BETWEEN %s AND %s AND oms_latency IS NOT NULL",
            [t_s, t_e]
        )
        lo, hi, n = cur.fetchone()

    n = int(n or 0)
    if not n or lo is None or hi is None:
        return [], []

    lo, hi = float(lo), float(hi)
    if hi <= lo:
        return ['%s' % _fmt_bound(lo)], [100.0]

    width = (hi - lo) / HISTOGRAM_BUCKETS
    # FLOOR((v - lo) / width) buckets in SQL; clamp the max value into the last
    # bucket instead of letting it spill into an eighth.
    with connection.cursor() as cur:
        cur.execute(
            "SELECT LEAST(FLOOR((oms_latency - %s) / %s), %s) AS b, COUNT(*) "
            "FROM order_latency FORCE INDEX (idx_order_latency_time) "
            "WHERE oms_update_time_conv BETWEEN %s AND %s AND oms_latency IS NOT NULL "
            "GROUP BY b ORDER BY b",
            [lo, width, HISTOGRAM_BUCKETS - 1, t_s, t_e]
        )
        counts = {int(b): int(c) for b, c in cur.fetchall() if b is not None}

    labels, pct = [], []
    for i in range(HISTOGRAM_BUCKETS):
        b_lo = lo + i * width
        b_hi = lo + (i + 1) * width
        labels.append('%s-%s' % (_fmt_bound(b_lo), _fmt_bound(b_hi)))
        pct.append(round(counts.get(i, 0) * 100.0 / n, 2))
    return labels, pct


def latest_available_date():
    """Newest file_date present in any of the three tables, or None.

    Do not seed a default from a single table: queue_line1/queue_line2 are
    empty whenever the QueSize CSV feed has not been ingested, and seeding
    from an empty table yields no date, which made the stats/data endpoints
    return an empty payload on page load and blanked every tile -- even
    though order_latency held millions of rows for the same day.
    """
    newest = None
    for model in (OrderLatencyModel, QueueLine2Model, QueueLine1Model):
        try:
            row = model.objects.exclude(file_date__isnull=True).order_by('-file_date').first()
        except (ProgrammingError, OperationalError):
            continue
        if row and row.file_date and (newest is None or row.file_date > newest):
            newest = row.file_date
    return fmt_date(newest) if newest else None


def make_ts(date_str, time_str):
    """Build a naive IST datetime bound for querying the latency/queue tables.

    order_latency.oms_update_time_conv and queue_line*.time hold naive IST
    wall-clock (latency.py strips tzinfo after converting to Asia/Kolkata).
    An aware datetime must not be used here: with USE_TZ=True the ORM converts
    it to UTC before querying, so 09:15+05:30 is sent as 03:45 and matches no
    rows, while raw cursor queries pass the wall-clock through and do match.
    That split is what silently zeroed every percentile and segment panel.
    """
    for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M'):
        try:
            return datetime.strptime(f"{date_str} {time_str}", fmt)
        except ValueError:
            continue
    return None


# ─── Views ──────────────────────────────────────────────────

@csrf_exempt
def messagequeue_sites(request):
    """Note: site isolation is handled at the network/deployment level."""
    return HttpResponse(json.dumps({'status': 200, 'note': 'Local analytics DB access only'}), content_type="application/json")


@login_required
def messagequeue_dashboard(request):
    return redirect('/bod-eodstatus/le-adp-status?tab=messagequeue')


# ─── API Endpoints (Local Site Only) ─────────────────────────

def messagequeue_dates(request):
    try:
        found_dates = set()
        db_error = None

        # Efficiently get distinct dates using the file_date column (which is indexed/low cardinality)
        for model in [QueueLine1Model, QueueLine2Model, OrderLatencyModel]:
            try:
                # Top 100 distinct dates is more than enough for a date picker
                d_list = model.objects.values_list('file_date', flat=True).order_by('-file_date').distinct()[:100]
                for d in d_list:
                    if d: found_dates.add(fmt_date(d))
            except (ProgrammingError, OperationalError) as e:
                db_error = str(e)
            except Exception:
                pass

        if not found_dates and db_error:
            msg = f"Database or Table missing: {db_error}. Please check with administrator."
            return HttpResponse(json.dumps({'status': 503, 'error': msg}), content_type="application/json")

        dates = sorted(list(found_dates), reverse=True)[:60]
        return HttpResponse(json.dumps({'status': 200, 'dates': dates, 'count': len(dates)}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_data(request):
    target_date = request.GET.get('file_date', '').strip()
    time_start, time_end = request.GET.get('time_start', '09:15').strip(), request.GET.get('time_end', '15:35').strip()
    requested_segs = [s.strip() for s in request.GET.get('segment', '').split(',') if s.strip()]

    try:
        if not target_date:
            target_date = latest_available_date()

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': []}), content_type="application/json")

        ts_start, ts_end = make_ts(target_date, f"{time_start}:00"), make_ts(target_date, f"{time_end}:59")
        if not ts_start or not ts_end:
            return HttpResponse(json.dumps({'status': 200, 'data': []}), content_type="application/json")
        
        seg_map = {}
        total_pts = 0

        # We downsample to minute buckets to handle high-density data (100k+ pts)
        # GROUP BY segment + Minute bucket. We take the MAX(queue_size) for peaks.
        ts_start_str, ts_end_str = f"{target_date} {time_start}:00", f"{target_date} {time_end}:59"
        seg_map = {}
        total_pts = 0

        with connection.cursor() as cur:
            for table, label in [('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')]:
                # DATE_FORMAT is the most reliable way to bucket timestamps in MySQL
                query = (
                    f"SELECT segment, DATE_FORMAT(time, '%%Y-%%m-%%d %%H:%%i') as bucket, MAX(queue_size), AVG(queue_size) "
                    f"FROM {table} WHERE time BETWEEN %s AND %s "
                    f"GROUP BY segment, bucket ORDER BY bucket ASC"
                )
                cur.execute(query, [ts_start_str, ts_end_str])
                for r in cur.fetchall():
                    seg, bucket, peak_q, avg_q = r
                    
                    # Extract the HH:MM part from the bucket string
                    b_time = bucket.split(' ')[-1] if ' ' in bucket else bucket
                    
                    # Optional filter: if requested_segs is set, only include segments that match a prefix
                    if requested_segs:
                        matched = False
                        for rs in requested_segs:
                            if seg.upper().startswith(rs.upper()):
                                matched = True; break
                        if not matched: continue

                    seg_map.setdefault(seg, {'segment': seg, 'line': label, 'points': []})['points'].append({
                        'time': b_time,
                        'queue_size': int(peak_q or 0),
                        'avg_queue': round(float(avg_q or 0), 2)
                    })
                    total_pts += 1

        return HttpResponse(json.dumps({'status': 200, 'file_date': target_date, 'data': list(seg_map.values()), 'total_points': total_pts}), content_type="application/json")
    except (ProgrammingError, OperationalError) as e:
        msg = f"Database or Table missing: {str(e)}. Please check with administrator."
        return HttpResponse(json.dumps({'status': 503, 'error': msg}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_stats(request):
    target_date = request.GET.get('file_date', '').strip()
    time_start, time_end = request.GET.get('time_start', '09:15').strip(), request.GET.get('time_end', '15:35').strip()

    try:
        if not target_date:
            target_date = latest_available_date()

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'queue_stats': {}}), content_type="application/json")

        t_s, t_e = make_ts(target_date, f"{time_start}:00"), make_ts(target_date, f"{time_end}:59")
        t_s_str, t_e_str = f"{target_date} {time_start}:00", f"{target_date} {time_end}:59"
        queue_stats = {}
        total_data_points = 0

        # ── Queue aggregates per segment ───────────────────────────────────
        with connection.cursor() as cur:
            for table, label in [('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')]:
                cur.execute(
                    f"SELECT segment, COUNT(*) as pts, MAX(queue_size) as peak, AVG(queue_size) as avg_q "
                    f"FROM {table} WHERE time BETWEEN %s AND %s GROUP BY segment",
                    [t_s_str, t_e_str]
                )
                for row in cur.fetchall():
                    seg, pts, peak, avg_q = row
                    queue_stats[seg] = {
                        'peak_queue': int(peak or 0),
                        'avg_queue': round(float(avg_q or 0), 2),
                        'total_points': int(pts),
                        'line': label,
                    }
                    total_data_points += int(pts)

        # ── Overall avg queue across all segments ──────────────────────────
        all_avgs = [v['avg_queue'] for v in queue_stats.values() if v['avg_queue'] > 0]
        avg_all = round(sum(all_avgs) / len(all_avgs), 2) if all_avgs else 0

        # ── Overall latency summary ────────────────────────────────────────
        latency_stats = {}
        with connection.cursor() as cur:
            cur.execute(
                "SELECT COUNT(*) as tot, AVG(oms_latency) as a_oms, MAX(oms_latency) as m_oms, "
                "AVG(oms_exch_confirmation) as a_exch, MAX(oms_exch_confirmation) as m_exch "
                "FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s",
                [t_s, t_e]
            )
            row = cur.fetchone()
            if row and row[0]:
                tot, a_oms, m_oms, a_exch, m_exch = row
                latency_stats = {
                    'total_orders': int(tot),
                    'avg_oms_latency': safe_float(a_oms),
                    'max_oms_latency': safe_float(m_oms),
                    'avg_exch_latency': safe_float(a_exch),
                    'max_exch_latency': safe_float(m_exch),
                }

        # ── Per-segment latency percentiles (P50 / P95 / P99) ────────────
        seg_latency = {}
        latency_by_segment = []      # for Latency tab table
        latency_percentiles_by_segment = {}
        latency_percentiles_exch_by_segment = {}

        # Size the window before computing anything expensive. Every percentile
        # scans the whole date range, so cost is driven by the window -- not by
        # how many rows a segment contributes. Gating per segment is not enough:
        # 2026-07-09 has 1.36M rows split into ~340k per segment, each under the
        # cap, so all four still ran and the response took 61s.
        with connection.cursor() as cur:
            cur.execute(
                "SELECT COUNT(oms_latency), COUNT(oms_exch_confirmation) FROM order_latency "
                "WHERE oms_update_time_conv BETWEEN %s AND %s",
                [t_s, t_e]
            )
            n_oms_all, n_exch_all = cur.fetchone()
        n_oms_all, n_exch_all = int(n_oms_all or 0), int(n_exch_all or 0)
        percentiles_ok = 0 < n_oms_all <= MAX_PERCENTILE_ROWS

        # Aggregate per segment in SQL. Never materialise the rows: a single
        # trading day is millions of orders and pulling them into Python
        # OOM-kills the container (1Gi limit).
        with connection.cursor() as cur:
            cur.execute(
                "SELECT exch_seg, COUNT(oms_latency), AVG(oms_latency), MAX(oms_latency), "
                "COUNT(oms_exch_confirmation) "
                "FROM order_latency "
                "WHERE oms_update_time_conv BETWEEN %s AND %s AND exch_seg IS NOT NULL "
                "GROUP BY exch_seg",
                [t_s, t_e]
            )
            seg_rows = cur.fetchall()

        for seg, n_oms, avg_oms_seg, max_oms_seg, n_exch in seg_rows:
            n_oms = int(n_oms or 0)
            if not n_oms:
                continue

            seg_entry = {
                'orders': n_oms,
                'p50': rnd(percentiles_ok and sql_percentile('oms_latency', 'AND exch_seg = %s', [t_s, t_e, seg], 50, n_oms), 2),
                'avg': round(safe_float(avg_oms_seg), 2),
                'p95': rnd(percentiles_ok and sql_percentile('oms_latency', 'AND exch_seg = %s', [t_s, t_e, seg], 95, n_oms), 2),
                'p99': rnd(percentiles_ok and sql_percentile('oms_latency', 'AND exch_seg = %s', [t_s, t_e, seg], 99, n_oms), 2),
                'max': round(safe_float(max_oms_seg), 2),
            }
            seg_latency[seg] = seg_entry

            # For Latency tab compatibility
            latency_by_segment.append({
                'segment': seg,
                'orders': n_oms,
                'avg_oms': seg_entry['avg'],
                'max_oms': seg_entry['max'],
            })
            latency_percentiles_by_segment[seg] = {
                'p50_oms': seg_entry['p50'],
                'p95_oms': seg_entry['p95'],
                'p99_oms': seg_entry['p99'],
            }
            if int(n_exch or 0):
                latency_percentiles_exch_by_segment[seg] = {
                    'p50_exch': round(
                        sql_percentile('oms_exch_confirmation', 'AND exch_seg = %s',
                                       [t_s, t_e, seg], 50, int(n_exch)), 2),
                }

        # Overall P50 across the whole window -- the true median, not a mean of
        # per-segment medians (which weights a 500-order segment the same as a
        # 2M-order one).
        latency_percentiles = {
            'p50_oms': rnd(percentiles_ok and sql_percentile('oms_latency', '', [t_s, t_e], 50, n_oms_all), 2),
            'p95_oms': rnd(percentiles_ok and sql_percentile('oms_latency', '', [t_s, t_e], 95, n_oms_all), 2),
            'p99_oms': rnd(percentiles_ok and sql_percentile('oms_latency', '', [t_s, t_e], 99, n_oms_all), 2),
        }
        latency_percentiles_exch = {
            'p50_exch': rnd(percentiles_ok and sql_percentile('oms_exch_confirmation', '', [t_s, t_e], 50, n_exch_all), 2),
        }
        overall_p50 = latency_percentiles['p50_oms']

        return HttpResponse(json.dumps({
            'status': 200,
            'file_date': target_date,
            'queue_stats': queue_stats,
            'latency_stats': latency_stats,
            'seg_latency': seg_latency,
            'total_data_points': total_data_points,
            'avg_all': avg_all,
            'overall_p50': overall_p50,
            # Latency tab fields
            'latency_percentiles': latency_percentiles,
            'latency_percentiles_exch': latency_percentiles_exch,
            'latency_by_segment': latency_by_segment,
            'latency_percentiles_by_segment': latency_percentiles_by_segment,
            'latency_percentiles_exch_by_segment': latency_percentiles_exch_by_segment,
        }), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'trace': traceback.format_exc()}), content_type="application/json")


def messagequeue_latency_data(request):
    """
    Per-minute aggregated OMS + Exchange latency.
    Returns p50_oms, avg_oms, max_oms, p50_exch, avg_exch, max_exch, order_count per minute bucket.
    Used by both LatencyPage (Latency tab charts) and MQPage (latency overlay chart).
    """
    target_date = request.GET.get('file_date', '').strip()
    time_start, time_end = request.GET.get('time_start', '09:15').strip(), request.GET.get('time_end', '15:35').strip()

    try:
        if not target_date:
            latest = OrderLatencyModel.objects.order_by('-oms_update_time_conv').first()
            if latest: target_date = fmt_date(latest.oms_update_time_conv)

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': [], 'total_orders': 0}), content_type="application/json")

        t_s, t_e = make_ts(target_date, f"{time_start}:00"), make_ts(target_date, f"{time_end}:59")

        # Fetch all rows grouped by minute bucket
        with connection.cursor() as cur:
            cur.execute(
                "SELECT DATE_FORMAT(oms_update_time_conv, '%%H:%%i') as bucket, "
                "COUNT(*) as cnt, "
                "AVG(oms_latency) as avg_oms, "
                "MAX(oms_latency) as max_oms, "
                "AVG(oms_exch_confirmation) as avg_exch, "
                "MAX(oms_exch_confirmation) as max_exch "
                "FROM order_latency "
                "WHERE oms_update_time_conv BETWEEN %s AND %s "
                "GROUP BY bucket ORDER BY bucket ASC",
                [t_s, t_e]
            )
            bucket_rows = cur.fetchall()

        data = []
        for b, cnt, avg_oms, max_oms, avg_exch, max_exch in bucket_rows:
            data.append({
                'time':        b,
                'order_count': int(cnt),
                # No p50 here: SQL aggregates the buckets and MySQL 5.7 has no
                # percentile function, so a per-minute median would mean pulling
                # every row into Python. Real P50/P95 come from
                # messagequeue_stats and feed the stat tiles.
                'avg_oms':     round(safe_float(avg_oms), 2),
                'max_oms':     round(safe_float(max_oms), 2),
                'avg_exch':    round(safe_float(avg_exch), 2),
                'max_exch':    round(safe_float(max_exch), 2),
            })

        total_orders = sum(d['order_count'] for d in data)
        hist_labels, hist_pct = latency_histogram(t_s, t_e)
        return HttpResponse(json.dumps({
            'status': 200,
            'data': data,
            'total_orders': total_orders,
            'histogram': hist_pct,
            'histogram_labels': hist_labels,
        }), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'trace': traceback.format_exc()}), content_type="application/json")


# ─── Raw Data APIs (Local Site Only) ─────────────────────────

@csrf_exempt
def get_order_latency(request):
    try:
        data = list(OrderLatencyModel.objects.order_by('-id')[:100].values())
        return HttpResponse(json.dumps({'status': 200, 'data': data}, default=str), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 400, 'msg': str(e)}), content_type="application/json")

@csrf_exempt
def get_queue_line1(request):
    try:
        data = list(QueueLine1Model.objects.order_by('-id')[:100].values())
        return HttpResponse(json.dumps({'status': 200, 'data': data}, default=str), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 400, 'msg': str(e)}), content_type="application/json")

@csrf_exempt
def get_queue_line2(request):
    try:
        data = list(QueueLine2Model.objects.order_by('-id')[:100].values())
        return HttpResponse(json.dumps({'status': 200, 'data': data}, default=str), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 400, 'msg': str(e)}), content_type="application/json")
