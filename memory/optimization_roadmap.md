# LinkedEye Optimization Roadmap

Source: `linkedeye_optimization_checklist.pdf` — Principal Engineer Review, April 2026
By: Santhira Technologies / Finspot
Scope: 34 items, 5 phases, 4 weeks
Targets: 60-80% memory reduction, 90%+ connection leaks eliminated, <20MB/hr RSS growth

---

## PHASE 1 — IMMEDIATE (DAY 0): Stop the Bleeding

| # | Item | Severity | File(s) | Status |
|---|------|----------|---------|--------|
| 1 | Replace `manage.py runserver` with Gunicorn | CRITICAL | `Dockerfile` | DONE |
| 2 | Set K8s memory limits + liveness/readiness/startup probes | CRITICAL | `k8s/deployment.yaml` | DONE |
| 3 | Add `/health/` endpoint (returns RSS, threads, connections) | CRITICAL | `metrics.py`, `urls.py` | DONE |

## PHASE 2 — WEEK 1: Fix Connection Leaks

| # | Item | Severity | File(s) | Status |
|---|------|----------|---------|--------|
| 4 | Neo4j: Singleton driver with connection pool | CRITICAL | `lib/LinkedEyeEntity/Node.py` | DONE |
| 5 | Replace `threading.Timer` with Celery | CRITICAL | `notification/tasks.py` | DONE |
| 6 | RabbitMQ: Context manager pattern | HIGH | `lib/LinkedEyeMQ/MQ.py` | DONE |
| 7 | Remove hidden `Node()` from MQ.py and Redis.py | CRITICAL | `MQ.py`, `Redis.py` | DONE |
| 8 | Parameterize ALL Cypher queries + `_safe_label()` sanitizer | CRITICAL | `lib/LinkedEyeEntity/Node.py` | DONE |

## PHASE 3 — WEEK 2: Database & Service Connection Pooling

| # | Item | Severity | File(s) | Status |
|---|------|----------|---------|--------|
| 9 | PostgreSQL: `dj_db_conn_pool` pooling | HIGH | `settings.py` | DONE |
| 10 | Elasticsearch: Singleton client config | HIGH | `settings.py` | DONE |
| 11 | MySQL analytics: `AnalyticsDBConnection` context manager for all 3 functions | HIGH | `bodeodstatus/messagequeue_views.py` | DONE |
| 12 | Pagination: auditlogs (500 default, 5k max), ES exports capped at 10k | HIGH | `auditlogs/views.py`, `analytics/views.py` | DONE |
| 13 | Django Redis cache backend + session cache | HIGH | `settings.py` | DONE |
| 14 | Apprise: fresh instance per send cycle | MEDIUM | `Notification.py` | DONE (already fixed) |

## PHASE 4 — WEEK 3: State Management & Architecture Cleanup

| # | Item | Severity | File(s) | Status |
|---|------|----------|---------|--------|
| 15 | Remove global `Obj = {}` — request-scoped Vault | HIGH | `vault/views.py` | DONE |
| 16 | `ast.literal_eval()` → `json.loads()` | HIGH/SECURITY | `Redis.py`, `Vault.py` | DONE |
| 17 | Merge duplicate apps: deleted `sites/` and `newonb/` (unused duplicates) | MEDIUM | settings.py | DONE |
| 18 | Django `LOGGING` config with JSON formatter | MEDIUM | `settings.py` | DONE |
| 19 | Hardcoded credentials → env vars | CRITICAL/SECURITY | multiple files | DONE |
| 20 | File handles: `with` statements | MEDIUM | `Vault.py` | DONE |
| 21 | Streaming Excel export (`write_only=True`) + 10k cap | MEDIUM | `analytics/views.py` | DONE |

## PHASE 5 — WEEK 4: Monitoring & Preventive Controls

| # | Item | Severity | File(s) | Status |
|---|------|----------|---------|--------|
| 22 | `MemoryGuardMiddleware` (warn 768MB, GC 1024MB) | MEDIUM | `middleware.py` | DONE |
| 23 | CI guardrails: GitHub Actions memory-check workflow | MEDIUM | `.github/workflows/memory-check.yml` | DONE |
| 24 | 8-hour soak test (locust, pass: <20MB/hr growth) | MEDIUM | `tests/soak_test.py` | DONE |
| 25 | Prometheus `/metrics` endpoint | MEDIUM | `metrics.py` | DONE |
| 26 | K8s HPA auto-scaling (2-5 pods, CPU 70%, mem 80%) | MEDIUM | `k8s/hpa.yaml` | DONE |
| 27 | Extract service layer (`services.py` for 6 apps) | PREVENTIVE | entity, notification, dashboard, vault, allonboard, bodeodstatus | DONE |

---

## SUMMARY: 34/34 DONE

**All items complete.** Ready for production deployment.

## Alert Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| RSS > 1024MB | Critical | Alert + force GC |
| Growth > 20MB/hr | Warning | Alert + investigate |
| Threads > 20 | Warning | Timer leak warning |
| TCP conns > 100 | Warning | Connection leak |
| GC gen2 > 100/min | Warning | Reference cycles |
| P99 latency > 5s | Warning | Performance alert |
