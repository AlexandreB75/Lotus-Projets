---
tags: [hermes, inventario, n8n, workflows]
status: atualizado
data: 2026-06-18
---

# Inventario n8n

## Resumo atualizado

A pasta `03-Squads/Agentes-Operacionais/n8n-workflows` agora esta organizada por etapas e contem 15 arquivos JSON mais um `INDEX.md`.

Importante: nem todos os JSONs sao exports n8n executaveis no formato completo `nodes + connections`. Muitos sao manifestos/sumarios estruturados para o vault. Isso e util para documentacao, mas deve ser separado de workflows realmente importaveis no n8n.

## Estrutura encontrada

```text
n8n-workflows/
  00-Setup-Infraestrutura/
  01-Captura-Landing-Supabase/
  02-Hermes-Roteador-Leads/
    sub-workflows/
  03-SDR-Hilton-Outbound/
  04-Sync-Steps-CRM/
  05-Chatwoot-Inbound-Hermes/
  INDEX.md
```

## Classificacao dos arquivos

| Etapa | Arquivo | Tipo identificado | Status operacional |
|---|---|---|---|
| 00 | `00-Setup-Infraestrutura.json` | Manifesto de setup | Executar uma vez, nao parece export n8n completo |
| 01 | `01-Captura-Landing-The-Spot-One.json` | Manifesto de captura | Ativo segundo indice |
| 01 | `01-Captura-Landing-Lotus-Business.json` | Manifesto de captura | Ativo segundo indice |
| 01 | `01-CRM-XD-PRO-Lead-Intake.json` | Workflow/manifesto com 4 nodes | Ativo segundo indice |
| 02 | `02-Hermes-Roteador-Leads.json` | Sumario estruturado | Referencia rapida, `active: true` no arquivo |
| 02 | `02-Hermes-Roteador-SEMENTE-COMPLETO.json` | Arquivo fundacional/manifesto | Bug critico ativo |
| 02 tool | `05-Agendar-Visita.json` | Sub-workflow/manifesto com 10 nodes | Ferramenta Hermes |
| 02 tool | `07-Escalar-Alexandre.json` | Sub-workflow/manifesto com 9 nodes | Ferramenta Hermes |
| 02 tool | `07-Escalar-Alexandre-Simples.json` | Sub-workflow/manifesto com 6 nodes | Alternativa simplificada |
| 02 tool | `08-Follow-Up.json` | Sub-workflow/manifesto com 4 nodes | Ferramenta Hermes |
| 02 tool | `09-Gerar-Reserva.json` | Sub-workflow/manifesto com 7 nodes | Ferramenta Hermes |
| 03 | `03-SDR-Hilton-Outbound.json` | Export n8n completo | Standby, `active: false` |
| 04 | `04-Sync-Steps-CRM.json` | Export n8n completo | `active: false` no export |
| 04 | `04-Sync-Chatwoot-Supabase.json` | Workflow/manifesto com 6 nodes | Ativo segundo indice |
| 05 | `05-Chatwoot-Inbound-Hermes-API.json` | Prototipo/manifesto com 6 nodes | Prototipo, URLs placeholder |

## Fluxo principal agora identificado

```text
Landing pages
  -> 01 Captura Landing Supabase
  -> Supabase leads
  -> 02 Hermes Roteador Leads
  -> Ferramentas Hermes
      -> Informacoes / ROI / proposta / disponibilidade / visita / escala / follow-up / reserva
  -> Chatwoot WhatsApp
  -> 04 Sync CRM e Supabase
  -> CRM XD PRO
```

## Workflows executaveis confirmados como export n8n completo

### 03. SDR Hilton - Outbound WhatsApp

| Campo | Valor |
|---|---|
| Arquivo | `03-SDR-Hilton-Outbound/03-SDR-Hilton-Outbound.json` |
| Nome | `03. SDR Hilton - Outbound WhatsApp` |
| Status exportado | Inativo |
| Nodes | 14 |
| Gatilho | Schedule a cada 15 min |
| Entrada | Leads nao processados no Supabase |
| Saida | Contato/conversa/mensagem no Chatwoot e lead processado no Supabase |
| Ferramentas | Supabase, OpenAI, Chatwoot, WhatsApp via Chatwoot |

### 04. Sync Steps Chatwoot -> CRM

| Campo | Valor |
|---|---|
| Arquivo | `04-Sync-Steps-CRM/04-Sync-Steps-CRM.json` |
| Nome | `04. Sync Steps Chatwoot -> CRM` |
| Status exportado | Inativo |
| Nodes | 4 |
| Gatilho | Webhook POST `crm-step-sync` |
| Entrada | Evento de mudanca de etapa |
| Saida | POST para CRM XD PRO |
| Ferramentas | Chatwoot, n8n, CRM XD PRO |

## Arquivo fundacional Hermes

### 02. Hermes Roteador Semente Completo

O indice aponta este arquivo como o nucleo do Hermes XD.

| Campo | Valor |
|---|---|
| Arquivo | `02-Hermes-Roteador-SEMENTE-COMPLETO.json` |
| Papel | Arquivo mestre/fundacional do agente Hermes |
| Modelo registrado | GPT-5.2 no indice |
| Recursos citados | Postgres, fila de mensagens, status de atendimento, ferramentas, audio, Chatwoot |
| Risco critico | Filtro exige label de teste e pode ignorar leads reais |

### Bug critico registrado

O node `Agente ativado?` exige a label `testando-agente`. Com isso, leads reais sem essa label podem ser ignorados. A correcao recomendada e remover a condicao de teste e manter apenas a trava de exclusao, por exemplo `notContains agente-off`.

## Ferramentas Hermes exportadas/documentadas

| Ferramenta | Funcao |
|---|---|
| `05-Agendar-Visita` | Agenda visita no Google Calendar e move Kanban |
| `07-Escalar-Alexandre` | Escala lead para Alexandre, aplica labels, responsavel, step e nota privada |
| `07-Escalar-Alexandre-Simples` | Versao sem labels/assign/Kanban completo |
| `08-Follow-Up` | Gera mensagens de acompanhamento |
| `09-Gerar-Reserva` | Registra proposta/reserva e move Kanban |

## Sub-workflows ainda faltantes segundo INDEX.md

| ID | Nome | Funcao esperada |
|---|---|---|
| `5yqbPEIEAHWRKuLm` | 02-Informacoes | Buscar informacoes dos empreendimentos |
| `h21Hv4e2HfISf45m` | 02b-Simular-ROI | Projetar retorno financeiro |
| `swXlsuJ4ukfx8OeF` | 03-Enviar-Proposta | Gerar PDF e enviar WhatsApp |
| `CP6f2tCXalIJoLRN` | 04-Verificar-Disponibilidade | Verificar imovel vinculado |
| `h1xS3Z9xenaFjj1d` | 06-Cancelar-Interesse | Registrar desistência e mover para perdido |

## Riscos imediatos

- Remover segredos hardcoded dos workflows e migrar para credenciais/variaveis de ambiente do n8n.
- Corrigir filtro de teste do Hermes antes de colocar leads reais.
- Confirmar divergencia de ID do sub-workflow `07-Escalar-Alexandre`.
- Confirmar quais JSONs sao importaveis no n8n e quais sao apenas documentacao do vault.
- Validar URLs placeholder no prototipo `05-Chatwoot-Inbound-Hermes-API.json`.
