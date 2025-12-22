.PHONY: docker_dev docker_install docker_down docker_logs docker_openapi build docker_wipe docker_clean clean_openapi clean_webpack clean_dist clean_modules

SHELL := /bin/bash # Use bash syntax

docker_install:
	@echo -e "\033[32m[INFO] Instalando dependências e atualizando OpenAPI no Frontend\033[0m"
	docker-compose -f docker-compose.dev.yml run --rm frontend npm install

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
