from django.db import models
from django.contrib.auth.models import Group, User
import json  # Add this line to import the json module
from lesites.models import SiteModel

# Create your models here.

class policynotifiModel(models.Model):
   policy_id = models.AutoField(primary_key=True)
   subject_category = models.CharField(max_length=50, blank=True, default='')
   device_type = models.CharField(max_length=50, blank=True, default='')
   device_friendly_name = models.CharField(max_length=255, blank=True, default='')
   device_ip = models.CharField(max_length=100, blank=True, default='')
   categories = models.TextField(blank=True, default='')
   escalation_mails = models.TextField(blank=True, default='')
   definite_mails = models.TextField(blank=True, default='')
   approval_timer = models.TextField(blank=True, default='')
   resolution_timer = models.TextField(blank=True, default='')
   escalation_required = models.BooleanField(default=True)
   is_enabled = models.BooleanField(default=True)
   created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
   updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

   class Meta:
       db_table= "policy"

class subsiteModel(models.Model):
   id = models.AutoField(primary_key=True)
   site = models.ForeignKey(SiteModel, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   sub_site = models.TextField()

   class Meta:
       db_table= "subsite"
