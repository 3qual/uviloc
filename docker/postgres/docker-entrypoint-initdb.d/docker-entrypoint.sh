!/bin/bash



   psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
       CREATE USER myuser WITH PASSWORD 'mypassword';
       CREATE DATABASE mydb;
       GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
   EOSQL
