"""
MessageQueue Dashboard - Django Views
======================================
Architecture: Isolated per-site database deployment.
Each site runs its own Django instance with its own analytics DB.
Data isolation is handled at the infrastructure layer (site connects to its own DB).

Models are in comparision/models.py (managed=False).
"""

import traceback
from datetime import datetime, date
import json

from django.db import connections
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from comparision.models import OrderLatencyModel, QueueLine1Model, QueueLine2Model


# Helpers
def _cursor():
    return connections['analytics'].cursor()


def safe_float(val, default=0.0):
    try:
        return float(val) if val is not None else default
    except (ValueError, TypeError):
        return default


def fmt_date(val):
    if isinstance(val, (date, datetime)):
        return val.strftime('%Y-%m-%d')
    return str(val) if val else None


def percentile_from_sorted(sorted_vals, p):
    if not sorted_vals:
        return 0.0
    if p <= 0:
        return float(sorted_vals[0])
    if p >= 1:
        return float(sorted_vals[-1])
    n = len(sorted_vals)
    k = (n - 1) * p
    f = int(k)
    c = f + 1
    if c >= n:
        return float(sorted_vals[f])
    d = k - f
    return float(sorted_vals[f]) + (float(sorted_vals[c]) - float(sorted_vals[f])) * d


def _exec(cursor, sql, params=None):
    if params:
        cursor.execute(sql, params)
    else:
        cursor.execute(sql)


def _fetchall(cursor):
    desc = cursor.description
    if not desc:
        return []
    columns = [col[0] for col in desc]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def _fetchone(cursor):
    row = cursor.fetchone()
    if not row:
        return None
    columns = [col[0] for col in cursor.description]
    return dict(zip(columns, row))


@csrf_exempt
def messagequeue_sites(request):
    return HttpResponse(json.dumps({'status': 200, 'tables': {}, 'note': 'Site isolation handled at DB level'}), content_type="application/json")


# ─── Views ────────────────────────────────────────────────

@login_required
def messagequeue_dashboard(request):
    return redirect('/bod-eodstatus/le-adp-status?tab=messagequeue')


def messagequeue_dates(request):
    try:
        found_dates  = set()
        table_errors = {}

        for table in ('queue_line2', 'queue_line1'):
            try:
                cur = _cursor()
                try:
                    sql = f"SELECT DISTINCT file_date AS dte FROM {table} WHERE file_date IS NOT NULL ORDER BY dte DESC LIMIT 60"
                    _exec(cur, sql)
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    v = fmt_date(row.get('dte'))
                    if v: found_dates.add(v)
            except Exception as e:
                table_errors[f'{table}_file_date'] = str(e)

            try:
                cur = _cursor()
                try:
                    sql = f"SELECT DISTINCT DATE(time) AS dte FROM {table} ORDER BY dte DESC LIMIT 60"
                    _exec(cur, sql)
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    v = fmt_date(row.get('dte'))
                    if v: found_dates.add(v)
            except Exception as e:
                table_errors[f'{table}_time'] = str(e)

        dates = sorted(list(found_dates), reverse=True)[:60]
        return HttpResponse(json.dumps({'status': 200, 'dates': dates, 'count': len(dates), 'table_errors': table_errors}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'dates': []}), content_type="application/json")


def messagequeue_data(request):
    try:
        target_date    = request.GET.get('file_date', '').strip()
        time_start     = request.GET.get('time_start', '09:15').strip()
        time_end       = request.GET.get('time_end',   '15:35').strip()
        requested_segs = [s.strip() for s in request.GET.get('segment', '').split(',') if s.strip()]

        if not target_date:
            cur = _cursor()
            try:
                sql = "SELECT MAX(file_date) AS latest FROM queue_line2"
                _exec(cur, sql)
                row = _fetchone(cur)
            finally: cur.close()
            if row and row.get('latest'): target_date = fmt_date(row['latest'])

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': [], 'file_date': None, 'series_count': 0}), content_type="application/json")

        ts_start = f"{target_date} {time_start}:00"
        ts_end   = f"{target_date} {time_end}:59"

        seg_map = {}
        total_pts = 0

        for table, line_label in (('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')):
            try:
                cur = _cursor()
                try:
                    sql = f"SELECT segment, TIME(time) as time_val, queue_size, seq_no, erf FROM {table} WHERE time BETWEEN %s AND %s ORDER BY time ASC"
                    params = [ts_start, ts_end]
                    _exec(cur, sql, params)
                    rows = _fetchall(cur)
                finally: cur.close()

                for row in rows:
                    seg = row['segment']
                    if requested_segs and seg not in requested_segs: continue

                    if seg not in seg_map:
                        seg_map[seg] = {
                            'segment': seg, 'base_segment': seg, 'line': line_label, 'points': []
                        }
                    seg_map[seg]['points'].append({
                        'time': str(row['time_val']), 'queue_size': int(row['queue_size'] or 0), 'seq_no': row['seq_no'], 'erf': row['erf']
                    })
                    total_pts += 1
            except Exception as e:
                print(f'[MQ data] {table} failed: {e}')

        result_list = list(seg_map.values())
        resp_obj = {
            'status': 200, 'file_date': target_date, 'time_range': f'{time_start} - {time_end}',
            'data': result_list, 'series_count': len(result_list), 'total_points': total_pts
        }
        return HttpResponse(json.dumps(resp_obj), content_type="application/json")

    except Exception as e:
        traceback.print_exc()
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_stats(request):
    try:
        target_date = request.GET.get('file_date', '').strip()
        time_start  = request.GET.get('time_start', '09:15').strip()
        time_end    = request.GET.get('time_end',   '15:35').strip()

        if not target_date:
            cur = _cursor()
            try:
                sql = "SELECT MAX(file_date) AS latest FROM queue_line2"
                _exec(cur, sql)
                row = _fetchone(cur)
            finally: cur.close()
            if row and row.get('latest'): target_date = fmt_date(row['latest'])

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'queue_stats': {}}), content_type="application/json")

        ts_start = f"{target_date} {time_start}:00"
        ts_end   = f"{target_date} {time_end}:59"

        queue_stats = {}
        for table, line_label in (('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')):
            try:
                cur = _cursor()
                try:
                    sql = (f"SELECT q.segment, COUNT(*) as pts, MAX(q.queue_size) as peak, AVG(q.queue_size) as avg_q, "
                           f"(SELECT TIME(t2.time) FROM {table} t2 WHERE t2.segment = q.segment AND t2.time BETWEEN %s AND %s "
                           f"ORDER BY t2.queue_size DESC LIMIT 1) as peak_time "
                           f"FROM {table} q WHERE q.time BETWEEN %s AND %s GROUP BY q.segment")
                    params = [ts_start, ts_end, ts_start, ts_end]
                    _exec(cur, sql, params)
                    rows = _fetchall(cur)
                finally: cur.close()
                for row in rows:
                    queue_stats[row['segment']] = {
                        'peak_queue': int(row['peak'] or 0), 'avg_queue': round(float(row['avg_q'] or 0), 2),
                        'total_points': int(row['pts']), 'line': line_label, 'peak_time': str(row['peak_time']) if row.get('peak_time') else ''
                    }
            except Exception: pass

        latency_stats = {}
        cur = _cursor()
        try:
            sql = ("SELECT COUNT(*) as total_orders, AVG(oms_latency) as avg_oms, MAX(oms_latency) as max_oms, "
                   "AVG(oms_exch_confirmation) as avg_exch, MAX(oms_exch_confirmation) as max_exch "
                   "FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s")
            params = [ts_start, ts_end]
            _exec(cur, sql, params)
            r = _fetchone(cur)
        finally: cur.close()
        if r and r.get('total_orders'):
            latency_stats = {
                'total_orders': int(r['total_orders']), 'avg_oms_latency': safe_float(r['avg_oms']),
                'max_oms_latency': safe_float(r['max_oms']), 'avg_exch_confirmation': safe_float(r['avg_exch']),
                'max_exch_confirmation': safe_float(r['max_exch']),
            }

        all_oms = []; all_exch = []; oms_segs = {}; exch_segs = {}
        cur = _cursor()
        try:
            sql = "SELECT exch_seg, oms_latency, oms_exch_confirmation FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s"
            params = [ts_start, ts_end]
            _exec(cur, sql, params)
            rows = _fetchall(cur)
        finally: cur.close()
        for row in rows:
            seg = row.get('exch_seg'); o = safe_float(row.get('oms_latency')); e = safe_float(row.get('oms_exch_confirmation'))
            all_oms.append(o); all_exch.append(e)
            oms_segs.setdefault(seg, []).append(o); exch_segs.setdefault(seg, []).append(e)

        all_oms.sort(); all_exch.sort()
        pct = { 'p50_oms': percentile_from_sorted(all_oms, 0.5), 'p95_oms': percentile_from_sorted(all_oms, 0.95), 'p99_oms': percentile_from_sorted(all_oms, 0.99) }
        pct_exch = { 'p50_exch': percentile_from_sorted(all_exch, 0.5), 'p95_exch': percentile_from_sorted(all_exch, 0.95), 'p99_exch': percentile_from_sorted(all_exch, 0.99) }

        pct_by_seg = {}
        for seg, vals in oms_segs.items():
            vals.sort(); pct_by_seg[seg] = { 'p50_oms': percentile_from_sorted(vals, 0.5), 'p95_oms': percentile_from_sorted(vals, 0.95), 'p99_oms': percentile_from_sorted(vals, 0.99) }

        latency_by_seg = []
        cur = _cursor()
        try:
            sql = "SELECT exch_seg, COUNT(*) as orders, AVG(oms_latency) as avg_oms, MAX(oms_latency) as max_oms FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s GROUP BY exch_seg"
            params = [ts_start, ts_end]
            _exec(cur, sql, params)
            rows = _fetchall(cur)
        finally: cur.close()
        for r in rows:
            latency_by_seg.append({ 'segment': r['exch_seg'], 'orders': int(r['orders']), 'avg_oms': safe_float(r['avg_oms']), 'max_oms': safe_float(r['max_oms']) })

        return HttpResponse(json.dumps({
            'status': 200, 'file_date': target_date, 'time_range': f'{time_start} - {time_end}',
            'queue_stats': queue_stats, 'latency_stats': latency_stats,
            'latency_percentiles': pct, 'latency_percentiles_exch': pct_exch,
            'latency_percentiles_by_segment': pct_by_seg, 'latency_by_segment': latency_by_seg
        }), content_type="application/json")
    except Exception as e:
        traceback.print_exc()
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_latency_data(request):
    try:
        target_date = request.GET.get('file_date', '').strip()
        time_start  = request.GET.get('time_start', '09:15').strip()
        time_end    = request.GET.get('time_end',   '15:35').strip()

        if not target_date:
            cur = _cursor()
            try:
                sql = "SELECT MAX(DATE(oms_update_time_conv)) as latest FROM order_latency"
                _exec(cur, sql)
                row = _fetchone(cur)
            finally: cur.close()
            target_date = fmt_date(row['latest']) if row else None

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': [], 'total_points': 0}), content_type="application/json")

        ts_start = f"{target_date} {time_start}:00"
        ts_end   = f"{target_date} {time_end}:59"

        by_minute = {}
        cur = _cursor()
        try:
            sql = (
                "SELECT DATE_FORMAT(oms_update_time_conv, '%%H:%%i') as bucket, "
                "COUNT(*) as order_count, AVG(oms_latency) as avg_oms, MAX(oms_latency) as max_oms, "
                "AVG(oms_exch_confirmation) as avg_exch, MAX(oms_exch_confirmation) as max_exch "
                "FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s GROUP BY bucket ORDER BY bucket ASC "
            )
            params = [ts_start, ts_end]
            _exec(cur, sql, params)
            rows = _fetchall(cur)
        finally: cur.close()

        for row in rows:
            by_minute[row['bucket']] = {
                'time': row['bucket'], 'order_count': int(row['order_count']),
                'avg_oms': safe_float(row['avg_oms']), 'max_oms': safe_float(row['max_oms']),
                'avg_exch': safe_float(row['avg_exch']), 'max_exch': safe_float(row['max_exch']),
                'p50_oms': 0.0, 'p50_exch': 0.0
            }

        cur = _cursor()
        try:
            sql = "SELECT DATE_FORMAT(oms_update_time_conv, '%%H:%%i') as bucket, oms_latency, oms_exch_confirmation FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s "
            params = [ts_start, ts_end]
            _exec(cur, sql, params)
            rows = _fetchall(cur)
        finally: cur.close()

        oms_by_min = {}; exch_by_min = {}
        for row in rows:
            m = row['bucket']
            oms_by_min.setdefault(m, []).append(safe_float(row.get('oms_latency')))
            exch_by_min.setdefault(m, []).append(safe_float(row.get('oms_exch_confirmation')))
        for m, vals in oms_by_min.items():
            if m in by_minute: vals.sort(); by_minute[m]['p50_oms'] = percentile_from_sorted(vals, 0.5)
        for m, vals in exch_by_min.items():
            if m in by_minute: vals.sort(); by_minute[m]['p50_exch'] = percentile_from_sorted(vals, 0.5)

        data = [by_minute[k] for k in sorted(by_minute.keys())]
        return HttpResponse(json.dumps({'status': 200, 'file_date': target_date, 'data': data, 'total_points': len(data)}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


# ─── Raw ORM Views ────────────────────────────────────────

@csrf_exempt
def get_order_latency(request):
    try:
        data = list(OrderLatencyModel.objects.using('analytics').all().order_by('-id')[:100].values())
        return HttpResponse(json.dumps({'status': 200, 'data': data}, default=str), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 400, 'error': str(e)}), content_type="application/json")


@csrf_exempt
def get_queue_line1(request):
    try:
        data = list(QueueLine1Model.objects.using('analytics').all().order_by('-id')[:100].values())
        return HttpResponse(json.dumps({'status': 200, 'data': data}, default=str), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 400, 'error': str(e)}), content_type="application/json")


@csrf_exempt
def get_queue_line2(request):
    try:
        data = list(QueueLine2Model.objects.using('analytics').all().order_by('-id')[:100].values())
        return HttpResponse(json.dumps({'status': 200, 'data': data}, default=str), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 400, 'error': str(e)}), content_type="application/json")
