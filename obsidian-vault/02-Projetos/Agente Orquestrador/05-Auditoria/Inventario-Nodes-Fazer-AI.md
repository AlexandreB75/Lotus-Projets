---
tags: [hermes, auditoria, fazer-ai, chatwoot, n8n, nodes]
status: inventario-final
data: 2026-06-20
fonte: https://github.com/fazer-ai/n8n-nodes-chatwoot
---

# Inventario Nodes Fazer.ai - Chatwoot para n8n

## Contexto

Este pacote e a base tecnica do fluxo Hermes. Ele substitui HTTP manual em Chatwoot, habilita trigger proprio para mensagens recebidas e abre acesso nativo ao Kanban do Chatwoot/Fazer.ai.

## Fonte analisada

- Repositorio: `https://github.com/fazer-ai/n8n-nodes-chatwoot`
- Pacote n8n: `@fazer-ai/n8n-nodes-chatwoot`
- Pasta local de referencia: `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/fazer-ai-nodes/`

## Nodes principais

| Node | Tipo | Função |
|---|---|---|
| `Chatwoot fazer.ai` | Action | Operar contatos, conversas, arquivos, labels, atributos e Kanban |
| `Chatwoot fazer.ai Trigger` | Trigger | Receber eventos Chatwoot/Fazer.ai, principalmente inbound |

## Credenciais e contexto operacional

| Item | Valor registrado |
|---|---|
| Chatwoot URL | `https://chatwoot.alexandreborges.site` |
| account_id | `1` |
| inbox_id | `2` |
| Credential n8n | `ChatwootApi` |
| Credential local de referência | `Oganm2I5WSEBasX4` |

## Operacoes que importam para o Hermes

### Conversation

| Operação | Uso real |
|---|---|
| `create` | Abrir conversa para lead novo |
| `get` / `list` | Diagnóstico e follow-up |
| `sendMessage` | Resposta Hermes com timing humano |
| `sendFile` | Áudio ElevenLabs e materiais |
| `downloadAttachment` | Pipeline áudio/Whisper |
| `assignAgent` | Escalar para Alexandre |
| `addLabels` | Marcar lead quente, agente off, follow-up |
| `toggleStatus` | Abrir, pendente, resolvido, snoozed |
| `setPriority` | Priorizar leads quentes |
| `updatePresence` | Mostrar digitando/gravando |
| `setCustomAttributes` | Guardar metadados do atendimento |

### Kanban

| Recurso | Operações | Uso no Hermes |
|---|---|---|
| `kanbanBoard` | get/list/create/update/delete | Auditar board e estrutura |
| `kanbanStep` | get/list/create/update/delete | Revisar steps do funil |
| `kanbanTask` | get/list/create/update/move/delete | Mover lead sem HTTP manual |
| `kanbanProduct` | CRUD | Vincular produto/empreendimento |
| `kanbanTaskProduct` | CRUD | Itens de proposta/reserva |

### Trigger

| Evento | Uso |
|---|---|
| `message_incoming` | Gatilho principal do Hermes inbound |
| `conversation_created` / `updated` | Sincronização operacional |
| `conversation_resolved` | Fechamento e pós-atendimento |
| `contact_created` / `updated` | Sincronizar base |
| `kanban_task_created` / `updated` / `deleted` | Sync Kanban -> CRM/Supabase |

## O que já está em uso

| Node/Operação | Onde aparece |
|---|---|
| `chatwootTrigger` / `message_incoming` | Hermes principal |
| `conversation.downloadAttachment` | Pipeline de áudio |
| `conversation.updatePresence` | Pipeline de áudio |
| `conversation.sendFile` | Resposta por áudio |
| `conversation.sendMessage` | Resposta textual principal |
| `kanbanTask.get` | 05-Agendar-Visita, 09-Gerar-Reserva |
| `kanbanTask.update` | 05-Agendar-Visita, 09-Gerar-Reserva |

## Migração prioritária

| Workflow | Hoje | Recomendação |
|---|---|---|
| `07-Escalar-Alexandre` | HTTP manual para label, assign, nota e step | Migrar para `conversation.addLabels`, `conversation.assignAgent`, `conversation.sendMessage`, `kanbanTask.update` |
| `08-Follow-Up` | HTTP manual para mensagens | Migrar para `conversation.sendMessage` |
| `05-Chatwoot-Inbound-Hermes-API` | Webhook genérico | Substituir por `Chatwoot fazer.ai Trigger` se cobrir o caso |
| `04-Sync-Steps-CRM` | Parte do evento Chatwoot | Avaliar trigger nativo para reduzir webhook manual |
| `04-Sync-Chatwoot-Supabase` | Sync de status/Kanban | Usar trigger/eventos Kanban se o pacote cobrir o fluxo |
| `09-Gerar-Reserva` | Move step e dados de proposta | Avaliar `kanbanTask.update` e `kanbanTaskProduct` |

## Ganho esperado

- eliminar tokens hardcoded em Chatwoot;
- reduzir chance de endpoint errado;
- manter logs e credenciais no n8n;
- usar trigger mais específico do que webhook genérico;
- tornar o Hermes menos dependente de HTTP manual.

## Limites

Manter HTTP Request quando:

- a operação ainda não existir no node;
- o endpoint for do CRM XD PRO;
- o campo necessário não estiver exposto;
- o comportamento ainda estiver em teste.

## Pontos de validação

1. Confirmar que `@fazer-ai/n8n-nodes-chatwoot` está instalado na instância.
2. Confirmar se o Chatwoot da operação é Fazer.ai ou Chatwoot puro.
3. Validar o trigger `message_incoming` em workflow isolado.
4. Validar HMAC/SHA-256 do trigger na instância real.
5. Migrar primeiro `07-Escalar-Alexandre` e `08-Follow-Up`.

## Resumo decisório

O pacote Fazer.ai é fundamental para o projeto porque substitui o bloco mais frágil da arquitetura atual: operação manual de Chatwoot via HTTP e webhook genérico. A rota correta é transformar esse pacote em camada nativa do Hermes, com migração gradual e teste antes de desligar o legado.
