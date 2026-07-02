"""
Keycloak OIDC views — callback redirects into LinkedEye post-login flow.
"""

from django.urls import reverse
from mozilla_django_oidc.views import OIDCAuthenticationCallbackView


class KeycloakCallbackView(OIDCAuthenticationCallbackView):
    """After Keycloak auth, run LinkedEye session bootstrap (mirrors google_verify)."""

    @property
    def success_url(self):
        # Parent login_success() calls auth.login() then redirects here.
        return reverse('keycloak_verify')
