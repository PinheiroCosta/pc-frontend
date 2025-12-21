# pc-frontend
Frontend do site pinheirocosta.com, hospedado no Cloudflare Pages, construído de forma totalmente desacoplada do backend.

Este repositório é público por design.

### Objetivo
- Garantir disponibilidade do site mesmo com backend indisponível.
- Isolar responsabilidades de frontend e backend.
- Consumir o backend exclusivamente via OpenAPI.
- Permitir builds determinísticos e independentes.
O frontend nunca depende do backend em tempo de build ou runtime.

### Stack
- React
- Webpack
- TypeScript
- OpenAPI (client gerado)
- Cloudflare Pages

### Arquitetura
```
Backend (privado)
  → OpenAPI schema versionado
  → GitHub Release (asset)

Frontend (este repo)
  → Consome schema da release
  → Gera client TypeScript
  → Build estático
  → Deploy no Cloudflare Pages

```
O backend atua como orquestrador de serviços.
O frontend conhece apenas o contrato OpenAPI.

### Contrato com o Backend
- O contrato é definido por um arquivo OpenAPI JSON.
- O schema é publicado como Release Asset no repositório do backend.
- Este repositório não gera schema.
- Este repositório não versiona schema.

Regra fundamental:
> Se o schema não existir ou for inválido, o build do frontend deve falhar.

### Geração do Client API
- O client TypeScript é gerado automaticamente no CI.
- Código gerado não deve ser editado manualmente.
- A pasta gerada deve ser tratada como artefato derivado do contrato.
Mudanças no backend exigem nova release para refletirem aqui.

### Build e Deploy
- O build é executado via GitHub Actions.
- O deploy é automático no Cloudflare Pages.
- Variáveis de ambiente são apenas de frontend.
- Nenhum segredo do backend existe neste repositório.

### Comportamento em Falhas do Backend
- Falhas de API devem resultar em:
    - Mensagens amigáveis.
    - UI funcional sempre que possível.
- O frontend não assume disponibilidade do backend.

### Decisões Arquiteturais (ADR resumido)
- Frontend público: intencional
- Backend privado: intencional
- OpenAPI como contrato único: obrigatório
- Release Asset > Artifact: contrato permanente
- Build desacoplado do backend: regra

### Fora de Escopo
- Infraestrutura do backend
- Deploy da API
- Geração do OpenAPI
- Orquestração de serviços
