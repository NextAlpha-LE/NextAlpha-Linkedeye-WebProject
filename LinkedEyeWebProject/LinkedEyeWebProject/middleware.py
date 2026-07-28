"""
Production middleware for LinkedEye.
- MemoryGuardMiddleware: monitors process memory and logs warnings/critical alerts
- KeycloakOTPGateMiddleware: enforces the post-Finspot-SSO email-OTP step
- TabCloseOTPGateMiddleware: re-arms the OTP gate when a new browser tab picks
  up an already-valid session cookie
"""

import logging
import threading
import gc

from django.shortcuts import redirect

logger = logging.getLogger('linkedeye.memory')

try:
    import psutil
    import os
    _process = psutil.Process(os.getpid())
    _psutil_available = True
except ImportError:
    _psutil_available = False


class MemoryGuardMiddleware:
    """Middleware that monitors process memory and alerts on growth."""

    MEMORY_LIMIT_MB = int(os.getenv('LE_MEMORY_LIMIT_MB', '1024')) if _psutil_available else 1024
    WARN_THRESHOLD_MB = int(os.getenv('LE_MEMORY_WARN_MB', '768')) if _psutil_available else 768
    CHECK_INTERVAL = 50  # Check every N requests

    def __init__(self, get_response):
        self.get_response = get_response
        self.request_count = 0

    def __call__(self, request):
        self.request_count += 1
        response = self.get_response(request)

        if _psutil_available and self.request_count % self.CHECK_INTERVAL == 0:
            try:
                rss_mb = _process.memory_info().rss / 1024 / 1024
                thread_count = threading.active_count()

                if rss_mb > self.MEMORY_LIMIT_MB:
                    logger.critical(
                        "MEMORY CRITICAL: RSS=%.0fMB > %dMB limit, threads=%d, requests=%d",
                        rss_mb, self.MEMORY_LIMIT_MB, thread_count, self.request_count
                    )
                    gc.collect()
                elif rss_mb > self.WARN_THRESHOLD_MB:
                    logger.warning(
                        "MEMORY WARNING: RSS=%.0fMB > %dMB warn, threads=%d, requests=%d",
                        rss_mb, self.WARN_THRESHOLD_MB, thread_count, self.request_count
                    )
            except Exception:
                pass

        return response


class KeycloakOTPGateMiddleware:
    """
    mozilla-django-oidc calls auth.login() as part of the Finspot SSO
    callback, before app.views.keycloak_verify gets a chance to run — so by
    the time our own code executes, the Django session is already
    authenticated. keycloak_verify marks the session as otp_pending instead
    of finalizing it, and this middleware blocks every other page until
    /verify-otps/ (or the Google Authenticator equivalent) clears that flag,
    keeping Finspot SSO to the same email-OTP bar as normal login.
    """

    ALLOWED_PATH_PREFIXES = (
        '/verify-otps/',
        '/resend-otps/',
        '/verify-google-authenticator-login/',
        '/static/',
    )
    ALLOWED_EXACT_PATHS = ('/', '/logout/')

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if (
            request.session.get('otp_pending')
            and request.path not in self.ALLOWED_EXACT_PATHS
            and not request.path.startswith(self.ALLOWED_PATH_PREFIXES)
        ):
            return redirect('/')
        return self.get_response(request)


otp_logger = logging.getLogger('linkedeye')


class TabCloseOTPGateMiddleware:
    """
    Forces a fresh OTP the moment the app is opened in a browser tab that
    never itself proved the OTP step -- even though the underlying Django
    session cookie is still valid, because closing one tab (or, on plenty of
    browsers, the whole browser) doesn't reliably clear it.

    sessionStorage is the only browser primitive genuinely scoped to a single
    tab's lifetime (cookies and localStorage are shared by every tab and
    routinely survive tab/browser close, which is exactly what let a closed
    tab resume without OTP). The server can't read sessionStorage -- it's
    never sent with a request -- so this injects a small script into every
    authenticated HTML page that checks it client-side and, if missing, calls
    back to /recheck-otp/ to re-arm KeycloakOTPGateMiddleware's otp_pending
    gate before bouncing to the login page's existing OTP modal.
    """

    SKIP_PATH_PREFIXES = (
        '/static/',
        '/recheck-otp/',
        '/verify-otps/',
        '/resend-otps/',
        '/verify-google-authenticator-login/',
        '/logout',
    )

    SNIPPET = (
        b"<script>(function(){"
        # Skip inside iframes (Grafana panels, entity/topology graphs, the sites
        # page's embedded ADP view, etc.) -- only the top-level tab should ever
        # be bounced to the login page.
        b"if(window.top!==window.self){return;}"
        b"if(sessionStorage.getItem('le_otp_fresh')==='1'){return;}"
        b"function leGetCsrf(){var m=document.cookie.match(/(?:^|; )csrftoken=([^;]*)/);"
        b"return m?decodeURIComponent(m[1]):'';}"
        b"fetch('/recheck-otp/',{method:'POST',credentials:'same-origin',"
        b"headers:{'X-CSRFToken':leGetCsrf()}}).then(function(){"
        b"window.location.href='/';}).catch(function(){});"
        b"})();</script>"
    )

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        try:
            if (
                request.user.is_authenticated
                and not request.session.get('otp_pending')
                and not request.path.startswith(self.SKIP_PATH_PREFIXES)
                and response.status_code == 200
                and response.get('Content-Type', '').startswith('text/html')
                and hasattr(response, 'content')
                and b'</body>' in response.content
            ):
                response.content = response.content.replace(b'</body>', self.SNIPPET + b'</body>', 1)
                if response.get('Content-Length') is not None:
                    response['Content-Length'] = str(len(response.content))
        except Exception:
            otp_logger.exception('TabCloseOTPGateMiddleware: failed to inject freshness script')
        return response
