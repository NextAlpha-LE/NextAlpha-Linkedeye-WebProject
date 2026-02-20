"""
MessageQueue Dashboard — Django Views
=======================================
Queries the MySQL analytics database directly (populated by latency.py cron).
No CSV upload needed — all data comes from:
  - queue_line1 (BSE, BFO segments)
  - queue_line2 (NSE-CTCLID, NFO-CTCLID segments)
  - order_latency

DB: analytics @ 10.41.0.110:31830

URL Pattern (add to dashboard/urls.py):
  path('messagequeue',           views.messagequeue_dashboard,    name='messagequeue_dashboard'),
  path('messagequeue-data',      views.messagequeue_data,         name='messagequeue_data'),
  path('messagequeue-stats',     views.messagequeue_stats,        name='messagequeue_stats'),
  path('messagequeue-latency',   views.messagequeue_latency_data, name='messagequeue_latency'),
  path('messagequeue-dates',     views.messagequeue_dates,        name='messagequeue_dates'),
"""

import json
import traceback
from datetime import datetime, date, timedelta

import mysql.connector
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# ─────────────────────────────────────────────────
# Analytics DB Connection (separate from LinkedEye DB)
# ─────────────────────────────────────────────────
ANALYTICS_DB_CONFIG = {
    "host": "10.41.0.110",
    "port": 31830,
    "user": "root",
    "password": "rootpassword",
    "database": "analytics",
    "connection_timeout": 10,
    "autocommit": True,
}


def get_analytics_connection():
    """Get a connection to the analytics MySQL database."""
    return mysql.connector.connect(**ANALYTICS_DB_CONFIG)


def safe_float(val, default=0.0):
    """Safely convert to float."""
    try:
        return float(val) if val is not None else default
    except (ValueError, TypeError):
        return default


# ─────────────────────────────────────────────────
# Template View
# ─────────────────────────────────────────────────
@login_required
def messagequeue_dashboard(request):
    """Render the MessageQueue dashboard template."""
    return render(request, 'app/messagequeue-dashboard.html')


# ─────────────────────────────────────────────────
# API: Available Trading Dates
# ─────────────────────────────────────────────────
@login_required
def messagequeue_dates(request):
    """
    GET /dashboard/messagequeue-dates
    Returns all available trading dates from the analytics DB.
    """
    try:
        conn = get_analytics_connection()
        cursor = conn.cursor(dictionary=True)

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

        cursor.close()
        conn.close()

        return JsonResponse({
            'status': 200,
            'dates': dates,
            'count': len(dates),
        })
    except Exception as e:
        return JsonResponse({
            'status': 500,
            'error': str(e),
            'dates': [],
        })


# ─────────────────────────────────────────────────
# API: Queue Size Data (timeseries for charts)
# ─────────────────────────────────────────────────
@login_required
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

        conn = get_analytics_connection()
        cursor = conn.cursor(dictionary=True)

        # Resolve file_date
        if file_date_str:
            file_date = file_date_str
        else:
            cursor.execute("SELECT MAX(file_date) as latest FROM queue_line2")
            row = cursor.fetchone()
            if row and row['latest']:
                file_date = row['latest'].strftime('%Y-%m-%d') if isinstance(row['latest'], date) else str(row['latest'])
            else:
                cursor.close()
                conn.close()
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
            # Match segments starting with NSE or NFO (e.g., NSE-48621, NFO-12492)
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

            # Group by segment
            seg_map = {}
            for row in rows:
                seg = row['segment']
                if seg not in seg_map:
                    # Determine base segment (NSE or NFO)
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

        cursor.close()
        conn.close()

        return JsonResponse({
            'status': 200,
            'file_date': file_date,
            'time_range': f'{time_start} – {time_end}',
            'segments_requested': requested_segments,
            'data': result_data,
            'series_count': len(result_data),
            'total_points': sum(len(d['points']) for d in result_data),
        })

    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'status': 500, 'error': str(e), 'data': []})


# ─────────────────────────────────────────────────
# API: Queue Stats (aggregated)
# ─────────────────────────────────────────────────
@login_required
def messagequeue_stats(request):
    """
    GET /dashboard/messagequeue-stats?file_date=2026-02-14&time_start=09:15&time_end=09:20
    Returns aggregated stats: peak, avg, total per segment.
    """
    try:
        file_date_str = request.GET.get('file_date', '')
        time_start = request.GET.get('time_start', '09:15')
        time_end = request.GET.get('time_end', '09:20')

        conn = get_analytics_connection()
        cursor = conn.cursor(dictionary=True)

        # Resolve date
        if not file_date_str:
            cursor.execute("SELECT MAX(file_date) as latest FROM queue_line2")
            row = cursor.fetchone()
            file_date_str = row['latest'].strftime('%Y-%m-%d') if row and row['latest'] and isinstance(row['latest'], date) else str(row['latest']) if row and row['latest'] else None
            if not file_date_str:
                cursor.close()
                conn.close()
                return JsonResponse({'status': 200, 'stats': {}})

        stats = {}

        # Query both lines
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

        # Latency stats
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

        # Per-segment latency
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

        cursor.close()
        conn.close()

        return JsonResponse({
            'status': 200,
            'file_date': file_date_str,
            'time_range': f'{time_start} – {time_end}',
            'queue_stats': stats,
            'latency_stats': latency_stats,
            'latency_by_segment': latency_by_segment,
        })

    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'status': 500, 'error': str(e)})


# ─────────────────────────────────────────────────
# API: Latency Timeseries (per-minute aggregation)
# ─────────────────────────────────────────────────
@login_required
def messagequeue_latency_data(request):
    """
    GET /dashboard/messagequeue-latency?file_date=2026-02-14&time_start=09:15&time_end=09:20
    Returns per-minute latency aggregation for chart rendering.
    """
    try:
        file_date_str = request.GET.get('file_date', '')
        time_start = request.GET.get('time_start', '09:15')
        time_end = request.GET.get('time_end', '09:20')

        conn = get_analytics_connection()
        cursor = conn.cursor(dictionary=True)

        if not file_date_str:
            cursor.execute("SELECT MAX(file_date) as latest FROM order_latency")
            row = cursor.fetchone()
            file_date_str = row['latest'].strftime('%Y-%m-%d') if row and row['latest'] and isinstance(row['latest'], date) else str(row['latest']) if row and row['latest'] else None
            if not file_date_str:
                cursor.close()
                conn.close()
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

        cursor.close()
        conn.close()

        return JsonResponse({
            'status': 200,
            'file_date': file_date_str,
            'time_range': f'{time_start} – {time_end}',
            'data': data,
            'total_points': len(data),
        })

    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'status': 500, 'error': str(e), 'data': []})
