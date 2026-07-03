"""
State-only migration: subject_category and timestamps on ``policy``.

Database DDL is applied in 0003_policy_escalation_schema (idempotent, data-preserving).
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0001_add_device_fields_to_policy'),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='subject_category',
                    field=models.CharField(blank=True, default='', max_length=50),
                ),
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='created_at',
                    field=models.DateTimeField(auto_now_add=True, null=True),
                ),
                migrations.AddField(
                    model_name='policynotifimodel',
                    name='updated_at',
                    field=models.DateTimeField(auto_now=True, null=True),
                ),
            ],
        ),
    ]
