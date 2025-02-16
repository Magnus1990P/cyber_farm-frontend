FROM python:alpine

RUN apk add build-base libpq libpq-dev

COPY ./requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

RUN mkdir -p /cyberfarm
WORKDIR /cyberfarm

COPY . ./

RUN pip install --no-cache-dir -e .

WORKDIR ./app

CMD  ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]