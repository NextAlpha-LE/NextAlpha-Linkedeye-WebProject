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

from django.db import connections, connection
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict

from .models import OrderLatencyModel, QueueLine1Model, QueueLine2Model

# ─── Data Helpers ──────────────────────────────────────────

def safe_float(val, default=0.0):
    try: return float(val) if val is not None else default
    except: return default

def fmt_date(val):
    if isinstance(val, (date, datetime)): return val.strftime('%Y-%m-%d')
    return str(val) if val else None


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
        
        # Get from Line 1
        d1 = QueueLine1Model.objects.values_list('file_date', flat=True).distinct()
        for d in d1:
            if d: found_dates.add(fmt_date(d))
            
        t1 = QueueLine1Model.objects.values_list('time', flat=True).distinct()
        for t in t1:
            if t: found_dates.add(fmt_date(t))

        # Get from Line 2
        d2 = QueueLine2Model.objects.values_list('file_date', flat=True).distinct()
        for d in d2:
            if d: found_dates.add(fmt_date(d))
            
        t2 = QueueLine2Model.objects.values_list('time', flat=True).distinct()
        for t in t2:
            if t: found_dates.add(fmt_date(t))

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
            latest = QueueLine2Model.objects.latest('file_date')
            if latest: target_date = fmt_date(latest.file_date)
        
        if not target_date: 
            return HttpResponse(json.dumps({'status': 200, 'data': []}), content_type="application/json")

        ts_start, ts_end = f"{target_date} {time_start}:00", f"{target_date} {time_end}:59"
        seg_map = {}; total_pts = 0

        # Query using ORM
        for model, label in [(QueueLine2Model, 'Line-2'), (QueueLine1Model, 'Line-1')]:
            qs = model.objects.filter(time__range=(ts_start, ts_end)).order_by('time')
            for r in qs:
                if requested_segs and r.segment not in requested_segs: continue
                seg_map.setdefault(r.segment, {'segment': r.segment, 'line': label, 'points': []})['points'].append({
                    'time': r.time.strftime('%H:%M:%S'), 'queue_size': int(r.queue_size or 0), 'seq_no': r.seq_no, 'erf': r.erf
                })
                total_pts += 1

        return HttpResponse(json.dumps({'status': 200, 'file_date': target_date, 'data': list(seg_map.values()), 'total_points': total_pts}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_stats(request):
    target_date = request.GET.get('file_date', '').strip()
    time_start, time_end = request.GET.get('time_start', '09:15').strip(), request.GET.get('time_end', '15:35').strip()

    try:
        if not target_date:
            latest = QueueLine2Model.objects.latest('file_date')
            if latest: target_date = fmt_date(latest.file_date)
            
        if not target_date: return HttpResponse(json.dumps({'status': 200, 'queue_stats': {}}), content_type="application/json")

        t_s, t_e = f"{target_date} {time_start}:00", f"{target_date} {time_end}:59"
        queue_stats = {}
        
        # Line 2 and Line 1 Aggregates (Simplifying with raw SQL for grouping as Django aggregations are slower here)
        with connection.cursor() as cur:
            for table, label in [('queue_line2', 'Line-2'), ('queue_line1', 'Line-1')]:
                cur.execute(f"SELECT segment, COUNT(*) as pts, MAX(queue_size) as peak, AVG(queue_size) as avg_q FROM {table} WHERE time BETWEEN %s AND %s GROUP BY segment", [t_s, t_e])
                for row in cur.fetchall():
                    seg, pts, peak, avg_q = row
                    queue_stats[seg] = {'peak_queue': int(peak or 0), 'avg_queue': round(float(avg_q or 0), 2), 'total_points': int(pts), 'line': label}

        latency_stats = {}
        with connection.cursor() as cur:
            cur.execute("SELECT COUNT(*) as tot, AVG(oms_latency) as a_oms, MAX(oms_latency) as m_oms FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s", [t_s, t_e])
            row = cur.fetchone()
            if row and row[0]:
                tot, a_oms, m_oms = row
                latency_stats = {'total_orders': int(tot), 'avg_oms_latency': safe_float(a_oms), 'max_oms_latency': safe_float(m_oms)}

        return HttpResponse(json.dumps({'status': 200, 'file_date': target_date, 'queue_stats': queue_stats, 'latency_stats': latency_stats}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


def messagequeue_latency_data(request):
    target_date = request.GET.get('file_date', '').strip()
    time_start, time_end = request.GET.get('time_start', '09:15').strip(), request.GET.get('time_end', '15:35').strip()

    try:
        if not target_date:
            latest = OrderLatencyModel.objects.latest('oms_update_time_conv')
            if latest: target_date = fmt_date(latest.oms_update_time_conv)
            
        if not target_date: return HttpResponse(json.dumps({'status': 200, 'data': []}), content_type="application/json")

        t_s, t_e = f"{target_date} {time_start}:00", f"{target_date} {time_end}:59"
        
        with connection.cursor() as cur:
            cur.execute("SELECT DATE_FORMAT(oms_update_time_conv, '%H:%i') as bucket, AVG(oms_latency) as avg_oms, MAX(oms_latency) as max_oms FROM order_latency WHERE oms_update_time_conv BETWEEN %s AND %s GROUP BY bucket ORDER BY bucket ASC", [t_s, t_e])
            data = [{'time': r[0], 'avg_oms': safe_float(r[1]), 'max_oms': safe_float(r[2])} for r in cur.fetchall()]

        return HttpResponse(json.dumps({'status': 200, 'data': data}), content_type="application/json")
    except Exception as e:
        return HttpResponse(json.dumps({'status': 500, 'error': str(e)}), content_type="application/json")


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
