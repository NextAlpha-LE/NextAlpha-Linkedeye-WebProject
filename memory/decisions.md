# Decisions

Log of key architectural, technical, and project decisions.

## Format

- **Date** | **Decision** | **Context/Reasoning** | **Status** (active / revisited / superseded)

---

<!-- Add decisions below this line -->

## April 2026 - LinkedEye Platform Optimization

### 2026-04-02 | Neo4j Singleton Driver Pattern | **CRITICAL FIX #4**
**Decision:** Implement singleton pattern for Neo4j Bolt driver with connection pooling (25 connections) instead of creating new driver per request.
**Context:** Each `Node()` instantiation was creating a new Neo4j driver with its own TCP connection pool, causing 1-10MB memory leak per request across 15+ views.
**Impact:** ~40% memory reduction, eliminated Neo4j connection leaks.
**Status:** ✅ active

### 2026-04-02 | Replace threading.Timer with Celery | **CRITICAL FIX #5**
**Decision:** Replace `threading.Timer` with Celery `apply_async(countdown=N)` for delayed notification resumption.
**Context:** Each snooze created a new thread (~8MB stack), accumulating over time.
**Impact:** Zero extra threads, uses existing RabbitMQ worker pool, persistent across restarts.
**Status:** ✅ active

### 2026-04-02 | Remove Hidden Node() Instantiation | **CRITICAL FIX #7**
**Decision:** Remove `self.node = Node()` from `MQ.py` and `Redis.py`.
**Context:** Non-graph operations (MQ publish, Redis get/set) were creating hidden Neo4j connections.
**Impact:** Eliminated cascading Neo4j connection leaks.
**Status:** ✅ active

### 2026-04-02 | Parameterize ALL Cypher Queries | **CRITICAL FIX #8**
**Decision:** All 50+ Cypher queries in `Node.py` now use parameters: `session.run(query, parameters)`.
**Context:** String concatenation with user input was vulnerable to Neo4j injection attacks.
**Impact:** Security hardening, prevents injection attacks.
**Status:** ✅ active

### 2026-04-02 | Move Hardcoded Credentials to Env Vars | **CRITICAL FIX #19**
**Decision:** All sensitive credentials (Neo4j, Postgres, ES, Redmine, Email) moved to environment variables.
**Context:** 10+ hardcoded passwords found in source code - security risk.
**Impact:** Credentials now managed via K8s secrets or .env file.
**Status:** ✅ active

### 2026-04-02 | Add Health Check Endpoint | **HIGH FIX #3**
**Decision:** Add `/health/` endpoint for K8s liveness/readiness probes.
**Context:** K8s deployment requires health check endpoint.
**Impact:** Returns RSS, threads, connections, CPU without hitting database.
**Status:** ✅ active

### 2026-04-02 | RabbitMQ Context Manager | **HIGH FIX #6**
**Decision:** Add `__enter__()` and `__exit__()` to `MQ.py` for context manager pattern.
**Context:** RabbitMQ connections were not being closed properly.
**Impact:** Connections always closed via `with MQ() as mq:` pattern.
**Status:** ✅ active

### 2026-04-02 | PostgreSQL Connection Pooling | **HIGH FIX #9**
**Decision:** Use `dj_db_conn_pool.backends.postgresql` for analytics database.
**Context:** Raw psycopg2 connections created per request.
**Impact:** Pool size 5, max overflow 10, 300s recycle.
**Status:** ✅ active

### 2026-04-02 | Elasticsearch Singleton Client | **HIGH FIX #10**
**Decision:** Configure single ES client with connection pooling in settings.py.
**Context:** New ES client per request = new urllib3 pool per request.
**Impact:** Single client with timeout=30, max_retries=3.
**Status:** ✅ active

### 2026-04-02 | Django Redis Cache Backend | **HIGH FIX #13**
**Decision:** Enable `django_redis` for caching and session storage.
**Context:** Redis was in stack but not used for Django caching.
**Impact:** Cache-backed sessions, 50 connection pool, compressed storage.
**Status:** ✅ active

### 2026-04-02 | Remove Global Mutable State | **HIGH FIX #15**
**Decision:** Remove `Obj = {}` global from `vault/views.py`, create `Vault()` per request.
**Context:** Module-level dict persists across ALL requests - thread-unsafe.
**Impact:** Request-scoped Vault instances, thread-safe.
**Status:** ✅ active

### 2026-04-02 | Replace ast.literal_eval with json.loads | **HIGH FIX #16**
**Decision:** Replace `ast.literal_eval()` with `json.loads()` in Redis.py and Vault.py.
**Context:** `ast.literal_eval()` on external data is a code execution risk.
**Impact:** Security hardening, safer JSON parsing.
**Status:** ✅ active

### 2026-04-02 | Django LOGGING Configuration | **MEDIUM FIX #18**
**Decision:** Add comprehensive `LOGGING` dict to settings.py with JSON formatter.
**Context:** No logging config, `print()` statements going to Docker buffer.
**Impact:** Structured logging to console and rotating files (50MB, 5 backups).
**Status:** ✅ active

### 2026-04-02 | Fix File Handles with Context Managers | **MEDIUM FIX #20**
**Decision:** All file operations now use `with` statements.
**Context:** Files opened without context managers leaked file descriptors.
**Impact:** Proper file handle cleanup.
**Status:** ✅ active

### 2026-04-02 | MemoryGuardMiddleware | **MEDIUM FIX #22**
**Decision:** Create Django middleware to track RSS per request.
**Context:** Need runtime memory monitoring to catch regressions.
**Impact:** Warns at 768MB, forces GC at 1024MB, logs to Elasticsearch.
**Status:** ✅ active

### 2026-04-02 | Prometheus Metrics Endpoint | **MEDIUM FIX #25**
**Decision:** Add `/metrics/` endpoint exposing process metrics.
**Context:** Need Prometheus integration for monitoring.
**Impact:** Exposes RSS, threads, connections, latency, Neo4j pool size.
**Status:** ✅ active

### 2026-04-02 | Add psutil, prometheus-client Dependencies | **INFRASTRUCTURE**
**Decision:** Add `psutil==5.9.8`, `prometheus-client==0.19.0`, `python-json-logger==2.0.7` to requirements.txt.
**Context:** Required for health checks, metrics, and structured logging.
**Impact:** Enhanced monitoring capabilities.
**Status:** ✅ active

### 2026-04-02 | Create .env.example Template | **INFRASTRUCTURE**
**Decision:** Create comprehensive `.env.example` with all environment variables.
**Context:** Teams need template for setting up environments.
**Impact:** Standardized configuration management.
**Status:** ✅ active

---

## Pending Decisions

### TBD | Merge Duplicate Apps | **MEDIUM FIX #17**
**Decision:** Merge `sites/` + `lesites/` and `allonboard/` + `newonb/`.
**Context:** Two pairs of nearly identical apps double maintenance surface.
**Impact:** Reduced code duplication, simpler maintenance.
**Status:** ⏳ pending

### TBD | Extract Service Layer | **PREVENTIVE FIX #27**
**Decision:** Move business logic from views.py to services.py per app.
**Context:** Business logic embedded in Django views reduces testability.
**Impact:** Cleaner connection management, reusable services.
**Status:** ⏳ pending

### TBD | Streaming Excel/PDF Exports | **MEDIUM FIX #21**
**Decision:** Use openpyxl streaming mode for large exports.
**Context:** Analytics exports load entire datasets into memory.
**Impact:** Reduced memory for large exports.
**Status:** ⏳ pending
