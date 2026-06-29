"""
Seed application secrets into HashiCorp Vault from environment variables.

Run once during initial deployment (or when rotating secrets):

    export VAULT_TOKEN=<bootstrap-root-or-admin-token>
    export SECRET_KEY=...
    export MYSQL_DB_PASS=...
    python manage.py vault_seed_app_secrets

With AppRole already configured, root token is not required if VAULT_APP_ROLE_ID
has write access (bootstrap role only).
"""

from django.core.management.base import BaseCommand

import os

from lib.LinkedEyeVault.AppSecrets import APP_SECRET_KEYS, write_vault_bundle


class Command(BaseCommand):
    help = "Write application secrets from environment variables into Vault KV bundle"

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print secrets that would be written without calling Vault",
        )

    def handle(self, *args, **options):
        bundle = {}
        missing = []

        for key in APP_SECRET_KEYS:
            value = os.getenv(key, "")
            if value:
                bundle[key] = value
            else:
                missing.append(key)

        if not bundle:
            self.stderr.write(self.style.ERROR("No secrets found in environment to seed."))
            return

        self.stdout.write(f"Prepared {len(bundle)} secret(s) for Vault.")
        if missing:
            self.stdout.write(self.style.WARNING(f"Skipped empty keys: {', '.join(missing)}"))

        if options["dry_run"]:
            for key in sorted(bundle):
                self.stdout.write(f"  {key}=***")
            return

        if write_vault_bundle(bundle):
            self.stdout.write(self.style.SUCCESS("Vault app secrets bundle updated successfully."))
        else:
            self.stderr.write(self.style.ERROR("Failed to write secrets to Vault."))
