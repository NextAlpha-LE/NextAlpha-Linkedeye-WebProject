# LinkedEye Connectivity Flow Diagrams (As-Is)

Detailed connectivity flow diagrams documenting the current architecture and data flows across all LinkedEye subsystems.

---

## 1. BOD/EOD Health Check Flow

```
+------------------+     cron */2 min     +------------------+     set keys      +------------------+
|  urlchecker.py   | ------------------> |     Redis        | <----------------- | telnet_checker   |
|  - HTTP status   |                     |   (32268)        |                    |    .py           |
|  - SSL expiry    |                     |   smifs-prod-le  |                    | - TCP connect    |
|  - WebSocket     |                     |   .finspot.in    |                    | - Port check     |
|  - Retry: 3x     |                     |                  |                    | - Timeout: 5s    |
|  - Timeout: 5s   |                     |  Keys:           |                    +------------------+
+------------------+                     |  {site}:BOD_     |
                                         |   URLChecker     |     cron 07:00     +------------------+
                                         |  {site}:BOD_     | <----------------- | k8s_ssl_check.py |
                                         |   TelnetChecker  |                    | - kubeadm certs  |
                                         |  {site}:BOD_     |                    | - Warn <30 days  |
                                         |   K8S_SSL_Expiry |                    | - Crit <15 days  |
                                         |  Holiday         |                    +------------------+
                                         |  Mock            |
                                         +--------+---------+     cron 07:00     +------------------+
                                                  |           <----------------- | holiday_checker  |
                                                  |                              |    .py           |
                                    publish       |                              | - NSE/BSE/MCX    |
                                    on each       |                              | - Mock calendar  |
                                    check run     |                              | - CSV → Redis    |
                                                  |                              +------------------+
                                                  v
                          +-----------------------+------------------------+
                          |                                                |
                          v                                                v
                 +------------------+                             +------------------+
                 |    RabbitMQ      |                             |  Apprise         |
                 |    (30916)       |                             |  (Notification)  |
                 |                  |                             |                  |
                 |  Exchanges:      |                             |  POST /send-     |
                 |  - bod_update    |                             |   notification   |
                 |  - map_update    |                             |                  |
                 |                  |                             |  Triggered on:   |
                 |  Payload:        |                             |  - --summary     |
                 |  {refresh:1,     |                             |    mode (12:00)  |
                 |   mode:"BOD",    |                             |  - SSL expiry    |
                 |   site:"prod"}   |                             |    warnings      |
                 +--------+---------+                             |  - Check failures|
                          |                                       +------------------+
                          | fanout
                          v
                 +------------------+
                 |  Django UI       |
                 |  WebSocket       |       GET /bod-eodstatus/getbodeodkeys
                 |  Consumer        |       ?sitename=prod&mode=BOD|EOD|ADP|ALL
                 |                  | ----> reads Redis keys per site
                 |  Real-time       |       filters by user Usersite assignments
                 |  dashboard       |       returns JSON with status 0/1/2/3/5
                 |  refresh         |
                 +------------------+
```

### Cron Schedule Timeline

| Time | Script | Target | Description |
|------|--------|--------|-------------|
| 00:01 | HouseKeeping.py | Elasticsearch | Delete intraday yesterday, history >365 days |
| */2m | urlchecker.py | Redis → RabbitMQ | Continuous health checks |
| */2m | telnet_checker.py | Redis → RabbitMQ | If TELNET_ENABLED=yes |
| 07:00 | holiday_checker.py | Redis | Load market calendars |
| 07:00 | k8s_ssl_check.py | Redis | If K8S_ENABLED=yes |
| 12:00 | urlchecker.py --summary | Apprise | Daily summary notification |
| 12:00 | telnet_checker.py --summary | Apprise | Daily summary notification |

---

## 2. Elasticsearch Housekeeping Flow

```
+------------------+     cron 00:01      +------------------+     delete_by_query  +------------------+
| HouseKeeping.py  | -----------------> |  Elasticsearch   | <------------------- |  Retry Logic     |
| (BOD container)  |                    |  (analytics-es)  |                      |  10 attempts     |
|                  |                    |  Port: 9200      |                      |  60s intervals   |
| Commands:        |                    |                  |                      +------------------+
| all-intraday     |                    |  Query:          |
|   yesterday      |                    |  {"match":       |
| tts-hsauthaccess |                    |   {"linkedeye_   |
|   -intraday      |                    |    cleanup":     |
| noren-ordupd     |                    |    _date}}       |
|   -intraday      |                    |                  |
| noren-logout     |                    |  Indices:        |
|   -intraday      |                    |  *-intraday      |
| noren-login      |                    |  *-history       |
|   -intraday      |                    |                  |
| tts-ntfy         |                    +------------------+
|   -intraday      |
| all-history 365  |
+------------------+
```

---

## 3. Nagios Monitor → Alert Propagation Flow

```
+------------------+     check exec      +------------------+     state change    +------------------+
|  Nagios Engine   | -----------------> |  50+ Libexec     | -----------------> | Notification     |
|  (Port 82)       |                    |  Plugins         |                    | Handlers         |
|  nagios.cfg      |                    |  all_libexec/    |                    |                  |
|                  |                    |  libexec/        |                    | delta_update_    |
|  NDOUtils → MySQL|                    |  check_alluxio   |                    |   host.py        |
|  (status history)|                    |  check_apache_   |                    | delta_update_    |
|                  |                    |    drill         |                    |   service.py     |
+------------------+                    |  check_ambari    |                    +--------+---------+
                                        |  check_*         |                             |
                                        +------------------+              +--------------+--------------+
                                                                          |              |              |
                                                                          v              v              v
                                                                 +----------+   +----------+   +------------------+
                                                                 |  Neo4j   |   | RabbitMQ |   | StackStorm       |
                                                                 |  (7687)  |   |  (5672)  |   | st2service_      |
                                                                 |          |   |          |   |   handler.py     |
                                                                 | Node()   |   | publish  |   |                  |
                                                                 | .update( |   | exchange=|   | Only on state    |
                                                                 |  title,  |   | 'delta_  |   | CHANGE:          |
                                                                 |  bulk_   |   |  update' |   | LASTSTATEID !=   |
                                                                 |  update= |   |          |   |   STATEID        |
                                                                 |  {status,|   | fanout   |   |                  |
                                                                 |   msg,   |   | to UI    |   | POST /api/v1/    |
                                                                 |   time}) |   | consumer |   |  webhooks/st2    |
                                                                 +----------+   +----------+   +------------------+
```

**Host States:** 0=UP, 1=DOWN, 2=UNREACHABLE

**Service States:** 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN

---

## 4. Prometheus → AlertManager Webhook Routing

```
+------------------+                    +------------------+
| AlertManager     |                    |  StackStorm      |
| (8080)           |                    |  st2web (80)     |
|                  |                    |  fs-linkedeye    |
| group_wait: 1s   |                    |                  |
| group_interval:  |                    |  /api/v1/        |
|   1s             |                    |   webhooks/      |
| repeat_interval: |                    |                  |
|   3h             |                    +------------------+
|                  |                             ^
| Route Matching:  |                             |
+------------------+                             |
        |                                        |
        +--- service=snmpAlert -----> snmpwebhook -----> /webhooks/alertManager
        |
        +--- huawei=huaweialert ----> huaweiwebhook ---> /webhooks/huawei
        |
        +--- aruba=arubaalert ------> arubawebhook ----> /webhooks/aruba
        |
        +--- arista=aristaalert ----> aristawebhook ---> /webhooks/arista
        |
        +--- dell=dellalert --------> dellwebhook -----> /webhooks/dell
        |
        +--- fortigate=fortigate ---> fortigatewebhook > /webhooks/fortigate
        |
        +--- hardware=* ------------> hardwarewebhook -> /webhooks/hardwareinfo
        |
        +--- ilo=iloalert ----------> ilowebhook ------> /webhooks/ilo
        |
        +--- idrac=idracalert ------> idracwebhook ----> /webhooks/idrac
        |
        +--- windows=windowsalert --> windowswebhook --> /webhooks/windows
        |
        +--- switch=switchalert ----> (status aggregation routes)
        |
        +--- virtualnic=* ----------> virtualnicwebhook  (default receiver)
        |
        +--- (others per device vendor)
```

- All webhooks authenticated via: `?st2-api-key=<key>`
- `send_resolved: false` (alerts only, no recovery notifications)
- `max_alerts: 0` (unlimited batching)

---

## 5. Management Console Authentication Flow

```
+------------------+                    +------------------+                    +------------------+
|  Browser         |     GET /          |  Django          |     redirect       |  Azure AD        |
|  (User)          | -----------------> |  (LinkedEye UI)  | -----------------> |  (MSAL)          |
|                  |                    |  Port: 8000      |                    |  login.microsoft |
|                  |                    |  Gunicorn         |                    |    online.com    |
|                  |                    +------------------+                    +--------+---------+
|                  |                             ^                                      |
|                  |                             |          auth/redirect callback       |
|                  |                             +--------------------------------------+
|                  |                             |
+------------------+                             v
                                        +------------------+
                                        |  Domain Check    |
                                        |  @finspot.in     |
                                        +--------+---------+
                                                 |
                                    +------------+------------+
                                    |                         |
                              admin/djangoadmin          normal user
                                    |                         |
                                    v                         v
                            +------------------+     +------------------+
                            |  Direct Login    |     |  OTP Flow        |
                            |  (bypass OTP)    |     |                  |
                            +--------+---------+     |  generateOtp     |
                                     |               |  → 6-digit code  |
                                     |               |  → Office365     |
                                     |               |    SMTP send     |
                                     |               |  → eva@finspot.in|
                                     |               |  → 5min expiry   |
                                     |               |                  |
                                     |               |  verifyOTP       |
                                     |               |  → check code    |
                                     |               |  → check expiry  |
                                     |               +--------+---------+
                                     |                        |
                                     +------------+-----------+
                                                  |
                                                  v
                                         +------------------+
                                         |  Session Created |
                                         |  RBAC Applied    |
                                         |                  |
                                         |  Groups:         |
                                         |  Admin (21)      |
                                         |  Google (20)     |
                                         |  O365 (20)       |
                                         |  ViewOnly (20)   |
                                         +--------+---------+
                                                  |
                                    +-------------+-------------+
                                    |                           |
                              Admin routes               User routes
                              /leadmin/                  /dashboard/
                              /useronboard/              /bod-eodstatus/
                              /lesites/                  /ticket/
                              /applications/             /entity/
                              /auditlogs/                /analytics/
                              /vault/                    /notification/
```

---

## 6. UI → Backend Service Connectivity Map

```
+--------------------------------------------------------------------------------------------------+
|                              DJANGO UI (LinkedEye WebProject)                                     |
|                              Host: K8s Pod in fs-linkedeye namespace                              |
+--------------------------------------------------------------------------------------------------+
        |              |              |              |              |              |
        v              v              v              v              v              v
+----------+   +----------+   +----------+   +----------+   +----------+   +----------+
| MySQL    |   |  Neo4j   |   | Redmine  |   |  Redis   |   | Elastic  |   | Postgres |
| (31728)  |   | (7474/   |   | (HTTP)   |   | (per     |   | (9200)   |   | (5432)   |
|          |   |  7687)   |   |          |   |  site)   |   |          |   |          |
| linkedeye|   | bolt://  |   | REST API |   | BOD/EOD  |   | Log      |   | superset |
| DB       |   | entity   |   | - Users  |   | keys     |   | search   |   | DB       |
| - Users  |   | - Nodes  |   | - Issues |   | Calendar |   | Audit    |   | Dashbrd  |
| - Sites  |   | - Relns  |   | - Roles  |   | Session  |   | Index    |   | Charts   |
| - Apps   |   | - Topo   |   | - Proj   |   |          |   |          |   |          |
| - Audit  |   |          |   |          |   |          |   |          |   |          |
+----------+   +----------+   +----------+   +----------+   +----------+   +----------+
        |              |              |
        v              v              v
+----------+   +----------+   +----------+
|  Vault   |   | Apprise  |   |Prometheus|
| (8200)   |   | (HTTP)   |   | (9090)   |
|          |   |          |   | per-site |
| Secrets  |   | Notify   |   | Metrics  |
| CRUD     |   | Send     |   | Query    |
+----------+   +----------+   +----------+
```

- All inter-service communication within K8s namespace: `fs-linkedeye`
- Service discovery via K8s DNS: `<svc-name>.fs-linkedeye:<port>`
- External access via Nginx reverse proxy (`linkedeye-le`)
- TLS terminated at ingress (`finspot.in` SSL cert)

---

## 7. StackStorm Internal Flow

```
+------------------+     webhook POST    +------------------+     match rules    +------------------+
| AlertManager     | -----------------> | st2api           | -----------------> | st2rulesengine   |
| Nagios Handlers  |                    | (443)            |                    |                  |
| (15 endpoints)   |                    |                  |                    | Trigger:         |
+------------------+                    | Auth:            |                    | nagios.service_  |
                                        | st2-api-key      |                    |  state_change    |
                                        | or token auth    |                    |                  |
                                        +------------------+                    +--------+---------+
                                                                                         |
                                        +------------------+     execute         +--------+---------+
                                        | st2actionrunner  | <----------------- | st2scheduler     |
                                        |                  |                    |                  |
                                        | Custom Packs:    |                    | Timers, delays   |
                                        | - linkedeye      |                    +------------------+
                                        | - linkedeye_     |
                                        |     entity       |     workflow        +------------------+
                                        | - linkedeye_     | -----------------> | st2workflow       |
                                        |     linux        |                    |   engine         |
                                        | - linkedeye_     |                    | (Orquesta/       |
                                        |     vault        |                    |  Mistral)        |
                                        | - jira           |                    +------------------+
                                        | - nagios         |
                                        | - redmine        |                    +------------------+
                                        | - sniff          | -----------------> | st2notifier      |
                                        | - linux          |    notify          |                  |
                                        +------------------+                    | → Neo4j update   |
                                                                                | → RabbitMQ pub   |
                                        +------------------+                    | → Apprise alert  |
                                        | st2sensorcontainer                    +------------------+
                                        | - event listeners |
                                        | - polling sensors |     stream        +------------------+
                                        +------------------+  -----------------> | st2stream        |
                                                                                | SSE events       |
                                        +------------------+                    | to subscribers   |
                                        | st2garbagecollector                   +------------------+
                                        | - cleanup old    |
                                        |   executions     |
                                        +------------------+

                                        +------------------+
                                        | st2auth          |
                                        | - Token issuing  |
                                        | - API key mgmt   |
                                        +------------------+

                                        +------------------+
                                        | st2timersengine  |
                                        | - Cron triggers  |
                                        | - Interval       |
                                        |   triggers       |
                                        +------------------+

                                        +------------------+
                                        | st2client/st2web |
                                        | - Web UI (80)    |
                                        | - CLI interface  |
                                        +------------------+
```
