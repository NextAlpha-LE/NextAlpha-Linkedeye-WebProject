"""
Keycloak / OIDC helpers — user provisioning, group mapping, and site assignment.

These helpers run only on the Keycloak SSO path (LinkedEyeKeycloakBackend).
Built-in username/password login, Google, and Azure flows are unchanged.
"""

from __future__ import annotations

import ast
import json
import logging
import os
import re
from typing import Dict, Iterable, List, Optional

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

MODEL_BACKEND = 'django.contrib.auth.backends.ModelBackend'


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


def find_user_for_keycloak_claims(claims: dict) -> Optional[User]:
    """
    Match Keycloak claims to an existing Django user (same person, app login account).

    Order: legacy short username (admin) -> email field -> exact username.
    Avoids creating duplicate SSO users when Keycloak email is admin@domain but
    the app account username is admin.
    """
    username = (claims.get('email') or claims.get('preferred_username') or '').strip()
    if not username:
        return None

    email = (claims.get('email') or username).strip()

    if email and '@' in email:
        local = email.split('@', 1)[0]
        user = User.objects.filter(username__iexact=local).first()
        if user:
            return user

        user = User.objects.filter(email__iexact=email).first()
        if user:
            return user

    return User.objects.filter(username__iexact=username).first()


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


def _parse_csv_values(raw) -> List[str]:
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(item).strip() for item in raw if str(item).strip()]
    if isinstance(raw, str):
        return [part.strip() for part in re.split(r'[,\s;]+', raw) if part.strip()]
    return [str(raw).strip()]


def extract_site_ids_from_claims(claims: dict) -> List[int]:
    """Read site IDs/names from Keycloak user attributes (linkedeye_site_ids / linkedeye_sites)."""
    from lesites.models import SiteModel

    site_ids: List[int] = []

    for raw_id in _parse_csv_values(claims.get('linkedeye_site_ids')):
        try:
            site_ids.append(int(raw_id))
        except (TypeError, ValueError):
            logger.warning('Ignoring invalid linkedeye_site_ids entry: %r', raw_id)

    for site_name in _parse_csv_values(claims.get('linkedeye_sites')):
        site = SiteModel.objects.filter(sitename__iexact=site_name, is_enable=True).first()
        if site:
            site_ids.append(site.id)
        else:
            logger.warning('Keycloak linkedeye_sites value %r not found in lesite', site_name)

    deduped: List[int] = []
    for site_id in site_ids:
        if site_id not in deduped:
            deduped.append(site_id)
    return deduped


def extract_subsite_data_from_claims(claims: dict) -> Dict[str, List[str]]:
    """Parse optional linkedeye_subsites JSON claim into {sitename: [subsite, ...]}."""
    raw = claims.get('linkedeye_subsites')
    if not raw:
        return {}

    if isinstance(raw, dict):
        parsed = raw
    else:
        try:
            parsed = json.loads(raw)
        except (TypeError, json.JSONDecodeError):
            logger.warning('Invalid linkedeye_subsites claim; expected JSON object')
            return {}

    if not isinstance(parsed, dict):
        return {}

    cleaned: Dict[str, List[str]] = {}
    for site_name, values in parsed.items():
        if isinstance(values, list):
            cleaned[str(site_name)] = [str(value).strip() for value in values if str(value).strip()]
        elif values:
            cleaned[str(site_name)] = [str(values).strip()]
    return cleaned


def sync_keycloak_user_sites(user: User, claims: dict) -> None:
    """
    Assign sites from Keycloak attributes (mirrors useronboard _sync_user_sites).

    If no site claims are present, existing user_sites rows are left unchanged.
    """
    from lesites.models import SiteModel
    from useronboard.models import Usersite

    site_ids = extract_site_ids_from_claims(claims)
    if not site_ids:
        return

    valid_ids = list(
        SiteModel.objects.filter(id__in=site_ids, is_enable=True).values_list('id', flat=True)
    )
    if not valid_ids:
        logger.warning('No enabled sites matched Keycloak claims for user %s', user.username)
        return

    Usersite.objects.filter(user_id=user.id).delete()
    for site_id in valid_ids:
        Usersite.objects.create(user_id=user.id, site_id=site_id, is_enable=True)


def sync_keycloak_user_subsites(user: User, claims: dict) -> None:
    """Assign sub-sites from Keycloak linkedeye_subsites JSON (mirrors useronboard flow)."""
    from lesites.models import SiteModel
    from userprofile.models import subsiteModel

    subsite_data = extract_subsite_data_from_claims(claims)
    if not subsite_data:
        return

    subsiteModel.objects.filter(user_id=user.id).delete()
    for site_name, texts in subsite_data.items():
        try:
            site_obj = SiteModel.objects.get(sitename=site_name)
        except SiteModel.DoesNotExist:
            logger.warning('Sub-site site %r not found for user %s', site_name, user.username)
            continue
        for text in texts:
            subsiteModel.objects.create(user_id=user.id, site_id=site_obj.id, sub_site=text)


def sync_keycloak_user(user: User, claims: dict) -> User:
    """
    Sync Django profile, groups, and optional site mappings from Keycloak claims.

    Does not modify Django password — built-in login continues to use the MySQL hash.
    Preserves legacy short usernames (e.g. admin) when Keycloak email is admin@domain.
    """
    email = (claims.get('email') or claims.get('preferred_username') or user.username or '').strip()
    if not email:
        return user

    user.email = email
    if not user.username:
        user.username = email
    elif user.username == email:
        pass
    elif '@' not in user.username and '@' in email and user.username.lower() == email.split('@', 1)[0].lower():
        pass
    elif '@' in user.username:
        user.username = email
    else:
        user.username = email

    user.first_name = claims.get('given_name') or user.first_name or email
    user.last_name = claims.get('family_name') or user.last_name or ''
    user.is_active = True
    user.save(update_fields=['username', 'email', 'first_name', 'last_name', 'is_active'])

    mapped_groups = map_roles_to_django_groups(extract_keycloak_roles(claims))
    if mapped_groups:
        user.groups.set(mapped_groups)
    elif not user.groups.exists():
        default_name = default_sso_group_name()
        try:
            user.groups.set([Group.objects.get(name=default_name)])
        except Group.DoesNotExist:
            logger.warning('Default SSO group %r does not exist', default_name)

    sync_keycloak_user_sites(user, claims)
    sync_keycloak_user_subsites(user, claims)

    return user
