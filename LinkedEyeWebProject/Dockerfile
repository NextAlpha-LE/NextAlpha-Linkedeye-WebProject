# ==============================================================================
# LinkedEye Web Application - Production Dockerfile
# ==============================================================================

# -------------------------------
# Stage 1: Builder (Install Python dependencies)
# -------------------------------
FROM python:3.9-slim AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
        gcc \
        git \
        default-libmysqlclient-dev \
        pkg-config \
        curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Copy requirements
COPY requirements.txt ./

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip \
    && pip install --prefix=/install --no-cache-dir -r requirements.txt

# -------------------------------
# Stage 2: Production image
# -------------------------------
FROM python:3.9-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
        snmp \
        postgresql-client \
        default-libmysqlclient-dev \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Set working directory
WORKDIR /usr/src/

# Create necessary folders
RUN mkdir -p /usr/src/prom-conf /vault/ /stackstorm/configs /usr/src/script \
             /usr/src/static/app/usericons /usr/src/static/logs

# Copy application code
ADD . /usr/src/

COPY nagios/ script/ template/ /usr/

# Make scripts executable
RUN chmod +x /usr/src/script/

# Copy entrypoint
COPY ./entrypoint.py /entrypoint.py

# Expose HTTP port
EXPOSE 80

# Healthcheck for container
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Start application
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
