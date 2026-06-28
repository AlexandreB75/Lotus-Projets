# @fazer-ai/n8n-nodes-chatwoot

> Fonte: https://github.com/fazer-ai/n8n-nodes-chatwoot
> Versão: 0.0.1 | Licença: MIT | Autores: Cayo Oliveira & Gabriel Jablonski (fazer.ai)
> Salvo em: 2026-06-18

## O que é

Pacote de nodes comunitários para n8n que integra com o Chatwoot (fork fazer.ai). Vai além da API REST padrão — inclui features exclusivas para WhatsApp como `split_message`, `wait_before_sending` dinâmico, e suporte completo ao Kanban do Chatwoot.

## Instalação

No n8n: **Settings → Community Nodes → Install** → pacote: `@fazer-ai/n8n-nodes-chatwoot`

Requer:
- n8n versão ≥ 1.0.0
- Chatwoot v4.x+
- Features ⚡ requerem o fork fazer.ai Pro

## Dois Nodes Principais

| Node | Tipo | Função |
|------|------|--------|
| `Chatwoot fazer.ai` | Action | Executa operações na API do Chatwoot |
| `Chatwoot fazer.ai Trigger` | Trigger | Recebe eventos via webhook do Chatwoot |

## Autenticação

Credential: `ChatwootApi`

Campos:
- **Chatwoot URL** — URL base da instância (ex: `https://chatwoot.alexandreborges.site`)
- **Access Token** — Personal Access Token do perfil do usuário no Chatwoot

No projeto Hermes XD: credential ID `Oganm2I5WSEBasX4`

## Estrutura do Pacote (nodes/Chatwoot/actions/)

```
actions/
├── account/           — Get account details
├── agent/             — Agent management
├── contact/           — CRUD contacts + custom attributes
├── conversation/      — Mensagens, arquivos, labels, status (25+ operações)
├── customAttribute/   — Definições de atributos customizados
├── inbox/             — Get, list, WhatsApp operations
├── internalChatCategory/
├── internalChatChannel/
├── internalChatMember/
├── internalChatMessage/
├── kanbanBoard/       — ⚡ Boards do Kanban
├── kanbanProduct/     — ⚡ Produtos do Kanban
├── kanbanStep/        — ⚡ Steps/colunas do Kanban
├── kanbanTask/        — ⚡ Tasks do Kanban (get, create, update, move, delete, list)
├── kanbanTaskProduct/ — ⚡ Produtos vinculados a tasks
├── label/             — CRUD labels
├── profile/           — User profile info
├── scheduledMessage/  — Mensagens agendadas (criar, buscar, atualizar, deletar)
├── team/              — Teams e membros
└── webhook/           — Gerenciar webhooks
```

## Arquivos de Referência Nesta Pasta

| Arquivo | Conteúdo |
|---------|----------|
| `README.md` | Este arquivo — visão geral |
| `nodes-conversa.md` | Operações de Conversation (25+) com todos os parâmetros |
| `nodes-kanban.md` | Operações de Kanban (task, board, step) |
| `nodes-trigger.md` | Eventos de Trigger disponíveis e configuração |
| `uso-no-hermes.md` | Como esses nodes são usados no Hermes XD |
