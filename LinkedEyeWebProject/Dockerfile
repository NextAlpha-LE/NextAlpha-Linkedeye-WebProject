# ==============================================================================
# LinkedEye Web Application - Production Dockerfile
# ==============================================================================

# ----------------------------
# Stage 1: Build dependencies
# ----------------------------
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

# Copy requirements
COPY requirements.txt .

# Install dependencies into a separate install prefix
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt


# ----------------------------
# Stage 2: Production image
# ----------------------------
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

# Set working directory
WORKDIR /usr/src

# Create required directories
RUN mkdir -p \
    /usr/src/prom-conf \
    /vault/ \
    /stackstorm/configs/ \
    /usr/src/script/ \
    /usr/src/static/app/usericons \
    /usr/src/static/logs

# Copy application code
COPY . /usr/src

# Copy additional project modules safely (not into site-packages)
COPY ./python /usr/src/python

# Copy supporting directories
COPY nagios/ script/ template/ /usr/

# Remove development artifacts and ensure scripts executable
RUN rm -rf \
        /usr/src/Dockerfile \
        /usr/src/LinkedEyeWebProject.pyproj* \
        /usr/src/LinkedEyeWebProject.sln \
    && chmod +x /usr/src/script/*

# Set Python module path
ENV PYTHONPATH=/usr/src:/usr/src/python

# Persistent volumes
VOLUME /usr/src/monitor \
       /vault/keys.json \
       /usr/src/prom-conf \
       /usr/src/static/app/usericons \
       /usr/src/static/logs

# Copy entrypoint script
COPY entrypoint.py /entrypoint.py

# Expose service port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Start application (JSON form recommended for signal handling)
CMD ["sh", "-c", "python /entrypoint.py && python manage.py collectstatic --noinput && gunicorn LinkedEyeWebProject.wsgi:application --bind 0.0.0.0:80 --workers ${GUNICORN_WORKERS:-4} --max-requests 1000 --max-requests-jitter 50 --timeout 120 --graceful-timeout 30 --worker-class sync --access-logfile /usr/src/static/logs/access.log --error-logfile /usr/src/static/logs/error.log --log-level info"]
