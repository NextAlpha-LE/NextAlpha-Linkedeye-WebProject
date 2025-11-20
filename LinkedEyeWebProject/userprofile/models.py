from django.db import models
from django.contrib.auth.models import Group, User
import json  # Add this line to import the json module
from lesites.models import SiteModel

# Create your models here.

class policynotifiModel(models.Model):
   policy_id = models.AutoField(primary_key=True)
   categories = models.TextField()
   escalation_mails = models.TextField()
   definite_mails = models.TextField()
   escalation_required = models.BooleanField(default=True)
   approval_timer = models.TextField()
   resolution_timer = models.TextField()

   class Meta:
       db_table= "policy"


class subsiteModel(models.Model):
   id = models.AutoField(primary_key=True)
   site = models.ForeignKey(SiteModel, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   sub_site = models.TextField()

   class Meta:
       db_table= "subsite"
