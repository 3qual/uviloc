ARG NODE_VERSION

FROM node:${NODE_VERSION}

RUN apk update \
    && apk upgrade \
    && apk --update add logrotate \
    && apk add --no-cache openssl \
    && apk add --no-cache bash

CMD ["node"]

EXPOSE ${NODE_REACT_PORT}
