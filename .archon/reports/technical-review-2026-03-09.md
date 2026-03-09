# le-finspot/linkedeyewebproject — Complete Technical Review  
**Report Date:** 2026-03-09 | **Triggered by:** @le-finspot | **Prepared by:** Archon Technical Analyst  

---

## Part 1: Architecture Overview

### 1.1 Component Connectivity Diagram

```
        ┌──────────────────┐
        │  Browser (SPA)   │◀─HTTPS──┐
        └──────────────────┘         │
                │                  Webhooks
                ▼                    │
        ┌──────────────────┐     ┌─────────────┐
        │ Django + Gunicorn│────▶│ PostgreSQL  │
        └──────────────────┘     └─────────────┘
                │
                ▼
        ┌──────────────────┐     ┌─────────────┐
        │  Celery Worker   │◀──▶│   Redis     │
        └──────────────────┘     └─────────────┘
                │
                ▼
        ┌──────────────────┐
        │ Google SSO API  │
        └──────────────────┘
```

### 1.2 Entry Points

| Entry Point | File | Method / Trigger | Auth Required | Notes |
|-------------|------|-----------------|---------------|-------|
| `/` | `LinkedEyeWebProject/LinkedEyeWebProject/urls.py` | `serve_react` | No | Serves SPA index.html |
| `/admin/` | Django admin | `admin.site.urls` | Yes | Staff flag |
| `/accounts/` | `allauth` urls | Social auth | Yes | Google SSO |
| `/analytics/` | `analytics/urls.py` | `AnalyticsView` | Yes | REST-ish |
| `/allonboard/` | `allonboard/urls.py` | `OnboardView` | Yes | Onboarding wizard |
| `/addservice/` | `addservice/urls.py` | `AddServiceView` | Yes | Service catalog |
| `manage.py LEDefaultAddservices` | `addservice/management/commands/LEDefaultAddservices.py` | CLI | No | Seed default services |

### 1.3 External Services & Dependencies

| Service | Purpose | Auth Method | Data Sent | Risk if Down |
|---------|---------|-------------|-----------|-------------|
| Google OAuth | SSO login | OAuth2 client-id/secret | email, profile | Users cannot log in |
| PostgreSQL | Primary store | Django ORM | All entities | Total outage |
| Redis | Celery broker | URL | Task payloads | Background jobs stall |

### 1.4 Primary Data Flows

1. **User Login:** Browser → Google OAuth → Django session → React SPA  
2. **Analytics Query:** React → `/analytics/` → ORM → PostgreSQL → JSON response  
3. **Service Addition:** React → `/addservice/` → Celery task → Redis → Worker → DB  
4. **On-boarding:** React → `/allonboard/` → Models → DB → Email (future)  

---

## Part 2: Module-by-Module Documentation

### Module: LinkedEyeWebProject (core)

**Purpose:** Django project bootstrap, settings, Celery config.

| File | Purpose | Key Functions | External Calls | CRITICAL FLAGS |
|------|---------|--------------|----------------|---------------|
| `settings.py` | Global config | `CELERY_BROKER_URL`, `DATABASES` | PostgreSQL, Redis | 🟠 HARDCODED CREDENTIAL — `SECRET_KEY` in repo |
| `celery.py` | Celery app | `app.config_from_object` | Redis | — |
| `urls.py` | Root routing | `serve_react`, `admin`, `allauth` | — | — |

### Module: app (shared utilities)

**Purpose:** Common templates, static assets, adapters.

| File | Purpose | Key Functions | External Calls | CRITICAL FLAGS |
|------|---------|--------------|----------------|---------------|
| `adapter.py` | Allauth adapter | `save_user` | — | 🔴 NO INPUT VALIDATION — accepts raw POST |
| `forms.py` | Django forms | `SignupForm` | — | — |
| `models.py` | Empty file | — | — | ⚪ DEAD CODE |

### Module: analytics

**Purpose:** Dashboard metrics & reporting.

| File | Purpose | Key Functions | External Calls | CRITICAL FLAGS |
|------|---------|--------------|----------------|---------------|
| `views.py` | REST endpoints | `AnalyticsView.get` | PostgreSQL | 🟡 RAW SQL — string concat with `date_from`, `date_to` |
| `models.py` | ORM models | `Metric`, `Report` | — | — |

### Module: allonboard

**Purpose:** Multi-step onboarding wizard.

| File | Purpose | Key Functions | External Calls | CRITICAL FLAGS |
|------|---------|--------------|----------------|---------------|
| `views.py` | Step handlers | `OnboardView.post` | — | 🔴 NO INPUT VALIDATION — saves POST dict directly |
| `models.py` | `OnboardProgress` | — | — | — |

### Module: addservice

**Purpose:** Service catalog & default seeding.

| File | Purpose | Key Functions | External Calls | CRITICAL FLAGS |
|------|---------|--------------|----------------|---------------|
| `views.py` | CRUD services | `AddServiceView` | — | 🔴 NO INPUT VALIDATION |
| `management/commands/LEDefaultAddservices.py` | Seed command | `handle` | — | 🟠 MISSING ERROR HANDLING — `except Exception: pass` |

---

## Part 3: Code Quality Analysis

### 3.1 Complexity Hotspots

| File | Function / Method | Why It's Complex | Refactoring Suggestion |
|------|-----------------|-----------------|----------------------|
| `analytics/views.py` | `AnalyticsView.get` | 80+ lines, nested if/else, string SQL building | Extract query builder, use ORM or raw with params |
| `allonboard/views.py` | `OnboardView.post` | 60+ lines, multiple step branches | Split into small step classes |

### 3.2 Anti-Patterns

| Location | Pattern | Impact | Recommended Fix |
|----------|---------|--------|----------------|
| `settings.py` | `SECRET_KEY = 'django-insecure-...'` | Credential leak | Move to env var |
| `analytics/views.py` | `"SELECT * FROM metrics WHERE date BETWEEN '%s' AND '%s'" % (...)` | SQL injection | Use parameterized raw or ORM |
| `addservice/management/commands/LEDefaultAddservices.py` | `except: pass` | Silent failures | Log and raise |
| `app/models.py` | Empty file kept | Dead code | Delete |

### 3.3 Test Coverage Gaps

| File / Function | Risk Level | Notes |
|-----------------|-----------|-------|
| `analytics/views.py` | High | No test file |
| `allonboard/views.py` | High | No test file |
| `addservice/views.py` | Medium | No test file |

---

## Part 4: Performance Analysis

### 4.1 Blocking Operations

| Location | Operation | Impact | Fix |
|----------|-----------|--------|-----|
| `analytics/views.py` | `cursor.execute(big_sql)` | Blocks request thread | Move heavy queries to Celery & cache |
| `allonboard/views.py` | Sequential model saves | Latency | Bundle into single transaction |

### 4.2 Memory Growth Risks

| Location | Data Structure | Growth Trigger | Mitigation |
|----------|---------------|---------------|-----------|
| `analytics/views.py` | `cursor.fetchall()` | Large date range | Paginate or stream |

### 4.3 Database & I/O Patterns

| Pattern | Location | Issue | Fix |
|---------|----------|-------|-----|
| Missing index | `Metric.date` | Full table scan | Add `db_index=True` |
| N+1 potential | `OnboardProgress.user` | Access in loop | `select_related` |

---

## Part 5: Recommendations

### 5.1 Critical — Address This Sprint

1. Move `SECRET_KEY` to environment variable (`settings.py:24`)  
2. Replace raw SQL with parameterized query (`analytics/views.py:42`)  
3. Add input sanitization in `allonboard/views.py:55` before `update(**request.POST)`  

### 5.2 Important — Next 2 Weeks

1. Write unit tests for `analytics`, `allonboard`, `addservice` views  
2. Add logging instead of silent except in `LEDefaultAddservices.py`  
3. Add pagination to analytics endpoint  

### 5.3 Architecture — Next Quarter

1. Introduce Django REST Framework for consistent API layer  
2. Split analytics into async Celery tasks with Redis result cache  
3. Containerize workers separately for horizontal scaling  

---
*Report generated by Archon AI Technical Analyst. All findings are based on static analysis of provided source files. Review before acting — AI analysis may miss context.*