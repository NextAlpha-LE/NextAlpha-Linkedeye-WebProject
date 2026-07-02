"""
Keycloak OIDC views — callback redirects into LinkedEye post-login flow.
"""

from django.shortcuts import redirect
from django.urls import reverse
from mozilla_django_oidc.views import OIDCAuthenticationCallbackView


class KeycloakCallbackView(OIDCAuthenticationCallbackView):
    """After Keycloak auth, run LinkedEye session bootstrap (mirrors google_verify)."""

    def login_success(self):
        return redirect(reverse('keycloak_verify'))
