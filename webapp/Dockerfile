# FROM python:alpine3.18
FROM amazon/aws-lambda-python:3.9.2023.01.11.07

# Expose ports
EXPOSE 80 8000

# RUN apk update
# RUN apk add gcc libxml2-dev musl-dev
# RUN apk add make

RUN yum update -y

# These postgres dependencies are to just install "pg_dump", not entire postgresql server.
RUN yum install -y libxml2-devel xmlsec1-devel xmlsec1-openssl-devel libtool-ltdl-devel wget \
    https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/postgresql11-libs-11.9-1PGDG.rhel7.x86_64.rpm \
    https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/postgresql11-11.9-1PGDG.rhel7.x86_64.rpm


ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install terraform
# TODO

RUN pip install --upgrade pip setuptools wheel
RUN pip install --upgrade pip wheel
RUN pip install setuptools==45.2.0
RUN pip install pytest

# Set the default directory where CMD will execute
RUN mkdir -p /var/task
WORKDIR /var/task

ADD requirements.txt /var/task

RUN pip install -r requirements.txt

ENTRYPOINT ["/opt/venv/bin/python", "/var/task/manage.py"]
