from django.db import models
from django.conf import settings

class OrderLatencyModel(models.Model):
    """
    Model for order_latency table
    Stores order latency metrics for OMS and exchange confirmations
    """
    id = models.AutoField(primary_key=True)
    file_date = models.DateField(null=True, blank=True)
    noren_ord_num = models.CharField(max_length=100, null=True, blank=True)
    exch_seg = models.CharField(max_length=50, null=True, blank=True)
    token = models.CharField(max_length=100, null=True, blank=True)
    oms_latency = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    oms_exch_confirmation = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    oms_update_time = models.CharField(max_length=50, null=True, blank=True)
    exch_update_time = models.CharField(max_length=50, null=True, blank=True)
    oms_update_time_conv = models.DateTimeField(null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "order_latency"
        managed = True


class QueueLine1Model(models.Model):
    """
    Model for queue_line1 table
    Stores queue data for Line-1 segments (BSE, BFO)
    """
    id = models.AutoField(primary_key=True)
    file_date = models.DateField(null=True, blank=True)
    segment = models.CharField(max_length=50, null=True, blank=True)
    time = models.DateTimeField(null=True, blank=True)
    seq_no = models.IntegerField(null=True, blank=True)
    erf = models.IntegerField(null=True, blank=True)
    queue_size = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "queue_line1"
        managed = True


class QueueLine2Model(models.Model):
    """
    Model for queue_line2 table
    Stores queue data for Line-2 segments (NSE, NFO)
    """
    id = models.AutoField(primary_key=True)
    file_date = models.DateField(null=True, blank=True)
    segment = models.CharField(max_length=50, null=True, blank=True)
    time = models.DateTimeField(null=True, blank=True)
    seq_no = models.IntegerField(null=True, blank=True)
    erf = models.IntegerField(null=True, blank=True)
    queue_size = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "queue_line2"
        managed = True
