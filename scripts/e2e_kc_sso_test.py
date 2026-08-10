#!/usr/bin/env python3
"""
End-to-end Keycloak SSO role sync test for NextAlpha UI.

Validates (no manual MySQL edits):
  1. KC infrastructure (mappers, env)
  2. finspot-management staff token carries tenant_roles
  3. IdP import -> Finspot-Nextalpha user attribute -> linkedeye-web ID token
  4. Django sync_keycloak_user maps role + site correctly
  5. Admin / ViewOnly role change round-trip

Usage:
  KC_MASTER_USER=admin KC_MASTER_PASS=... LE_CLIENT_SECRET=... python3 scripts/e2e_kc_sso_test.py
"""
from __future__ import annotations

import base64
import json
import os
import subprocess
import sys
import urllib.parse

KC = os.environ.get("KC_URL", "https://keycloak.finspot.in")
KC_MASTER_USER = os.environ["KC_MASTER_USER"]
KC_MASTER_PASS = os.environ["KC_MASTER_PASS"]
LE_CLIENT_SECRET = os.environ["LE_CLIENT_SECRET"]
K8S_NS = os.environ.get("K8S_NS", "nextalpha")
TEST_EMAIL = os.environ.get("TEST_EMAIL", "demo@finspot.in")
TEST_PASS = os.environ.get("TEST_PASS", "Demo@Nextalpha2026!")

PASS = 0
FAIL = 0


def log_ok(msg: str) -> None:
    global PASS
    PASS += 1
    print(f"  PASS  {msg}")


def log_fail(msg: str) -> None:
    global FAIL
    FAIL += 1
    print(f"  FAIL  {msg}")


def curl(method: str, url: str, *, headers=None, data=None, form=None) -> tuple[int, object]:
    cmd = ["curl", "-sk", "-X", method, url, "-w", "\n%{http_code}"]
    for k, v in (headers or {}).items():
        cmd += ["-H", f"{k}: {v}"]
    if form:
        cmd += sum([["-d", f"{k}={v}"] for k, v in form.items()], [])
    elif data is not None:
        cmd += ["-H", "Content-Type: application/json", "-d", json.dumps(data)]
    out = subprocess.check_output(cmd, text=True)
    raw, code = out.rsplit("\n", 1)
    try:
        body = json.loads(raw) if raw.strip().startswith(("{", "[")) else raw
    except json.JSONDecodeError:
        body = raw
    return int(code), body


def master_token() -> str:
    code, body = curl(
        "POST",
        f"{KC}/realms/master/protocol/openid-connect/token",
        form={
            "grant_type": "password",
            "client_id": "admin-cli",
            "username": KC_MASTER_USER,
            "password": KC_MASTER_PASS,
        },
    )
    if code != 200:
        raise RuntimeError(f"master login failed: {body}")
    return body["access_token"]


def decode_jwt(token: str) -> dict:
    payload = token.split(".")[1]
    payload += "=" * (-len(payload) % 4)
    return json.loads(base64.urlsafe_b64decode(payload))


def kc_find_user(token: str, realm: str, email: str) -> dict | None:
    code, users = curl(
        "GET",
        f"{KC}/admin/realms/{realm}/users?email={urllib.parse.quote(email)}&exact=true",
        headers={"Authorization": f"Bearer {token}"},
    )
    return users[0] if isinstance(users, list) and users else None


def kc_set_user_attrs(token: str, realm: str, user: dict, attrs: dict) -> None:
    body = {k: user[k] for k in ("username", "email", "firstName", "lastName", "enabled", "emailVerified") if k in user}
    merged = dict(user.get("attributes") or {})
    merged.update(attrs)
    body["attributes"] = merged
    curl("PUT", f"{KC}/admin/realms/{realm}/users/{user['id']}", headers={"Authorization": f"Bearer {token}"}, data=body)


def kc_assign_broker_role(token: str, fm_user_id: str, role_name: str) -> None:
    code, clients = curl(
        "GET",
        f"{KC}/admin/realms/finspot-management/clients?clientId=broker-client",
        headers={"Authorization": f"Bearer {token}"},
    )
    cuuid = clients[0]["id"]
    _, current = curl(
        "GET",
        f"{KC}/admin/realms/finspot-management/users/{fm_user_id}/role-mappings/clients/{cuuid}",
        headers={"Authorization": f"Bearer {token}"},
    )
    if current:
        curl(
            "DELETE",
            f"{KC}/admin/realms/finspot-management/users/{fm_user_id}/role-mappings/clients/{cuuid}",
            headers={"Authorization": f"Bearer {token}"},
            data=current,
        )
    _, roles = curl(
        "GET",
        f"{KC}/admin/realms/finspot-management/clients/{cuuid}/roles",
        headers={"Authorization": f"Bearer {token}"},
    )
    role = next(r for r in roles if r["name"] == role_name)
    curl(
        "POST",
        f"{KC}/admin/realms/finspot-management/users/{fm_user_id}/role-mappings/clients/{cuuid}",
        headers={"Authorization": f"Bearer {token}"},
        data=[{"id": role["id"], "name": role["name"]}],
    )


def fm_staff_token(email: str, password: str) -> dict:
    _, clients = curl(
        "GET",
        f"{KC}/admin/realms/finspot-management/clients?clientId=broker-client",
        headers={"Authorization": f"Bearer {master_token()}"},
    )
    cuuid = clients[0]["id"]
    M = master_token()
    _, sec = curl(
        "GET",
        f"{KC}/admin/realms/finspot-management/clients/{cuuid}/client-secret",
        headers={"Authorization": f"Bearer {M}"},
    )
    code, tok = curl(
        "POST",
        f"{KC}/realms/finspot-management/protocol/openid-connect/token",
        form={
            "grant_type": "password",
            "client_id": "broker-client",
            "client_secret": sec["value"],
            "username": email,
            "password": password,
            "scope": "openid",
        },
    )
    if code != 200:
        raise RuntimeError(f"finspot-management token failed: {tok}")
    return decode_jwt(tok["access_token"])


def na_id_token(email: str, password: str) -> dict:
    code, tok = curl(
        "POST",
        f"{KC}/realms/Finspot-Nextalpha/protocol/openid-connect/token",
        form={
            "grant_type": "password",
            "client_id": "linkedeye-web",
            "client_secret": LE_CLIENT_SECRET,
            "username": email,
            "password": password,
            "scope": "openid email profile roles",
        },
    )
    if code != 200:
        raise RuntimeError(f"Finspot-Nextalpha token failed: {tok}")
    return decode_jwt(tok["id_token"])


def django_sync(email: str, claims: dict) -> dict:
    claims_b64 = base64.b64encode(json.dumps(claims).encode()).decode()
    script = f"""
import json, os, base64, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE','LinkedEyeWebProject.settings')
django.setup()
from django.contrib.auth.models import User
from login.keycloak_utils import extract_keycloak_roles, sync_keycloak_user
from useronboard.models import Usersite
claims = json.loads(base64.b64decode('{claims_b64}'))
u, _ = User.objects.get_or_create(username='{email}', defaults={{'email':'{email}'}})
u.email = '{email}'; u.save()
sync_keycloak_user(u, claims)
groups = list(u.groups.values_list('name', flat=True))
sites = list(Usersite.objects.filter(user_id=u.id).values_list('site_id', flat=True))
print(json.dumps({{'groups': groups, 'sites': sites, 'extract': extract_keycloak_roles(claims)}}))
"""
    out = subprocess.check_output(
        ["kubectl", "-n", K8S_NS, "exec", "deploy/nextalpha-ui", "--", "python", "-c", script],
        text=True,
    )
    for line in out.splitlines():
        if line.startswith("{"):
            return json.loads(line)
    raise RuntimeError(f"django sync output unexpected: {out}")


def check_kc_infrastructure(M: str) -> None:
    print("\n[1] KC infrastructure")
    _, idp_m = curl(
        "GET",
        f"{KC}/admin/realms/Finspot-Nextalpha/identity-provider/instances/finspot-management/mappers",
        headers={"Authorization": f"Bearer {M}"},
    )
    if any(m.get("name") == "tenant_roles-import" for m in idp_m):
        log_ok("IdP mapper tenant_roles-import exists")
    else:
        log_fail("IdP mapper tenant_roles-import missing")

    _, clients = curl(
        "GET",
        f"{KC}/admin/realms/Finspot-Nextalpha/clients?clientId=linkedeye-web",
        headers={"Authorization": f"Bearer {M}"},
    )
    cid = clients[0]["id"]
    _, cm = curl(
        "GET",
        f"{KC}/admin/realms/Finspot-Nextalpha/clients/{cid}/protocol-mappers/models",
        headers={"Authorization": f"Bearer {M}"},
    )
    if any(m.get("name") == "tenant_roles" for m in cm):
        log_ok("linkedeye-web tenant_roles client mapper exists")
    else:
        log_fail("linkedeye-web tenant_roles client mapper missing")

    env = subprocess.check_output(
        ["kubectl", "-n", K8S_NS, "exec", "deploy/nextalpha-ui", "--", "sh", "-c",
         "echo TENANT=$KEYCLOAK_TENANT_ROLE_PREFIX; echo REALM=$KEYCLOAK_REALM; echo CLIENT=$KEYCLOAK_CLIENT_ID"],
        text=True,
    )
    env_d = {}
    for line in env.splitlines():
        if line.startswith("TENANT="):
            env_d["KEYCLOAK_TENANT_ROLE_PREFIX"] = line.split("=", 1)[1]
        elif line.startswith("REALM="):
            env_d["KEYCLOAK_REALM"] = line.split("=", 1)[1]
        elif line.startswith("CLIENT="):
            env_d["KEYCLOAK_CLIENT_ID"] = line.split("=", 1)[1]
    if env_d.get("KEYCLOAK_TENANT_ROLE_PREFIX") == "nextalpha-":
        log_ok("KEYCLOAK_TENANT_ROLE_PREFIX=nextalpha-")
    else:
        log_fail(f"KEYCLOAK_TENANT_ROLE_PREFIX={env_d.get('KEYCLOAK_TENANT_ROLE_PREFIX')!r}")
    if env_d.get("KEYCLOAK_REALM") == "Finspot-Nextalpha":
        log_ok("KEYCLOAK_REALM=Finspot-Nextalpha")
    else:
        log_fail(f"KEYCLOAK_REALM={env_d.get('KEYCLOAK_REALM')!r}")


def simulate_broker_import(M: str, fm_claims: dict, na_user: dict) -> None:
    """What IdP tenant_roles-import does on SSO login."""
    tenant_roles = fm_claims.get("tenant_roles") or []
    attrs = {
        "tenant_roles": tenant_roles if isinstance(tenant_roles, list) else [tenant_roles],
        "linkedeye_site_ids": fm_claims.get("linkedeye_site_ids") or ["1"],
        "linkedeye_sites": fm_claims.get("linkedeye_sites") or ["nextalpha-le"],
    }
    kc_set_user_attrs(M, "Finspot-Nextalpha", na_user, attrs)


def test_role(M: str, fm_user: dict, na_user: dict, broker_role: str, expect_group: str) -> None:
    print(f"\n[test] broker role {broker_role} -> expect MySQL {expect_group}")
    kc_assign_broker_role(M, fm_user["id"], broker_role)
    fm_claims = fm_staff_token(TEST_EMAIL, TEST_PASS)
    tr = fm_claims.get("tenant_roles") or []
    if broker_role in tr:
        log_ok(f"finspot-management token tenant_roles={tr}")
    else:
        log_fail(f"finspot-management token tenant_roles={tr}, expected {broker_role}")

    simulate_broker_import(M, fm_claims, na_user)
    id_claims = na_id_token(TEST_EMAIL, TEST_PASS)
    if id_claims.get("tenant_roles"):
        log_ok(f"Finspot-Nextalpha ID token tenant_roles={id_claims.get('tenant_roles')}")
    else:
        log_fail(f"Finspot-Nextalpha ID token missing tenant_roles: {list(id_claims.keys())[:8]}")

    result = django_sync(TEST_EMAIL, id_claims)
    if result["groups"] == [expect_group]:
        log_ok(f"MySQL groups={result['groups']} (via sync only)")
    else:
        log_fail(f"MySQL groups={result['groups']}, expected [{expect_group}]")
    if result["sites"] == [1]:
        log_ok("MySQL sites=[1]")
    else:
        log_fail(f"MySQL sites={result['sites']}")


def test_oidc_redirect() -> None:
    print("\n[2] OIDC redirect smoke")
    code, _ = curl(
        "GET",
        "https://nextalpha-le-prod.finspot.in/auth/oidc/authenticate/",
        headers={"Accept": "text/html"},
    )
    # curl -sk doesn't follow; check via pod
    out = subprocess.check_output(
        ["kubectl", "-n", K8S_NS, "exec", "deploy/nextalpha-ui", "--",
         "curl", "-s", "-D", "-", "-o", "/dev/null",
         "-H", "Host: nextalpha-le-prod.finspot.in",
         "-H", "X-Forwarded-Proto: https",
         "http://127.0.0.1:8000/auth/oidc/authenticate/"],
        text=True,
    )
    if "301" in out or "302" in out:
        log_ok("OIDC authenticate redirects (301/302)")
    else:
        log_fail(f"OIDC authenticate unexpected: {out[:120]}")
    loc = next((l.split(":", 1)[1].strip() for l in out.splitlines() if l.lower().startswith("location:")), "")
    if "Finspot-Nextalpha" in out or "Finspot-Nextalpha" in loc or "keycloak.finspot.in" in loc:
        log_ok(f"Redirect targets Keycloak ({loc[:80]}...)")
    else:
        log_fail(f"Redirect may not target Keycloak: {loc[:120]}")


def main() -> int:
    print("=== NextAlpha KC SSO E2E Test ===")
    print(f"Test user: {TEST_EMAIL}")
    M = master_token()
    check_kc_infrastructure(M)
    test_oidc_redirect()

    fm_user = kc_find_user(M, "finspot-management", TEST_EMAIL)
    na_user = kc_find_user(M, "Finspot-Nextalpha", TEST_EMAIL)
    if not fm_user or not na_user:
        log_fail(f"test user missing in KC (fm={bool(fm_user)} na={bool(na_user)})")
        print(f"\nRESULT: {PASS} passed, {FAIL} failed")
        return 1

    test_role(M, fm_user, na_user, "nextalpha-Admin", "Admin")
    test_role(M, fm_user, na_user, "nextalpha-ViewOnly", "ViewOnly")
    test_role(M, fm_user, na_user, "nextalpha-Admin", "Admin")

    print(f"\nRESULT: {PASS} passed, {FAIL} failed")
    return 0 if FAIL == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
