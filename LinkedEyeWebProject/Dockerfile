#<<<<<<< HEAD
# ======================================================================
# LinkedEye Web Application - Production Dockerfile
# ======================================================================

# Stage 1: Build dependencies
FROM python:3.9-slim AS builder

# Install system dependencies needed to build Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
        gcc \
        git \
        default-libmysqlclient-dev \
        pkg-config \
        curl \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Copy requirements and upgrade pip
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: Production image
FROM python:3.9-slim

# Install runtime system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
        snmp \
        postgresql-client \
        default-libmysqlclient-dev \
        curl \
    && rm -rf /var/lib/apt/lists/*
#=======
# ==============================================================================
# LinkedEye Web Application - Production Dockerfile
# ==============================================================================

# Stage 1: Build dependencies
FROM python:3.9-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        default-libmysqlclient-dev \
        pkg-config \
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
#>>>>>>> 32ccd78 (Linkedeye optimized code updates and architecture improvements)

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Set working directory for the app
WORKDIR /usr/src/

# Create required directories
RUN mkdir -p \
    /root/.local/lib/python3.9/site-packages \
    /usr/src/prom-conf \
    /vault/ \
    /stackstorm/configs/ \
    /usr/src/script/ \
    /usr/src/static/app/usericons \
    /usr/src/static/logs

# Copy Python modules (if you have any local modules)
COPY ./python /root/.local/lib/python3.9/site-packages

#<<<<<<< HEAD
# Copy the entire app
ADD . /usr/src/

# Copy misc scripts and templates
COPY nagios/ script/ template/ /usr/

# Cleanup unnecessary files
#=======
ADD . /usr/src/

COPY nagios/ script/ template/ /usr/

#>>>>>>> 32ccd78 (Linkedeye optimized code updates and architecture improvements)
RUN rm -rf /usr/src/Dockerfile /usr/src/LinkedEyeWebProject.pyproj* /usr/src/LinkedEyeWebProject.sln \
    && chmod +x /usr/src/script/

# Volumes for persistent storage
VOLUME /usr/src/monitor /vault/keys.json /usr/src/prom-conf /usr/src/static/app/usericons /usr/src/static/logs

# Copy entrypoint
COPY ./entrypoint.py /entrypoint.py

# Set PYTHONPATH so Python can find LinkedEyeVault and other modules
ENV PYTHONPATH=/usr/src:$PYTHONPATH

# Expose port 80
EXPOSE 80

#<<<<<<< HEAD
# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Production WSGI server with Gunicorn
#=======
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Production WSGI server with worker recycling to prevent memory leaks
# --max-requests 1000: recycle workers after 1000 requests (mitigates memory leaks)
# --max-requests-jitter 50: prevent all workers recycling simultaneously
# --workers: number of worker processes (2*CPU+1 recommended, 4 is safe default)
# --timeout 120: request timeout
# --graceful-timeout 30: time for graceful worker shutdown
# --access-logfile: structured access logging
# --error-logfile: error logging
#>>>>>>> 32ccd78 (Linkedeye optimized code updates and architecture improvements)
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
