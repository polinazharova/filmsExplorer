DOCKER_COMPOSE = docker-compose -f docker-compose.yml

.PHONY: build run start stop clean

build:
	$(DOCKER_COMPOSE) build

run:
	$(DOCKER_COMPOSE) up

start:
	$(DOCKER_COMPOSE) up --build

stop:
	$(DOCKER_COMPOSE) down

clean:
	$(DOCKER_COMPOSE) down --rmi all --volumes
