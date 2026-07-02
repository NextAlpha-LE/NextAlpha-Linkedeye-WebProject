"""
Keycloak / OIDC helpers — user provisioning and Django Group mapping.
"""

from __future__ import annotations

import ast
import logging
import os
from typing import Iterable, List, Optional

from django.contrib.auth.models import Group, User

logger = logging.getLogger(__name__)

# Keycloak realm roles that map 1:1 to existing LinkedEye Django Groups.
KNOWN_SSO_GROUPS = (
    'Admin',
    'ViewOnly',
    'Management',
    'Onboard',
    'UserView',
    'TechInfra',
    'Risk',
    'TradeSupport',
    'Google',
    'O365',
    'DjangoAdmin',
)


def keycloak_allowed_domains() -> List[str]:
    raw = os.getenv(
        'KEYCLOAK_ALLOWED_DOMAINS',
        os.getenv('GOOGLE_ALLOW_DOMAINS', '[]'),
    )
    try:
        domains = ast.literal_eval(raw)
        return [d.lower() for d in domains] if isinstance(domains, list) else []
    except (SyntaxError, ValueError):
        return []


def email_domain_allowed(email: str) -> bool:
    domains = keycloak_allowed_domains()
    if not domains:
        return True
    if '@' not in email:
        return False
    return email.split('@')[-1].lower() in domains


def extract_keycloak_roles(claims: dict) -> List[str]:
    """Read realm/client roles from a Keycloak userinfo / ID token claims dict."""
    roles: List[str] = []

    realm_access = claims.get('realm_access') or {}
    if isinstance(realm_access, dict):
        roles.extend(realm_access.get('roles') or [])

    resource_access = claims.get('resource_access') or {}
    if isinstance(resource_access, dict):
        for client_data in resource_access.values():
            if isinstance(client_data, dict):
                roles.extend(client_data.get('roles') or [])

    for key in ('linkedeye_groups', 'groups', 'roles'):
        extra = claims.get(key)
        if isinstance(extra, list):
            roles.extend(extra)

    # Drop Keycloak defaults
    skip = {'offline_access', 'uma_authorization', 'default-roles-linkedeye'}
    cleaned = []
    for role in roles:
        if role and role not in skip and role not in cleaned:
            cleaned.append(role)
    return cleaned


def map_roles_to_django_groups(role_names: Iterable[str]) -> List[Group]:
    groups: List[Group] = []
    for role in role_names:
        if role not in KNOWN_SSO_GROUPS:
            continue
        try:
            groups.append(Group.objects.get(name=role))
        except Group.DoesNotExist:
            logger.warning('Keycloak role %r has no matching Django Group', role)
    return groups


def default_sso_group_name() -> str:
    return os.getenv('KEYCLOAK_DEFAULT_GROUP', 'ViewOnly')


def primary_group_name(user: User) -> str:
    if user.groups.exists():
        return user.groups.first().name
    return default_sso_group_name()


def sync_keycloak_user(user: User, claims: dict) -> User:
    """Create/update Django user fields and groups from Keycloak claims."""
    email = (claims.get('email') or claims.get('preferred_username') or user.username or '').strip()
    if not email:
        return user

    user.username = email
    user.email = email
    user.first_name = claims.get('given_name') or user.first_name or email
    user.last_name = claims.get('family_name') or user.last_name or ''
    user.is_active = True
    user.save()

    mapped_groups = map_roles_to_django_groups(extract_keycloak_roles(claims))
    if mapped_groups:
        user.groups.set(mapped_groups)
    elif not user.groups.exists():
        default_name = default_sso_group_name()
        try:
            mapped_groups = [Group.objects.get(name=default_name)]
        except Group.DoesNotExist:
            logger.warning('Default SSO group %r does not exist', default_name)
        if mapped_groups:
            user.groups.set(mapped_groups)

    return user
