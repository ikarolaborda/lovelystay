build:
	docker-compose --env-file .env -f docker-compose.yml up -d --build --force-recreate

run:
	@echo "Checking if the app container is running..."
	@if [ -z "$$(docker ps -q -f name=lovelystay-app -f status=running)" ]; then \
		echo "Container is not running. Starting the container..."; \
		docker-compose --env-file .env -f docker-compose.yml up -d app; \
	fi
	@echo "Executing application Main Menu"
	@docker exec -it lovelystay-app node dist/main.js

test:
	@echo "Checking if the app container is running..."
	@if [ -z "$$(docker ps -q -f name=lovelystay-app -f status=running)" ]; then \
		echo "Container is not running. Starting the container..."; \
		docker-compose --env-file .env -f docker-compose.yml up -d app; \
	fi
	@echo "Running tests..."
	@docker exec -it lovelystay-app npm run test

bash:
	@echo "Checking if the app container is running..."
	@if [ -z "$$(docker ps -q -f name=lovelystay-app -f status=running)" ]; then \
		echo "Container is not running. Starting the container..."; \
		docker-compose --env-file .env -f docker-compose.yml up -d app; \
	fi
	@echo "Opening a Bash shell in the app container..."
	@docker exec -it lovelystay-app bash

down:
	@echo "Stopping and removing containers..."
	@docker-compose --env-file .env -f docker-compose.yml down --volumes
