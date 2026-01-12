# pc-frontend
Frontend do site **pinheirocosta.com**, hospedado no **Cloudflare Pages**.
Este projeto é público e pode ser executado localmente sem dependência do backend em tempo de build ou runtime.

## Visão geral
Este frontend é uma SPA estática construída em React e TypeScript. Ele consome APIs exclusivamente por meio de um contrato OpenAPI previamente versionado. O backend atua apenas como fonte desse contrato, nunca como dependência direta de execução. O build do frontend é determinístico. Se o contrato OpenAPI estiver ausente, inválido ou inconsistente, o processo de build falha de forma explícita.

## Stack
- React + TypeScript
- Webpack
- Client TypeScript gerado via OpenAPI
- Cloudflare Pages (deploy)

## Arquitetura
O backend gera e versiona um schema OpenAPI, publicado como release asset. Este repositório seleciona explicitamente a versão do contrato, gera o client TypeScript correspondente e produz um build estático. O frontend conhece apenas o contrato OpenAPI. Ele nunca depende da implementação do backend nem assume sua disponibilidade.

## Contrato OpenAPI
A versão ativa do contrato é definida no arquivo `openapi/CONTRACT_VERSION`. O schema correspondente é armazenado em `openapi/schema.yml`. O contrato é a única fonte de verdade para comunicação com o backend. Se ele não existir ou estiver inválido, o build deve falhar.

## Geração do client API
O client TypeScript é gerado automaticamente a partir do schema OpenAPI. O código gerado não deve ser editado manualmente e fica localizado em `frontend/js/api`. 
Os scripts `npm run openapi:download` e `npm run openapi:ts` são responsáveis, respectivamente, por baixar o schema da versão configurada e gerar o client a partir dele.

## Rodando localmente
Pré-requisitos:
- Node.js (versão LTS recomendada)
- npm

Após instalar as dependências, basta baixar o contrato OpenAPI, gerar o client e iniciar o servidor de desenvolvimento:

```bash
npm install
npm run openapi:download
npm run openapi:ts
npm run dev

```
O backend não precisa estar em execução.

## Build e deploy
O build é executado via GitHub Actions e o deploy é automático no Cloudflare Pages. Apenas variáveis de ambiente relacionadas ao frontend são utilizadas. Nenhum segredo do backend é armazenado neste repositório.

## Comportamento em falhas de API
O frontend não assume disponibilidade do backend. Em caso de falhas, a interface deve permanecer funcional sempre que possível, apresentando mensagens claras ao usuário.

## Convenções importantes
- Frontend público: intencional
- Backend privado: intencional
- OpenAPI é o único contrato
- Build sempre desacoplado do backend em execução
