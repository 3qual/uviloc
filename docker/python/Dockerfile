ARG PYTHON_VERSION

FROM python:${PYTHON_VERSION}

RUN apk update \
    && apk upgrade \
    && apk --update add logrotate \
    && apk add --no-cache openssl \
    && apk add --no-cache bash

CMD ["python"]

EXPOSE ${PYTHON_BOT_PORT}
