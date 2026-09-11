---
tags: [hermes, integracoes, matriz]
status: atualizado
data: 2026-06-18
---

# Matriz de Integracoes

| Origem | Destino | Workflow/arquivo | Status | Observacao |
|---|---|---|---|---|
| Landing The Spot One | Supabase | `01-Captura-Landing-The-Spot-One.json` | Ativo segundo indice | Manifesto de captura |
| Landing Lotus Business | Supabase | `01-Captura-Landing-Lotus-Business.json` | Ativo segundo indice | Manifesto de captura |
| CRM XD PRO | Supabase/resumo IA | `01-CRM-XD-PRO-Lead-Intake.json` | Ativo segundo indice | Contem 4 nodes |
| Supabase | Chatwoot | `03-SDR-Hilton-Outbound.json` | Standby | Export n8n completo |
| Chatwoot inbound | Hermes API | `05-Chatwoot-Inbound-Hermes-API.json` | Prototipo | URLs placeholder |
| Hermes | Google Calendar | `05-Agendar-Visita.json` | Ferramenta | Sub-workflow |
| Hermes | Alexandre/Chatwoot/Kanban | `07-Escalar-Alexandre.json` | Ferramenta | Verificar ID correto |
| Hermes | Follow-up | `08-Follow-Up.json` | Ferramenta | Cadencia de acompanhamento |
| Hermes | Reserva/Kanban | `09-Gerar-Reserva.json` | Ferramenta | Proposta/reserva |
| Chatwoot Kanban | Supabase | `04-Sync-Chatwoot-Supabase.json` | Ativo segundo indice | Sync de status |
| Chatwoot step | CRM XD PRO | `04-Sync-Steps-CRM.json` | Export inativo | Webhook `crm-step-sync` |

## Integracoes externas citadas

| Sistema | Papel |
|---|---|
| n8n | Orquestracao dos workflows |
| Chatwoot | Inbox WhatsApp, contatos, conversas, labels, kanban |
| Supabase | Tabela `leads` e estado operacional |
| CRM XD PRO | Funil comercial e lead intake |
| Postgres | Historico de mensagens, fila e status de atendimento |
| OpenAI | Classificacao, agente Hermes e formatacao |
| ElevenLabs | Audio/voz do agente |
| Google Calendar | Agenda de visitas |
| OpenClaw/Obsidian | Segundo cerebro e documentacao operacional |

## Variaveis e credenciais que devem existir no n8n

Nao registrar valores de tokens no vault.

| Nome logico | Uso |
|---|---|
| `SUPABASE_URL` | Base REST Supabase |
| `SUPABASE_SERVICE_OR_ANON_KEY` | Autenticacao Supabase conforme permissao |
| `CHATWOOT_URL` | Base API Chatwoot |
| `CHATWOOT_API_TOKEN` | Autenticacao Chatwoot |
| `CRM_BASE_URL` | Base API CRM XD PRO |
| `CRM_WEBHOOK_SECRET` | Protecao de webhook CRM |
| `OPENAI_API_KEY` | Modelos de IA |
| `ELEVENLABS_API_KEY` | Voz/audio |
| `GOOGLE_CALENDAR_OAUTH` | Agendamento |

## Regras de seguranca operacional

- Migrar tokens hardcoded para credenciais n8n.
- Proteger webhooks publicos com segredo, header ou assinatura.
- Logar erros sem salvar tokens ou payload sensivel completo.
- Deduplicar leads por telefone normalizado.
- Registrar toda troca de etapa em Supabase e CRM.
