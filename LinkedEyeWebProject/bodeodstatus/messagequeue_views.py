"""
MessageQueue Dashboard - Django Views
======================================
Architecture: Single central MySQL server (172.16.0.75).
All sites' data coexists in the same DB, differentiated by the `site` column.

The ETL script (latency.py) must be run per-site:
    MQ_SITE=fs-le-dev2        python latency.py
    MQ_SITE=fs-le-dev-finspot python latency.py

All views filter by ?site=<sitename> query param.
Models are in comparision/models.py (managed=False, db_table matches actual table).
"""

import traceback
from datetime import datetime, date

from django.db import connection
from django.http import JsonResponse, HttpResponse
import json
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from comparision.models import OrderLatencyModel, QueueLine1Model, QueueLine2Model


# Helper
def _cursor():
    return connection.cursor()


# ─── Helpers ──────────────────────────────────────────────

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


def _cursor():
    return connection.cursor()


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


# ─── Views ────────────────────────────────────────────────

@login_required
def messagequeue_dashboard(request):
    site = request.GET.get('site', '') or ''
    if site:
        return redirect(f'/bod-eodstatus/le-adp-status?site={site}&tab=messagequeue')
    return redirect('/bod-eodstatus/le-adp-status?tab=messagequeue')


#@login_required
def messagequeue_dates(request):
    site = request.GET.get('site', '').strip()
    try:
        found_dates  = set()
        table_errors = {}

        # ... (logical part remains same, omitting redundant lines for brevity if possible, 
        # but tool requires exact match for TargetContent)
        # I will replace the whole function block to be safe.
        for table in ('queue_line2', 'queue_line1'):
            # Source 1: file_date column directly
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT DISTINCT file_date AS dte "
                        "FROM linkedeye." + table + " "
                        "WHERE file_date IS NOT NULL "
                        "ORDER BY dte DESC LIMIT 60"
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    v = fmt_date(row.get('dte'))
                    if v and v != 'None':
                        found_dates.add(v)
            except Exception as e:
                print(f'[MQ dates] {table} file_date failed: {e}')
                table_errors[table + '_file_date'] = str(e)

            # Source 2: DATE(time)
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT DISTINCT DATE(time) AS dte "
                        "FROM linkedeye." + table + " "
                        "ORDER BY dte DESC LIMIT 60"
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    v = fmt_date(row.get('dte'))
                    if v and v != 'None':
                        found_dates.add(v)
            except Exception as e:
                print(f'[MQ dates] {table} DATE(time) failed: {e}')
                table_errors[table + '_time'] = str(e)

            # Source 3: DATE(timestamp)
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT DISTINCT DATE(timestamp) AS dte "
                        "FROM " + table + " "
                        "ORDER BY dte DESC LIMIT 60"
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    v = fmt_date(row.get('dte'))
                    if v and v != 'None':
                        found_dates.add(v)
            except Exception as e:
                print(f'[MQ dates] {table} DATE(timestamp) failed: {e}')
                table_errors[table + '_timestamp'] = str(e)

        # order_latency: try oms_update_time_conv and timestamp
        for col in ('oms_update_time_conv', 'timestamp'):
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT DISTINCT DATE(" + col + ") AS dte "
                        "FROM linkedeye.order_latency "
                        "ORDER BY dte DESC LIMIT 60"
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    v = fmt_date(row.get('dte'))
                    if v and v != 'None':
                        found_dates.add(v)
            except Exception as e:
                print(f'[MQ dates] order_latency DATE({col}) failed: {e}')
                table_errors['order_latency_' + col] = str(e)

        print(f'[MQ dates] site={site!r} found_dates={sorted(found_dates, reverse=True)}')

        dates = sorted(found_dates, reverse=True)[:60]
        resp  = {'status': 200, 'dates': dates, 'count': len(dates)}
        if table_errors:
            resp['table_errors'] = table_errors
        return HttpResponse(json.dumps(resp))

    except Exception as e:
        traceback.print_exc()
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'dates': []}), content_type="json")


#@login_required
def messagequeue_data(request):
    site = request.GET.get('site', '').strip()
    try:
        target_date    = request.GET.get('file_date', '').strip()
        time_start     = request.GET.get('time_start', '09:15').strip()
        time_end       = request.GET.get('time_end',   '15:35').strip()
        segments_param = request.GET.get('segment', 'NSE,NFO,BSE,BFO')
        requested_segs = [s.strip().upper() for s in segments_param.split(',') if s.strip()]

        if not target_date:
            for table in ('queue_line2', 'queue_line1'):
                try:
                    cur = _cursor()
                    try:
                        _exec(cur, "SELECT MAX(file_date) AS latest FROM " + table)
                        row = _fetchone(cur)
                    finally:
                        cur.close()
                    if row and row.get('latest'):
                        target_date = fmt_date(row['latest'])
                        break
                except Exception:
                    pass

        if not target_date:
            for table in ('queue_line2', 'queue_line1'):
                try:
                    cur = _cursor()
                    try:
                        _exec(cur, "SELECT MAX(DATE(time)) AS latest FROM " + table)
                        row = _fetchone(cur)
                    finally:
                        cur.close()
                    if row and row.get('latest'):
                        target_date = fmt_date(row['latest'])
                        break
                except Exception:
                    pass

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': [], 'file_date': None}))

        ts_start = f"{target_date} {time_start}:00"
        ts_end   = f"{target_date} {time_end}:59"

        result_data  = []
        query_errors = {}

        # Line-2: NSE, NFO
        line2_segs = [s for s in requested_segs if s in ('NSE', 'NFO')]
        if line2_segs:
            like_clauses = ' OR '.join(['segment LIKE %s'] * len(line2_segs))
            like_params  = [s + '%' for s in line2_segs]
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT segment, TIME(time) AS time_val, queue_size, seq_no, erf "
                        "FROM queue_line2 "
                        "WHERE (" + like_clauses + ") AND time BETWEEN %s AND %s "
                        "ORDER BY time ASC",
                        like_params + [ts_start, ts_end]
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                seg_map = {}
                for row in rows:
                    seg = row['segment']
                    if seg not in seg_map:
                        base = 'NSE' if seg.startswith('NSE') else 'NFO'
                        ctcl = seg.split('-')[1] if '-' in seg else ''
                        seg_map[seg] = {
                            'segment': seg, 'base_segment': base,
                            'ctcl_id': ctcl, 'line': 'Line-2',
                            'id_label': 'CTCL:' + ctcl if ctcl else seg,
                            'points': []
                        }
                    seg_map[seg]['points'].append({
                        'time':       str(row['time_val']),
                        'queue_size': int(row['queue_size'] or 0),
                        'seq_no':     int(row['seq_no']     or 0),
                        'erf':        int(row['erf']        or 0),
                    })
                result_data.extend(seg_map.values())
            except Exception as e:
                query_errors['queue_line2'] = str(e)
                print(f'[MQ data] queue_line2 failed: {e}')

        # Line-1: BSE, BFO
        line1_segs = [s for s in requested_segs if s in ('BSE', 'BFO')]
        if line1_segs:
            like_clauses = ' OR '.join(['segment LIKE %s'] * len(line1_segs))
            like_params  = [s + '%' for s in line1_segs]
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT segment, TIME(time) AS time_val, queue_size, seq_no, erf "
                        "FROM queue_line1 "
                        "WHERE (" + like_clauses + ") AND time BETWEEN %s AND %s "
                        "ORDER BY time ASC",
                        like_params + [ts_start, ts_end]
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                seg_map = {}
                for row in rows:
                    seg = row['segment']
                    if seg not in seg_map:
                        seg_map[seg] = {
                            'segment': seg, 'base_segment': seg,
                            'ctcl_id': '', 'line': 'Line-1',
                            'id_label': seg, 'points': []
                        }
                    seg_map[seg]['points'].append({
                        'time':       str(row['time_val']),
                        'queue_size': int(row['queue_size'] or 0),
                        'seq_no':     int(row['seq_no']     or 0),
                        'erf':        int(row['erf']        or 0),
                    })
                result_data.extend(seg_map.values())
            except Exception as e:
                query_errors['queue_line1'] = str(e)
                print(f'[MQ data] queue_line1 failed: {e}')

        resp = {
            'status':             200,
            'file_date':          target_date,
            'time_range':         f'{time_start} \u2013 {time_end}',
            'segments_requested': requested_segs,
            'data':               result_data,
            'series_count':       len(result_data),
            'total_points':       sum(len(d['points']) for d in result_data),
        }
        if query_errors:
            resp['query_errors'] = query_errors
        return HttpResponse(json.dumps(resp), content_type="json")

    except Exception as e:
        traceback.print_exc()
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'data': []}))


#@login_required
def messagequeue_stats(request):
    site = request.GET.get('site', '').strip()
    print(f'[MQ stats] site parameter: {site!r}')
    try:
        target_date = request.GET.get('file_date', '').strip()
        time_start  = request.GET.get('time_start', '09:15').strip()
        time_end    = request.GET.get('time_end',   '15:35').strip()

        if not target_date:
            for table in ('queue_line2', 'queue_line1'):
                try:
                    cur = _cursor()
                    try:
                        _exec(cur, "SELECT MAX(file_date) AS latest FROM " + table)
                        row = _fetchone(cur)
                    finally:
                        cur.close()
                    if row and row.get('latest'):
                        target_date = fmt_date(row['latest'])
                        break
                except Exception:
                    pass
        if not target_date:
            for table in ('queue_line2', 'queue_line1'):
                try:
                    cur = _cursor()
                    try:
                        _exec(cur, "SELECT MAX(DATE(time)) AS latest FROM " + table)
                        row = _fetchone(cur)
                    finally:
                        cur.close()
                    if row and row.get('latest'):
                        target_date = fmt_date(row['latest'])
                        break
                except Exception:
                    pass
        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'queue_stats': {}, 'file_date': None}), content_type="json")

        ts_start = f"{target_date} {time_start}:00"
        ts_end   = f"{target_date} {time_end}:59"

        stats        = {}
        query_errors = {}

        for table, line_label in (('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')):
            try:
                cur = _cursor()
                try:
                    # Build WHERE clause with site filter if provided
                    where_clause = "WHERE q.time BETWEEN %s AND %s"
                    params = [ts_start, ts_end]
                    subquery_where = "WHERE t2.segment = q.segment AND t2.time BETWEEN %s AND %s"
                    subquery_params = [ts_start, ts_end]
                    
                    if site:
                        where_clause += " AND q.site = %s"
                        params.append(site)
                        subquery_where += " AND t2.site = %s"
                        subquery_params.append(site)
                    
                    params = subquery_params + params  # subquery params come first
                    
                    _exec(cur,
                        "SELECT "
                        "    q.segment, "
                        "    COUNT(*)                  AS total_points, "
                        "    MAX(queue_size)            AS peak_queue, "
                        "    ROUND(AVG(queue_size), 1)  AS avg_queue, "
                        "    MIN(TIME(time))            AS first_time, "
                        "    MAX(TIME(time))            AS last_time, "
                        "    (SELECT TIME(t2.time) FROM " + table + " t2 "
                        "     " + subquery_where + " "
                        "     ORDER BY t2.queue_size DESC LIMIT 1) AS peak_time "
                        "FROM " + table + " q "
                        "" + where_clause + " "
                        "GROUP BY q.segment "
                        "ORDER BY MAX(queue_size) DESC",
                        params
                    )
                    rows = _fetchall(cur)
                finally:
                    cur.close()
                for row in rows:
                    seg = row['segment']
                    stats[seg] = {
                        'segment':      seg,
                        'line':         line_label,
                        'total_points': int(row['total_points']),
                        'peak_queue':   int(row['peak_queue']),
                        'avg_queue':    safe_float(row['avg_queue']),
                        'first_time':   str(row['first_time']) if row.get('first_time') else '',
                        'last_time':    str(row['last_time'])  if row.get('last_time')  else '',
                        'peak_time':    str(row['peak_time'])  if row.get('peak_time')  else '',
                    }
            except Exception as e:
                query_errors[table] = str(e)
                print(f'[MQ stats] {table} failed: {e}')

        latency_stats         = {}
        latency_pct           = {'p50_oms': 0.0, 'p95_oms': 0.0, 'p99_oms': 0.0}
        latency_pct_exch      = {'p50_exch': 0.0, 'p95_exch': 0.0, 'p99_exch': 0.0}
        latency_pct_seg       = {}
        latency_pct_exch_seg  = {}
        latency_by_seg        = []

        try:
            cur = _cursor()
            try:
                # Build WHERE clause with site filter
                where_clause = "WHERE oms_update_time_conv BETWEEN %s AND %s"
                params = [ts_start, ts_end]
                if site:
                    where_clause += " AND site = %s"
                    params.append(site)
                
                _exec(cur,
                    "SELECT COUNT(*) AS total_orders, "
                    "       ROUND(AVG(oms_latency), 1)           AS avg_oms, "
                    "       ROUND(MAX(oms_latency), 1)           AS max_oms, "
                    "       ROUND(AVG(oms_exch_confirmation), 1) AS avg_exch, "
                    "       ROUND(MAX(oms_exch_confirmation), 1) AS max_exch "
                    "FROM order_latency "
                    "" + where_clause,
                    params
                )
                r = _fetchone(cur)
            finally:
                cur.close()
            if r and r.get('total_orders'):
                latency_stats = {
                    'total_orders':          int(r['total_orders']),
                    'avg_oms_latency':       safe_float(r['avg_oms']),
                    'max_oms_latency':       safe_float(r['max_oms']),
                    'avg_exch_confirmation': safe_float(r['avg_exch']),
                    'max_exch_confirmation': safe_float(r['max_exch']),
                }
        except Exception as e:
            query_errors['order_latency_summary'] = str(e)

        try:
            cur = _cursor()
            try:
                # Build WHERE clause with site filter
                where_clause = "WHERE oms_update_time_conv BETWEEN %s AND %s"
                params = [ts_start, ts_end]
                if site:
                    where_clause += " AND site = %s"
                    params.append(site)
                
                _exec(cur,
                    "SELECT exch_seg, oms_latency, oms_exch_confirmation "
                    "FROM order_latency "
                    "" + where_clause,
                    params
                )
                rows = _fetchall(cur)
            finally:
                cur.close()
            all_oms = []; all_exch = []; oms_segs = {}; exch_segs = {}
            for row in rows:
                seg = row.get('exch_seg')
                v   = safe_float(row.get('oms_latency'))
                all_oms.append(v)
                oms_segs.setdefault(seg, []).append(v)
                ve = safe_float(row.get('oms_exch_confirmation'))
                all_exch.append(ve)
                exch_segs.setdefault(seg, []).append(ve)
            all_oms.sort(); all_exch.sort()
            latency_pct = {
                'p50_oms': percentile_from_sorted(all_oms, 0.50),
                'p95_oms': percentile_from_sorted(all_oms, 0.95),
                'p99_oms': percentile_from_sorted(all_oms, 0.99),
            }
            latency_pct_exch = {
                'p50_exch': percentile_from_sorted(all_exch, 0.50),
                'p95_exch': percentile_from_sorted(all_exch, 0.95),
                'p99_exch': percentile_from_sorted(all_exch, 0.99),
            }
            for seg, vals in oms_segs.items():
                vals.sort()
                latency_pct_seg[seg] = {
                    'p50_oms': percentile_from_sorted(vals, 0.50),
                    'p95_oms': percentile_from_sorted(vals, 0.95),
                    'p99_oms': percentile_from_sorted(vals, 0.99),
                }
            for seg, vals in exch_segs.items():
                vals.sort()
                latency_pct_exch_seg[seg] = {
                    'p50_exch': percentile_from_sorted(vals, 0.50),
                    'p95_exch': percentile_from_sorted(vals, 0.95),
                    'p99_exch': percentile_from_sorted(vals, 0.99),
                }
        except Exception as e:
            print(f'[MQ stats] percentile query failed: {e}')

        try:
            cur = _cursor()
            try:
                # Build WHERE clause with site filter
                where_clause = "WHERE oms_update_time_conv BETWEEN %s AND %s"
                params = [ts_start, ts_end]
                if site:
                    where_clause += " AND site = %s"
                    params.append(site)
                
                _exec(cur,
                    "SELECT exch_seg, COUNT(*) AS orders, "
                    "       ROUND(AVG(oms_latency), 1) AS avg_oms, "
                    "       ROUND(MAX(oms_latency), 1) AS max_oms, "
                    "       ROUND(AVG(oms_exch_confirmation), 1) AS avg_exch, "
                    "       ROUND(MAX(oms_exch_confirmation), 1) AS max_exch "
                    "FROM order_latency "
                    "" + where_clause + " "
                    "GROUP BY exch_seg ORDER BY COUNT(*) DESC",
                    params
                )
                rows = _fetchall(cur)
            finally:
                cur.close()
            latency_by_seg = [
                {
                    'segment':  r['exch_seg'],
                    'orders':   int(r['orders']),
                    'avg_oms':  safe_float(r['avg_oms']),
                    'max_oms':  safe_float(r['max_oms']),
                    'avg_exch': safe_float(r['avg_exch']),
                    'max_exch': safe_float(r['max_exch']),
                }
                for r in rows
            ]
        except Exception as e:
            print(f'[MQ stats] by_segment query failed: {e}')

        resp = {
            'status':                              200,
            'file_date':                           target_date,
            'time_range':                          f'{time_start} \u2013 {time_end}',
            'queue_stats':                         stats,
            'latency_stats':                       latency_stats,
            'latency_percentiles':                 latency_pct,
            'latency_percentiles_exch':            latency_pct_exch,
            'latency_percentiles_by_segment':      latency_pct_seg,
            'latency_percentiles_exch_by_segment': latency_pct_exch_seg,
            'latency_by_segment':                  latency_by_seg,
        }
        if query_errors:
            resp['query_errors'] = query_errors
        return HttpResponse(json.dumps(resp))

    except Exception as e:
        traceback.print_exc()
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'data': []}))


#@login_required
def messagequeue_latency_data(request):
    site = request.GET.get('site', '').strip()
    try:
        target_date = request.GET.get('file_date', '').strip()
        time_start  = request.GET.get('time_start', '09:15').strip()
        time_end    = request.GET.get('time_end',   '15:35').strip()

        if not target_date:
            try:
                cur = _cursor()
                try:
                    _exec(cur,
                        "SELECT MAX(DATE(oms_update_time_conv)) AS latest "
                        "FROM order_latency"
                    )
                    row = _fetchone(cur)
                finally:
                    cur.close()
                if row and row.get('latest'):
                    target_date = fmt_date(row['latest'])
            except Exception as e:
                print(f'[MQ latency] date resolve failed: {e}')

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': [], 'file_date': None}))

        ts_start  = f"{target_date} {time_start}:00"
        ts_end    = f"{target_date} {time_end}:59"
        by_minute = {}

        try:
            cur = _cursor()
            try:
                _exec(cur,
                    "SELECT "
                    "    DATE_FORMAT(oms_update_time_conv, '%%H:%%i') AS minute_bucket, "
                    "    COUNT(*)                                      AS order_count, "
                    "    ROUND(AVG(oms_latency), 2)                    AS avg_oms, "
                    "    ROUND(MAX(oms_latency), 2)                    AS max_oms, "
                    "    ROUND(AVG(oms_exch_confirmation), 2)          AS avg_exch, "
                    "    ROUND(MAX(oms_exch_confirmation), 2)          AS max_exch "
                    "FROM order_latency "
                    "WHERE oms_update_time_conv BETWEEN %s AND %s "
                    "GROUP BY DATE_FORMAT(oms_update_time_conv, '%%H:%%i') "
                    "ORDER BY minute_bucket ASC",
                    [ts_start, ts_end]
                )
                rows = _fetchall(cur)
            finally:
                cur.close()
            for row in rows:
                by_minute[row['minute_bucket']] = {
                    'time':        row['minute_bucket'],
                    'order_count': int(row['order_count']),
                    'avg_oms':     safe_float(row['avg_oms']),
                    'max_oms':     safe_float(row['max_oms']),
                    'avg_exch':    safe_float(row['avg_exch']),
                    'max_exch':    safe_float(row['max_exch']),
                    'p50_oms':     0.0,
                    'p50_exch':    0.0,
                }
        except Exception as e:
            print(f'[MQ latency] aggregation query failed: {e}')
            return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'data': []}))

        try:
            cur = _cursor()
            try:
                _exec(cur,
                    "SELECT DATE_FORMAT(oms_update_time_conv, '%%H:%%i') AS minute_bucket, "
                    "       oms_latency, oms_exch_confirmation "
                    "FROM order_latency "
                    "WHERE oms_update_time_conv BETWEEN %s AND %s",
                    [ts_start, ts_end]
                )
                rows = _fetchall(cur)
            finally:
                cur.close()
            oms_by_min = {}; exch_by_min = {}
            for row in rows:
                m = row['minute_bucket']
                oms_by_min.setdefault(m, []).append(safe_float(row.get('oms_latency')))
                exch_by_min.setdefault(m, []).append(safe_float(row.get('oms_exch_confirmation')))
            for m, vals in oms_by_min.items():
                vals.sort()
                if m in by_minute:
                    by_minute[m]['p50_oms'] = percentile_from_sorted(vals, 0.50)
            for m, vals in exch_by_min.items():
                vals.sort()
                if m in by_minute:
                    by_minute[m]['p50_exch'] = percentile_from_sorted(vals, 0.50)
        except Exception as e:
            print(f'[MQ latency] p50 query failed: {e}')

        data = [by_minute[k] for k in sorted(by_minute.keys())]
        return HttpResponse(json.dumps({
            'status':       200,
            'file_date':    target_date,
            'time_range':   f'{time_start} \u2013 {time_end}',
            'data':         data,
            'total_points': len(data),
        }))

    except Exception as e:
        traceback.print_exc()
        return HttpResponse(json.dumps({'status': 500, 'error': str(e), 'data': []}))


# ─── Analytics Raw Table Endpoints ────────────────────────

@csrf_exempt
def messagequeue_sites(request):
    """
    Returns distinct site values stored in each table.
    Hit: GET /bod-eodstatus/messagequeue-sites
    Use this to verify what site names are in the DB vs what the UI is sending.
    """
    result = {}
    for table, Model in (
        ('order_latency', OrderLatencyModel),
        ('queue_line1',   QueueLine1Model),
        ('queue_line2',   QueueLine2Model),
    ):
        try:
            sites = list(Model.objects.values_list('site', flat=True).distinct().order_by('site'))
            counts = {}
            for s in sites:
                counts[s or '(null)'] = Model.objects.filter(site=s).count()
            result[table] = {'sites': sites, 'counts': counts}
        except Exception as e:
            result[table] = {'error': str(e)}
    return HttpResponse(json.dumps({'status': 200, 'tables': result}))


@csrf_exempt
def get_order_latency(request):
    """
    Fetches data from linkedeye.order_latency using Django ORM.
    Same pattern as allonboard/views.py::newonbtable().
    """
    response = {}
    try:
        site = request.GET.get('site', '').strip()
        temp_list = []
        app_obj = OrderLatencyModel.objects.filter(site=site) if site else OrderLatencyModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["file_date"] = str(temp.file_date) if temp.file_date else None
            json_obj["noren_ord_num"] = temp.noren_ord_num
            json_obj["exch_seg"] = temp.exch_seg
            json_obj["token"] = temp.token
            json_obj["oms_latency"] = float(temp.oms_latency) if temp.oms_latency is not None else None
            json_obj["oms_exch_confirmation"] = float(temp.oms_exch_confirmation) if temp.oms_exch_confirmation is not None else None
            json_obj["oms_update_time"] = temp.oms_update_time
            json_obj["exch_update_time"] = temp.exch_update_time
            json_obj["oms_update_time_conv"] = str(temp.oms_update_time_conv) if temp.oms_update_time_conv else None
            json_obj["timestamp"] = str(temp.timestamp) if temp.timestamp else None
            json_obj["site"] = temp.site
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        print(f'[linkedeye] order_latency returned {len(temp_list)} rows for site={site!r}')
        return HttpResponse(json.dumps(response))
    except Exception as e:
        print(f'[linkedeye] order_latency ERROR: {e}')
        traceback.print_exc()
        response['status'] = 400
        response['msg'] = 'Something went wrong: ' + str(e)
        return HttpResponse(json.dumps(response))


@csrf_exempt
def get_queue_line1(request):
    """
    Fetches data from linkedeye.queue_line1 using Django ORM.
    Same pattern as allonboard/views.py::newonbtable().
    """
    response = {}
    try:
        site = request.GET.get('site', '').strip()
        temp_list = []
        app_obj = QueueLine1Model.objects.filter(site=site) if site else QueueLine1Model.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["file_date"] = str(temp.file_date) if temp.file_date else None
            json_obj["segment"] = temp.segment
            json_obj["time"] = str(temp.time) if temp.time else None
            json_obj["seq_no"] = temp.seq_no
            json_obj["erf"] = temp.erf
            json_obj["queue_size"] = temp.queue_size
            json_obj["timestamp"] = str(temp.timestamp) if temp.timestamp else None
            json_obj["site"] = temp.site
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        print(f'[linkedeye] queue_line1 returned {len(temp_list)} rows for site={site!r}')
        return HttpResponse(json.dumps(response))
    except Exception as e:
        print(f'[linkedeye] queue_line1 ERROR: {e}')
        traceback.print_exc()
        response['status'] = 400
        response['msg'] = 'Something went wrong: ' + str(e)
        return HttpResponse(json.dumps(response))


@csrf_exempt
def get_queue_line2(request):
    """
    Fetches data from linkedeye.queue_line2 using Django ORM.
    Same pattern as allonboard/views.py::newonbtable().
    """
    response = {}
    try:
        site = request.GET.get('site', '').strip()
        temp_list = []
        app_obj = QueueLine2Model.objects.filter(site=site) if site else QueueLine2Model.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["file_date"] = str(temp.file_date) if temp.file_date else None
            json_obj["segment"] = temp.segment
            json_obj["time"] = str(temp.time) if temp.time else None
            json_obj["seq_no"] = temp.seq_no
            json_obj["erf"] = temp.erf
            json_obj["queue_size"] = temp.queue_size
            json_obj["timestamp"] = str(temp.timestamp) if temp.timestamp else None
            json_obj["site"] = temp.site
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        print(f'[linkedeye] queue_line2 returned {len(temp_list)} rows for site={site!r}')
        return HttpResponse(json.dumps(response))
    except Exception as e:
        print(f'[linkedeye] queue_line2 ERROR: {e}')
        traceback.print_exc()
        response['status'] = 400
        response['msg'] = 'Something went wrong: ' + str(e)
        return HttpResponse(json.dumps(response))

