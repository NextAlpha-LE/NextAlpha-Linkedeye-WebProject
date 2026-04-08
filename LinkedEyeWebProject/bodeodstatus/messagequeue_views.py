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

def get_analytics_connection():
    """
    Get a connection to the analytics MySQL database.
    HIGH FIX #11: Ensure connection is properly closed with context manager.
    """
    return mysql.connector.connect(**ANALYTICS_DB_CONFIG)

def percentile(sorted_list, p):
    """Return p-th percentile from a pre-sorted list."""
    if not sorted_list:
        return 0.0
    n = len(sorted_list)
    return sorted_list[min(int(n * p / 100), n - 1)]

class AnalyticsDBConnection:
    """
    Context manager for analytics DB connections.
    HIGH FIX #11: Ensures connection is always closed.
    """
    def __init__(self):
        self.conn = None
        self.cursor = None
    
    def __enter__(self):
        self.conn = mysql.connector.connect(**ANALYTICS_DB_CONFIG)
        self.cursor = self.conn.cursor(dictionary=True)
        return self.cursor
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
        return False


def safe_float(val, default=0.0):
    """Safely convert to float."""
    try:
        naive = datetime.strptime(f"{date_str} {time_str}", '%Y-%m-%d %H:%M:%S')
        # Data in DB is stored as naive IST, so we must localize to IST
        return pytz.timezone('Asia/Kolkata').localize(naive)
    except:
        # Fallback if seconds are missing (HH:MM)
        try:
            naive = datetime.strptime(f"{date_str} {time_str}", '%Y-%m-%d %H:%M')
            return pytz.timezone('Asia/Kolkata').localize(naive)
        except:
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
    """
    GET /dashboard/messagequeue-dates
    Returns all available trading dates from the analytics DB.
    HIGH FIX #11: Use context manager for connection handling.
    """
    try:
        # HIGH FIX #11: Use context manager to ensure connection close
        with AnalyticsDBConnection() as cursor:
            # Get distinct dates from all tables
            cursor.execute("""
                SELECT DISTINCT file_date FROM (
                    SELECT DISTINCT file_date FROM queue_line1
                    UNION
                    SELECT DISTINCT file_date FROM queue_line2
                    UNION
                    SELECT DISTINCT file_date FROM order_latency
                ) combined
                ORDER BY file_date DESC
                LIMIT 60
            """)
            rows = cursor.fetchall()
            dates = [row['file_date'].strftime('%Y-%m-%d') if isinstance(row['file_date'], date)
                     else str(row['file_date']) for row in rows]

        return JsonResponse({
            'status': 200,
            'dates': dates,
            'count': len(dates),
        })
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_data(request):
    """
    GET /dashboard/messagequeue-data?file_date=2026-02-14&time_start=09:15&time_end=09:20&segment=NSE
    Returns queue size timeseries data for Chart.js rendering.

    Params:
      file_date  — YYYY-MM-DD (default: latest available)
      time_start — HH:MM (default: 09:15)
      time_end   — HH:MM (default: 09:20)
      segment    — comma-separated: NSE,NFO,BSE,BFO (default: all)
    """
    try:
        file_date_str = request.GET.get('file_date', '')
        time_start = request.GET.get('time_start', '09:15')
        time_end = request.GET.get('time_end', '09:20')
        segments_param = request.GET.get('segment', 'NSE,NFO,BSE,BFO')

        requested_segments = [s.strip().upper() for s in segments_param.split(',') if s.strip()]

        with AnalyticsDBConnection() as cursor:
            # Resolve file_date
            if file_date_str:
                file_date = file_date_str
            else:
                cursor.execute("SELECT MAX(file_date) as latest FROM queue_line2")
                row = cursor.fetchone()
                if row and row['latest']:
                    file_date = row['latest'].strftime('%Y-%m-%d') if isinstance(row['latest'], date) else str(row['latest'])
                else:
                    return JsonResponse({'status': 200, 'data': [], 'file_date': None})

            # Build time filter SQL
            time_filter = ""
            params = [file_date]
            if time_start and time_end:
                time_filter = "AND TIME(time) BETWEEN %s AND %s"
                params.extend([time_start + ':00', time_end + ':59'])

            result_data = []

            # ── Query Line-2 (NSE, NFO) ──
            line2_segments = [s for s in requested_segments if s in ('NSE', 'NFO')]
            if line2_segments:
                seg_placeholders = ','.join(['%s'] * len(line2_segments))
                seg_like_clauses = ' OR '.join([f"segment LIKE %s" for _ in line2_segments])
                like_params = [f"{s}%" for s in line2_segments]

                query = f"""
                    SELECT segment, TIME(time) as time_val, queue_size, seq_no, erf
                    FROM queue_line2
                    WHERE file_date = %s
                      AND ({seg_like_clauses})
                      {time_filter}
                    ORDER BY time ASC
                """
                q_params = [file_date] + like_params
                if time_start and time_end:
                    q_params.extend([time_start + ':00', time_end + ':59'])

                cursor.execute(query, q_params)
                rows = cursor.fetchall()

                seg_map = {}
                for row in rows:
                    seg = row['segment']
                    if seg not in seg_map:
                        base_seg = 'NSE' if seg.startswith('NSE') else 'NFO'
                        ctcl_id = seg.split('-')[1] if '-' in seg else ''
                        seg_map[seg] = {
                            'segment': seg,
                            'base_segment': base_seg,
                            'ctcl_id': ctcl_id,
                            'line': 'Line-2',
                            'id_label': f'CTCL:{ctcl_id}' if ctcl_id else 'Regular',
                            'points': [],
                        }
                    seg_map[seg]['points'].append({
                        'time': str(row['time_val']),
                        'queue_size': int(row['queue_size']),
                        'seq_no': int(row['seq_no']) if row['seq_no'] else 0,
                        'erf': int(row['erf']) if row['erf'] else 0,
                    })
                result_data.extend(seg_map.values())

            # ── Query Line-1 (BSE, BFO) ──
            line1_segments = [s for s in requested_segments if s in ('BSE', 'BFO')]
            if line1_segments:
                seg_like_clauses = ' OR '.join([f"segment LIKE %s" for _ in line1_segments])
                like_params = [f"{s}%" for s in line1_segments]

                query = f"""
                    SELECT segment, TIME(time) as time_val, queue_size, seq_no, erf
                    FROM queue_line1
                    WHERE file_date = %s
                      AND ({seg_like_clauses})
                      {time_filter}
                    ORDER BY time ASC
                """
                q_params = [file_date] + like_params
                if time_start and time_end:
                    q_params.extend([time_start + ':00', time_end + ':59'])

                cursor.execute(query, q_params)
                rows = cursor.fetchall()

                seg_map = {}
                for row in rows:
                    seg = row['segment']
                    if seg not in seg_map:
                        seg_map[seg] = {
                            'segment': seg,
                            'base_segment': seg,
                            'ctcl_id': '',
                            'line': 'Line-1',
                            'id_label': 'Regular',
                            'points': [],
                        }
                    seg_map[seg]['points'].append({
                        'time': str(row['time_val']),
                        'queue_size': int(row['queue_size']),
                        'seq_no': int(row['seq_no']) if row['seq_no'] else 0,
                        'erf': int(row['erf']) if row['erf'] else 0,
                    })
                result_data.extend(seg_map.values())

            return JsonResponse({
                'status': 200,
                'file_date': file_date,
                'time_range': f'{time_start} – {time_end}',
                'segments_requested': requested_segments,
                'data': result_data,
                'series_count': len(result_data),
                'total_points': sum(len(d['points']) for d in result_data),
            })

    try:
        if not target_date:
            latest = QueueLine2Model.objects.latest('file_date')
            if latest: target_date = fmt_date(latest.file_date)

        if not target_date:
            return HttpResponse(json.dumps({'status': 200, 'data': []}), content_type="application/json")

        ts_start, ts_end = make_ts_aware(target_date, f"{time_start}:00"), make_ts_aware(target_date, f"{time_end}:59")
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
        file_date_str = request.GET.get('file_date', '')
        time_start = request.GET.get('time_start', '09:15')
        time_end = request.GET.get('time_end', '09:20')

        with AnalyticsDBConnection() as cursor:
            # Resolve date
            if not file_date_str:
                cursor.execute("SELECT MAX(file_date) as latest FROM queue_line2")
                row = cursor.fetchone()
                file_date_str = row['latest'].strftime('%Y-%m-%d') if row and row['latest'] and isinstance(row['latest'], date) else str(row['latest']) if row and row['latest'] else None
                if not file_date_str:
                    return JsonResponse({'status': 200, 'stats': {}})

            stats = {}

            for table, line_label in [('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')]:
                query = f"""
                    SELECT
                        segment,
                        COUNT(*) as total_points,
                        MAX(queue_size) as peak_queue,
                        ROUND(AVG(queue_size), 1) as avg_queue,
                        MIN(TIME(time)) as first_time,
                        MAX(TIME(time)) as last_time,
                        (SELECT TIME(t2.time) FROM {table} t2
                         WHERE t2.file_date = %s AND t2.segment = {table}.segment
                           AND TIME(t2.time) BETWEEN %s AND %s
                         ORDER BY t2.queue_size DESC LIMIT 1) as peak_time
                    FROM {table}
                    WHERE file_date = %s
                      AND TIME(time) BETWEEN %s AND %s
                    GROUP BY segment
                    ORDER BY MAX(queue_size) DESC
                """
                params = [file_date_str, time_start + ':00', time_end + ':59',
                          file_date_str, time_start + ':00', time_end + ':59']
                cursor.execute(query, params)
                rows = cursor.fetchall()

                for row in rows:
                    seg = row['segment']
                    stats[seg] = {
                        'segment': seg,
                        'line': line_label,
                        'total_points': int(row['total_points']),
                        'peak_queue': int(row['peak_queue']),
                        'avg_queue': safe_float(row['avg_queue']),
                        'first_time': str(row['first_time']) if row['first_time'] else '',
                        'last_time': str(row['last_time']) if row['last_time'] else '',
                        'peak_time': str(row['peak_time']) if row['peak_time'] else '',
                    }

            cursor.execute("""
                SELECT
                    COUNT(*) as total_orders,
                    ROUND(AVG(oms_latency), 1) as avg_oms,
                    ROUND(MAX(oms_latency), 1) as max_oms,
                    ROUND(AVG(oms_exch_confirmation), 1) as avg_exch,
                    ROUND(MAX(oms_exch_confirmation), 1) as max_exch
                FROM order_latency
                WHERE file_date = %s
                  AND TIME(oms_update_time_conv) BETWEEN %s AND %s
            """, [file_date_str, time_start + ':00', time_end + ':59'])
            lat_row = cursor.fetchone()

            latency_stats = {}
            if lat_row and lat_row['total_orders']:
                latency_stats = {
                    'total_orders': int(lat_row['total_orders']),
                    'avg_oms_latency': safe_float(lat_row['avg_oms']),
                    'max_oms_latency': safe_float(lat_row['max_oms']),
                    'avg_exch_confirmation': safe_float(lat_row['avg_exch']),
                    'max_exch_confirmation': safe_float(lat_row['max_exch']),
                }

            cursor.execute("""
                SELECT
                    exch_seg,
                    COUNT(*) as orders,
                    ROUND(AVG(oms_latency), 1) as avg_oms,
                    ROUND(MAX(oms_latency), 1) as max_oms,
                    ROUND(AVG(oms_exch_confirmation), 1) as avg_exch,
                    ROUND(MAX(oms_exch_confirmation), 1) as max_exch
                FROM order_latency
                WHERE file_date = %s
                  AND TIME(oms_update_time_conv) BETWEEN %s AND %s
                GROUP BY exch_seg
                ORDER BY COUNT(*) DESC
            """, [file_date_str, time_start + ':00', time_end + ':59'])

            latency_by_segment = []
            for row in cursor.fetchall():
                latency_by_segment.append({
                    'segment': row['exch_seg'],
                    'orders': int(row['orders']),
                    'avg_oms': safe_float(row['avg_oms']),
                    'max_oms': safe_float(row['max_oms']),
                    'avg_exch': safe_float(row['avg_exch']),
                    'max_exch': safe_float(row['max_exch']),
                })

            return JsonResponse({
                'status': 200,
                'file_date': file_date_str,
                'time_range': f'{time_start} – {time_end}',
                'queue_stats': stats,
                'latency_stats': latency_stats,
                'latency_by_segment': latency_by_segment,
            })

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
        file_date_str = request.GET.get('file_date', '')
        time_start = request.GET.get('time_start', '09:15')
        time_end = request.GET.get('time_end', '09:20')

        with AnalyticsDBConnection() as cursor:
            if not file_date_str:
                cursor.execute("SELECT MAX(file_date) as latest FROM order_latency")
                row = cursor.fetchone()
                file_date_str = row['latest'].strftime('%Y-%m-%d') if row and row['latest'] and isinstance(row['latest'], date) else str(row['latest']) if row and row['latest'] else None
                if not file_date_str:
                    return JsonResponse({'status': 200, 'data': []})

            cursor.execute("""
                SELECT
                    DATE_FORMAT(oms_update_time_conv, '%%H:%%i') as minute_bucket,
                    COUNT(*) as order_count,
                    ROUND(AVG(oms_latency), 2) as avg_oms,
                    ROUND(MAX(oms_latency), 2) as max_oms,
                    ROUND(AVG(oms_exch_confirmation), 2) as avg_exch,
                    ROUND(MAX(oms_exch_confirmation), 2) as max_exch
                FROM order_latency
                WHERE file_date = %s
                  AND TIME(oms_update_time_conv) BETWEEN %s AND %s
                GROUP BY DATE_FORMAT(oms_update_time_conv, '%%H:%%i')
                ORDER BY minute_bucket ASC
            """, [file_date_str, time_start + ':00', time_end + ':59'])

            data = []
            for row in cursor.fetchall():
                data.append({
                    'time': row['minute_bucket'],
                    'order_count': int(row['order_count']),
                    'avg_oms': safe_float(row['avg_oms']),
                    'max_oms': safe_float(row['max_oms']),
                    'avg_exch': safe_float(row['avg_exch']),
                    'max_exch': safe_float(row['max_exch']),
                })

            return JsonResponse({
                'status': 200,
                'file_date': file_date_str,
                'time_range': f'{time_start} – {time_end}',
                'data': data,
                'total_points': len(data),
            })

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
