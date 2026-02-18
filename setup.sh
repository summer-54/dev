if [[ ! -f "./.env" ]]; then
  echo "DB_PASSWORD=PASSWORD
MAIL_HOST=MAIL_HOST
MAIL_USER=MAIL_USER
MAIL_PASS=MAIL_PASS
MINIO_SECRET_KEY=MINIO_SECRET_KEY
JWT_SECRET=SECRET" > ./.env
fi

if [[ ! -e "./keys" ]]; then
mkdir "./keys"
fi

if [[ ! -f "./keys/private.pem" ]]; then
openssl ecparam -genkey -name prime256v1 -noout -out ./keys/private.pem
fi

if [[ ! -f "./keys/public.pem" ]]; then
openssl pkey -in ./keys/private.pem -pubout -out ./keys/public.pem
fi