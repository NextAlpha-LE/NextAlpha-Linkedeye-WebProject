"""
LinkedEye 8-Hour Soak Test — MEDIUM FIX #24
Run with: locust -f tests/soak_test.py --host=http://localhost:8000 --headless -u 20 -r 2 --run-time 8h

Pass criteria: RSS growth < 20MB/hr over 8 hours.

Requirements: pip install locust requests
"""

import time
import json
import logging
from locust import HttpUser, task, between, events

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────
# METRICS COLLECTOR — polls /health/ and tracks RSS
# ─────────────────────────────────────────────────
RSS_HISTORY = []
START_TIME = None


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    global START_TIME
    START_TIME = time.time()
    logger.info("Soak test started — target: <20MB/hr RSS growth over 8 hours")


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    if len(RSS_HISTORY) < 2:
        logger.warning("Not enough RSS samples to calculate growth rate")
        return

    first = RSS_HISTORY[0]
    last = RSS_HISTORY[-1]
    elapsed_hours = (last["time"] - first["time"]) / 3600

    if elapsed_hours < 0.1:
        logger.warning("Test ran for less than 6 minutes — results unreliable")
        return

    rss_growth = last["rss_mb"] - first["rss_mb"]
    growth_per_hour = rss_growth / elapsed_hours

    logger.info(f"╔══════════════════════════════════════════════╗")
    logger.info(f"║  SOAK TEST RESULTS                           ║")
    logger.info(f"╠══════════════════════════════════════════════╣")
    logger.info(f"║  Duration:       {elapsed_hours:.1f} hours")
    logger.info(f"║  Start RSS:      {first['rss_mb']:.1f} MB")
    logger.info(f"║  End RSS:        {last['rss_mb']:.1f} MB")
    logger.info(f"║  Total growth:   {rss_growth:.1f} MB")
    logger.info(f"║  Growth rate:    {growth_per_hour:.1f} MB/hr")
    logger.info(f"║  Max RSS:        {max(s['rss_mb'] for s in RSS_HISTORY):.1f} MB")
    logger.info(f"║  Max threads:    {max(s.get('threads', 0) for s in RSS_HISTORY)}")
    logger.info(f"║  Max conns:      {max(s.get('connections', 0) for s in RSS_HISTORY)}")
    logger.info(f"╠══════════════════════════════════════════════╣")

    if growth_per_hour < 20:
        logger.info(f"║  RESULT: ✅ PASS  ({growth_per_hour:.1f} MB/hr < 20 MB/hr)")
    else:
        logger.error(f"║  RESULT: ❌ FAIL  ({growth_per_hour:.1f} MB/hr >= 20 MB/hr)")

    logger.info(f"╚══════════════════════════════════════════════╝")


# ─────────────────────────────────────────────────
# SIMULATED USER — market-day traffic patterns
# ─────────────────────────────────────────────────
class LinkedEyeUser(HttpUser):
    wait_time = between(1, 5)

    def on_start(self):
        """Login at session start."""
        self.client.get("/", name="[auth] landing")

    @task(10)
    def health_check(self):
        """Poll health endpoint and record RSS."""
        with self.client.get("/health/", catch_response=True, name="[monitor] /health/") as resp:
            if resp.status_code == 200:
                try:
                    data = resp.json()
                    RSS_HISTORY.append({
                        "time": time.time(),
                        "rss_mb": data.get("rss_mb", 0),
                        "threads": data.get("threads", 0),
                        "connections": data.get("connections", 0),
                    })
                    rss = data.get("rss_mb", 0)
                    if rss > 1024:
                        logger.critical(f"RSS={rss:.0f}MB — exceeds 1024MB threshold!")
                    elif rss > 768:
                        logger.warning(f"RSS={rss:.0f}MB — approaching warning threshold")
                except json.JSONDecodeError:
                    resp.failure("Invalid JSON from /health/")

    @task(5)
    def dashboard(self):
        """Load main dashboard."""
        self.client.get("/dashboard/", name="[page] dashboard")

    @task(3)
    def entity_graph(self):
        """Load entity graph visualization."""
        self.client.get("/entity/", name="[page] entity")

    @task(3)
    def audit_logs(self):
        """Fetch paginated audit logs."""
        self.client.get("/auditlogs/get_auditlogs/?page=1&page_size=100", name="[api] auditlogs")

    @task(2)
    def site_health(self):
        """Check site health."""
        self.client.get("/sitehealth/", name="[page] sitehealth")

    @task(2)
    def notifications(self):
        """Load notifications page."""
        self.client.get("/notification/", name="[page] notifications")

    @task(2)
    def bod_eod(self):
        """Load BOD/EOD status."""
        self.client.get("/bod-eodstatus/", name="[page] bod-eod")

    @task(1)
    def vault_status(self):
        """Check vault."""
        self.client.get("/vault/", name="[page] vault")

    @task(1)
    def metrics(self):
        """Fetch Prometheus metrics."""
        self.client.get("/metrics/", name="[monitor] /metrics/")

    @task(1)
    def all_sites(self):
        """Load all sites."""
        self.client.get("/lesites/", name="[page] lesites")
