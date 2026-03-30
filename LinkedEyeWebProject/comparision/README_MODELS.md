# LinkedEye Database Models

This file contains Django models for the three tables in the `linkedeye` database:
- `order_latency` - Order latency metrics
- `queue_line1` - Queue data for Line-1 segments (BSE, BFO)
- `queue_line2` - Queue data for Line-2 segments (NSE, NFO)

## Models Overview

### OrderLatencyModel
Maps to `linkedeye.order_latency` table.

**Fields:**
- `file_date` - Date of the data file
- `noren_ord_num` - Order number
- `exch_seg` - Exchange segment (NSE, NFO, BSE, BFO)
- `token` - Token identifier
- `oms_latency` - OMS latency in milliseconds
- `oms_exch_confirmation` - OMS to exchange confirmation latency
- `oms_update_time` - OMS update timestamp
- `exch_update_time` - Exchange update timestamp
- `oms_update_time_conv` - Converted OMS update datetime
- `timestamp` - Record timestamp
- `site` - Site identifier

### QueueLine1Model
Maps to `linkedeye.queue_line1` table (BSE, BFO segments).

**Fields:**
- `file_date` - Date of the data file
- `segment` - Segment name (BSE, BFO)
- `time` - Queue measurement time
- `seq_no` - Sequence number
- `erf` - Error flag
- `queue_size` - Queue size value
- `timestamp` - Record timestamp
- `site` - Site identifier

### QueueLine2Model
Maps to `linkedeye.queue_line2` table (NSE, NFO segments).

**Fields:**
- `file_date` - Date of the data file
- `segment` - Segment name (NSE-CTCL-xxx, NFO-CTCL-xxx)
- `time` - Queue measurement time
- `seq_no` - Sequence number
- `erf` - Error flag
- `queue_size` - Queue size value
- `timestamp` - Record timestamp
- `site` - Site identifier

## Usage Examples

### Import Models
```python
from comparision.models import OrderLatencyModel, QueueLine1Model, QueueLine2Model
```

### Query All Records
```python
# Get all order latency records
orders = OrderLatencyModel.objects.using('default').all()

# Get all queue line 1 records
queue1 = QueueLine1Model.objects.using('default').all()

# Get all queue line 2 records
queue2 = QueueLine2Model.objects.using('default').all()
```

### Filter by Date
```python
from datetime import date

# Get orders for a specific date
today_orders = OrderLatencyModel.objects.using('default').filter(
    file_date=date(2024, 1, 15)
)

# Get queue data for a specific date
queue_data = QueueLine1Model.objects.using('default').filter(
    file_date=date(2024, 1, 15)
)
```

### Filter by Segment
```python
# Get NSE segment data
nse_data = QueueLine2Model.objects.using('default').filter(
    segment__startswith='NSE'
)

# Get BSE segment data
bse_data = QueueLine1Model.objects.using('default').filter(
    segment='BSE'
)
```

### Order and Limit Results
```python
# Get latest 100 orders
latest_orders = OrderLatencyModel.objects.using('default').order_by('-timestamp')[:100]

# Get highest queue sizes
high_queues = QueueLine2Model.objects.using('default').order_by('-queue_size')[:50]
```

### Aggregate Queries
```python
from django.db.models import Avg, Max, Min, Count

# Calculate average OMS latency
avg_latency = OrderLatencyModel.objects.using('default').aggregate(
    avg_oms=Avg('oms_latency'),
    max_oms=Max('oms_latency'),
    min_oms=Min('oms_latency')
)

# Count records by segment
segment_counts = QueueLine2Model.objects.using('default').values('segment').annotate(
    count=Count('id')
)
```

### Filter by Time Range
```python
from datetime import datetime, timedelta

# Get data from last hour
one_hour_ago = datetime.now() - timedelta(hours=1)
recent_data = OrderLatencyModel.objects.using('default').filter(
    timestamp__gte=one_hour_ago
)
```

### Complex Queries
```python
# Get high latency orders for NSE segment
high_latency_nse = OrderLatencyModel.objects.using('default').filter(
    exch_seg='NSE',
    oms_latency__gt=100  # latency > 100ms
).order_by('-oms_latency')

# Get peak queue sizes by segment
from django.db.models import Max
peak_queues = QueueLine2Model.objects.using('default').values('segment').annotate(
    peak=Max('queue_size')
).order_by('-peak')
```

## Using in Views

### Example View Function
```python
from django.http import JsonResponse
from comparision.models import OrderLatencyModel, QueueLine1Model, QueueLine2Model

def get_order_latency_orm(request):
    """
    Alternative implementation using Django ORM instead of raw SQL
    """
    try:
        # Query using ORM
        orders = OrderLatencyModel.objects.using('default').all()[:100]
        
        # Convert to list of dictionaries
        data = []
        for order in orders:
            data.append({
                'file_date': str(order.file_date) if order.file_date else None,
                'noren_ord_num': order.noren_ord_num,
                'exch_seg': order.exch_seg,
                'token': order.token,
                'oms_latency': float(order.oms_latency) if order.oms_latency else None,
                'oms_exch_confirmation': float(order.oms_exch_confirmation) if order.oms_exch_confirmation else None,
                'timestamp': order.timestamp.strftime('%Y-%m-%d %H:%M:%S') if order.timestamp else None,
                'site': order.site
            })
        
        return JsonResponse({'status': 200, 'data': data})
    
    except Exception as e:
        return JsonResponse({'status': 400, 'msg': str(e)})
```

## Important Notes

1. **managed = False**: These models have `managed = False` in their Meta class, which means:
   - Django will NOT create these tables during migrations
   - Django will NOT modify these tables during migrations
   - The tables must already exist in the database

2. **Database Routing**: Use `.using('default')` to specify which database connection to use:
   ```python
   # Use default connection
   data = OrderLatencyModel.objects.using('default').all()
   ```

3. **Schema Prefix**: The tables are in the `linkedeye` schema. Django handles this automatically through the database configuration.

4. **Raw SQL Alternative**: The current implementation in `bodeodstatus/messagequeue_views.py` uses raw SQL queries with `connection.cursor()` for direct database access. Both approaches work fine.

## Migration (Optional)

If you want Django to be aware of these models (but not manage them), you can create a migration:

```bash
python manage.py makemigrations comparision
python manage.py migrate comparision --fake
```

The `--fake` flag tells Django to record the migration without actually running it, since the tables already exist.
