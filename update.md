# Update Log — Incidents Per-Site Dynamic Implementation

**Date:** 2026-03-31
**Branch:** Le-adp-new-code
**Feature:** Dynamic per-site incident management with Prometheus sync

---

## Summary

Implemented fully dynamic per-site incident system. Each site now connects to its own PostgreSQL database for incidents. Prometheus alerts are synced automatically and converted to incidents. Adding a new site with DB config instantly enables incident tracking — no code changes needed.

---

## Files Changed

### 1. `LinkedEyeWebProject/lesites/models.py`
**What:** Added 3 new fields to `SiteModel`

```python
incident_db_host = models.TextField(default='')
incident_db_port = models.CharField(max_length=5, default='5432')
incident_db_name = models.TextField(default='')
```

**Why:** Each site needs its own PostgreSQL connection for incidents. Follows the same pattern as `redis_host`/`redis_port`, `elastic_host`/`elastic_port`.

---

### 2. `LinkedEyeWebProject/LinkedEyeWebProject/settings.py`
**What:** Added missing `POSTGRES_DB_NAME` env var

```python
POSTGRES_DB_NAME = os.getenv('POSTGRES_DB_NAME', 'linkedeye')
```

**Why:** `get_linkedeye_connection()` was referencing `settings.POSTGRES_DB_NAME` but it was never defined. This caused a runtime error.

---

### 3. `LinkedEyeWebProject/lesites/views.py`
**What:** Updated `siteactions` and `getallsitenames` to handle new fields

- **Add site** — now saves `incident_db_host`, `incident_db_port`, `incident_db_name` from form data
- **Update site** — now updates these 3 fields
- **Get all sites** — now returns these 3 fields in the JSON response

**Fields mapped:**
| Frontend key | Backend field |
|---|---|
| `incidentdbhost` | `incident_db_host` |
| `incidentdbport` | `incident_db_port` |
| `incidentdbname` | `incident_db_name` |

---

### 4. `LinkedEyeWebProject/app/templates/app/admin.html`
**What:** Added 3 new form fields in the site add/edit dialog

- **Incident DB Host** — text input (`id="incidentdbhost"`)
- **Incident DB Port** — number input (`id="incidentdbport"`, default 5432)
- **Incident DB Name** — text input (`id="incidentdbname"`)

**Location:** After the existing Incident URL and Incident API fields (around line 1388).

---

### 5. `LinkedEyeWebProject/app/static/app/js_src/sitetemplate.js`
**What:** Updated 3 functions to handle new fields

- **`onAddSite()`** — collects `incidentdbhost`, `incidentdbport`, `incidentdbname` values and adds to POST data
- **`onUpdateSite()`** — populates form fields from `obj.incident_db_host`, `obj.incident_db_port`, `obj.incident_db_name`
- **`saveSiteUpdate()`** — collects updated values and sends to backend

---

### 6. `LinkedEyeWebProject/incidents/views.py` (Full Rewrite)
**What:** Rewrote all views for dynamic per-site PostgreSQL connections

#### New function: `get_site_incident_connection(site_name)`
- Looks up site in `lesite` table by `sitename`
- Reads `incident_db_host`, `incident_db_port`, `incident_db_name`
- Uses shared `POSTGRES_USER`/`POSTGRES_PASS` from env vars
- Returns `psycopg2` connection or `None`

#### Updated: `get_incidents_api(request)`
- Now accepts `site` query parameter
- Calls `get_site_incident_connection(site_name)` for dynamic connection
- Falls back to `get_linkedeye_connection()` if no site specified
- All queries (stats, filters, data) now run against the site-specific DB
- Returns proper empty response with stats=0 if connection fails

#### Updated: `incidents(request)` — POST handler
- Creates incidents in the site's PostgreSQL via raw SQL
- Falls back to Django ORM `IncidentModel` if site DB not configured
- Generates incident number from MAX(id) in the site's DB

#### Updated: `incident_detail(request, incident_id)`
- Connects to the site's PostgreSQL based on `site` query param
- Falls back to default connection
- All enriched queries (User, Team, Organization, similar incidents) run on the same site DB

#### New helper: `_format_relative_time(created_at)`
- Extracted time formatting into reusable function
- Returns `(relative_time, full_time)` tuple

---

### 7. `LinkedEyeWebProject/app/static/app/js_src/incidents.js`
**What:** Added `site` parameter to API call

```javascript
// In loadIncidents() AJAX data:
site: siteName,  // NEW — passes selected site to backend
```

**Why:** Backend now uses this to connect to the correct PostgreSQL.

---

### 8. `LinkedEyeWebProject/app/templates/app/incidents.html`
**What:** Removed Board and Timeline views (separate change, same session)

- Removed view toggle buttons (Table/Board/Timeline)
- Removed Board view HTML (5 Kanban columns)
- Removed Timeline view HTML
- Removed `timeline.css` import
- Only Table view remains with "+ New Incident" button

---

### 9. `LinkedEyeWebProject/app/static/app/js_src/incidents.js` (Board/Timeline removal)
**What:** Removed Board and Timeline JavaScript

- Removed `currentView` variable
- Removed `switchView()` function
- Removed `renderCurrentView()` function
- Removed `displayBoardView()` function
- Removed `displayTimelineView()` function
- Removed duplicate function definitions (viewIncidentDetails, createNewIncident, editIncident were defined twice)
- `loadIncidents()` now calls `displayIncidentsTable()` directly

---

## New Files Created

### 10. `LinkedEyeWebProject/incidents/management/__init__.py`
Empty init file for management module.

### 11. `LinkedEyeWebProject/incidents/management/commands/__init__.py`
Empty init file for commands module.

### 12. `LinkedEyeWebProject/incidents/management/commands/sync_prometheus_incidents.py`
**What:** Management command to sync Prometheus alerts into site-specific PostgreSQL databases

**Usage:**
```bash
# Sync all sites once
python manage.py sync_prometheus_incidents

# Run continuously every 60 seconds
python manage.py sync_prometheus_incidents --loop 60

# Sync only one site
python manage.py sync_prometheus_incidents --site fs-le-isv
```

**How it works:**
1. Reads all enabled sites from `lesite` table
2. Skips sites without `prometheus_url` or `incident_db_host`/`incident_db_name`
3. For each site:
   - Fetches `GET {prometheus_url}/api/v1/alerts`
   - For each firing alert:
     - Generates unique `alertFingerprint` from alert data
     - Maps severity to priority: `critical/error → P1`, `warning/high → P2`, `medium → P3`, `info/low → P4`
     - Checks if incident exists for this fingerprint
     - If new → INSERT into Incident table
     - If re-fired (was resolved) → UPDATE state back to NEW
   - For alerts no longer firing → UPDATE state to RESOLVED
4. Uses `alertFingerprint` column in Incident table for tracking

**Alert → Incident field mapping:**
| Prometheus | Incident |
|---|---|
| `labels.alertname` | `shortDescription` |
| `labels.severity` | `priority` (mapped) |
| `state` (firing/resolved) | `state` (NEW/RESOLVED) |
| `labels.instance` | In description |
| `labels.nodename` | In description |
| `annotations.summary` | `shortDescription` |
| `annotations.description` | `description` body |
| `activeAt` | `createdAt` |
| `fingerprint` | `alertFingerprint` |

**Description format generated:**
```
Auto-created from alert: CPUWarning

Summary: CPU usage above 90% on server
Description: CPU has been above threshold for 5 minutes

Severity: warning
Instance: 10.41.1.32:9100
Job: node-exporter
Hostname: prod-server-01

── Alert Metadata ──
le_site: fs-le-isv
environment: production
```

---

### 13. `LinkedEyeWebProject/lesites/migrations/__init__.py`
Empty init file for migrations module.

### 14. `LinkedEyeWebProject/lesites/migrations/0001_add_incident_db_fields.py`
**What:** Django migration to add 3 new fields to `lesite` table

```sql
ALTER TABLE lesite ADD COLUMN incident_db_host TEXT DEFAULT '';
ALTER TABLE lesite ADD COLUMN incident_db_port VARCHAR(5) DEFAULT '5432';
ALTER TABLE lesite ADD COLUMN incident_db_name TEXT DEFAULT '';
```

---

## Database Requirements

### MySQL (lesite table)
Run migration: `python manage.py migrate lesites`

This adds 3 columns to the `lesite` table.

### PostgreSQL (per-site Incident table)
Each site's PostgreSQL needs an `alertFingerprint` column for the Prometheus sync to work:

```sql
ALTER TABLE "Incident" ADD COLUMN IF NOT EXISTS "alertFingerprint" VARCHAR(255);
ALTER TABLE "Incident" ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'MANUAL';
CREATE INDEX IF NOT EXISTS idx_incident_fingerprint ON "Incident" ("alertFingerprint");
```

---

## Environment Variables

No new env vars required. Existing ones used:

| Var | Purpose | Default |
|---|---|---|
| `POSTGRES_USER` | Shared DB username for all site PostgreSQL connections | *(required)* |
| `POSTGRES_PASS` | Shared DB password for all site PostgreSQL connections | *(required)* |
| `POSTGRES_DB_NAME` | Default fallback database name | `linkedeye` |
| `POSTGRES_HOST` | Default fallback host | `postgres` |
| `POSTGRES_PORT` | Default fallback port | `30468` |

---

## Deployment Steps

1. **Pull latest code** on the server
2. **Run migration:**
   ```bash
   python manage.py migrate lesites
   ```
3. **Add `alertFingerprint` and `source` columns** to each site's PostgreSQL Incident table (SQL above)
4. **Configure each site** via admin page:
   - Fill in **Incident DB Host** (e.g., `10.41.1.32`)
   - Fill in **Incident DB Port** (e.g., `5432`)
   - Fill in **Incident DB Name** (e.g., `linkedeye`)
5. **Start Prometheus sync** as background process:
   ```bash
   python manage.py sync_prometheus_incidents --loop 60 &
   ```
   Or add to Docker entrypoint / systemd service.
6. **Collect static files:**
   ```bash
   python manage.py collectstatic --noinput
   ```

---

## How It Works End-to-End

```
1. Admin adds site with:
   - prometheus_url: http://10.41.1.32:9090
   - incident_db_host: 10.41.1.32
   - incident_db_port: 5432
   - incident_db_name: linkedeye

2. sync_prometheus_incidents runs every 60s:
   - Reads all enabled sites from lesite
   - For fs-le-isv: fetches http://10.41.1.32:9090/api/v1/alerts
   - Converts alerts → incidents
   - Writes to PostgreSQL at 10.41.1.32:5432/linkedeye

3. User selects "fs-le-isv" in site dropdown:
   - incidents.js calls /incidents/api/incidents?site=fs-le-isv
   - Backend looks up fs-le-isv in lesite table
   - Connects to 10.41.1.32:5432/linkedeye
   - Returns incidents, stats, filters from THAT database
   - Frontend renders table with site-specific data

4. New site added tomorrow:
   - Fill in prometheus_url + incident DB fields
   - sync_prometheus_incidents picks it up on next loop
   - Works immediately — no code changes needed
```

---

# Update Log — Latency & MessageQueue Per-Site Fix

**Date:** 2026-03-31
**Branch:** linkedeye_incident
**Feature:** Per-site data isolation for Latency-PROD and MessageQueue-PROD tabs

---

## Problem

Latency and MessageQueue tabs were showing `fs-le-dev-finspot` data for ALL sites. The API calls were querying the local analytics DB without site filtering, and the ETL was inserting data without the `site` column.

## Root Cause

1. **JS (`le-adp-messagequeue.js`)** — Used `mqFetchLocal()` for stats/data/latency calls, which hits the local Django. Should use `mqFetch()` which prepends the remote site's `le_url`
2. **Views (`messagequeue_views.py`)** — No `WHERE site = %s` in any SQL query
3. **ETL (`latency.py`)** — INSERT statements didn't include the `site` column

## Architecture

Each site runs its own LinkedEye instance at its `le_url` (e.g., `https://fs-le-isv.finspot.in/`). The central LinkedEye fetches data from the remote site's Django via `le_url`, same pattern as allonboard device pages.

```
User selects site → JS gets le_url → API calls go to remote site → remote Django queries its own analytics DB → returns site-specific data
```

## Files Changed

### 1. `LinkedEyeWebProject/app/static/app/js_src/le-adp-messagequeue.js`
- Changed `mqFetchLocal()` → `mqFetch()` for `messagequeue-stats`, `messagequeue-data`, `messagequeue-latency`, `messagequeue-dates` calls
- These now route through the remote site's `le_url` instead of local Django
- `fetchOrderLatency`, `fetchQueueLine1`, `fetchQueueLine2` remain `mqFetchLocal` (central DB)

### 2. `LinkedEyeWebProject/bodeodstatus/messagequeue_views.py`
- Added `site = request.GET.get('site', '')` to all views
- Added `_site_filter()` helper that returns `AND site = %s` SQL fragment
- All queries on `queue_line1`, `queue_line2`, `order_latency` now include `WHERE site = %s` when site param is provided
- ORM views (`get_order_latency`, `get_queue_line1`, `get_queue_line2`) now filter by `site` param

### 3. `LinkedEyeWebProject/bodeodstatus/latency.py`
- Queue INSERT now includes `site` column: `INSERT INTO queue_line1 (..., site) VALUES (..., %s)`
- Order latency INSERT now includes `site` column
- `SITE_NAME` from `MQ_SITE` env var is written into every row
- DataFrame processing adds `site` column before INSERT

## Deployment Steps

1. **Set `MQ_SITE` env var** on each site's server to its site name (e.g., `MQ_SITE=fs-le-isv`)
2. **Backfill existing data** — existing rows have `site = NULL`:
   ```sql
   UPDATE order_latency SET site = 'fs-le-dev-finspot' WHERE site IS NULL;
   UPDATE queue_line1 SET site = 'fs-le-dev-finspot' WHERE site IS NULL;
   UPDATE queue_line2 SET site = 'fs-le-dev-finspot' WHERE site IS NULL;
   ```
3. **Collect static files:** `python manage.py collectstatic --noinput`
4. **Restart Django** on each site to pick up view changes
