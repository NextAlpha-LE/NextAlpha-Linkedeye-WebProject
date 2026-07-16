"""
Server-to-server access token for Keycloak-protected monitoring services.

Grafana and Prometheus now sit behind a per-service oauth2-proxy that requires a
Keycloak identity. This module lets Django authenticate to them machine-to-machine:
it obtains an access token from Keycloak using the OAuth2 *client-credentials*
grant and the proxy views send it upstream as ``Authorization: Bearer <token>``.

Requirements on the infrastructure side:
  * A confidential Keycloak client with "Service Accounts" enabled
    (KEYCLOAK_MONITORING_CLIENT_ID / KEYCLOAK_MONITORING_CLIENT_SECRET).
  * The Grafana/Prometheus oauth2-proxy must accept bearer tokens
    (``--skip-jwt-bearer-tokens=true`` and an ``--extra-jwt-issuers`` entry whose
    audience matches this client's token), otherwise it redirects to a login page.

The token is cached in the shared Django cache (Redis) so every Gunicorn worker
reuses it and Keycloak is called at most once per token lifetime.
"""

import logging

import requests
from requests.auth import HTTPBasicAuth
from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger('linkedeye')

_CACHE_KEY = 'monitoring:kc_access_token'
# Refresh this many seconds before the token actually expires, so an in-flight
# request never races a hard expiry.
_REFRESH_MARGIN_SECONDS = 30
# Floor for the cache TTL, guards against a broker returning a tiny expires_in.
_MIN_TTL_SECONDS = 30


def _config():
    token_url = getattr(settings, 'KEYCLOAK_MONITORING_TOKEN_URL', '') or ''
    client_id = getattr(settings, 'KEYCLOAK_MONITORING_CLIENT_ID', '') or ''
    client_secret = getattr(settings, 'KEYCLOAK_MONITORING_CLIENT_SECRET', '') or ''
    return token_url, client_id, client_secret


def is_configured():
    """True when the client-credentials client is fully configured."""
    token_url, client_id, client_secret = _config()
    return bool(token_url and client_id and client_secret)


def get_monitoring_token(force_refresh=False):
    """Return a valid Keycloak access token for monitoring, or ``None``.

    Returns ``None`` when the client is not configured or the fetch fails, so
    callers can fall back to legacy Basic Auth or surface a clear error rather
    than crash. ``force_refresh=True`` bypasses the cache (use after a 401).
    """
    if not is_configured():
        return None

    if not force_refresh:
        cached = cache.get(_CACHE_KEY)
        if cached:
            return cached

    token_url, client_id, client_secret = _config()
    scope = getattr(settings, 'KEYCLOAK_MONITORING_SCOPE', '') or ''
    verify = getattr(settings, 'MONITORING_VERIFY_SSL', False)

    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
    }
    if scope:
        data['scope'] = scope

    try:
        resp = requests.post(token_url, data=data, timeout=10, verify=verify)
    except requests.exceptions.RequestException as e:
        logger.error('monitoring token fetch failed (network): %s', e)
        return None

    if not resp.ok:
        logger.error('monitoring token fetch failed: HTTP %s %s',
                     resp.status_code, resp.text[:300])
        return None

    try:
        payload = resp.json()
    except ValueError:
        logger.error('monitoring token response was not JSON: %s', resp.text[:300])
        return None

    token = payload.get('access_token')
    if not token:
        logger.error('monitoring token response had no access_token')
        return None

    try:
        expires_in = int(payload.get('expires_in', 300))
    except (TypeError, ValueError):
        expires_in = 300
    ttl = max(expires_in - _REFRESH_MARGIN_SECONDS, _MIN_TTL_SECONDS)
    cache.set(_CACHE_KEY, token, ttl)
    return token


# ── Shared credential helpers used by the Grafana/Prometheus proxy views ──

def bearer_mode():
    return getattr(settings, 'MONITORING_AUTH_MODE', 'basic') == 'bearer'


def verify_ssl():
    return getattr(settings, 'MONITORING_VERIFY_SSL', False)


def _basic_auth(service):
    if service == 'grafana':
        user = getattr(settings, 'GRAFANA_USERNAME', 'grafana')
        pw = getattr(settings, 'GRAFANA_PASSWORD', '')
    else:
        user = getattr(settings, 'PROMETHEUS_USERNAME', 'prometheus')
        pw = getattr(settings, 'PROMETHEUS_PASSWORD', '')
    return HTTPBasicAuth(user, pw) if pw else None


def monitoring_credentials(service, force_refresh=False):
    """Return ``(auth, headers)`` for a request to 'grafana' or 'prometheus'.

    Bearer header from the Keycloak client-credentials token when in bearer mode
    and a token is available; otherwise legacy Basic Auth if a service password
    is set; otherwise ``(None, {})`` (the caller should have checked
    :func:`service_configured` first).
    """
    if bearer_mode():
        token = get_monitoring_token(force_refresh=force_refresh)
        if token:
            return None, {'Authorization': 'Bearer ' + token}
    return _basic_auth(service), {}


def service_configured(service):
    """True when either bearer auth or legacy Basic Auth is available."""
    if bearer_mode() and is_configured():
        return True
    if service == 'grafana':
        return bool(getattr(settings, 'GRAFANA_PASSWORD', ''))
    return bool(getattr(settings, 'PROMETHEUS_PASSWORD', ''))
