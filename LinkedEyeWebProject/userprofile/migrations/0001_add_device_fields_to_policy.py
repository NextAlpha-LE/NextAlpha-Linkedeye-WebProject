"""
Migration: add device-wise columns to the existing `policy` table.

Adds four nullable columns so that:
- Existing global policy rows are unaffected (columns remain blank).
- New device-wise rows can store device_type, device_ip, device_friendly_name,
  and is_enabled alongside the existing escalation fields.
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
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
    ]
