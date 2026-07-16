# Grafana / Prometheus behind Keycloak (oauth2-proxy)

Grafana and Prometheus sit behind a per-service **oauth2-proxy** that requires a
Keycloak identity. The LinkedEye portal embeds them through its own server-side
proxy views, so Django must authenticate to that oauth2-proxy machine-to-machine.

It does this with the OAuth2 **client-credentials** grant: Django fetches an
access token from Keycloak and forwards it as `Authorization: Bearer <token>` to
the oauth2-proxy, which validates it and passes the request upstream.

```
browser ──▶ Django proxy view ──(Bearer <kc-token>)──▶ oauth2-proxy ──▶ Grafana / Prometheus
                    │
                    └─ token from Keycloak client-credentials grant, cached in Redis
```

## What must be configured

### 1. Keycloak — confidential client with a service account
Create a client in the realm the oauth2-proxy trusts:

- **Client ID**: `linkedeye-monitoring`
- **Access type**: confidential
- **Service Accounts Enabled**: ON  (enables the client-credentials grant)
- Standard/implicit/direct-access flows: OFF (not needed)
- **Audience mapper**: add an *Audience* protocol mapper so the issued token's
  `aud` matches whatever the oauth2-proxy is told to accept (see step 2).

Copy the client secret into Vault / the k8s secret as
`KEYCLOAK_MONITORING_CLIENT_SECRET` (see step 3).

### 2. oauth2-proxy — accept bearer tokens
By default oauth2-proxy redirects unauthenticated requests to a login page and
ignores `Authorization: Bearer`. For the Grafana and Prometheus oauth2-proxy
deployments, add:

```
--skip-jwt-bearer-tokens=true
--extra-jwt-issuers=<keycloak-issuer-url>=<accepted-audience>
```

`<keycloak-issuer-url>` is `https://<keycloak>/realms/<realm>`.
`<accepted-audience>` must match the token's `aud` from step 1.

Without this, no Django change can help — the proxy will keep bouncing to Keycloak.

### 3. LinkedEye env / Vault
| Key | Where | Notes |
|-----|-------|-------|
| `MONITORING_AUTH_MODE` | env | `bearer` (default when the secret below is set) or `basic` |
| `KEYCLOAK_MONITORING_CLIENT_ID` | env | e.g. `linkedeye-monitoring` |
| `KEYCLOAK_MONITORING_CLIENT_SECRET` | **Vault** | the confidential client secret |
| `KEYCLOAK_MONITORING_TOKEN_URL` | env (optional) | defaults to the SSO Keycloak server/realm token endpoint |
| `KEYCLOAK_MONITORING_SCOPE` | env (optional) | only if a scope is needed for the right audience |
| `MONITORING_VERIFY_SSL` | env | TLS verification for outbound calls (default false) |

The Grafana/Prometheus base URLs the portal proxies to still come from the
per-site `lesite` rows / `ANALYTICS_DASHBOARD_PREFIX_URL` — point them at the
oauth2-proxy front door.

## Behaviour / fallback

- The Keycloak token is cached in the shared Redis cache and refreshed ~30s
  before expiry, so Keycloak is hit at most once per token lifetime across all
  Gunicorn workers.
- On a `401/403/302` from oauth2-proxy the proxy views refresh the token once and
  retry (covers a token rotated out from under an in-flight request).
- If `MONITORING_AUTH_MODE=basic`, the views use the legacy
  `GRAFANA_PASSWORD` / `PROMETHEUS_PASSWORD` Basic Auth instead — an easy rollback
  path if the oauth2-proxy bearer change is not yet in place.
- If neither is configured the proxy returns a clear `503` explaining what to set,
  rather than a blank iframe.

## Code touch points
- `lib/LinkedEyeMonitoring/token.py` — token fetch, caching, credential helpers
- `app/views.py` — `grafana_full_proxy`, `prometheus_proxy`, `grafana_generate_token`
- `analytics/views.py` — `getUID`
- `LinkedEyeWebProject/settings.py` — `MONITORING_*` / `KEYCLOAK_MONITORING_*`
