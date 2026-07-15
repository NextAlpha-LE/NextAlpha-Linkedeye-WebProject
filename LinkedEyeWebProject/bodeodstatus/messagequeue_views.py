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
            latest = QueueLine2Model.objects.order_by('-file_date').first()
            if latest: target_date = fmt_date(latest.file_date)

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
            latest = QueueLine2Model.objects.order_by('-file_date').first()
            if latest: target_date = fmt_date(latest.file_date)

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

        with connection.cursor() as cur:
            cur.execute(
                "SELECT DISTINCT exch_seg FROM order_latency "
                "WHERE oms_update_time_conv BETWEEN %s AND %s AND exch_seg IS NOT NULL",
                [t_s, t_e]
            )
            segs = [r[0] for r in cur.fetchall()]

        for seg in segs:
            # Use values_list for performance - much faster than full model objects or manual cursor fetchall with many columns
            oms_vals = list(OrderLatencyModel.objects.filter(
                oms_update_time_conv__range=(t_s, t_e), 
                exch_seg=seg, 
                oms_latency__isnull=False
            ).values_list('oms_latency', flat=True))
            
            exch_vals = list(OrderLatencyModel.objects.filter(
                oms_update_time_conv__range=(t_s, t_e), 
                exch_seg=seg, 
                oms_exch_confirmation__isnull=False
            ).values_list('oms_exch_confirmation', flat=True))

            if not oms_vals:
                continue

            oms_vals.sort()
            exch_vals.sort()
            n = len(oms_vals)

            seg_entry = {
                'orders': n,
                'p50': round(percentile(oms_vals, 50), 2),
                'avg': round(sum(oms_vals) / n, 2),
                'p95': round(percentile(oms_vals, 95), 2),
                'p99': round(percentile(oms_vals, 99), 2),
                'max': round(oms_vals[-1], 2),
            }
            seg_latency[seg] = seg_entry

            # For Latency tab compatibility
            latency_by_segment.append({
                'segment': seg,
                'orders': n,
                'avg_oms': seg_entry['avg'],
                'max_oms': seg_entry['max'],
            })
            latency_percentiles_by_segment[seg] = {
                'p50_oms': seg_entry['p50'],
                'p95_oms': seg_entry['p95'],
                'p99_oms': seg_entry['p99'],
            }
            if exch_vals:
                latency_percentiles_exch_by_segment[seg] = {
                    'p50_exch': round(percentile(exch_vals, 50), 2),
                }

        # Overall P50 across all segments
        overall_p50 = 0
        if seg_latency:
            p50s = [v['p50'] for v in seg_latency.values()]
            overall_p50 = round(sum(p50s) / len(p50s), 2)

        # latency_percentiles (global) for LatencyPage.renderStats
        all_oms = list(OrderLatencyModel.objects.filter(
            oms_update_time_conv__range=(t_s, t_e),
            oms_latency__isnull=False
        ).values_list('oms_latency', flat=True))
        
        all_exch = list(OrderLatencyModel.objects.filter(
            oms_update_time_conv__range=(t_s, t_e),
            oms_exch_confirmation__isnull=False
        ).values_list('oms_exch_confirmation', flat=True))

        all_oms.sort()
        all_exch_s = sorted(all_exch)
        latency_percentiles = {
            'p50_oms': round(percentile(all_oms, 50), 2) if all_oms else 0,
            'p95_oms': round(percentile(all_oms, 95), 2) if all_oms else 0,
            'p99_oms': round(percentile(all_oms, 99), 2) if all_oms else 0,
        }
        latency_percentiles_exch = {
            'p50_exch': round(percentile(all_exch_s, 50), 2) if all_exch_s else 0,
        }

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
        return HttpResponse(json.dumps({'status': 200, 'data': data, 'total_orders': total_orders}), content_type="application/json")
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
