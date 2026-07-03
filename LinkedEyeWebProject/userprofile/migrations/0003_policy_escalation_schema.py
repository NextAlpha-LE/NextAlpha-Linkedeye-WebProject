"""
Apply production ``policy`` table schema (device-wise escalation / BOD).

Data-preserving: uses ADD/MODIFY only (no DROP COLUMN).
"""
from django.db import migrations, models

from userprofile.policy_schema import upgrade_policy_schema


def _run_policy_upgrade(apps, schema_editor):
    upgrade_policy_schema(schema_editor.connection, dry_run=False)


class Migration(migrations.Migration):

    atomic = False

    dependencies = [
        ('userprofile', '0002_policy_subject_category'),
    ]

    operations = [
        migrations.RunPython(_run_policy_upgrade, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='subject_category',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='device_type',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='device_friendly_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='device_ip',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='categories',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='escalation_mails',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='definite_mails',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='approval_timer',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='resolution_timer',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='escalation_required',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='is_enabled',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='policynotifimodel',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
