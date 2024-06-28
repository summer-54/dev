FROM node:20.11.0-alpine3.18 as frontend-builder
WORKDIR /app
COPY ./frontend .
RUN npm ci
RUN npm run build

FROM nginx:latest as server
COPY --from=frontend-builder /app/dist /frontend
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]