FROM oven/bun:latest AS frontend-builder

WORKDIR /app

COPY ./frontend .

RUN bun i
RUN bun run build

FROM nginx:1.27.0-alpine3.19 AS server

COPY --from=frontend-builder /app/dist /frontend
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
