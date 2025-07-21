FROM python:3.9

RUN apt-get update \
    && apt-get install -y --no-install-recommends snmp \
        postgresql-client \
	vim \
    && rm -rf /var/lib/apt/lists/*
#RUN apt-get update \
#    && apt-get install -y  snmp=5.8-1 \
#        postgresql-client \
#        vim \
#    && rm -rf /var/lib/apt/lists/*


WORKDIR /usr/src/
COPY requirements.txt ./

# Install Docker from Docker Inc. repositories.
RUN curl -sSL https://get.docker.com/ | sh

RUN mkdir -p /root/.local/lib/python3.9/site-packages /usr/src/prom-conf

COPY ./python /root/.local/lib/python3.9/site-packages

#RUN pip install --upgrade pip && pip uninstall -y -r requirements.txt && pip install -r requirements.txt && rm -rf requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt && rm -rf requirements.txt

ADD . /usr/src/

COPY nagios/ script/  template/ /usr/

RUN rm -rf /usr/src/Dockerfile /usr/src/LinkedEyeWebProject.pyproj* /usr/src/LinkedEyeWebProject.sln && mkdir -p /vault/ && mkdir -p /stackstorm/configs/ /usr/src/script/ /usr/src/static/app/usericons /usr/src/static/logs && chmod +x /usr/src/script/

VOLUME /usr/src/monitor /vault/keys.json /usr/src/prom-conf /usr/src/static/app/usericons /usr/src/static/logs

COPY ./entrypoint.py /entrypoint.py

EXPOSE 80

#CMD ["sh", "-c", "python /entrypoint.py ; python manage.py runserver 0.0.0.0:80"]
#ENTRYPOINT ["python", "/entrypoint.py"]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
# CMD python /entrypoint.py ; python manage.py runserver 0.0.0.0:80
CMD python /entrypoint.py ; python manage.py collectstatic --noinput ; python manage.py runserver 0.0.0.0:80

