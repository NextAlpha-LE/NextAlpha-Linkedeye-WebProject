"""
Server-to-server access tokens for Keycloak-protected monitoring services.

Grafana and Prometheus each sit behind their own oauth2-proxy that requires a
Keycloak identity, and each trusts its own Keycloak client (audience). Django
authenticates to them machine-to-machine using the OAuth2 *client-credentials*
grant — a separate client per service — and the proxy views send the resulting
token upstream as ``Authorization: Bearer <token>``.

Requirements on the infrastructure side:
  * A confidential Keycloak client per service with "Service Accounts" enabled
    (KEYCLOAK_GRAFANA_CLIENT_ID/SECRET, KEYCLOAK_PROMETHEUS_CLIENT_ID/SECRET).
  * Each service's oauth2-proxy must accept bearer tokens
    (``--skip-jwt-bearer-tokens=true`` + an ``--extra-jwt-issuers`` entry whose
    audience matches that client's token), otherwise it redirects to a login page.

Each service's token is cached in the shared Django cache (Redis) so every
Gunicorn worker reuses it and Keycloak is called at most once per token lifetime.
"""

import logging

import requests
from requests.auth import HTTPBasicAuth
from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger('linkedeye')

_CACHE_KEY_PREFIX = 'monitoring:kc_access_token:'
# Refresh this many seconds before the token actually expires, so an in-flight
# request never races a hard expiry.
_REFRESH_MARGIN_SECONDS = 30
# Floor for the cache TTL, guards against a broker returning a tiny expires_in.
_MIN_TTL_SECONDS = 30


def _service_config(service):
    """Return ``(token_url, client_id, client_secret)`` for a monitoring service."""
    token_url = getattr(settings, 'KEYCLOAK_MONITORING_TOKEN_URL', '') or ''
    if service == 'grafana':
        client_id = getattr(settings, 'KEYCLOAK_GRAFANA_CLIENT_ID', '') or ''
        client_secret = getattr(settings, 'KEYCLOAK_GRAFANA_CLIENT_SECRET', '') or ''
    else:
        client_id = getattr(settings, 'KEYCLOAK_PROMETHEUS_CLIENT_ID', '') or ''
        client_secret = getattr(settings, 'KEYCLOAK_PROMETHEUS_CLIENT_SECRET', '') or ''
    return token_url, client_id, client_secret


def is_configured(service):
    """True when the client-credentials client for ``service`` is fully configured."""
    token_url, client_id, client_secret = _service_config(service)
    return bool(token_url and client_id and client_secret)


def get_monitoring_token(service, force_refresh=False):
    """Return a valid Keycloak access token for ``service``, or ``None``.

    Returns ``None`` when the client is not configured or the fetch fails, so
    callers can fall back to legacy Basic Auth or surface a clear error rather
    than crash. ``force_refresh=True`` bypasses the cache (use after a 401).
    """
    if not is_configured(service):
        return None

    cache_key = _CACHE_KEY_PREFIX + service
    if not force_refresh:
        # A cache outage must not break monitoring — fall through to a fresh fetch.
        try:
            cached = cache.get(cache_key)
        except Exception as e:
            logger.warning('monitoring token cache read failed for %s: %s', service, e)
            cached = None
        if cached:
            return cached

    token_url, client_id, client_secret = _service_config(service)
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
        logger.error('monitoring token fetch failed for %s (network): %s', service, e)
        return None

    if not resp.ok:
        logger.error('monitoring token fetch failed for %s: HTTP %s %s',
                     service, resp.status_code, resp.text[:300])
        return None

    try:
        payload = resp.json()
    except ValueError:
        logger.error('monitoring token response for %s was not JSON: %s', service, resp.text[:300])
        return None

    token = payload.get('access_token')
    if not token:
        logger.error('monitoring token response for %s had no access_token', service)
        return None

    try:
        expires_in = int(payload.get('expires_in', 300))
    except (TypeError, ValueError):
        expires_in = 300
    ttl = max(expires_in - _REFRESH_MARGIN_SECONDS, _MIN_TTL_SECONDS)
    try:
        cache.set(cache_key, token, ttl)
    except Exception as e:
        # Token is still valid and usable even if we couldn't cache it.
        logger.warning('monitoring token cache write failed for %s: %s', service, e)
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

    Bearer header from that service's Keycloak client-credentials token when in
    bearer mode and a token is available; otherwise legacy Basic Auth if a
    service password is set; otherwise ``(None, {})`` (the caller should have
    checked :func:`service_configured` first).
    """
    if bearer_mode():
        token = get_monitoring_token(service, force_refresh=force_refresh)
        if token:
            return None, {'Authorization': 'Bearer ' + token}
    return _basic_auth(service), {}


def service_configured(service):
    """True when either bearer auth or legacy Basic Auth is available for ``service``."""
    if bearer_mode() and is_configured(service):
        return True
    if service == 'grafana':
        return bool(getattr(settings, 'GRAFANA_PASSWORD', ''))
    return bool(getattr(settings, 'PROMETHEUS_PASSWORD', ''))
