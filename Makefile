.PHONY: install docker_dev openapi docker_down docker_logs docker_clean clean_openapi clean_webpack clean_dist clean_modules docker_wipe

SHELL := /bin/bash # Use bash syntax

install:
	@echo -e "\033[32m[INFO] Instalando dependências no Host\033[0m"
	npm install

docker_dev:
	@echo -e "\033[32m[INFO] Subindo webpack-dev-server via container (deps no host)\033[0m"
	docker-compose -f docker-compose.dev.yml up -d frontend

openapi:
	@echo -e "\033[32m[INFO] Gerando client TypeScript via OpenAPI (host)\033[0m"
	npm run openapi:ts

docker_down:
	@echo -e "\033[32m[INFO] Parando e removendo containers\033[0m"
	docker-compose -f docker-compose.dev.yml down --remove-orphans

docker_logs:
	@echo -e "\033[32m[INFO] Exibindo logs do serviço $(ARG)\033[0m"
	docker-compose -f docker-compose.dev.yml logs -f $(ARG)

# ======= Limpeza ========

clean_modules:
	@echo -e "\033[32m[INFO] Removendo node_modules/.\033[0m"
	@rm -rv node_modules/

clean_openapi:
	@echo -e "\033[32m[INFO] Removendo clientes Typescript da OpenAPI.\033[0m"
	@rm -rv frontend/js/api/

clean_webpack:
	@echo -e "\033[32m[INFO] Removendo assets gerados pelo webpack.\033[0m"
	@rm -rv frontend/webpack_bundles/

clean_dist:
	@echo -e "\033[32m[INFO] Limpeza de arquivos estáticos locais\033[0m"
	@rm -rv dist/

docker_clean:
	@echo -e "\033[32m[INFO] Parando e removendo container frontend\033[0m"
	docker-compose -f docker-compose.dev.yml stop frontend
	docker-compose -f docker-compose.dev.yml rm -sf frontend

docker_wipe:
	@echo -e "\033[32m[INFO] Limpeza completa de imagens, e volumes docker\033[0m"
	docker system prune -a --volumes -f
	docker volume ls -qf dangling=true | xargs -r docker volume rm
