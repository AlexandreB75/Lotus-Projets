---
tags: [hermes, arquitetura, sistema, integracoes]
status: atualizado
data: 2026-06-18
---

# Arquitetura Sistema Hermes

## Arquitetura atual revisada

```text
Landing Page The Spot One
  -> 01-Captura-Landing-The-Spot-One
  -> Supabase leads

Landing Page Lotus Business
  -> 01-Captura-Landing-Lotus-Business
  -> Supabase leads

CRM XD PRO Lead Intake
  -> 01-CRM-XD-PRO-Lead-Intake
  -> Supabase + resumo IA

Supabase / Chatwoot
  -> 02 Hermes Roteador Leads
  -> Ferramentas Hermes
  -> Chatwoot WhatsApp
  -> CRM XD PRO / Supabase sync
```

## Arquitetura alvo operacional

```text
[Entrada]
Landing Pages / CRM XD PRO / WhatsApp inbound
  -> n8n captura e normalizacao
  -> Supabase leads

[Orquestracao]
Hermes Roteador
  -> identifica projeto
  -> identifica perfil
  -> identifica intencao
  -> decide proxima ferramenta

[Ferramentas]
Informacoes
Simular ROI
Enviar proposta
Verificar disponibilidade
Agendar visita
Cancelar interesse
Escalar Alexandre
Follow-up
Gerar reserva

[Canais e sistemas]
Chatwoot WhatsApp
CRM XD PRO
Supabase
Google Calendar
Postgres operacional
Segundo cerebro / OpenClaw
```

## Fonte de verdade recomendada

| Dado | Fonte recomendada |
|---|---|
| Lead bruto e status operacional | Supabase |
| Conversas e mensagens | Chatwoot |
| Funil comercial e responsavel | CRM XD PRO |
| Historico tecnico de execucao | Postgres/n8n logs |
| Scripts, objecoes e aprendizados | Obsidian/OpenClaw |
| Agenda de visitas | Google Calendar |

## Contrato minimo do lead

| Campo | Obrigatorio | Uso |
|---|---|---|
| `lead_id` | Sim | Identificador unico |
| `nome` | Sim | Atendimento e CRM |
| `telefone` | Sim | Chatwoot/WhatsApp, deduplicacao |
| `origem` | Sim | Landing, CRM, WhatsApp, importacao |
| `projeto` | Sim | Roteamento Hermes |
| `produto_interesse` | Nao | Roteamento e proposta |
| `perfil` | Nao | SDR e segmentacao |
| `temperatura` | Nao | Priorizacao |
| `status_atendimento` | Sim | Controle operacional |
| `chatwoot_contact_id` | Nao | Vinculo Chatwoot |
| `chatwoot_conversation_id` | Nao | Vinculo conversa |
| `crm_lead_id` | Nao | Vinculo CRM XD PRO |
| `kanban_step_id` | Nao | Sync etapa |
| `proxima_acao` | Nao | Follow-up/agenda |
| `ultimo_evento` | Nao | Auditoria |

## Ponto critico antes de producao

O Hermes nao pode depender de uma label de teste para responder leads reais. Antes de rodar em producao, revisar o node `Agente ativado?` e manter uma regra clara:

```text
Responder se:
  lead/conversa nao contem agente-off
  e canal/projeto esta habilitado

Nao responder se:
  conversa esta atribuida manualmente
  lead pediu parar
  etapa esta encerrada/perdida
  atendimento humano assumiu
```

## Padrao de eventos

| Evento | Origem | Acao esperada |
|---|---|---|
| Novo lead landing | Landing -> n8n | Criar lead no Supabase e acionar Hermes |
| Novo lead CRM | CRM XD PRO -> n8n | Normalizar e registrar no Supabase |
| Mensagem inbound | Chatwoot -> n8n | Hermes responde ou roteia para humano |
| Tool call visita | Hermes -> sub-workflow | Agenda, move etapa e confirma |
| Tool call escalada | Hermes -> sub-workflow | Atribui Alexandre e registra nota |
| Mudanca Kanban | Chatwoot/CRM | Sincronizar Supabase e CRM |
| Sem resposta | Scheduler/follow-up | Gerar cadencia, respeitando resposta do lead |

## Lacunas atuais

- Exportar sub-workflows faltantes listados no `INDEX.md`.
- Corrigir filtro de teste do Hermes.
- Remover tokens/chaves hardcoded.
- Confirmar endpoint real do prototipo inbound Hermes.
- Confirmar schema real das tabelas Postgres/Supabase.

## Atualizacao - Landing Hilton planejada

A referencia `hilton-template.md` define que a LP Hilton ainda nao existe e deve usar o webhook `/webhook/hilton-lead`.

Contrato proposto:

```json
{
  "nome": "string",
  "whatsapp": "string",
  "cidade": "string",
  "produto_interesse": "hotel | residencial | hotel_investimento | comercial | medcenter | geral"
}
```

Workflow futuro: `01-Captura-Landing-Hilton.json`.

Labels futuras: `hilton-landing`, `hilton-hotel`, `hilton-residencial`, `hilton-comercial`, `hilton-medcenter`.
