from django.db import models
from django.contrib.auth.models import User
from lesites.models import SiteModel


class policynotifiModel(models.Model):
    policy_id = models.AutoField(primary_key=True)
    subject_category = models.CharField(max_length=50, default='')
    device_type = models.CharField(max_length=50, default='')
    device_friendly_name = models.CharField(max_length=255, default='')
    device_ip = models.CharField(max_length=100, default='')
    categories = models.TextField(default='')
    escalation_mails = models.TextField(default='')
    definite_mails = models.TextField(default='')
    approval_timer = models.IntegerField(default=0)
    resolution_timer = models.IntegerField(default=0)
    escalation_required = models.BooleanField(default=True)
    is_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "policy"


class subsiteModel(models.Model):
    id = models.AutoField(primary_key=True)
    site = models.ForeignKey(SiteModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sub_site = models.TextField()

    class Meta:
        db_table = "subsite"
