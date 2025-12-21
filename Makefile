.PHONY: docker_dev docker_install docker_down docker_logs docker_openapi build docker_wipe docker_cleanup_frontend

SHELL := /bin/bash # Use bash syntax

# ==== Targets Básicos ====

docker_install:
	@echo -e "\033[32m[INFO] Instalando dependências e atualizando OpenAPI no Frontend\033[0m"
	docker-compose -f docker-compose.dev.yml run frontend npm install

docker_down:
	@echo -e "\033[32m[INFO] Parando e removendo containers\033[0m"
	docker-compose -f docker-compose.dev.yml down --remove-orphans

docker_dev:
	@echo -e "\033[32m[INFO] Subindo ambiente de desenvolvimento\033[0m"
	docker-compose -f docker-compose.dev.yml up -d

docker_logs:
	@echo -e "\033[32m[INFO] Exibindo logs do serviço $(ARG)\033[0m"
	docker-compose -f docker-compose.dev.yml logs -f $(ARG)

docker_openapi:
	@echo -e "\033[32m[INFO] Atualizando clientes TypeScript com OpenAPI\033[0m"
	docker-compose -f docker-compose.dev.yml run --rm frontend npm run openapi-ts

build:
	npm run build

# ==== Limpezas ====

docker_wipe:
	@echo -e "\033[32m[INFO] Limpeza completa de imagens, volumes e arquivos locais\033[0m"
	sudo chown -R ${USER}:${USER} .
	@git clean -fd
	@rm -rf frontend/webpack_bundles/ node_modules/ dist/
	@docker system prune -a --volumes -f
	@docker volume ls -qf dangling=true | xargs -r docker volume rm

docker_cleanup_frontend:
	@echo -e "\033[32m[INFO] Parando e removendo container frontend\033[0m"
	@docker-compose -f docker-compose.dev.yml stop frontend
	@docker-compose -f docker-compose.dev.yml rm -sf frontend
