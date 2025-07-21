from django.db import models
from django.conf import settings

class TicketOverviewModel(models.Model):
    id = models.AutoField(primary_key=True)
    date=models.DateField()
    sitename=models.TextField()
    data=models.CharField(max_length=1024)


    class Meta:
       db_table= "ticket_overview"

class TicketSiteviewModel(models.Model):
    id = models.AutoField(primary_key=True)
    date=models.DateField()
    sitename=models.TextField()
    data=models.CharField(max_length=1024)

    class Meta:
       db_table= "ticket_siteview"