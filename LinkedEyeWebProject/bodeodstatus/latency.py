import os
import re
import logging
import django
import pandas as pd
from datetime import datetime, timedelta

# --- Django setup -----------------------------------------
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LinkedEyeWebProject.settings')
django.setup()

from django.db import connections

# --- Logging ----------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)
logger = logging.getLogger(__name__)


# --- Config -----------------------------------------------

CSV_DIR      = os.environ.get('MQ_CSV_DIR', '/data/noren_core/COZY_LOG_FILES/nfs_ps')
DAYS_TO_KEEP = 30


# --- DB Utility Helpers -----------------------------------

def is_table_empty(table_name):
    """Returns True if <table> has zero rows."""
    with connections['default'].cursor() as cursor:
        cursor.execute(f'SELECT COUNT(*) FROM {table_name}')
        return cursor.fetchone()[0] == 0


def get_last_inserted_date(table_name):
    """Returns MAX(file_date) from <table>, or None."""
    with connections['default'].cursor() as cursor:
        cursor.execute(f'SELECT MAX(file_date) FROM {table_name}')
        result = cursor.fetchone()[0]
    return result if result else None


# --- Date Helpers -----------------------------------------

def get_missing_dates(last_date):
    if not last_date:
        return []
    missing     = []
    current     = datetime.today().date()
    date_cursor = last_date + timedelta(days=1)
    while date_cursor <= current:
        if date_cursor.weekday() < 5:
            missing.append(date_cursor.strftime('%d-%b-%Y'))
        date_cursor += timedelta(days=1)
    return missing


def get_available_dates():
    cutoff      = datetime.today().date() - timedelta(days=DAYS_TO_KEEP)
    found_dates = set()
    if not os.path.exists(CSV_DIR):
        logger.warning('CSV_DIR does not exist: %s', CSV_DIR)
        return []
    for fname in os.listdir(CSV_DIR):
        match = re.search(r'(\d{2}-[A-Za-z]+-\d{4})', fname)
        if match:
            date_str  = match.group(1)
            file_date = datetime.strptime(date_str, '%d-%b-%Y').date()
            if file_date >= cutoff:
                found_dates.add(date_str)
    return sorted(found_dates, key=lambda d: datetime.strptime(d, '%d-%b-%Y'))


# --- File Helpers -----------------------------------------

def is_valid_file(filepath):
    return os.path.exists(filepath) and os.path.getsize(filepath) > 0


def extract_segment_and_line(filename):
    match = re.search(r'QueSize_([A-Z0-9]+?)(2)?_\d{2}-[A-Za-z]+-\d{4}\.csv', filename)
    if match:
        return match.group(1), ('2' if match.group(2) else '1')
    return None, None


# --- Insert Helpers ---------------------------------------

def insert_data(df, table_name, batch_size=1000):
    if df.empty:
        logger.info('No data to insert into %s', table_name)
        return

    query = (
        f'INSERT INTO {table_name} '
        f'(file_date, segment, time, seq_no, erf, queue_size) '
        f'VALUES (%s, %s, %s, %s, %s, %s)'
    )
    values         = [tuple(row) for _, row in df.iterrows()]
    total_batches  = (len(values) + batch_size - 1) // batch_size
    total_inserted = 0

    for batch_num, start in enumerate(range(0, len(values), batch_size), start=1):
        batch = values[start:start + batch_size]
        with connections['default'].cursor() as cursor:
            cursor.executemany(query, batch)
        total_inserted += len(batch)
        logger.info('Inserted %d rows into %s (batch %d/%d)',
                    len(batch), table_name, batch_num, total_batches)

    logger.info('Total inserted into %s: %d rows', table_name, total_inserted)


# --- Processing Functions ---------------------------------

def process_queue_data(file_date):
    if not os.path.exists(CSV_DIR): return
    for fname in os.listdir(CSV_DIR):
        if not (fname.startswith('QueSize_') and file_date in fname):
            continue
        path = os.path.join(CSV_DIR, fname)
        if not is_valid_file(path):
            continue
        segment, line = extract_segment_and_line(fname)
        if not segment:
            continue
        try:
            logger.info('Processing queue file: %s (segment=%s, line=%s)', fname, segment, line)
            df = pd.read_csv(path)

            df['file_date'] = datetime.strptime(file_date, '%d-%b-%Y').date()
            df['segment']   = segment
            df['time'] = (
                pd.to_datetime(df['Time'], format='%a %b %d %I:%M:%S %p IST %Y', errors='coerce')
                .dt.tz_localize('Asia/Kolkata', ambiguous='NaT', nonexistent='NaT')
                .dt.tz_localize(None)
            )
            df = df[['file_date', 'segment', 'time', 'SeqNo', 'Erf', 'QSz']]
            df.columns = ['file_date', 'segment', 'time', 'seq_no', 'erf', 'queue_size']

            table_name = 'queue_line2' if line == '2' else 'queue_line1'
            insert_data(df, table_name)
        except Exception as e:
            logger.error('Failed to process queue file %s: %s', fname, e)
            continue


def process_order_latency(file_date, batch_size=1000):
    fname = f'ORDERLATENCY_{file_date}.csv'
    path  = os.path.join(CSV_DIR, fname)
    if not is_valid_file(path):
        logger.info('Order latency file not found or empty: %s', fname)
        return
    try:
        logger.info('Processing order latency file: %s', fname)
        df = pd.read_csv(path)

        df['file_date'] = datetime.strptime(file_date, '%d-%b-%Y').date()
        df['oms_update_time_conv'] = (
            pd.to_datetime(df['OMSUPDATETIME'], unit='s', utc=True)
            .dt.tz_convert('Asia/Kolkata')
            .dt.tz_localize(None)
        )
        df = df[[
            'file_date', 'NOREN_ORD_NUM', 'EXCH_SEG', 'TOKEN',
            'OMS_LATENCY', 'OMS_EXCH_CONFIRMATION',
            'OMSUPDATETIME', 'EXCHUPDATETIME', 'oms_update_time_conv',
        ]]
        df.columns = [
            'file_date', 'noren_ord_num', 'exch_seg', 'token',
            'oms_latency', 'oms_exch_confirmation',
            'oms_update_time', 'exch_update_time', 'oms_update_time_conv',
        ]

        query = (
            'INSERT INTO order_latency '
            '(file_date, noren_ord_num, exch_seg, token, oms_latency, '
            ' oms_exch_confirmation, oms_update_time, exch_update_time, oms_update_time_conv) '
            'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)'
        )
        total_batches = (len(df) + batch_size - 1) // batch_size
        for batch_num, start in enumerate(range(0, len(df), batch_size), start=1):
            batch_df = df.iloc[start:start + batch_size]
            values   = [tuple(row) for _, row in batch_df.iterrows()]
            with connections['default'].cursor() as cursor:
                cursor.executemany(query, values)
            logger.info('Inserted %d rows into order_latency (batch %d/%d)',
                        len(batch_df), batch_num, total_batches)
    except Exception as e:
        logger.error('Failed to process order latency file %s: %s', fname, e)


def cleanup_old_data():
    for table in ('queue_line1', 'queue_line2', 'order_latency'):
        with connections['default'].cursor() as cursor:
            cursor.execute(
                f'SELECT DISTINCT file_date FROM {table} '
                f'ORDER BY file_date DESC LIMIT %s',
                [DAYS_TO_KEEP]
            )
            trading_days = [row[0] for row in cursor.fetchall()]
        if trading_days:
            oldest_to_keep = min(trading_days)
            with connections['default'].cursor() as cursor:
                cursor.execute(
                    f'DELETE FROM {table} WHERE file_date < %s',
                    [oldest_to_keep]
                )
            logger.info('Cleaned %s: removed rows older than %s', table, oldest_to_keep)
        else:
            logger.info('No data in %s, skipping cleanup', table)


# --- Main -------------------------------------------------

def main():
    try:
        if (
            is_table_empty('queue_line1')
            or is_table_empty('queue_line2')
            or is_table_empty('order_latency')
        ):
            logger.info('First-time insertion: loading last %d days...', DAYS_TO_KEEP)
            for file_date in get_available_dates():
                if datetime.strptime(file_date, '%d-%b-%Y').weekday() < 5:
                    process_queue_data(file_date)
                    process_order_latency(file_date)
        else:
            logger.info("Performing scheduled daily update...")
            cutoff = datetime.today().date() - timedelta(days=DAYS_TO_KEEP)
            queue_missing = sorted(
                set(get_missing_dates(get_last_inserted_date('queue_line1')))
                | set(get_missing_dates(get_last_inserted_date('queue_line2'))),
                key=lambda d: datetime.strptime(d, '%d-%b-%Y'),
            )
            for date_str in queue_missing:
                if datetime.strptime(date_str, '%d-%b-%Y').date() >= cutoff:
                    process_queue_data(date_str)
            for date_str in get_missing_dates(get_last_inserted_date('order_latency')):
                if datetime.strptime(date_str, '%d-%b-%Y').date() >= cutoff:
                    process_order_latency(date_str)
            
            today = datetime.today().strftime('%d-%b-%Y')
            process_queue_data(today)
            process_order_latency(today)

        cleanup_old_data()
        logger.info('ETL completed successfully.')
    except Exception as e:
        logger.error('ETL run failed: %s', e)
        raise


if __name__ == '__main__':
    main()
