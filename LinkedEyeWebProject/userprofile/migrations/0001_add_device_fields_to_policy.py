"""
State-only migration: device/BOD columns on ``policy``.

Database DDL is applied in 0003_policy_escalation_schema (idempotent, data-preserving).
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='device_type',
                    field=models.CharField(blank=True, default='', max_length=50),
                ),
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='device_ip',
                    field=models.CharField(blank=True, default='', max_length=100),
                ),
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='device_friendly_name',
                    field=models.CharField(blank=True, default='', max_length=255),
                ),
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='is_enabled',
                    field=models.BooleanField(default=True),
                ),
            ],
        ),
    ]
