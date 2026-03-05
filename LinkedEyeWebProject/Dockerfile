# ==============================================================================
# LinkedEye Web Application - Production Dockerfile
# ==============================================================================

# Stage 1: Build dependencies
FROM python:3.9-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        git \
        default-libmysqlclient-dev \
        pkg-config \
        curl \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt


# Stage 2: Production image
FROM python:3.9-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        snmp \
        postgresql-client \
        default-libmysqlclient-dev \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

WORKDIR /usr/src/

RUN mkdir -p \
    /root/.local/lib/python3.9/site-packages \
    /usr/src/prom-conf \
    /vault/ \
    /stackstorm/configs/ \
    /usr/src/script/ \
    /usr/src/static/app/usericons \
    /usr/src/static/logs

# Copy Python modules
COPY ./python /root/.local/lib/python3.9/site-packages

# Copy entire application
ADD . /usr/src/

# Copy misc scripts
COPY nagios/ script/ template/ /usr/

# Cleanup unnecessary files
RUN rm -rf /usr/src/Dockerfile /usr/src/LinkedEyeWebProject.pyproj* /usr/src/LinkedEyeWebProject.sln \
    && chmod +x /usr/src/script/

# Persistent volumes
VOLUME /usr/src/monitor /vault/keys.json /usr/src/prom-conf /usr/src/static/app/usericons /usr/src/static/logs

# Copy entrypoint
COPY ./entrypoint.py /entrypoint.py

ENV PYTHONPATH=/usr/src:$PYTHONPATH

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

CMD python /entrypoint.py \
    && python manage.py collectstatic --noinput \
    && gunicorn LinkedEyeWebProject.wsgi:application \
        --bind 0.0.0.0:80 \
        --workers ${GUNICORN_WORKERS:-4} \
        --max-requests 1000 \
        --max-requests-jitter 50 \
        --timeout 120 \
        --graceful-timeout 30 \
        --worker-class sync \
        --access-logfile /usr/src/static/logs/access.log \
        --error-logfile /usr/src/static/logs/error.log \
        --log-level info
