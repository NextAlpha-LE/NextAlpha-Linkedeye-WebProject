from django.db import models
from django.contrib.auth.models import Group, User

# Create your models here.

class newOnbModel(models.Model):
   id = models.AutoField(primary_key=True)
   selecthost = models.TextField()
   ipaddress = models.TextField()
   servertype = models.TextField()
   emailid = models.TextField()
   servicename = models.TextField()
   json = models.TextField()
   textname = models.TextField()
   pathhost = models.TextField()
   hostname = models.TextField()
   phyipaddr = models.TextField()

   class Meta:
       db_table= "newonb1"


class managementModel(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.ForeignKey(newOnbModel, on_delete=models.CASCADE)
    ipaddress = models.CharField(max_length=25)
    prototype = models.CharField(max_length=50)
    iloip = models.TextField()
    username = models.TextField()
    password = models.TextField()
    port = models.TextField()
    threshold = models.TextField()

    class Meta:
        db_table = "management1"
        unique_together = ('ipaddress', 'prototype')

    def save(self, *args, **kwargs):
        # Check if there is already an existing record with the same ip, ipaddress, and prototype combination
        existing_record = managementModel.objects.filter(ipaddress=self.ipaddress, prototype=self.prototype).first()
        if existing_record:
            # If there is an existing record with the same ip, ipaddress, and prototype combination,
            # update the record with the new values
            existing_record.ip_id = self.ip_id            
            existing_record.iloip = self.iloip
            existing_record.username = self.username
            existing_record.password = self.password
            existing_record.port = self.port
            existing_record.threshold = json.dumps(json.loads(self.threshold.replace("''", "\"").replace("'", "\"")))
            existing_record.save()
        else:
            # If there is no existing record with the same ip, ipaddress, and prototype combination,
            # create a new record with the provided values
            super().save(*args, **kwargs)


