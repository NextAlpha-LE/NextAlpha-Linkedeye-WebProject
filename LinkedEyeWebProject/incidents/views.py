from django.shortcuts import render, redirect
from django.conf import settings
from datetime import datetime
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.template.loader import render_to_string
import json
from .models import IncidentModel
import psycopg2

def get_linkedeye_connection():
    try:
        connection = psycopg2.connect(
            database=settings.POSTGRES_DB_NAME,
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASS,
            host=settings.POSTGRES_HOST,
            port=settings.POSTGRES_PORT
        )
        return connection
    except Exception as e:
        print(f"Error connecting to linkedeye database: {e}")
        return None

@csrf_exempt
def get_incidents_api(request):
    """
    API endpoint to fetch incidents from PostgreSQL linkedeye database with pagination and filtering
    """
    search = request.GET.get('search', '').strip().lower()
    priorities_str = request.GET.get('priorities', '')
    states_str = request.GET.get('states', '')
    assignees_str = request.GET.get('assignees', '')
    
    priorities = [p for p in priorities_str.split(',') if p]
    states = [s for s in states_str.split(',') if s]
    assignee_ids = [a for a in assignees_str.split(',') if a]
    
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 15))
    
    offset = (page - 1) * limit

    try:
        conn = get_linkedeye_connection()
        if not conn:
            return JsonResponse({'status': 500, 'message': 'Database connection failed', 'incidents': []})
        
        cursor = conn.cursor()
        
        # Resolve User mapping
        user_map = {}
        try:
            cursor.execute('SELECT id, "firstName", "lastName" FROM "User"')
            user_map = {str(r[0]): f"{r[1]} {r[2]}".strip() for r in cursor.fetchall()}
        except:
            # Fallback for different schema if "User" table doesn't exist or columns differ
            try:
                cursor.execute('SELECT id, name FROM "User"')
                user_map = {str(r[0]): r[1] for r in cursor.fetchall()}
            except:
                pass
                
        # Resolve Team mapping for assignment group
        team_map = {}
        try:
            cursor.execute('SELECT id, name FROM "Team"')
            team_map = {str(r[0]): r[1] for r in cursor.fetchall()}
        except:
            pass
            
        # Build base query and filter parts
        where_clauses = []
        params = []
        
        if search:
            # Search in number, shortDescription
            where_clauses.append('("number" ILIKE %s OR "shortDescription" ILIKE %s)')
            params.extend([f'%{search}%', f'%{search}%'])
        
        if priorities:
            where_clauses.append('"priority" = ANY(%s)')
            params.append(priorities)
            
        if states:
            where_clauses.append('"state" = ANY(%s)')
            params.append(states)
            
        if assignee_ids:
            where_clauses.append('"assignedToId" = ANY(%s)')
            params.append(assignee_ids)
            
        where_sql = ""
        if where_clauses:
            where_sql = " WHERE " + " AND ".join(where_clauses)
            
        # Get total count with filters
        count_query = f'SELECT COUNT(*) FROM "Incident" {where_sql};'
        cursor.execute(count_query, params)
        total_count = cursor.fetchone()[0]
        
        # Get global stats (unfiltered by search/priority for the header cards)
        # Also fetch list of all unique states and assignees for filters
        cursor.execute('SELECT DISTINCT state FROM "Incident" ORDER BY state;')
        all_states = [r[0] for r in cursor.fetchall()]
        
        cursor.execute('''
            SELECT DISTINCT u.id, u."firstName", u."lastName" 
            FROM "Incident" i
            JOIN "User" u ON i."assignedToId" = u.id
            ORDER BY u."firstName";
        ''')
        available_assignees = [{'id': r[0], 'name': f"{r[1]} {r[2]}"} for r in cursor.fetchall()]

        cursor.execute("""
            SELECT 
                COUNT(CASE WHEN state NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED') THEN 1 END),
                COUNT(CASE WHEN priority = 'P1' AND state NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED') THEN 1 END),
                COUNT(CASE WHEN priority = 'P2' AND state NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED') THEN 1 END),
                COUNT(CASE WHEN "slaBreached" = true AND state NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED') THEN 1 END),
                COUNT(CASE WHEN state IN ('RESOLVED', 'CLOSED') THEN 1 END)
            FROM "Incident"
        """)
        stats_row = cursor.fetchone()
        global_stats = {
            'active': stats_row[0],
            'critical': stats_row[1],
            'high': stats_row[2],
            'sla_breached': stats_row[3],
            'resolved': stats_row[4]
        }
        
        # Use double quotes for case-sensitive table and column names in PostgreSQL
        data_query = f'SELECT * FROM "Incident" {where_sql} ORDER BY "createdAt" DESC LIMIT %s OFFSET %s;'
        cursor.execute(data_query, params + [limit, offset])
        colnames = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        
        incidents_list = []
        now = datetime.now()
        
        for row in rows:
            row_dict = dict(zip(colnames, row))
            
            # Resolve assignee and team name
            assignee_id = str(row_dict.get('assignedToId', ''))
            assignee_name = user_map.get(assignee_id, 'Unassigned')
            
            group_id = str(row_dict.get('assignmentGroupId', ''))
            team_name = team_map.get(group_id, 'DevOps Team')
            
            # Format relative time (e.g., "17h ago")
            created_at = row_dict.get('createdAt')
            relative_time = 'Unknown'
            full_time = 'Unknown'
            
            if created_at:
                try:
                    dt_obj = None
                    if isinstance(created_at, str):
                        try:
                            dt_obj = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                        except:
                            try:
                                dt_obj = datetime.strptime(created_at, "%Y-%m-%d %H:%M:%S")
                            except:
                                pass
                    else:
                        dt_obj = created_at
                    
                    if dt_obj and hasattr(dt_obj, 'strftime'):
                        full_time = dt_obj.strftime("%Y-%m-%d %H:%M:%S")
                        dt_naive = dt_obj.replace(tzinfo=None)
                        diff = now - dt_naive
                        
                        if diff.days > 0:
                            relative_time = f"{diff.days}d ago"
                        elif diff.seconds > 3600:
                            relative_time = f"{diff.seconds // 3600}h ago"
                        elif diff.seconds > 60:
                            relative_time = f"{diff.seconds // 60}m ago"
                        else:
                            relative_time = "Just now"
                    else:
                        relative_time = str(created_at)
                except Exception as e:
                    relative_time = str(created_at)

            # Map database columns to frontend expected format
            incident = {
                'id': row_dict.get('number', f"INC{row_dict.get('id', '???')}"),
                'priority': row_dict.get('priority', 'P3'),
                'title': row_dict.get('shortDescription', 'No Title'),
                'state': row_dict.get('state', 'New'),
                'assignee': {
                    'name': assignee_name,
                    'initials': "".join([n[0] for n in assignee_name.split() if n]) if assignee_name != 'Unassigned' else '??',
                    'team': team_name
                },
                'sla': 'Breached' if row_dict.get('slaBreached') else 'Normal',
                'time': relative_time,
                'full_time': full_time,
                'source': row_dict.get('source', 'PostgreSQL')
            }
            incidents_list.append(incident)
            
        cursor.close()
        conn.close()
        
        return JsonResponse({
            'status': 200, 
            'incidents': incidents_list,
            'pagination': {
                'total': total_count,
                'page': page,
                'limit': limit,
                'pages': (total_count + limit - 1) // limit
            },
            'stats': global_stats,
            'filter_options': {
                'states': all_states,
                'assignees': available_assignees
            }
        })
        
    except Exception as e:
        return JsonResponse({'status': 500, 'message': str(e), 'incidents': []})




@login_required(login_url="/")
def incidents(request):
    """
    Display incidents page with list of incidents
    """
    if request.method == 'GET':
        try:
            # Get site parameter if available
            site_name = request.GET.get('site', 'default')
            
            # Get incidents from database
            incidents_queryset = IncidentModel.objects.filter(site_name=site_name).order_by('-created_at')
            
            # Convert to list for template
            incidents_list = []
            for incident in incidents_queryset:
                incident_data = {
                    'id': incident.id,
                    'number': incident.number,
                    'shortDescription': incident.short_description,
                    'description': incident.description or '',
                    'priority': incident.priority,
                    'state': incident.state,
                    'assignedTo': {
                        'firstName': incident.assigned_to_first_name,
                        'lastName': incident.assigned_to_last_name
                    } if incident.assigned_to_first_name and incident.assigned_to_last_name else None,
                    'createdAt': incident.created_at.isoformat(),
                    'slaBreached': incident.sla_breached
                }
                incidents_list.append(incident_data)
            
            context = {
                'site_name': site_name,
                'page_title': 'Incidents',
                'year': datetime.now().year,
                'incidents_data': json.dumps(incidents_list)
            }
            
            return render(request, 'app/incidents.html', context)
            
        except Exception as e:
            # Log error if needed
            return render(request, 'app/incidents.html', {
                'site_name': 'default',
                'page_title': 'Incidents',
                'year': datetime.now().year,
                'error': str(e)
            })
    
    # Handle POST request for creating new incidents
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            site_name = request.GET.get('site', 'default')
            
            # Generate incident number
            last_incident = IncidentModel.objects.filter(site_name=site_name).order_by('-id').first()
            if last_incident:
                last_number = int(last_incident.number.replace('INC', ''))
                new_number = f"INC{last_number + 1:03d}"
            else:
                new_number = "INC001"
            
            # Create new incident
            incident = IncidentModel.objects.create(
                number=new_number,
                short_description=data.get('shortDescription', ''),
                description=data.get('description', ''),
                priority=data.get('priority', 'P3'),
                state=data.get('state', 'NEW'),
                site_name=site_name
            )
            
            return JsonResponse({
                'status': 200,
                'message': 'Incident created successfully',
                'incident': {
                    'id': incident.id,
                    'number': incident.number,
                    'shortDescription': incident.short_description,
                    'description': incident.description,
                    'priority': incident.priority,
                    'state': incident.state,
                    'createdAt': incident.created_at.isoformat()
                }
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 500,
                'message': f'Error creating incident: {str(e)}'
            })
    
    response = {'status': 405, 'msg': 'Method not allowed'}
    return HttpResponse(json.dumps(response), content_type="application/json")

def create_incident(request):
    """
    Display create incident form
    """
    if request.method == 'GET':
        site_name = request.GET.get('site', 'default')
        context = {
            'site_name': site_name,
            'page_title': 'Create Incident',
            'year': datetime.now().year,
        }
        return render(request, 'app/create_incident.html', context)
    
    response = {'status': 405, 'msg': 'Method not allowed'}
    return HttpResponse(json.dumps(response), content_type="application/json")

def incident_detail(request, incident_id):
    """
    Display incident details with enriched context for premium UI
    """
    if request.method == 'GET':
        try:
            conn = get_linkedeye_connection()
            if not conn:
                raise Exception("Database connection failed")
            
            cur = conn.cursor()
            
            # Fetch the main incident record
            query = 'SELECT id, number, "shortDescription", description, priority, state, "createdAt", "updatedAt", "slaBreached", impact, urgency, category, "assignedToId", "assignmentGroupId", "organizationId", "resolvedAt" FROM "Incident" WHERE '
            if str(incident_id).startswith('INC'):
                cur.execute(query + 'number = %s', (incident_id,))
            else:
                cur.execute(query + 'id = %s', (incident_id,))
                
            row = cur.fetchone()
            if not row:
                raise IncidentModel.DoesNotExist()
                
            class IncidentObj:
                def __init__(self, r):
                    self.id = r[0]
                    self.number = r[1]
                    self.short_description = r[2]
                    self.description = r[3]
                    self.priority = r[4]
                    self.state = r[5]
                    self.created_at = r[6]
                    self.updated_at = r[7]
                    self.sla_breached = r[8]
                    self.impact = r[9]
                    self.urgency = r[10]
                    self.category = r[11]
                    self.assigned_to_id = r[12]
                    self.assignment_group_id = r[13]
                    self.organization_id = r[14]
                    self.resolved_at = r[15]
                
                def get_state_display(self):
                    state_map = {'NEW': 'New', 'IN_PROGRESS': 'In Progress', 'ON_HOLD': 'On Hold', 'ESCALATED': 'Escalated', 'RESOLVED': 'Resolved', 'CLOSED': 'Closed', 'CANCELLED': 'Cancelled'}
                    return state_map.get(self.state, self.state)
                    
            incident = IncidentObj(row)

            # Calculate elapsed time and response SLA status for the view logic
            now_dt = datetime.now(incident.created_at.tzinfo) if incident.created_at else datetime.now()
            elapsed_ms = int((now_dt - incident.created_at).total_seconds() * 1000) if incident.created_at else 0
            
            # SLA targets in minutes per priority
            SLA_RESPONSE = {'P1': 5, 'P2': 15, 'P3': 60, 'P4': 240}
            SLA_RESOLUTION = {'P1': 60, 'P2': 240, 'P3': 1440, 'P4': 4320}

            priority = incident.priority or 'P3'
            sla_response_target = SLA_RESPONSE.get(priority, 60)
            sla_resolution_target = SLA_RESOLUTION.get(priority, 1440)
            
            # --- React UI Constants mapping ---
            PAGE_BG_MAP = {
              'P1': 'linear-gradient(180deg, #110305 0%, #0A0202 40%, #080808 100%)',
              'P2': 'linear-gradient(180deg, #120900 0%, #0C0600 40%, #080808 100%)',
              'P3': 'linear-gradient(180deg, #04040F 0%, #060612 40%, #060606 100%)',
              'P4': 'linear-gradient(180deg, #020C05 0%, #020A04 40%, #060606 100%)',
            }
            PRIORITY_HERO_MAP = {
              'P1': { 'bg': 'linear-gradient(135deg, #1F0606 0%, #3D0A0A 25%, #2A0808 50%, #1A0404 75%, #0F0202 100%)', 'glow1': 'rgba(220,38,38,0.35)', 'glow2': 'rgba(239,68,68,0.20)', 'glow3': 'rgba(185,28,28,0.25)' },
              'P2': { 'bg': 'linear-gradient(135deg, #1F1100 0%, #3D2200 25%, #2A1600 50%, #1A0E00 75%, #0E0700 100%)', 'glow1': 'rgba(245,158,11,0.35)', 'glow2': 'rgba(251,191,36,0.22)', 'glow3': 'rgba(180,83,9,0.25)' },
              'P3': { 'bg': 'linear-gradient(135deg, #07071E 0%, #0E0E3D 25%, #0A0A2A 50%, #07071A 75%, #04040F 100%)', 'glow1': 'rgba(79,70,229,0.40)', 'glow2': 'rgba(99,102,241,0.25)', 'glow3': 'rgba(55,48,163,0.30)' },
              'P4': { 'bg': 'linear-gradient(135deg, #03130A 0%, #062614 25%, #041A0C 50%, #031008 75%, #020908 100%)', 'glow1': 'rgba(5,150,105,0.35)', 'glow2': 'rgba(16,185,129,0.22)', 'glow3': 'rgba(4,120,87,0.28)' },
            }
            PRIORITY_ACCENT_MAP = {
              'P1': { 'line': 'from-red-500 via-rose-500 to-red-600', 'glow': 'shadow-red-500/20', 'badge': 'bg-red-500/15 text-red-300 ring-red-400/30' },
              'P2': { 'line': 'from-amber-500 via-orange-400 to-amber-500', 'glow': 'shadow-amber-500/20', 'badge': 'bg-amber-500/15 text-amber-300 ring-amber-400/30' },
              'P3': { 'line': 'from-indigo-500 via-blue-400 to-indigo-500', 'glow': 'shadow-indigo-500/20', 'badge': 'bg-indigo-500/15 text-indigo-300 ring-indigo-400/30' },
              'P4': { 'line': 'from-emerald-500 via-teal-400 to-emerald-500', 'glow': 'shadow-emerald-500/20', 'badge': 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30' },
            }
            PRIORITY_META_MAP = {
              'P1': { 'label': 'Critical', 'bg': 'bg-red-100 text-red-700' },
              'P2': { 'label': 'High',     'bg': 'bg-amber-100 text-amber-700' },
              'P3': { 'label': 'Medium',   'bg': 'bg-indigo-100 text-indigo-700' },
              'P4': { 'label': 'Low',      'bg': 'bg-emerald-100 text-emerald-700' },
            }
            STATE_META_MAP = {
              'NEW':         { 'label': 'New',         'color': '#7C3AED', 'icon': 'circle-dot' },
              'IN_PROGRESS': { 'label': 'In Progress', 'color': '#F59E0B', 'icon': 'radio' },
              'ON_HOLD':     { 'label': 'On Hold',     'color': '#D97706', 'icon': 'clock' },
              'ESCALATED':   { 'label': 'Escalated',   'color': '#DC2626', 'icon': 'arrow-up-right' },
              'RESOLVED':    { 'label': 'Resolved',    'color': '#059669', 'icon': 'check-circle-2' },
              'CLOSED':      { 'label': 'Closed',      'color': '#A8A29E', 'icon': 'x-circle' },
              'CANCELLED':   { 'label': 'Cancelled',   'color': '#A8A29E', 'icon': 'x-circle' },
            }
            SOURCE_META_MAP = {
              'PROMETHEUS': { 'icon': 'flame',          'color': 'text-orange-600', 'bg': 'bg-orange-50', 'label': 'Prometheus' },
              'GRAFANA':    { 'icon': 'bar-chart-3',    'color': 'text-blue-600',   'bg': 'bg-blue-50',   'label': 'Grafana' },
              'SLACK':      { 'icon': 'hash',           'color': 'text-purple-600', 'bg': 'bg-purple-50', 'label': 'Slack' },
              'EMAIL':      { 'icon': 'mail',           'color': 'text-rose-600',   'bg': 'bg-rose-50',   'label': 'Email' },
              'VOICE':      { 'icon': 'mic',            'color': 'text-teal-600',   'bg': 'bg-teal-50',   'label': 'Voice' },
              'API':        { 'icon': 'globe',          'color': 'text-cyan-600',   'bg': 'bg-cyan-50',   'label': 'API' },
              'MANUAL':     { 'icon': 'users',          'color': 'text-stone-500',  'bg': 'bg-stone-50',  'label': 'Manual' },
            }
            # --- End UI config ---

            # Prepare specific context maps for the template
            page_bg = PAGE_BG_MAP.get(priority, PAGE_BG_MAP['P3'])
            priority_hero = PRIORITY_HERO_MAP.get(priority, PRIORITY_HERO_MAP['P3'])
            priority_accent = PRIORITY_ACCENT_MAP.get(priority, PRIORITY_ACCENT_MAP['P3'])
            priority_meta = PRIORITY_META_MAP.get(priority, PRIORITY_META_MAP['P3'])
            state_meta = STATE_META_MAP.get(incident.state, STATE_META_MAP['NEW'])
            # Assuming incident object has no source property natively mapped, default manual
            source_meta = SOURCE_META_MAP['PROMETHEUS'] # Hardcoding Prometheus as requested in screenshots, or check category
            
            # Fetch enriched fields from postgres
            assignee_name = ''
            assignee_email = ''
            group_name = ''
            org_name = ''
            org_env = ''
            similar_incidents = []

            # --- Parse Description ---
            desc = incident.description or ''
            parsed_desc = {
                'is_alert': False,
                'is_enriched': False,
                'alert_name': '',
                'alert_severity': '',
                'alert_client': '',
                'alert_hostname': '',
                'alert_ip_instance': '',
                'sections': [],
                'extra_lines': [],
                'body_text': desc
            }

            if desc.startswith('## Disruption Details'):
                parsed_desc['is_enriched'] = True
                import re
                sections = []
                current_sec = {'title': '', 'lines': []}
                for line in desc.split('\n'):
                    m = re.match(r'^##\s+(.+)', line)
                    if m:
                        if current_sec['title']: sections.append(current_sec)
                        current_sec = {'title': m.group(1).strip(), 'lines': []}
                    elif line.strip():
                        current_sec['lines'].append(line.strip())
                if current_sec['title']: sections.append(current_sec)

                all_pairs = {}
                for s in sections:
                    for l in s['lines']:
                        kv = re.match(r'^([A-Za-z\s_/]+):\s*(.+)$', l)
                        if kv: all_pairs[kv.group(1).strip()] = kv.group(2).strip()

                parsed_desc['alert_name'] = all_pairs.get('Alert', 'Unknown Alert')
                parsed_desc['alert_severity'] = all_pairs.get('Severity', '')
                parsed_desc['alert_hostname'] = all_pairs.get('Hostname', all_pairs.get('Host', ''))
                parsed_desc['alert_ip_instance'] = all_pairs.get('Instance', '')
                parsed_desc['alert_summary'] = all_pairs.get('Summary', '')
                
                # Format sections for template
                formatted_sections = []
                for s in sections:
                    if s['title'] in ['Disruption Details', 'Alert Metadata']: continue
                    flines = []
                    for l in s['lines']:
                        kv = re.match(r'^-?\s*([A-Za-z\s_/]+):\s*(.+)$', l)
                        if kv: flines.append({'type': 'kv', 'key': kv.group(1).strip(), 'value': kv.group(2).strip()})
                        else: flines.append({'type': 'text', 'text': re.sub(r'^-\s*', '', l)})
                    formatted_sections.append({'title': s['title'], 'lines': flines})
                
                parsed_desc['sections'] = formatted_sections
                
                # Alert Metadata
                meta_sec = next((s for s in sections if s['title'] == 'Alert Metadata'), None)
                if meta_sec:
                    noise = {'le_code', 'isEvent', 'product_model', 'fortigatealert', 'mode', 'alertname', 'severity', 'instance', 'job', 'nodename'}
                    filtered = []
                    for l in meta_sec['lines']:
                        kv = re.match(r'^([A-Za-z_]+):\s*(.+)$', l)
                        if kv and kv.group(1) not in noise and len(kv.group(2)) > 1:
                            filtered.append({'key': kv.group(1).replace('_', ' '), 'value': kv.group(2)})
                    parsed_desc['alert_metadata'] = filtered

            elif desc.startswith('Auto-created from alert:') or desc.startswith('ALERT:'):
                parsed_desc['is_alert'] = True
                import re
                lines = [l.strip() for l in desc.split('\n') if l.strip()]
                if lines:
                    parsed_desc['alert_name'] = re.sub(r'^(Auto-created from alert:|ALERT:)\s*', '', lines[0], flags=re.IGNORECASE).strip() or 'Unknown'
                
                pairs = {}
                sections = []
                current_sec_title = ''
                current_sec_lines = []
                extra_lines = []
                
                for line in lines[1:]:
                    sec_match = re.match(r'^──\s*(.+?)\s*──+$', line)
                    if sec_match:
                        if current_sec_title: sections.append({'title': current_sec_title, 'lines': current_sec_lines})
                        current_sec_title = sec_match.group(1).strip()
                        current_sec_lines = []
                        continue
                        
                    num_match = re.match(r'^(\d+)\.\s+(.+)$', line)
                    bullet_match = re.match(r'^-\s+(.+)$', line)
                    kv_match = re.match(r'^([A-Za-z\s_/\(\)]+):\s*(.+)$', line)
                    
                    if num_match:
                        entry = {'type': 'numbered', 'num': num_match.group(1), 'text': num_match.group(2)}
                        if current_sec_title: current_sec_lines.append(entry)
                        else: extra_lines.append(line)
                    elif bullet_match:
                        entry = {'type': 'bullet', 'text': bullet_match.group(1)}
                        if current_sec_title: current_sec_lines.append(entry)
                        else: extra_lines.append(line)
                    elif kv_match:
                        k = kv_match.group(1).strip()
                        v = kv_match.group(2).strip()
                        pairs[k] = v
                        if current_sec_title: current_sec_lines.append({'type': 'kv', 'key': k, 'value': v})
                        else: extra_lines.append(line)
                    else:
                        if current_sec_title: current_sec_lines.append({'type': 'text', 'text': line})
                        else: extra_lines.append(line)
                
                if current_sec_title: sections.append({'title': current_sec_title, 'lines': current_sec_lines})
                
                parsed_desc['alert_severity'] = pairs.get('Severity', '')
                parsed_desc['alert_client'] = pairs.get('Client', '')
                parsed_desc['alert_ip_instance'] = pairs.get('IP Address', pairs.get('Instance', ''))
                parsed_desc['alert_hostname'] = pairs.get('Hostname', '')
                parsed_desc['category'] = pairs.get('Category', '')
                
                parsed_desc['sections'] = sections
                parsed_desc['extra_lines'] = extra_lines
            else:
                import re
                host_match = re.search(r'^Host:\s*(.+)$', desc, re.MULTILINE)
                if host_match:
                    parsed_desc['alert_hostname'] = host_match.group(1).strip()
                    parsed_desc['body_text'] = re.sub(r'^Host:\s*.+\n?', '', desc, flags=re.MULTILINE).strip()

            # Prepare timeline logic
            timeline = []
            try:
                conn = get_linkedeye_connection()
                if conn:
                    cur = conn.cursor()

                    # Assignee
                    if incident.assigned_to_id:
                        cur.execute(
                            'SELECT "firstName", "lastName", email FROM "User" WHERE id = %s',
                            (str(incident.assigned_to_id),)
                        )
                        row = cur.fetchone()
                        if row:
                            assignee_name = f'{row[0] or ""} {row[1] or ""}'.strip()
                            assignee_email = row[2] or ''

                    # Assignment group
                    if incident.assignment_group_id:
                        cur.execute(
                            'SELECT name FROM "Team" WHERE id = %s',
                            (str(incident.assignment_group_id),)
                        )
                        row = cur.fetchone()
                        if row:
                            group_name = row[0] or ''

                    # Organization
                    if incident.organization_id:
                        cur.execute(
                            'SELECT name, environment FROM "Organization" WHERE id = %s',
                            (str(incident.organization_id),)
                        )
                        row = cur.fetchone()
                        if row:
                            org_name = row[0] or ''
                            org_env = row[1] or ''

                    # Similar recent resolved incidents (last 30 days, same priority)
                    cur.execute(
                        '''
                        SELECT number, "shortDescription", priority, state, "resolvedAt"
                        FROM "Incident"
                        WHERE state IN ('RESOLVED', 'CLOSED')
                          AND priority = %s
                          AND id != %s
                          AND "resolvedAt" > NOW() - INTERVAL '30 days'
                        ORDER BY "resolvedAt" DESC
                        LIMIT 5
                        ''',
                        (priority, str(incident.id))
                    )
                    for r in cur.fetchall():
                        resolved_ago = ''
                        if r[4]:
                            diff_days = (datetime.now(r[4].tzinfo) - r[4]).days
                            resolved_ago = f'{diff_days}d ago' if diff_days > 0 else 'today'
                        similar_incidents.append({
                            'number': r[0],
                            'short_description': r[1],
                            'priority': r[2],
                            'state': r[3],
                            'resolved_ago': resolved_ago,
                        })

                    cur.close()
                    conn.close()
            except Exception as e:
                print(f"Error fetching enriched incident data: {e}")

            context = {
                'incident': incident,
                'page_title': f'Incident {incident.number}',
                'year': datetime.now().year,
                'sla_response_target': sla_response_target,
                'sla_resolution_target': sla_resolution_target,
                
                # --- New UI Context Props ---
                'page_bg': page_bg,
                'priority_hero': priority_hero,
                'priority_accent': priority_accent,
                'priority_meta': priority_meta,
                'state_meta': state_meta,
                'source_meta': source_meta,
                'elapsed_ms': elapsed_ms,
                # --- End New Props ---
                
                'parsed_desc': parsed_desc,
                'similar_incidents': similar_incidents,
                'timeline': timeline,
                'work_notes': [],
                
                'assignee_name': assignee_name,
                'assignee_initials': ''.join([w[0].upper() for w in assignee_name.split()[:2]]) if assignee_name else '',
                'assignee_email': assignee_email,
                'group_name': group_name,
                'org_name': org_name,
                'org_env': org_env,
                'similar_incidents': similar_incidents,
                'priority': priority,
            }
            return render(request, 'app/incident_detail.html', context)
        except IncidentModel.DoesNotExist:
            return render(request, 'app/incident_not_found.html', {
                'page_title': 'Incident Not Found',
                'year': datetime.now().year,
            })

    response = {'status': 405, 'msg': 'Method not allowed'}
    return HttpResponse(json.dumps(response), content_type="application/json")
