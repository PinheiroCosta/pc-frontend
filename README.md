# pc-frontend

Frontend do site **pinheirocosta.com**, hospedado no **Cloudflare Pages**, construído de forma totalmente desacoplada do backend.

Este repositório é **público por design**.

## Objetivo

- Garantir disponibilidade do site mesmo com indisponibilidade do backend.
- Isolar responsabilidades entre frontend e backend.
- Consumir o backend exclusivamente via contrato OpenAPI.
- Permitir builds determinísticos e independentes.

**Regra**: o frontend não depende do backend em execução, nem em tempo de build nem em runtime.

## Stack

- React + TypeScript
- Webpack
- Client gerado via OpenAPI
- Cloudflare Pages

## Arquitetura

Backend (privado)
→ Geração do OpenAPI
→ Release com schema versionado (asset)

Frontend (este repositório)
→ Seleciona versão do contrato
→ Gera client TypeScript
→ Build estático
→ Deploy no Cloudflare Pages
→ backend atua como orquestrador de serviços.  
→ frontend conhece apenas o **contrato OpenAPI**, nunca a implementação.

## Contrato com o Backend

- O contrato é definido por um arquivo OpenAPI (YAML/JSON).
- O schema é publicado como **Release Asset** no repositório do backend.
- Este repositório **não gera o schema**, mas **versiona explicitamente a versão do contrato consumido**.
- A versão ativa do contrato é definida em `openapi/CONTRACT_VERSION`.
- O schema correspondente é armazenado em `openapi/schema.yml`.

**Regra fundamental**:  
Se o contrato não existir, não for acessível ou for inválido, o build do frontend deve falhar.

## Geração do Client API

- O client TypeScript é gerado automaticamente a partir do OpenAPI.
- Código gerado **não deve ser editado manualmente**.
- O diretório `frontend/js/api` contém apenas código derivado do contrato.
- Mudanças no backend exigem uma nova release do backend para refletirem aqui.

Scripts relevantes:
- `npm run openapi:download` – baixa o schema da versão definida em `CONTRACT_VERSION`.
- `npm run openapi:ts` – gera o client TypeScript a partir do schema ativo.

## Fluxo de Branches e Releases

- `dev`
  - Branch de desenvolvimento.
  - Push direto permitido apenas para maintainer.
  - Colaboradores trabalham via PR.
  - Lint obrigatório em push e PR.

- `main`
  - Branch estável.
  - Recebe apenas merges explícitos após release.

### Release

- O release é disparado **manualmente** via GitHub Actions na branch `dev`.
- O `release-please`:
  - Gera versão.
  - Atualiza changelog.
  - Cria tag.
- Após o release, o maintainer realiza o merge de `dev` para `main`.

## Build e Deploy

- Build executado via GitHub Actions.
- Deploy automático no Cloudflare Pages.
- Variáveis de ambiente são exclusivamente de frontend.
- Nenhum segredo do backend é armazenado neste repositório.

## Comportamento em Falhas do Backend

- Falhas de API devem resultar em:
  - Mensagens amigáveis ao usuário.
  - Interface funcional sempre que possível.
- O frontend **não assume disponibilidade do backend**.

## Decisões Arquiteturais

- Frontend público: intencional.
- Backend privado: intencional.
- OpenAPI como contrato único: obrigatório.
- Release Asset como fonte do schema.
- Build desacoplado do backend em execução.
- Estrutura `frontend/js/` mantida por compatibilidade histórica.
