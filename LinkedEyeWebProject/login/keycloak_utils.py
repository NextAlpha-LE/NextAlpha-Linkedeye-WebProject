"""
Keycloak / OIDC helpers — user provisioning, group mapping, and site assignment.

Most of these helpers run only on the Keycloak SSO path (LinkedEyeKeycloakBackend).
verify_password_via_keycloak is the exception: it's called from the normal
username/password login view as a fallback.
"""

from __future__ import annotations

import ast
import json
import logging
import os
import re
from typing import Dict, Iterable, List, Optional

import requests
from django.conf import settings
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


def verify_password_via_keycloak(username: str, password: str) -> bool:
    """
    Validate credentials against Keycloak's Direct Access Grant (Resource Owner
    Password Credentials) using the interactive login client.

    Called only as a fallback from the normal username/password login view, when
    the local MySQL password check has already failed (wrong password, or the
    account has no usable password at all — e.g. it was auto-created by an SSO
    login and never onboarded through the app). A successful check here lets the
    caller cache the password locally (user.set_password), so a Keycloak-only
    account can also use the plain login form, and so normal login keeps working
    for everyone even during a temporary MySQL/Keycloak drift.
    """
    server = (getattr(settings, 'KEYCLOAK_SERVER_URL', '') or '').rstrip('/')
    realm = getattr(settings, 'KEYCLOAK_REALM', '') or ''
    client_id = getattr(settings, 'KEYCLOAK_CLIENT_ID', '') or ''
    client_secret = getattr(settings, 'KEYCLOAK_CLIENT_SECRET', '') or ''
    if not (server and realm and client_id and client_secret and username and password):
        return False

    url = f'{server}/realms/{realm}/protocol/openid-connect/token'
    data = {
        'grant_type': 'password',
        'client_id': client_id,
        'client_secret': client_secret,
        'username': username,
        'password': password,
        'scope': 'openid',
    }
    verify_ssl = getattr(settings, 'OIDC_VERIFY_SSL', True)
    try:
        resp = requests.post(url, data=data, timeout=5, verify=verify_ssl)
    except requests.exceptions.RequestException as e:
        logger.warning('Keycloak password-grant check failed (network) for %s: %s', username, e)
        return False
    return resp.status_code == 200


def send_keycloak_welcome_message(user: User) -> None:
    """
    Send a welcome email the first time a Keycloak SSO login auto-creates a
    Django account (called only from LinkedEyeKeycloakBackend.create_user,
    never on update_user, so this fires exactly once per user).

    Mirrors useronboard.views.send_Welcome_Message but omits the username/
    password block — Keycloak never gives Django a plaintext password for an
    SSO-only account, so there's nothing to show. Best-effort: logs and
    returns on any failure, never raises into the login flow.
    """
    try:
        from email.mime.multipart import MIMEMultipart
        from email.mime.text import MIMEText
        import smtplib

        sender = os.getenv('LINKEDEYE_EMAIL', '')
        app_password = os.getenv('LINKEDEYE_EMAIL_APPKEY', '')
        recipient = user.email
        if not (sender and app_password and recipient):
            return

        portal_url = getattr(settings, 'PORTAL_URL', '') or os.getenv('PORTAL_URL') or 'http://127.0.0.1:8000'
        name = user.first_name or user.username

        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Welcome to LinkedEye'
        msg['From'] = sender
        msg['To'] = recipient
        html = (
            '<p>Hi {name},</p>'
            '<p>Welcome to LinkedEye. Your account is set up for Single Sign-On.</p>'
            '<p>You can log in at <a href="{url}">{url}</a> using the "Sign in with Finspot SSO" option.</p>'
            '<p>Thanks,<br>Team LinkedEye</p>'
        ).format(name=name, url=portal_url)
        msg.attach(MIMEText(html, 'html'))

        with smtplib.SMTP('smtp.office365.com', 587) as server:
            server.starttls()
            server.login(sender, app_password)
            server.sendmail(sender, recipient, msg.as_string())
    except Exception as e:
        logger.warning('Keycloak welcome email failed for %s: %s', getattr(user, 'email', '?'), e)
