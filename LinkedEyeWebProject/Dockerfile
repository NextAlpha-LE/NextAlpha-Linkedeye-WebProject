FROM python:3.9

RUN apt-get update \
    && apt-get install -y --no-install-recommends snmp \
        postgresql-client \
        vim \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/

# Install Docker
RUN curl -sSL https://get.docker.com/ | sh

# Install Python deps FIRST (better layer caching too)
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt && pip install gunicorn

# Copy project files AFTER pip install
ADD . /usr/src/

# Copy custom python libs AFTER pip install, and check for conflicts
COPY ./python /usr/src/lib/

# Rest of setup
COPY nagios/ script/ template/ /usr/
RUN rm -rf /usr/src/Dockerfile /usr/src/LinkedEyeWebProject.pyproj* \
    /usr/src/LinkedEyeWebProject.sln \
    && mkdir -p /vault/ /stackstorm/configs/ /usr/src/script/ \
       /usr/src/static/app/usericons /usr/src/static/logs \
    && chmod +x /usr/src/script/

RUN mkdir -p /usr/src/prom-conf

COPY ./entrypoint.py /entrypoint.py

VOLUME /usr/src/monitor /vault/keys.json /usr/src/prom-conf \
       /usr/src/static/app/usericons /usr/src/static/logs

EXPOSE 8000

CMD python /entrypoint.py && python manage.py collectstatic --noinput && \
    gunicorn LinkedEyeWebProject.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers ${GUNICORN_WORKERS:-4} \
    --worker-class sync \
    --max-requests 1000 \
    --max-requests-jitter 50 \
    --timeout 120 \
    --graceful-timeout 30 \
    --preload \
    --access-logfile - \
    --error-logfile -
