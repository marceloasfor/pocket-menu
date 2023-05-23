FROM python:alpine3.18

# Expose ports
EXPOSE 80 8000

RUN apk update

ENV VIRTUAL_ENV=/opt/venv
RUN python3.11 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


# RUN pip install --upgrade pip setuptools wheel # to get latest setuptools
RUN pip install --upgrade pip wheel
RUN pip install setuptools==45.2.0

# Set the default directory where CMD will execute
RUN mkdir -p /var/task
WORKDIR /var/task

ADD requirements.txt /var/task

RUN pip install -r requirements.txt

ENTRYPOINT ["/opt/venv/bin/python", "/var/task/manage.py"]
