---
tags: [hermes, orquestrador, arquitetura, n8n, chatwoot, supabase, crm, auditoria]
status: auditoria-estrutural
data: 2026-06-18
---

# Sistema Hermes Orquestrador

## Objetivo

Centralizar a estrutura do sistema comercial que conecta landing pages, n8n, Supabase, Chatwoot, SDRs, CRM XD PRO, Fazer.ai e base de conhecimento operacional.

Este diretorio nao substitui os projetos Hilton, Lotus ou HK Nove. Ele funciona como camada de orquestracao: inventario, arquitetura, integracoes, auditoria e plano de execucao.

## Regra atual

Antes de agir em workflows, ativar automacoes ou corrigir producao, o projeto deve passar pela auditoria estrutural.

```text
Auditar -> classificar risco -> decidir arquitetura -> executar com teste e rollback
```

## Fontes analisadas

- `03-Squads/Agentes-Operacionais/n8n-workflows/00-INDEX-n8n-workflows.md`
- `03-Squads/Agentes-Operacionais/n8n-workflows/00-Setup-Infraestrutura/`
- `03-Squads/Agentes-Operacionais/n8n-workflows/01-Captura-Landing-Supabase/`
- `03-Squads/Agentes-Operacionais/n8n-workflows/02-Hermes-Roteador-Leads/`
- `03-Squads/Agentes-Operacionais/n8n-workflows/03-SDR-Hilton-Outbound/`
- `03-Squads/Agentes-Operacionais/n8n-workflows/04-Sync-Steps-CRM/`
- `03-Squads/Agentes-Operacionais/n8n-workflows/05-Chatwoot-Inbound-Hermes/`
- `03-Squads/Agentes-Operacionais/agents/SDR-Hilton.md`
- `03-Squads/Agentes-Operacionais/agents/SDR-Lotus-Business.md`
- `03-Squads/Agentes-Operacionais/agents/Follow-Up-Inteligente.md`

## Mapa rapido

```text
Landing Pages / CRM XD PRO / WhatsApp inbound
  -> n8n ou Fazer.ai
  -> Supabase leads
  -> Hermes Roteador
  -> Ferramentas Hermes
  -> Chatwoot WhatsApp
  -> CRM XD PRO
  -> Follow-up inteligente
  -> Segundo cerebro / OpenClaw / Obsidian
```

## Documentos principais

- [[01-Inventario-Workflows/Inventario-n8n]]
- [[02-Arquitetura/Arquitetura-Sistema-Hermes]]
- [[03-Integracoes/Matriz-Integracoes]]
- [[04-Backlog-Execucao/Backlog-Integracao]]
- [[05-Auditoria/Modelo-Auditoria-Estrutural]]
- [[05-Auditoria/Relatorio-Auditoria-Estrutural]]
- [[05-Auditoria/Operacao-Producao-N8N-2026-06-20]]

## Status atual

- Arquivos JSON em `n8n-workflows`: 15
- `INDEX.md` de workflows encontrado e analisado.
- Existem workflows/manifestos para captura, Hermes, sub-workflows, SDR outbound, sync CRM/Supabase e inbound Chatwoot.
- Risco P0: Hermes pode ignorar leads reais por filtro `testando-agente`.
- Risco P0: tokens/chaves hardcoded precisam migrar para credenciais/variaveis.
- Pendente: inventario formal dos nodes nativos Fazer.ai.

## Proxima decisao

Criar o inventario dos nodes nativos Fazer.ai e cruzar com cada integracao atual para decidir onde usar Fazer.ai, n8n ou codigo proprio.

## Atualizacao - Producao n8n validada em 2026-06-20

Rodada operacional concluida na VPS Hermes: proxy recuperado, n8n limpo e hardenizado, Hermes removido da rota publica, workflows obsoletos removidos com backup, alias `crm-step-sync` corrigido e funil principal `01`, `01.1`, `02`, `03`, `04`, `05` testado com sucesso.

Registro detalhado: [[05-Auditoria/Operacao-Producao-N8N-2026-06-20]].

