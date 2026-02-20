FROM nginx:1.29.0-alpine3.22 AS server

COPY ./nginx/dev.nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]