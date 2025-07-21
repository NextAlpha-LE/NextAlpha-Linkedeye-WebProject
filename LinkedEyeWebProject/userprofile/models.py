from django.db import models
from django.contrib.auth.models import Group, User
import json  # Add this line to import the json module

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