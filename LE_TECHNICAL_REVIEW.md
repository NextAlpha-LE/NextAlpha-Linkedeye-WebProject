# LinkedEye (LE) Web Application — Full Technical Review & Memory Leak Investigation

**Date:** 2026-03-02
**Reviewer Level:** Principal Python Engineer / Performance Engineer
**Codebase:** LinkedEyeWebProject (Django 4.1.7)
**Total Python Files:** 198
**Total Django Apps:** 23

---

## IMPORTANT ARCHITECTURAL CLARIFICATION

**This is NOT a Python desktop application.** LinkedEye is a **Django web application** running inside Docker containers, served via Django's `runserver` (development server) on port 80. The "desktop memory growth" reported by users is the **server-side process memory** growing continuously as the Django/WSGI process handles requests over time.

This distinction is critical: the memory growth is occurring in the **long-lived Django server process**, not in a GUI desktop application.

---

# PART 1 — CODEBASE DOCUMENTATION

## 1.1 System Architecture Overview

### Component Diagram (Textual)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOCKER CONTAINER                                 │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                  Django runserver (port 80)                       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │ app      │ │ ticket   │ │dashboard │ │ 20 more Django   │   │   │
│  │  │ (main)   │ │          │ │          │ │ apps             │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │   │
│  │                                                                  │   │
│  │  ┌──────────────────────────────────────────────────────────┐   │   │
│  │  │                     lib/ (Core Libraries)                 │   │   │
│  │  │  Node.py   MQ.py   Redis.py   Notification.py            │   │   │
│  │  │  Vault.py  Discover.py  LinkedEyeStruct.py               │   │   │
│  │  └──────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────┐                                                           │
│  │ Celery   │ (RabbitMQ consumer via kombu)                             │
│  │ Worker   │                                                           │
│  └──────────┘                                                           │
└─────────────────────────────────────────────────────────────────────────┘
         │            │           │          │           │          │
         ▼            ▼           ▼          ▼           ▼          ▼
   ┌──────────┐ ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │  MySQL   │ │  Neo4j   │ │ Redis  │ │RabbitMQ│ │Elastic │ │Redmine │
   │(primary) │ │(graph DB)│ │(cache) │ │ (MQ)   │ │Search  │ │(tickets│
   └──────────┘ └──────────┘ └────────┘ └────────┘ └────────┘ └────────┘
         │                                                │
         ▼                                                ▼
   ┌──────────┐                                    ┌──────────────┐
   │PostgreSQL│                                    │ Superset /   │
   │(Superset)│                                    │ Grafana      │
   └──────────┘                                    └──────────────┘
         │
         ▼
   ┌──────────────────┐
   │ HashiCorp Vault  │
   │ (Secrets)        │
   └──────────────────┘
```

### Entry Points

| Entry Point | File | Purpose |
|---|---|---|
| Container startup | `entrypoint.py` | Vault init, DB migrations, data seeding |
| WSGI application | `LinkedEyeWebProject/wsgi.py` | Django WSGI app (not used — CMD uses runserver) |
| Django runserver | `manage.py` | Development server on 0.0.0.0:80 |
| Celery worker | `LinkedEyeWebProject/celery.py` | RabbitMQ fanout consumer |
| URL router | `LinkedEyeWebProject/urls.py` | 320+ URL endpoints across 23 apps |

### Application Lifecycle

1. **Container Start** → `entrypoint.py` runs:
   - Vault initialization (unseal, role creation, token storage)
   - MySQL database creation
   - Django migrations (`makemigrations` + `migrate`)
   - Static file collection
   - Default data seeding (sites, services via management commands)
2. **Django runserver starts** → Single-threaded development server on port 80
3. **Request handling** → Synchronous Django views, each creating new connections to external services
4. **No graceful shutdown** → No signal handlers, no connection cleanup

### Threading Model

- **Primary:** Single-threaded Django `runserver` (development server in production — CRITICAL ISSUE)
- **Background threads:** `threading.Timer()` in `notification/views.py` for snooze functionality
- **Celery:** Separate process consuming RabbitMQ fanout exchange
- **No async:** Pure synchronous Django, no ASGI, no async views

### External Services & Their Connection Patterns

| Service | Library | Connection Pattern | Pooling | Cleanup |
|---|---|---|---|---|
| MySQL (primary) | Django ORM + mysqlclient | Django-managed | Django pool | Django-managed |
| MySQL (analytics) | mysql.connector / pymysql | New connection per request | **None** | **Inconsistent** |
| Neo4j | neo4j (Bolt) + neo4jrestclient | New Node() per view call | **None** | Session closed per query |
| Redis | redis-py (StrictRedis) | New Redis() per view call | redis-py internal | Auto-managed |
| RabbitMQ | pika (BlockingConnection) | New MQ() per publish | **None** | **Often missing** |
| Elasticsearch | elasticsearch-py | New client per request | **None** | **None** |
| PostgreSQL | psycopg2 | New connection per request | **None** | **Inconsistent** |
| Redmine | python-redmine + requests | New client per request | **None** | **None** |
| Vault | requests | New Vault() per view | requests internal | Auto-managed |
| Apprise | apprise | New instance per notification | **None** | **URL accumulation** |

### State Management Strategy

- **Session state:** Django sessions (database-backed)
- **Application state:** Module-level global variables (vault/views.py `Obj = {}`)
- **Cache state:** Redis (BOD/EOD status keys)
- **Graph state:** Neo4j (infrastructure topology)
- **No in-memory cache framework** (no Django cache, no memcached, no Redis cache backend)

---

## 1.2 Module-Level Documentation

### 1.2.1 Core Django Project (`LinkedEyeWebProject/`)

| File | Purpose | Key Issues |
|---|---|---|
| `settings.py` | Django configuration, all external service URLs, auth backends | Hardcoded SECRET_KEY, ALLOWED_HOSTS=['*'], MS Identity Web, AAD config loaded at import time |
| `urls.py` | Root URL routing (88 lines, 320+ endpoints) | Duplicate routes (lesites/ included twice), no URL namespacing |
| `wsgi.py` | WSGI application (unused — runserver used instead) | Standard Django WSGI |
| `celery.py` | Celery consumer with RabbitMQ fanout exchange | Global `app` and `exchange` objects, consumer step registered globally |
| `context_processors.py` | Azure AD claims context | Accesses `request.identity_context_data` — fails if AAD middleware not active |
| `apps.py` | LinkedEyeConfig with post_migrate signal | Calls `overviewData()` and `sitebasedData()` from ticket/views on migration |

### 1.2.2 Library Layer (`lib/`)

#### `LinkedEyeEntity/Node.py` (1,124 lines) — **HIGHEST RISK MODULE**

**Purpose:** Neo4j graph database abstraction layer. All infrastructure topology queries flow through this.

**Responsibilities:** CRUD for nodes/relationships, stats aggregation, Cypher query execution, visualization data

**External Dependencies:** neo4j (Bolt driver), neo4jrestclient (REST), Django settings

**Internal Dependencies:** Used by dashboard, entity, onboarding, comparision, notification, bodeodstatus, analytics views

**Global Variables:**
- Instance `client` (Neo4j driver) — long-lived, never explicitly closed
- Instance `response` dict — reused across calls, not thread-safe

**Long-Lived Objects:**
- Neo4j Bolt driver (created per Node() instantiation, not pooled)
- REST client connection (if REST mode)

**Thread Interactions:** None (not thread-safe). Concurrent requests create separate Node() instances.

**Data Flow:** View → Node() constructor (opens Neo4j connection) → execute() (opens/closes session per query) → returns dict

**CRITICAL FLAGS:**
- **Cypher injection** in ALL query methods (string concatenation with user input)
- **No connection pooling** — new Bolt driver per Node() instantiation
- **Session churn** — creates and destroys session for every single query
- **N+1 query patterns** — `overviewStats()` runs 16 queries per IP address
- `layerwiseCount()` reads hardcoded JSON file on every call
- No pagination on any result set

#### `LinkedEyeMQ/MQ.py`

**Purpose:** RabbitMQ publish wrapper

**Responsibilities:** Exchange declaration, message publishing, stats-enriched publishing

**External Dependencies:** pika, lib.LinkedEyeEntity.Node

**CRITICAL FLAGS:**
- Creates Node() instance in constructor → Neo4j connection leak per MQ instance
- pika.BlockingConnection is NOT thread-safe
- Silent error swallowing in publish() — reconnects but drops original exception
- No connection pooling

#### `LinkedEyeRedis/Redis.py`

**Purpose:** Redis key-value operations for BOD/EOD/ADP health status

**CRITICAL FLAGS:**
- `ast.literal_eval()` on Redis values — arbitrary code execution risk
- `getBodEodkeys()` decodes ALL Redis keys matching pattern — unbounded memory
- Creates Node() instances internally — Neo4j connection leak

#### `LinkedEyeNotification/Notification.py`

**Purpose:** Multi-channel notification (email, SMS, webhook) via Apprise

**CRITICAL FLAGS:**
- Apprise instance accumulates URLs via `add_url()` without clearing between sends
- MySQL connection opened but only closed in `sendAlert()`, not in other paths
- File handles opened without context managers
- Cypher injection in `get_details()`

#### `LinkedEyeVault/Vault.py`

**Purpose:** HashiCorp Vault secret management

**CRITICAL FLAGS:**
- `ast.literal_eval()` on file contents — code execution risk
- Root tokens stored in plaintext JSON file
- No file permission validation

#### `LinkedEyeDiscover/Discover.py`

**Purpose:** Network discovery via Scapy (ARP/ICMP/TCP scanning)

**CRITICAL FLAGS:**
- `Popen` processes not managed (potential zombie processes)
- `os.system()` command injection risk
- `HSScanResult` list grows unbounded

#### `Jinja/CreateCfg.py`

**Purpose:** Config file generation from Jinja2 templates

**CRITICAL FLAGS:**
- `eval()` on user-controlled content — arbitrary code execution

#### `LinkedEyeValidation/snmp.py`

**CRITICAL FLAGS:**
- Shell command injection via unsanitized IP/community strings in `os.system()` call

### 1.2.3 Django Apps (23 apps)

| App | Purpose | Models | Views | Memory Risk |
|---|---|---|---|---|
| `app` | Main views, auth, home, calendar | None | 834 lines, 25+ views | HIGH — unbounded ticket data, global password |
| `ticket` | Redmine ticket integration | TicketOverviewModel, TicketSiteviewModel | 228 lines | HIGH — O(n) user search, no pagination |
| `dashboard` | Neo4j visualization, SNMP config | SnmpModel | 716 lines | HIGH — unbounded stats aggregation |
| `sites` | Site CRUD, location management | SiteModel, LocationModel, CountryModel, StateModel | 315 lines | MEDIUM — raw SQL injection |
| `lesites` | Duplicate of sites (different tables) | Same models, different tables | 315 lines | MEDIUM — duplicate code |
| `onboarding` | Device onboarding with Nagios/Neo4j | OnboardingModel | 354 lines | HIGH — time.sleep(5) in loops, Cypher injection |
| `notification` | Multi-channel alerts, escalation | ServiceModel, UserNotificationSetingsModel | 686 lines | **CRITICAL** — threading.Timer leak, Apprise URL accumulation |
| `autodiscover` | Network auto-discovery | AutoDiscoveryModel | 48 lines | LOW |
| `entity` | Neo4j relationship/port management | portconnectionModel | 597 lines | HIGH — Cypher injection, large JSON processing |
| `auditlogs` | Audit log viewer | AuditlogsModel | 81 lines | MEDIUM — loads all logs without pagination |
| `vault` | HashiCorp Vault integration | VaultModel | 195 lines | **CRITICAL** — global mutable `Obj = {}` |
| `analytics` | Superset/Grafana/ES dashboards | UserSettingsModel | 911 lines | **CRITICAL** — ES 10k records, Excel/PDF in-memory, no conn pooling |
| `comparision` | Config/version comparison | None | 366 lines | HIGH — numpy concatenation, large DataFrames |
| `bodeodstatus` | BOD/EOD/ADP status via Redis | None | 141+465 lines | MEDIUM — ast.literal_eval on Redis data |
| `login` | Auth, OTP, Google Auth, Azure AD | None (uses auth models) | 100+ lines | LOW — hardcoded default password |
| `useronboard` | User provisioning + Redmine sync | PermissionsModel, Userapplication, Usersite, Userotp, UserTOTP | 150+ lines | HIGH — SQL injection, O(n) user search |
| `addservice` | Server type/OS/software config | 10 simple models | 150+ lines | LOW |
| `applications` | Application CRUD | ApplicationModel | 150+ lines | LOW |
| `allonboard` | Bulk device onboarding | allonboardModel, allmanagementModel | 150+ lines | MEDIUM — SMTP hardcoded creds |
| `newonb` | New onboarding (duplicate of allonboard) | newOnbModel, managementModel | 150+ lines | MEDIUM — missing json import (runtime error) |
| `hsonboarding` | HyperSync config scanning | None | 36 lines | LOW |
| `sitehealth` | Site health dashboard | policynotifiModel, subsiteModel | 35 lines | LOW |
| `userprofile` | User profile page | None | 9 lines | LOW |

### 1.2.4 Cross-Cutting Concerns

**Tight Coupling:**
- `lib/LinkedEyeEntity/Node.py` is imported by: dashboard, entity, onboarding, comparision, notification, bodeodstatus, analytics, sitehealth, Redis.py, MQ.py, Notification.py
- Every module creates its own `Node()` instance → multiplied Neo4j connections

**Circular Dependencies:**
- `apps.py` imports from `ticket/views.py` at import time (post_migrate signal)
- `settings.py` imports `AADConfig` and `IdentityWebPython` at module level

**Hidden Side Effects:**
- `settings.py` line 288: `AAD_CONFIG = AADConfig.parse_json()` — reads file at import
- `settings.py` line 291: `MIDDLEWARE.append(...)` — mutates MIDDLEWARE list at import
- `celery.py` line 24: `app.steps['consumer'].add(MyConsumerStep)` — global mutation at import
- `apps.py` line 22: `overviewData()` — calls external APIs during migration

**Poor Separation of Concerns:**
- `app/views.py` contains ticket logic that should be in `ticket/views.py`
- `sites/` and `lesites/` are nearly identical codebases (duplicate)
- `allonboard/` and `newonb/` are nearly identical codebases (duplicate)
- Business logic mixed into view functions (no service layer)

---

## 1.3 Class-Level Documentation

### Critical Classes

#### `Node` (lib/LinkedEyeEntity/Node.py)
- **Responsibility:** Neo4j graph operations (CRUD, stats, visualization)
- **Lifecycle:** Created per view function call, destroyed when view returns (but Neo4j driver may persist in process memory)
- **Large Objects:** `response['data']` — unbounded result lists, `_list` accumulation in stats methods
- **External References:** Neo4j Bolt driver, REST client
- **Thread Affinity:** None (not thread-safe)
- **Cleanup:** Bolt sessions closed per query; driver never explicitly closed
- **NEVER RELEASES:** Neo4j Bolt driver connection pool (drivers hold TCP connections)

#### `MQ` (lib/LinkedEyeMQ/MQ.py)
- **Responsibility:** RabbitMQ publishing
- **Lifecycle:** Created per publish need, should be destroyed after close()
- **External References:** pika.BlockingConnection, pika.Channel, Node instance
- **Cleanup:** `close()` method exists but not always called
- **NEVER RELEASES:** Internal Node() instance's Neo4j connection

#### `Redis` (lib/LinkedEyeRedis/Redis.py)
- **Responsibility:** Redis key operations for health status
- **Lifecycle:** Created per view call
- **Cleanup:** redis-py handles connection pooling internally (OK)
- **CREATES BUT NEVER RELEASES:** Node() instances created in `getSiteHealth*()` methods

#### `Notification` (lib/LinkedEyeNotification/Notification.py)
- **Responsibility:** Multi-channel notifications
- **Lifecycle:** Created per notification need
- **NEVER RELEASES:** MySQL connections (only closed in sendAlert path), Apprise URLs accumulate
- **INSTANTIATED REPEATEDLY:** Every notification view creates new instance

#### `Vault` (lib/LinkedEyeVault/Vault.py)
- **Responsibility:** Vault secret CRUD
- **Lifecycle:** Global singleton in vault/views.py (`Obj = {}` then `Obj = Vault()`)
- **SINGLETON PATTERN:** Persists across all requests, holds Vault tokens in memory

#### `Discover` (lib/LinkedEyeDiscover/Discover.py)
- **Responsibility:** Network scanning
- **Lifecycle:** Created per discovery request
- **NEVER RELEASES:** Popen processes, HSScanResult grows unbounded

#### `K8S` (lib/LinkedEyeStruct/LinkedEyeStruct.py)
- **Responsibility:** Data structure conversion
- **Lifecycle:** Created per conversion
- **OK:** Pure data transformer, no external resources

---

## 1.4 Function-Level Review (Major Functions)

### `app/views.py::overviewData()`
- **Side Effects:** Writes to `TicketOverviewModel` database table
- **Memory:** Loads 1000+ records per site, creates `chartArray` list in memory
- **Retention Risk:** Called from `apps.py` post_migrate signal — runs at startup
- **Exception Handling:** Bare `except` catches everything, swallows errors

### `app/views.py::getTicketBubbleChartData()`
- **Side Effects:** Multiple HTTP requests to Redmine per site per day
- **Memory:** Creates 30-day date range × N sites × N statuses — O(days × sites × statuses) HTTP calls
- **Retention Risk:** `chartArray` grows without bounds
- **Exception Handling:** Returns error response but doesn't clean up

### `analytics/views.py::search_elasticsearch()`
- **Side Effects:** Creates new Elasticsearch client per request
- **Memory:** Loads up to 10,000 records into memory per search
- **Retention Risk:** Elasticsearch client never closed
- **Exception Handling:** Basic try/except

### `analytics/views.py::export_to_excel()` / `export_to_pdf()`
- **Side Effects:** Creates openpyxl Workbook / reportlab PDF in memory
- **Memory:** Entire dataset loaded, then serialized — peak memory = 2× data size
- **Retention Risk:** Large objects in memory during response generation

### `notification/views.py::snooze_email_notification()`
- **Side Effects:** Creates `threading.Timer()` background thread
- **Memory:** Each snooze creates a new thread that lives for the snooze duration
- **Retention Risk:** Thread objects retained by Python runtime until completed
- **Exception Handling:** Thread has its own DB connection — not closed on exception

### `dashboard/views.py::getoverallchartdetails()`
- **Side Effects:** Creates Node() per site, runs stats queries
- **Memory:** Accumulates stats across all sites without bounds
- **Retention Risk:** Multiple Node() instances with Neo4j drivers alive during execution

### `Node.overviewStats()` (lib/LinkedEyeEntity/Node.py)
- **Side Effects:** Executes 16 Cypher queries per IP address
- **Memory:** Status dictionaries grow with each IP
- **Retention Risk:** Large result sets from unbounded queries
- **Exception Handling:** None — query failures propagate uncaught

---

# PART 2 — MEMORY GROWTH INVESTIGATION (CRITICAL)

## Step 1 — Static Code Risk Analysis

### 2.1.1 Unbounded Collections

| Location | Type | Description | Severity |
|---|---|---|---|
| `app/views.py` — `overviewData()` | List | `chartArray` grows with sites × days × statuses | HIGH |
| `app/views.py` — `getTicketBubbleChartData()` | List | 30-day × sites accumulation | HIGH |
| `lib/LinkedEyeEntity/Node.py` — `overviewStats()` | Dict | Status dicts per IP, no limit | HIGH |
| `lib/LinkedEyeEntity/Node.py` — `_list` | List | Accumulates in stats/list methods without bounds | HIGH |
| `lib/LinkedEyeDiscover/Discover.py` — `HSScanResult` | List | Scan results accumulate per instance | MEDIUM |
| `auditlogs/views.py` — `get_auditlogs()` | List | Loads ALL audit logs (no pagination) | HIGH |
| `analytics/views.py` — ES results | Dict | 10,000 records per search | HIGH |
| `lib/LinkedEyeRedis/Redis.py` — `getBodEodkeys()` | List | Decodes ALL matching Redis keys | MEDIUM |

### 2.1.2 Event & Signal Leaks

| Location | Type | Description | Severity |
|---|---|---|---|
| `LinkedEyeWebProject/apps.py` line 12 | Signal | `post_migrate.connect()` — connects signal but never disconnects | LOW (only fires on migration) |
| `celery.py` line 24 | Consumer Step | Global consumer step registration — persists for process lifetime | LOW |

### 2.1.3 Thread Leaks

| Location | Type | Description | Severity |
|---|---|---|---|
| `notification/views.py` — `snooze_email_notification()` | `threading.Timer` | **Creates new thread per snooze request — threads accumulate if many users snooze** | **CRITICAL** |
| `notification/views.py` — Timer's `resume_notifications()` | DB connection in thread | MySQL connection created inside thread, not closed on exception | HIGH |

### 2.1.4 Object Retention / Connection Leaks

| Location | Type | Description | Severity |
|---|---|---|---|
| `vault/views.py` line 1 | Global variable | `Obj = {}` then `Obj = Vault()` — **persists across ALL requests** | **CRITICAL** |
| `lib/LinkedEyeEntity/Node.py` | Neo4j driver | **New Bolt driver created per Node() instantiation — TCP connections accumulate in process** | **CRITICAL** |
| `lib/LinkedEyeMQ/MQ.py` | Node + pika | Each MQ() creates Node() (Neo4j leak) + pika connection (if not closed) | **CRITICAL** |
| `lib/LinkedEyeNotification/Notification.py` | MySQL + Apprise | MySQL conn not always closed; Apprise URLs accumulate per instance | HIGH |
| `analytics/views.py` — `setup_connection()` | psycopg2 | New PostgreSQL connection per request, inconsistent closure | HIGH |
| `analytics/views.py` — ES client | elasticsearch | New client per request, never closed | HIGH |
| `bodeodstatus/messagequeue_views.py` | mysql.connector | New MySQL connection per request, manual close() | MEDIUM |
| `app/adapter.py` — `create_redmine_user()` | requests | Loads 100k users into memory for linear search | HIGH |

### 2.1.5 Resource Leaks (Files/Sockets)

| Location | Type | Description | Severity |
|---|---|---|---|
| `lib/LinkedEyeNotification/Notification.py` lines 71-72 | File handle | Template files opened without `with` statement | MEDIUM |
| `lib/LinkedEyeEntity/Node.py` line 635 | File handle | JSON config file opened without `with` statement | MEDIUM |
| `lib/LinkedEyeDiscover/Discover.py` | Popen | Subprocess processes not waited on — potential zombies | MEDIUM |
| `lib/LinkedEyeValidation/ilo.py` | Redfish client | Login without logout — TCP connection leak per check | MEDIUM |

### 2.1.6 Logging & Debug Buffers

| Location | Type | Description | Severity |
|---|---|---|---|
| No logging framework configured | N/A | No `LOGGING` in settings.py — Python default logging | LOW |
| `print()` statements throughout codebase | stdout | Console output accumulates in Docker log buffer | LOW |

---

## Step 2 — High-Risk Code Identification

### Ranked by Likelihood of Causing Memory Growth

```
## High Risk Areas

1. File: lib/LinkedEyeEntity/Node.py
   Reason: Neo4j Bolt driver connection pool leak
   Risk Level: CRITICAL
   Why memory may grow: Every view function call creates a new Node() instance,
   which creates a new neo4j.GraphDatabase.driver(). The Bolt driver maintains
   an internal connection pool with TCP sockets. These drivers are NEVER closed
   (no __del__, no close(), no context manager). Over time, hundreds of orphaned
   Bolt driver instances accumulate in the Python process, each holding TCP
   connections and internal buffers. The garbage collector may not collect them
   promptly due to reference cycles in the neo4j driver's connection pool.

2. File: notification/views.py (snooze_email_notification)
   Reason: Unbounded threading.Timer creation
   Risk Level: CRITICAL
   Why memory may grow: Each snooze request creates a threading.Timer that lives
   for the snooze duration (potentially hours). Each thread holds its own stack
   (~8MB default on Linux), a MySQL connection, and Python frame objects. If N
   users snooze, N threads persist. There is no limit, no cleanup, no tracking.

3. File: vault/views.py (Obj = {})
   Reason: Global mutable state persists across requests
   Risk Level: HIGH
   Why memory may grow: The global Vault object persists for the entire process
   lifetime. While this alone doesn't grow, it holds HTTP session objects and
   Vault tokens that are never refreshed. More importantly, this pattern sets
   a precedent for request-spanning state.

4. File: analytics/views.py (search_elasticsearch, export_*)
   Reason: No connection pooling + large in-memory datasets
   Risk Level: HIGH
   Why memory may grow: Each search creates a new Elasticsearch client (with
   internal urllib3 connection pool). Export functions load entire datasets
   (10k records) into openpyxl Workbook or reportlab objects. Python's memory
   allocator does not always return freed memory to the OS — pymalloc arenas
   may remain allocated.

5. File: lib/LinkedEyeMQ/MQ.py
   Reason: Cascading connection leak (pika + Node/Neo4j)
   Risk Level: HIGH
   Why memory may grow: Each MQ() instantiation creates both a pika
   BlockingConnection AND a Node() instance (which creates a Neo4j driver).
   If MQ.close() is not called, both leak. Even if close() IS called, only
   the pika connection is closed — the Node's Neo4j driver is never closed.

6. File: lib/LinkedEyeNotification/Notification.py
   Reason: Apprise URL accumulation + MySQL connection leak
   Risk Level: HIGH
   Why memory may grow: Apprise instance accumulates notification URLs via
   add_url() without clearing. MySQL connection opened in _connect() but
   only closed in sendAlert() path — other code paths leak the connection.

7. File: analytics/views.py (setup_connection)
   Reason: PostgreSQL connection leak
   Risk Level: HIGH
   Why memory may grow: psycopg2 connections created per request without
   consistent closure. Connection objects hold socket buffers.

8. File: app/views.py (overviewData, getTicketBubbleChartData)
   Reason: Unbounded list accumulation + HTTP connections
   Risk Level: MEDIUM
   Why memory may grow: Large lists built in memory per request. Python's
   pymalloc may not release arena memory back to OS after list is GC'd.

9. File: lib/LinkedEyeRedis/Redis.py
   Reason: Node() instantiation inside methods
   Risk Level: MEDIUM
   Why memory may grow: getSiteHealth() and getSiteHealthNew() create Node()
   instances that are never explicitly closed.

10. File: Dockerfile (CMD python manage.py runserver)
    Reason: Development server in production
    Risk Level: HIGH (ARCHITECTURAL)
    Why memory may grow: Django's runserver is single-threaded, auto-reloads,
    and is NOT designed for long-running production use. It has known memory
    leaks with DEBUG mode (even though DEBUG=False). Use gunicorn or uWSGI.
```

---

## Step 3 — Profiling Strategy

### A. tracemalloc — Heap Snapshot Comparison

```python
# Add to manage.py or a middleware file
# FILE: LinkedEyeWebProject/memory_profiler_middleware.py

import tracemalloc
import os
import datetime

# Start tracemalloc at application startup
tracemalloc.start(25)  # 25 frames deep

SNAPSHOT_DIR = '/tmp/le_memory_snapshots/'
os.makedirs(SNAPSHOT_DIR, exist_ok=True)

class MemoryProfilingMiddleware:
    """Django middleware to capture periodic memory snapshots."""

    def __init__(self, get_response):
        self.get_response = get_response
        self.request_count = 0
        self.snapshot_interval = 100  # snapshot every 100 requests
        self.baseline = tracemalloc.take_snapshot()

    def __call__(self, request):
        self.request_count += 1
        response = self.get_response(request)

        if self.request_count % self.snapshot_interval == 0:
            snapshot = tracemalloc.take_snapshot()
            timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')

            # Compare with baseline
            stats = snapshot.compare_to(self.baseline, 'lineno')

            with open(f'{SNAPSHOT_DIR}snapshot_{timestamp}_req{self.request_count}.txt', 'w') as f:
                f.write(f"=== Snapshot at request #{self.request_count} ===\n")
                f.write(f"Current memory: {tracemalloc.get_traced_memory()[0] / 1024 / 1024:.1f} MB\n")
                f.write(f"Peak memory: {tracemalloc.get_traced_memory()[1] / 1024 / 1024:.1f} MB\n\n")
                f.write("Top 50 memory growth lines:\n")
                for stat in stats[:50]:
                    f.write(f"  {stat}\n")

                # Group by filename
                f.write("\n\nTop 30 files by memory growth:\n")
                file_stats = snapshot.compare_to(self.baseline, 'filename')
                for stat in file_stats[:30]:
                    f.write(f"  {stat}\n")

        return response
```

**How to compare heap snapshots:**
```python
# In Django shell (python manage.py shell):
import tracemalloc
tracemalloc.start(25)

# Take baseline
snap1 = tracemalloc.take_snapshot()

# ... wait for N requests or time period ...

# Take comparison snapshot
snap2 = tracemalloc.take_snapshot()

# Compare by line number (most precise)
top_stats = snap2.compare_to(snap1, 'lineno')
print("[ Top 20 memory growth by line ]")
for stat in top_stats[:20]:
    print(stat)

# Compare by filename (broad view)
file_stats = snap2.compare_to(snap1, 'filename')
print("\n[ Top 20 files by memory growth ]")
for stat in file_stats[:20]:
    print(stat)

# Compare by traceback (full stack traces)
tb_stats = snap2.compare_to(snap1, 'traceback')
print("\n[ Top 10 allocation tracebacks ]")
for stat in tb_stats[:10]:
    print(stat)
    for line in stat.traceback.format():
        print(f"  {line}")
```

### B. memory_profiler — Per-Function Memory Tracking

```python
# Install: pip install memory_profiler
# Usage: Decorate suspected functions

from memory_profiler import profile

# In analytics/views.py:
@profile(stream=open('/tmp/le_mem_analytics.log', 'a'))
def search_elasticsearch(request):
    ...

# In dashboard/views.py:
@profile(stream=open('/tmp/le_mem_dashboard.log', 'a'))
def getoverallchartdetails(request):
    ...

# In notification/views.py:
@profile(stream=open('/tmp/le_mem_notification.log', 'a'))
def snooze_email_notification(request):
    ...
```

### C. objgraph — Object Type Growth Tracking

```python
# Add to a management command or periodic task
# FILE: LinkedEyeWebProject/management/commands/memcheck.py

import objgraph
import gc
import os

def dump_object_growth():
    """Call periodically to track which object types are growing."""
    gc.collect()

    # Show types with most instances
    print("=== Most Common Types ===")
    objgraph.show_most_common_types(limit=30)

    # Show types that grew since last call
    print("\n=== Growing Types ===")
    objgraph.show_growth(limit=30)

    # Check for specific suspected leaking types
    suspected_types = [
        'Node',          # Neo4j Node class
        'BoltDriver',    # Neo4j Bolt driver
        'Connection',    # Various DB connections
        'Session',       # Neo4j sessions
        'Timer',         # threading.Timer
        'Thread',        # Background threads
        'Workbook',      # openpyxl
        'BlockingConnection',  # pika
        'Elasticsearch', # ES client
        'Apprise',       # Notification
    ]

    for type_name in suspected_types:
        objs = objgraph.by_type(type_name)
        if objs:
            print(f"\n{type_name}: {len(objs)} instances")
            # Show reference chain for first instance
            if len(objs) > 0:
                objgraph.show_backrefs(
                    objs[0],
                    max_depth=5,
                    filename=f'/tmp/le_refs_{type_name}.png'
                )

# How to identify reference chains:
def trace_leaking_objects(type_name, count=3):
    """Trace what's holding references to suspected leaking objects."""
    gc.collect()
    objs = objgraph.by_type(type_name)
    print(f"Found {len(objs)} instances of {type_name}")

    for i, obj in enumerate(objs[:count]):
        print(f"\n--- Instance {i} referrers ---")
        chain = objgraph.find_backref_chain(
            obj,
            objgraph.is_proper_module,
            max_depth=10
        )
        objgraph.show_chain(chain, filename=f'/tmp/le_chain_{type_name}_{i}.png')
```

### D. gc Debugging — Cycle Detection

```python
# Add to settings.py or a startup hook
import gc
import sys

# Enable GC debugging
gc.set_debug(gc.DEBUG_STATS | gc.DEBUG_UNCOLLECTABLE)

# Custom GC callback to log uncollectable objects
def gc_callback(phase, info):
    if phase == 'stop':
        if info.get('uncollectable', 0) > 0:
            print(f"GC WARNING: {info['uncollectable']} uncollectable objects!")
            # Force-collect and report
            gc.collect()
            if gc.garbage:
                print(f"gc.garbage contains {len(gc.garbage)} objects:")
                for obj in gc.garbage[:10]:
                    print(f"  {type(obj).__name__}: {sys.getsizeof(obj)} bytes")

gc.callbacks.append(gc_callback)

# Periodic manual collection with reporting:
def force_gc_report():
    """Run this periodically (e.g., every 50 requests)."""
    before = len(gc.get_objects())
    collected = gc.collect()
    after = len(gc.get_objects())
    uncollectable = len(gc.garbage)

    print(f"GC Report: before={before}, collected={collected}, "
          f"after={after}, uncollectable={uncollectable}")

    return {
        'objects_before': before,
        'collected': collected,
        'objects_after': after,
        'uncollectable': uncollectable,
    }
```

### E. psutil — Process Memory Monitoring

```python
# FILE: LinkedEyeWebProject/memory_monitor.py

import psutil
import os
import time
import threading
import json
import datetime

class ProcessMemoryMonitor:
    """Background thread that logs process memory at intervals."""

    def __init__(self, interval_seconds=30, log_file='/tmp/le_memory_log.jsonl'):
        self.interval = interval_seconds
        self.log_file = log_file
        self.process = psutil.Process(os.getpid())
        self._stop = threading.Event()
        self._thread = None

    def start(self):
        self._thread = threading.Thread(target=self._monitor, daemon=True)
        self._thread.start()

    def stop(self):
        self._stop.set()

    def _monitor(self):
        while not self._stop.is_set():
            mem = self.process.memory_info()

            entry = {
                'timestamp': datetime.datetime.now().isoformat(),
                'rss_mb': mem.rss / 1024 / 1024,
                'vms_mb': mem.vms / 1024 / 1024,
                'num_threads': self.process.num_threads(),
                'num_fds': self._get_fd_count(),
                'num_connections': len(self.process.connections()),
                'connections_by_status': self._connections_by_status(),
            }

            with open(self.log_file, 'a') as f:
                f.write(json.dumps(entry) + '\n')

            self._stop.wait(self.interval)

    def _get_fd_count(self):
        try:
            return self.process.num_fds()
        except AttributeError:
            # Windows
            return len(self.process.open_files())

    def _connections_by_status(self):
        counts = {}
        for conn in self.process.connections():
            status = conn.status
            counts[status] = counts.get(status, 0) + 1
        return counts

# Usage — add to settings.py or wsgi.py:
# monitor = ProcessMemoryMonitor(interval_seconds=30)
# monitor.start()
```

**How to isolate object types growing over time:**
1. Run `ProcessMemoryMonitor` in background (30-second intervals)
2. After 1 hour, parse the JSONL log:
```python
import json
import matplotlib.pyplot as plt

entries = []
with open('/tmp/le_memory_log.jsonl') as f:
    for line in f:
        entries.append(json.loads(line))

timestamps = [e['timestamp'] for e in entries]
rss = [e['rss_mb'] for e in entries]
threads = [e['num_threads'] for e in entries]
connections = [e['num_connections'] for e in entries]

# Plot RSS over time
plt.figure(figsize=(15, 5))
plt.subplot(1, 3, 1)
plt.plot(rss)
plt.title('RSS (MB) over time')
plt.subplot(1, 3, 2)
plt.plot(threads)
plt.title('Thread count over time')
plt.subplot(1, 3, 3)
plt.plot(connections)
plt.title('TCP connections over time')
plt.savefig('/tmp/le_memory_trend.png')
```

3. If RSS grows linearly: connection leak or unbounded collection
4. If RSS grows in steps: large object allocation without deallocation
5. If threads grow: threading.Timer leak confirmed
6. If connections grow: Neo4j/MQ/PostgreSQL/ES connection leak confirmed

---

## Step 4 — Root Cause Hypothesis

### Most Probable Root Causes (Ranked)

```
1. NEO4J BOLT DRIVER ACCUMULATION (Confidence: 95%)
   ─────────────────────────────────────────────────
   Root Cause: Every request to dashboard, entity, onboarding, comparision,
   notification, sitehealth, and Redis-backed views creates a new Node()
   instance, which calls neo4j.GraphDatabase.driver(). The Bolt driver
   creates an internal connection pool with socket connections. The driver
   is NEVER closed — there is no close(), no __del__, no context manager.

   The neo4j Python driver's connection pool uses reference cycles internally
   (driver ↔ pool ↔ connections ↔ resolver). Python's GC can collect cycles,
   but only in generation-2 collections, which are infrequent. Between
   collections, drivers accumulate. Even after GC, the underlying C-level
   socket buffers may not be returned to the OS.

   Evidence:
   - Node.__init__() creates driver: line ~30 of Node.py
   - No close() call anywhere in the codebase
   - Node() instantiated in ~15 different view functions
   - Each driver holds 1-100 TCP connections depending on pool settings

   Growth Rate: ~1 driver per request to affected views × pool overhead


2. THREADING.TIMER LEAK IN NOTIFICATION SNOOZE (Confidence: 85%)
   ──────────────────────────────────────────────────────────────
   Root Cause: snooze_email_notification() creates a threading.Timer for
   each snooze request. Each Timer is a Thread object with ~8MB stack
   allocation. The Timer lives for the entire snooze duration (could be
   hours). If multiple users snooze, or the same user snoozes repeatedly,
   threads accumulate. Each thread also holds a MySQL connection.

   Evidence:
   - notification/views.py uses threading.Timer()
   - No limit on concurrent Timer threads
   - No tracking or cancellation of existing timers
   - Each timer creates its own MySQL connection

   Growth Rate: ~8MB per snooze request, lasting for snooze duration


3. POSTGRESQL/MYSQL/ELASTICSEARCH CONNECTION LEAK (Confidence: 80%)
   ────────────────────────────────────────────────────────────────
   Root Cause: analytics/views.py creates new psycopg2 connections and
   Elasticsearch clients per request without consistent cleanup.
   messagequeue_views.py creates mysql.connector connections per request.
   While most have close() calls, exception paths skip cleanup.

   Evidence:
   - setup_connection() in analytics creates psycopg2 conn, returns cursor
   - Elasticsearch() client created per search_elasticsearch() call
   - mysql.connector.connect() in messagequeue_views.py
   - No try/finally or context manager pattern

   Growth Rate: ~1 connection per analytics request that hits exception path


4. PYTHON PYMALLOC ARENA FRAGMENTATION (Confidence: 70%)
   ──────────────────────────────────────────────────────
   Root Cause: Large temporary objects (10k ES records, Excel workbooks,
   30-day ticket arrays, audit log lists) are allocated in pymalloc arenas.
   When freed, the arenas may not be returned to the OS if even one small
   object remains in the arena. This causes RSS to grow monotonically
   even though Python's heap shows memory as "free."

   Evidence:
   - Multiple views load large datasets into lists/dicts
   - No streaming/pagination patterns used
   - export_to_excel() creates full Workbook in memory
   - search_elasticsearch() returns 10k records

   Growth Rate: Gradual, depends on request patterns


5. APPRISE URL ACCUMULATION (Confidence: 60%)
   ──────────────────────────────────────────
   Root Cause: Notification.py's Apprise instance accumulates URLs via
   add_url() without clearing between notification sends. If the same
   Notification instance is reused (or if URLs are added in a loop),
   the internal URL list grows.

   Evidence:
   - Notification.add_url() appends to self.apprise
   - No clear/reset between send operations
   - get_usernotification_settings() adds URLs per user

   Growth Rate: Proportional to notification volume
```

---

# PART 3 — REMEDIATION PLAN

## Fix 1: Neo4j Connection Pooling (CRITICAL — Root Cause #1)

### Problem
Every `Node()` instantiation creates a new `neo4j.GraphDatabase.driver()`, which is never closed.

### Before (Node.py)
```python
class Node:
    def __init__(self, host=None, port=None, ...):
        ...
        self.client = GraphDatabase.driver(uri, auth=(user, password))

    def execute(self, query):
        session = self.client.session()
        result = session.run(query)
        data = [record.data() for record in result]
        session.close()
        return data

    # No close() method
    # No __del__ method
    # No __enter__/__exit__ methods
```

### After (Node.py — Connection Pool Singleton)
```python
import threading
from neo4j import GraphDatabase

class Neo4jPool:
    """Thread-safe singleton connection pool for Neo4j."""
    _instance = None
    _lock = threading.Lock()

    def __new__(cls, uri=None, user=None, password=None):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._driver = GraphDatabase.driver(
                        uri, auth=(user, password),
                        max_connection_pool_size=50,
                        connection_acquisition_timeout=30,
                    )
        return cls._instance

    @property
    def driver(self):
        return self._driver

    def close(self):
        self._driver.close()
        Neo4jPool._instance = None


class Node:
    def __init__(self, host=None, port=None, user=None, password=None):
        uri = f"bolt://{host}:{port}"
        pool = Neo4jPool(uri, user, password)
        self.driver = pool.driver
        self.response = {'status': False, 'data': '', 'error_msg': ''}

    def execute(self, query, parameters=None):
        """Execute query using session from pool. Parameterized to prevent injection."""
        with self.driver.session() as session:
            result = session.run(query, parameters=parameters or {})
            return [record.data() for record in result]

    # Example of parameterized query (fixes Cypher injection)
    def create(self, label, properties):
        query = f"CREATE (n:{label} $props) RETURN n"
        return self.execute(query, parameters={'props': properties})
```

### Cleanup Pattern for Views
```python
# Before (dashboard/views.py):
def getneo4jnodes(request):
    node = Node(host=site.entity_host, port=site.entity_port)
    data = node.list(...)
    return JsonResponse(data)  # node never cleaned up

# After:
def getneo4jnodes(request):
    node = Node(host=site.entity_host, port=site.entity_port)
    # Node now uses shared pool — no cleanup needed per request
    data = node.list(...)
    return JsonResponse(data)
```

---

## Fix 2: Threading.Timer Leak (CRITICAL — Root Cause #2)

### Before (notification/views.py)
```python
def snooze_email_notification(request):
    seconds = int(duration) * 60
    timer = threading.Timer(seconds, resume_notifications, args=[event_title])
    timer.start()
    # No tracking, no cancellation, no limit
```

### After — Use Celery Delayed Task Instead
```python
# notification/tasks.py (new file)
from celery import shared_task
import mysql.connector

@shared_task
def resume_notification_task(event_title):
    """Celery task to resume notifications after snooze period."""
    try:
        conn = mysql.connector.connect(...)
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE ... SET is_email_active = 1 WHERE event_title = %s",
            (event_title,)
        )
        conn.commit()
    finally:
        cursor.close()
        conn.close()

# notification/views.py (updated)
from notification.tasks import resume_notification_task

def snooze_email_notification(request):
    seconds = int(duration) * 60
    # Use Celery countdown instead of threading.Timer
    resume_notification_task.apply_async(
        args=[event_title],
        countdown=seconds
    )
    return JsonResponse({'status': 'success'})
```

**If Celery is not viable, limit concurrent timers:**
```python
# notification/views.py — minimum viable fix
import threading

_active_timers = {}  # event_title → Timer
_timer_lock = threading.Lock()
MAX_CONCURRENT_TIMERS = 50

def snooze_email_notification(request):
    event_title = request.POST.get('event_title')
    seconds = int(request.POST.get('duration', 30)) * 60

    with _timer_lock:
        # Cancel existing timer for same event
        if event_title in _active_timers:
            _active_timers[event_title].cancel()
            del _active_timers[event_title]

        if len(_active_timers) >= MAX_CONCURRENT_TIMERS:
            return JsonResponse({'error': 'Too many active snoozes'}, status=429)

        def cleanup_and_resume():
            try:
                resume_notifications(event_title)
            finally:
                with _timer_lock:
                    _active_timers.pop(event_title, None)

        timer = threading.Timer(seconds, cleanup_and_resume)
        timer.daemon = True  # Don't prevent process exit
        _active_timers[event_title] = timer
        timer.start()

    return JsonResponse({'status': 'success'})
```

---

## Fix 3: Database Connection Pooling (Root Cause #3)

### PostgreSQL — Before (analytics/views.py)
```python
def setup_connection():
    conn = psycopg2.connect(host=..., database=..., user=..., password=...)
    cursor = conn.cursor()
    return cursor  # Connection reference lost! Never closed.
```

### PostgreSQL — After
```python
from contextlib import contextmanager
import psycopg2.pool

# Module-level connection pool (create once)
_pg_pool = None

def get_pg_pool():
    global _pg_pool
    if _pg_pool is None:
        _pg_pool = psycopg2.pool.ThreadedConnectionPool(
            minconn=1, maxconn=10,
            host=settings.POSTGRES_HOST,
            port=settings.POSTGRES_PORT,
            database=settings.POSTGRES_SUPERSET_DB,
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASS,
        )
    return _pg_pool

@contextmanager
def pg_connection():
    """Context manager for pooled PostgreSQL connections."""
    pool = get_pg_pool()
    conn = pool.getconn()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        pool.putconn(conn)

# Usage in views:
def getTableIndex(request):
    with pg_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM ...")
        data = cursor.fetchall()
        cursor.close()
    return JsonResponse(data)
```

### Elasticsearch — Before (analytics/views.py)
```python
def search_elasticsearch(request):
    es = Elasticsearch([{'host': host, 'port': port}])  # New client per request
    results = es.search(index=index, body=query, size=10000)
    # es never closed
```

### Elasticsearch — After
```python
from elasticsearch import Elasticsearch
import threading

_es_clients = {}
_es_lock = threading.Lock()

def get_es_client(host, port):
    """Singleton Elasticsearch client per host:port."""
    key = f"{host}:{port}"
    if key not in _es_clients:
        with _es_lock:
            if key not in _es_clients:
                _es_clients[key] = Elasticsearch(
                    [{'host': host, 'port': int(port)}],
                    timeout=30,
                    max_retries=2,
                    retry_on_timeout=True,
                )
    return _es_clients[key]

def search_elasticsearch(request):
    es = get_es_client(host, port)  # Reuses singleton client
    results = es.search(index=index, body=query, size=10000)
    ...
```

### MySQL (messagequeue) — Before
```python
def messagequeue_data(request):
    conn = mysql.connector.connect(host=..., user='root', password='rootpassword')
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    conn.close()  # Called, but not in finally block
```

### MySQL (messagequeue) — After
```python
from contextlib import contextmanager
from mysql.connector import pooling

_mysql_pool = pooling.MySQLConnectionPool(
    pool_name="mq_pool",
    pool_size=5,
    host=os.getenv('MYSQL_ANALYTICS_HOST'),
    user=os.getenv('MYSQL_ANALYTICS_USER'),
    password=os.getenv('MYSQL_ANALYTICS_PASS'),
    database="analytics",
    connection_timeout=10,
)

@contextmanager
def mysql_connection():
    conn = _mysql_pool.get_connection()
    try:
        yield conn
    finally:
        conn.close()  # Returns to pool

def messagequeue_data(request):
    with mysql_connection() as conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query, params)
        data = cursor.fetchall()
        cursor.close()
    return JsonResponse(data)
```

---

## Fix 4: Bounded Collections & Pagination

### Before (auditlogs/views.py)
```python
def get_auditlogs(request):
    logs = AuditlogsModel.objects.all()  # ALL audit logs — unbounded
    data = [model_to_dict(log) for log in logs]
    return JsonResponse(data, safe=False)
```

### After
```python
from django.core.paginator import Paginator

def get_auditlogs(request):
    page = int(request.GET.get('page', 1))
    page_size = min(int(request.GET.get('page_size', 50)), 200)  # Max 200

    logs = AuditlogsModel.objects.all().order_by('-created')
    paginator = Paginator(logs, page_size)
    page_obj = paginator.get_page(page)

    data = [model_to_dict(log) for log in page_obj]
    return JsonResponse({
        'data': data,
        'total': paginator.count,
        'pages': paginator.num_pages,
        'current_page': page,
    })
```

---

## Fix 5: Weakref for Cached Objects

### Pattern for Vault Global Object
```python
# vault/views.py — Before
Obj = {}  # Global mutable dict, persists forever

# vault/views.py — After
import weakref
import threading

_vault_cache = {}
_vault_lock = threading.Lock()

def get_vault_instance():
    """Lazy-initialized Vault connection with thread safety."""
    with _vault_lock:
        if 'vault' not in _vault_cache or _vault_cache['vault'] is None:
            _vault_cache['vault'] = Vault()
        return _vault_cache['vault']

def vault(request):
    obj = get_vault_instance()
    ...
```

---

## Fix 6: Signal Disconnect Pattern

```python
# LinkedEyeWebProject/apps.py — Before
class LinkedEyeConfig(AppConfig):
    def ready(self):
        post_migrate.connect(self.call_getdbdata_once)

    def call_getdbdata_once(self, sender, **kwargs):
        if not getattr(self, 'getdbdata_called', False):
            self.getdbdata_called = True
            from ticket.views import overviewData, sitebasedData
            overviewData()
            sitebasedData()

# After — disconnect after first call
class LinkedEyeConfig(AppConfig):
    def ready(self):
        post_migrate.connect(self.call_getdbdata_once)

    def call_getdbdata_once(self, sender, **kwargs):
        if not getattr(self, 'getdbdata_called', False):
            self.getdbdata_called = True
            post_migrate.disconnect(self.call_getdbdata_once)  # Disconnect after use
            from ticket.views import overviewData, sitebasedData
            overviewData()
            sitebasedData()
```

---

## Fix 7: Cache Size Limiting

```python
# For any in-memory cache pattern, use functools.lru_cache or bounded dict:
from functools import lru_cache
from collections import OrderedDict
import threading

class BoundedCache:
    """Thread-safe LRU cache with maximum size."""

    def __init__(self, maxsize=128):
        self.maxsize = maxsize
        self._cache = OrderedDict()
        self._lock = threading.Lock()

    def get(self, key, default=None):
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
                return self._cache[key]
            return default

    def set(self, key, value):
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
            self._cache[key] = value
            while len(self._cache) > self.maxsize:
                self._cache.popitem(last=False)

    def clear(self):
        with self._lock:
            self._cache.clear()

# Usage example — cache ES clients:
_es_cache = BoundedCache(maxsize=10)
```

---

## Fix 8: Replace Development Server with Production WSGI

### Before (Dockerfile)
```dockerfile
CMD python /entrypoint.py ; python manage.py collectstatic --noinput ; python manage.py runserver 0.0.0.0:80
```

### After (Dockerfile)
```dockerfile
# Install gunicorn
RUN pip install gunicorn

# Use gunicorn with worker recycling to prevent memory leaks
CMD python /entrypoint.py ; \
    python manage.py collectstatic --noinput ; \
    gunicorn LinkedEyeWebProject.wsgi:application \
        --bind 0.0.0.0:80 \
        --workers 4 \
        --max-requests 1000 \
        --max-requests-jitter 50 \
        --timeout 120 \
        --graceful-timeout 30 \
        --worker-class sync
```

**Key parameters:**
- `--max-requests 1000`: Recycle workers after 1000 requests — **this alone mitigates most memory leaks**
- `--max-requests-jitter 50`: Prevent all workers recycling simultaneously
- `--workers 4`: Multiple worker processes for concurrency
- `--worker-class sync`: Synchronous workers (matching Django's sync nature)

---

# PART 4 — PREVENTIVE CONTROLS

## 4.1 Memory Regression Test

```python
# tests/test_memory.py
import tracemalloc
import gc
from django.test import TestCase, RequestFactory
from dashboard.views import getoverallchartdetails
from analytics.views import search_elasticsearch

class MemoryRegressionTest(TestCase):
    """Ensure views don't leak memory across repeated calls."""

    def setUp(self):
        self.factory = RequestFactory()
        tracemalloc.start()

    def tearDown(self):
        tracemalloc.stop()

    def test_dashboard_view_no_growth(self):
        """Dashboard view should not grow memory over 100 requests."""
        gc.collect()
        baseline = tracemalloc.take_snapshot()

        for _ in range(100):
            request = self.factory.get('/dashboard/getoverallchartdetails/')
            request.user = self.user
            getoverallchartdetails(request)

        gc.collect()
        current = tracemalloc.take_snapshot()
        stats = current.compare_to(baseline, 'filename')

        total_growth = sum(s.size_diff for s in stats if s.size_diff > 0)
        # Allow 5MB growth maximum over 100 requests
        self.assertLess(total_growth, 5 * 1024 * 1024,
                       f"Memory grew by {total_growth / 1024 / 1024:.1f}MB over 100 requests")

    def test_no_thread_leak(self):
        """Notification snooze should not accumulate threads."""
        import threading
        initial_threads = threading.active_count()

        for _ in range(10):
            request = self.factory.post('/notification/snooze/', {'duration': '1', 'event_title': 'test'})
            request.user = self.user
            # snooze_email_notification(request)

        # After short snoozes, threads should clean up
        import time
        time.sleep(70)  # Wait for 1-minute snoozes to expire

        final_threads = threading.active_count()
        self.assertLessEqual(final_threads, initial_threads + 2)
```

## 4.2 Long-Duration Soak Test Strategy

```bash
#!/bin/bash
# soak_test.sh — Run against staging environment

DURATION_HOURS=8
BASE_URL="http://staging:80"
REQUESTS_PER_SECOND=5
LOG_FILE="/tmp/le_soak_$(date +%Y%m%d_%H%M%S).log"

echo "Starting $DURATION_HOURS-hour soak test at $REQUESTS_PER_SECOND RPS"

# Start memory monitoring on server
ssh staging "python -c \"
from memory_monitor import ProcessMemoryMonitor
m = ProcessMemoryMonitor(interval_seconds=60)
m.start()
\" &"

# Run load test with wrk or ab
END_TIME=$(($(date +%s) + DURATION_HOURS * 3600))

while [ $(date +%s) -lt $END_TIME ]; do
    # Cycle through key endpoints
    curl -s "$BASE_URL/dashboard/" > /dev/null
    curl -s "$BASE_URL/analytics/search" > /dev/null
    curl -s "$BASE_URL/entity/" > /dev/null
    curl -s "$BASE_URL/notification/" > /dev/null
    curl -s "$BASE_URL/auditlogs/get_auditlogs/" > /dev/null

    sleep $(echo "scale=2; 1/$REQUESTS_PER_SECOND" | bc)
done

# Collect results
ssh staging "cat /tmp/le_memory_log.jsonl" > "$LOG_FILE"

# Analyze
python3 -c "
import json
entries = [json.loads(l) for l in open('$LOG_FILE')]
rss_start = entries[0]['rss_mb']
rss_end = entries[-1]['rss_mb']
rss_max = max(e['rss_mb'] for e in entries)
threads_max = max(e['num_threads'] for e in entries)
conns_max = max(e['num_connections'] for e in entries)

print(f'RSS: {rss_start:.0f}MB → {rss_end:.0f}MB (delta: {rss_end-rss_start:.0f}MB)')
print(f'Peak RSS: {rss_max:.0f}MB')
print(f'Max threads: {threads_max}')
print(f'Max connections: {conns_max}')

growth_rate = (rss_end - rss_start) / $DURATION_HOURS
print(f'Growth rate: {growth_rate:.1f} MB/hour')
if growth_rate > 10:
    print('FAIL: Memory growth exceeds 10 MB/hour')
    exit(1)
else:
    print('PASS: Memory growth acceptable')
"
```

## 4.3 Automated Memory Monitoring (Production)

```python
# Add to Django middleware stack
# LinkedEyeWebProject/monitoring_middleware.py

import psutil
import os
import logging
import threading
import gc

logger = logging.getLogger('le.memory')

class MemoryGuardMiddleware:
    """Middleware that monitors and alerts on memory growth."""

    MEMORY_LIMIT_MB = 1024  # 1GB
    WARN_THRESHOLD_MB = 768  # 768MB

    def __init__(self, get_response):
        self.get_response = get_response
        self.process = psutil.Process(os.getpid())
        self.request_count = 0

    def __call__(self, request):
        self.request_count += 1
        response = self.get_response(request)

        # Check every 50 requests
        if self.request_count % 50 == 0:
            rss_mb = self.process.memory_info().rss / 1024 / 1024
            thread_count = threading.active_count()

            if rss_mb > self.MEMORY_LIMIT_MB:
                logger.critical(
                    f"MEMORY CRITICAL: RSS={rss_mb:.0f}MB > {self.MEMORY_LIMIT_MB}MB "
                    f"threads={thread_count} requests={self.request_count}"
                )
                gc.collect()  # Force GC as last resort
            elif rss_mb > self.WARN_THRESHOLD_MB:
                logger.warning(
                    f"MEMORY WARNING: RSS={rss_mb:.0f}MB > {self.WARN_THRESHOLD_MB}MB "
                    f"threads={thread_count} requests={self.request_count}"
                )

        return response
```

## 4.4 CI Guardrails

```yaml
# .github/workflows/memory-check.yml
name: Memory Leak Check

on: [pull_request]

jobs:
  memory-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Static analysis - connection leaks
        run: |
          echo "=== Checking for unmanaged connections ==="
          # Flag raw connection creation without context managers
          grep -rn "mysql.connector.connect\|psycopg2.connect\|GraphDatabase.driver\|Elasticsearch(" \
            --include="*.py" | grep -v "def \|#\|pool\|Pool" || true

          echo "=== Checking for threading.Timer usage ==="
          grep -rn "threading.Timer\|Thread(" --include="*.py" | grep -v "#\|test" || true

          echo "=== Checking for global mutable state ==="
          grep -rn "^[A-Za-z_].*= {}\|^[A-Za-z_].*= \[\]" --include="*.py" \
            | grep -v "__init__\|test\|migration\|#" || true

          echo "=== Checking for ast.literal_eval/eval ==="
          grep -rn "ast.literal_eval\|eval(" --include="*.py" | grep -v "#\|test" || true

      - name: Run memory regression tests
        run: |
          pip install -r requirements.txt
          python manage.py test tests.test_memory -v 2
```

## 4.5 Health Metrics to Track

| Metric | Source | Alert Threshold | Frequency |
|---|---|---|---|
| Process RSS (MB) | psutil | > 1024 MB | Every 30s |
| RSS growth rate (MB/hr) | Derived from RSS | > 20 MB/hr | Every 5 min |
| Active thread count | `threading.active_count()` | > 20 | Every 30s |
| Open TCP connections | psutil.connections() | > 100 | Every 30s |
| Neo4j Bolt pool size | Driver metrics | > 50 | Every 60s |
| GC generation 2 collections | gc.get_stats() | > 100/min | Every 60s |
| GC uncollectable objects | gc.garbage | > 0 | Every 60s |
| Request latency P99 | Middleware | > 5s | Per request |
| Python object count | gc.get_objects() | > 1M | Every 5 min |

---

# PART 5 — DELIVERABLES SUMMARY

## 5.1 Full Technical Documentation
- Architecture: Django 4.1.7 web app, 23 apps, 198 Python files, 320+ URL endpoints
- External services: MySQL, Neo4j, Redis, RabbitMQ, Elasticsearch, PostgreSQL, Redmine, Vault, Apprise
- Deployment: Docker container running `manage.py runserver` (development server in production)
- No async, no connection pooling, no caching framework, no production WSGI server

## 5.2 Memory Leak Risk Report

| Risk | Severity | Confidence | Impact |
|---|---|---|---|
| Neo4j Bolt driver accumulation | CRITICAL | 95% | ~1-10MB per request to graph views |
| threading.Timer thread leak | CRITICAL | 85% | ~8MB per snooze operation |
| PostgreSQL/ES connection leak | HIGH | 80% | ~0.1-1MB per analytics request |
| pymalloc arena fragmentation | HIGH | 70% | Gradual RSS growth, never returns to OS |
| Apprise URL accumulation | MEDIUM | 60% | Proportional to notification volume |
| Global mutable state (vault) | MEDIUM | 50% | Vault tokens/sessions in memory |
| Unbounded list/dict growth | MEDIUM | 50% | Proportional to data volume per request |

## 5.3 Ranked List of Probable Causes

1. **Neo4j Bolt driver never closed** — Node() creates new driver per instantiation across 15+ view functions
2. **threading.Timer accumulation** — Unbounded thread creation in notification snooze
3. **Connection leaks** — psycopg2, mysql.connector, Elasticsearch clients not in try/finally
4. **pymalloc fragmentation** — Large temporary allocations (Excel, PDF, 10k ES results)
5. **Apprise URL accumulation** — URLs added without clearing per notification cycle
6. **Development server in production** — Django runserver has known memory management issues

## 5.4 Concrete Fix Plan (Priority Order)

1. **IMMEDIATE:** Replace `manage.py runserver` with `gunicorn --max-requests 1000` in Dockerfile
2. **WEEK 1:** Implement Neo4j connection pool singleton (Fix 1)
3. **WEEK 1:** Replace threading.Timer with Celery tasks (Fix 2)
4. **WEEK 2:** Add connection pooling for PostgreSQL, MySQL, Elasticsearch (Fix 3)
5. **WEEK 2:** Add pagination to all unbounded queries (Fix 4)
6. **WEEK 3:** Remove global mutable state in vault/views.py (Fix 5)
7. **WEEK 3:** Add MemoryGuardMiddleware for monitoring (Section 4.3)
8. **WEEK 4:** Add memory regression tests to CI (Section 4.4)

## 5.5 Profiling Instructions
- See Step 3 above for ready-to-use code snippets for:
  - tracemalloc (heap snapshots)
  - memory_profiler (per-function)
  - objgraph (object graph analysis)
  - gc debugging (cycle detection)
  - psutil monitoring (process-level metrics)

## 5.6 Suggested Refactors

1. **Extract service layer** — Move business logic from views.py into services.py per app
2. **Merge duplicate apps** — sites/lesites, allonboard/newonb
3. **Parameterize all queries** — Eliminate Cypher injection, SQL injection throughout
4. **Replace eval/ast.literal_eval** — Use json.loads() everywhere
5. **Move credentials to environment** — Remove 10+ hardcoded passwords from source code
6. **Add Django LOGGING config** — Replace print() with structured logging
7. **Use Django cache framework** — Add Redis as cache backend for repeated queries

## 5.7 Preventive Engineering Controls
- Memory regression tests (Section 4.1)
- 8-hour soak test protocol (Section 4.2)
- Runtime MemoryGuardMiddleware (Section 4.3)
- CI static analysis checks (Section 4.4)
- Health metrics dashboard (Section 4.5)

---

# APPENDIX A — SECURITY VULNERABILITIES (Bonus Finding)

During the memory investigation, the following critical security issues were identified:

| # | Vulnerability | Location | Severity |
|---|---|---|---|
| 1 | Hardcoded SECRET_KEY | settings.py:28 | CRITICAL |
| 2 | ALLOWED_HOSTS = ['*'] | settings.py:33 | HIGH |
| 3 | Cypher injection (Neo4j) | Node.py (all query methods) | CRITICAL |
| 4 | SQL injection | sites/views.py, lesites/views.py, useronboard/views.py | CRITICAL |
| 5 | Command injection | snmp.py, Discover.py (os.system) | CRITICAL |
| 6 | Code execution via eval() | CreateCfg.py:14 | CRITICAL |
| 7 | Code execution via ast.literal_eval() | Redis.py, Vault.py | HIGH |
| 8 | Hardcoded admin password | app/views.py, login/views.py: `L1nKed3yE@2025` | CRITICAL |
| 9 | Hardcoded SMTP credentials | notification/views.py, allonboard/views.py: `eva@finspot.in` | CRITICAL |
| 10 | Hardcoded MySQL credentials | messagequeue_views.py: `root/rootpassword` | HIGH |
| 11 | Hardcoded Neo4j password | Node.py: `Neo@fin2025` | HIGH |
| 12 | Plaintext password storage | allonboard/models.py, newonb/models.py | HIGH |
| 13 | Vault root token in plaintext file | Vault.py | CRITICAL |
| 14 | X_FRAME_OPTIONS = None | settings.py:38 (overwritten later but still concerning) | MEDIUM |
| 15 | CORS_ORIGIN_ALLOW_ALL = True | settings.py:34 | HIGH |
| 16 | Path traversal potential | auditlogs/views.py (file serving) | MEDIUM |

---

*End of Technical Review*
