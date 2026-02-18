echo "DB_PASSWORD=PASSWORD
MAIL_HOST=MAIL_HOST
MAIL_USER=MAIL_USER
MAIL_PASS=MAIL_PASS
MINIO_SECRET_KEY=MINIO_SECRET_KEY" > ./.env
openssl ecparam -genkey -name prime256v1 -noout -out ./private.pem
openssl pkey -in ./private.pem -pubout -out ./public.pem