"""
OIDC authentication backend for Keycloak (mozilla-django-oidc).
"""

from __future__ import annotations

import logging

from mozilla_django_oidc.auth import OIDCAuthenticationBackend

from login.keycloak_utils import email_domain_allowed, sync_keycloak_user

logger = logging.getLogger(__name__)


class LinkedEyeKeycloakBackend(OIDCAuthenticationBackend):
    """Authenticate via Keycloak and sync LinkedEye User + Group records."""

    def verify_claims(self, claims):
        if not super().verify_claims(claims):
            return False
        email = claims.get('email') or claims.get('preferred_username') or ''
        if email and not email_domain_allowed(email):
            logger.warning('Keycloak login rejected for disallowed domain: %s', email)
            return False
        return True

    def get_username(self, claims):
        return claims.get('email') or claims.get('preferred_username')

    def create_user(self, claims):
        user = super().create_user(claims)
        return sync_keycloak_user(user, claims)

    def update_user(self, user, claims):
        user = super().update_user(user, claims)
        return sync_keycloak_user(user, claims)

    def filter_users_by_claims(self, claims):
        username = self.get_username(claims)
        if not username:
            return self.UserModel.objects.none()
        return self.UserModel.objects.filter(username=username)
