ARG PHP_FPM_VERSION

FROM php:${PHP_FPM_VERSION}

RUN apk add libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

CMD ["php-fpm"]

EXPOSE 9000