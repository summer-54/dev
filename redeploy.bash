podman-compose -f ./server.docker-compose.yaml down
git pull
podman-compose -f ./server.docker-compose.yaml up -d --build
