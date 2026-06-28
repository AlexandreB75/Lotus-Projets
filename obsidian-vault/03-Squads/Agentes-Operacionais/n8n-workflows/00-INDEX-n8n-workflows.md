# Índice de Workflows N8N — HK Nove / Alexandre Borges
> Atualizado em: 2026-06-20 | Instância: n8n.alexandreborges.site

## Estrutura

```
n8n-workflows/
├── 00-Setup-Infraestrutura/
│   └── 00-Setup-Infraestrutura.json          ✅ Executar UMA vez
├── 01-Captura-Landing-Supabase/
│   ├── 01-Captura-Landing-The-Spot-One.json  ✅ Ativo
│   ├── 01-Captura-Landing-Lotus-Business.json ✅ Ativo
│   └── 01-CRM-XD-PRO-Lead-Intake.json        ✅ Ativo (receptor webhook)
├── 02-Hermes-Roteador-Leads/
│   ├── 02-Hermes-Roteador-Leads.json         ✅ Sumário estruturado
│   ├── 02-Hermes-Roteador-SEMENTE-COMPLETO.json ⭐ ARQUIVO FUNDACIONAL
│   └── sub-workflows/
│       ├── 05-Agendar-Visita.json            ✅ ID: geLNi1Kw0VmXkk0M
│       ├── 07-Escalar-Alexandre.json         ✅ Produção: 0TtdnliBJ4ATHO3u (05 - Escalar Alexandre)
│       ├── 07-Escalar-Alexandre-Simples.json ✅ versão sem labels/assign
│       ├── 08-Follow-Up.json                 ✅ ID: 87LFS2eSGiiKEdE7
│       └── 09-Gerar-Reserva.json             ✅ ID: LP5qzJBbxAD0W5FH
├── 03-SDR-Hilton-Outbound/
│   └── 03-SDR-Hilton-Outbound.json           ✅ Standby (GPT-4o mini)
├── 04-Sync-Steps-CRM/
│   ├── 04-Sync-Steps-CRM.json                ✅ CRM XD PRO → Chatwoot
│   └── 04-Sync-Chatwoot-Supabase.json        ✅ Chatwoot Kanban → Supabase
└── 06-Chatwoot-Inbound-Hermes/
    └── 06-Chatwoot-Inbound-Hermes-API.json   ⚠️ PROTÓTIPO — URLs placeholder
```

---

## Workflows por Função

### Infraestrutura
| Arquivo | Função | Status |
|---------|--------|--------|
| `00-Setup-Infraestrutura.json` | Cria tabelas Postgres, labels, atributos, Kanban | Executar 1x |

### Captura de Leads
| Arquivo | Webhook | Status |
|---------|---------|--------|
| `01-Captura-Landing-The-Spot-One.json` | `/webhook/the-spot-one-lead` | Ativo |
| `01-Captura-Landing-Lotus-Business.json` | `/webhook/lotus-lead` | Ativo |
| `01-CRM-XD-PRO-Lead-Intake.json` | `/webhook/crm-xd-pro-lead` | Ativo |

### Agente Principal Hermes XD
| Arquivo | Descrição | Status |
|---------|-----------|--------|
| `02-Hermes-Roteador-SEMENTE-COMPLETO.json` | **Arquivo mestre** — 60+ nodes, GPT-5.2, ElevenLabs, Postgres, 9 tools | ✅ Corrigido/testado em producao |
| `02-Hermes-Roteador-Leads.json` | Sumário estruturado para referência rápida | Documentação |

### Sub-workflows (Ferramentas do Hermes XD)
| Arquivo | ID n8n | Função |
|---------|--------|--------|
| `05-Agendar-Visita.json` | geLNi1Kw0VmXkk0M | Google Calendar + move Kanban |
| `07-Escalar-Alexandre.json` | 0TtdnliBJ4ATHO3u | Labels + assign + step 34 + nota privada |
| `07-Escalar-Alexandre-Simples.json` | qOyuDrytX5GnVva7? | Apenas mensagem + nota (sem Kanban) |
| `08-Follow-Up.json` | 87LFS2eSGiiKEdE7 | 4 tipos de mensagem de acompanhamento; testado em 2026-06-20 |
| `09-Gerar-Reserva.json` | LP5qzJBbxAD0W5FH | Registra proposta + move Kanban |

### SDR Outbound
| Arquivo | Função | Status |
|---------|--------|--------|
| `03-SDR-Hilton-Outbound.json` | Lê leads Supabase, classifica com GPT-4o mini, abre conversa Chatwoot | Standby |

### Sincronização CRM
| Arquivo | Direção | Status |
|---------|---------|--------|
| `04-Sync-Steps-CRM.json` | CRM XD PRO → Chatwoot (step sync) | Ativo |
| `04-Sync-Chatwoot-Supabase.json` | Chatwoot Kanban → Supabase (status sync) | Ativo |

---

## Bugs Críticos Identificados

### 🔴 URGENTE — Agente não responde leads reais
**Arquivo:** `02-Hermes-Roteador-SEMENTE-COMPLETO.json`
**Node:** `Agente ativado?`
**Problema:** Filtro exige `etiquetas contains "testando-agente"` — leads sem essa label são ignorados
**Correção:** Remover a condição `contains testando-agente`, manter apenas `notContains agente-off`

### 🟡 ID divergente do sub-workflow 07
O tool `07. Escalar Alexandre` na semente usa ID `qOyuDrytX5GnVva7`, mas o sumário registrava `HQr37y9CEfriRkd4`. Verificar qual existe no n8n.

### 🟡 Reset limpa atributos de seguros
O `/reset` tenta apagar atributos de outro projeto (ramo, operadora, numero_apolice). Inofensivo mas gera ruído.

### 🟡 Tokens hardcoded
Historico de tokens hardcoded identificado na auditoria. Nao registrar valores sensiveis no vault; usar credenciais/variaveis do n8n.

---

## Sub-workflows Não Exportados (Faltam)

| ID | Nome | Função esperada |
|----|------|-----------------|
| `5yqbPEIEAHWRKuLm` | 02-Informacoes | Busca info dos empreendimentos |
| `h21Hv4e2HfISf45m` | 02b-Simular-ROI | Projeta retorno financeiro |
| `swXlsuJ4ukfx8OeF` | 03-Enviar-Proposta | Gera PDF e envia via WhatsApp |
| `CP6f2tCXalIJoLRN` | 04-Verificar-Disponibilidade | Verifica imóvel vinculado |
| `h1xS3Z9xenaFjj1d` | 06-Cancelar-Interesse | Registra desistência, move para Perdido |

---

## Landing Pages

| Produto | URL | Campos | Webhook |
|---------|-----|--------|---------|
| The Spot One | alexandreborgescorretor.com.br/the-spot-one | nome, whatsapp, email, cidade | `/webhook/the-spot-one-lead` |
| Lótus Business | alexandreborgescorretor.com.br/lotus-business/ | nome, whatsapp, perfil (dropdown) | `/webhook/lotus-lead` |
| Hilton Complexo | ❌ não existe | — | `/webhook/hilton-lead` (a criar) |

> Documentacao completa: [[referencias/landing-pages/README|referencias/landing-pages]]

---

## Stack Completo

| Componente | URL / Config |
|-----------|-------------|
| N8N | n8n.alexandreborges.site |
| Chatwoot | chatwoot.alexandreborges.site · account_id=1 · inbox_id=2 |
| WhatsApp | +5547988695350 (Fone Escritorio HK9) |
| Supabase | supabase.alexandreborges.site · tabela: leads |
| CRM XD PRO | C:\Users\alexa\projetos\crm-xd-pro (Next.js 16) |
| Postgres | n8n_historico_mensagens · n8n_fila_mensagens · n8n_status_atendimento |
| Kanban | board_id=5 · steps 30-38 |
| GPT Agente | gpt-5.2 (Hermes) · gpt-4o-mini (CRM intake) · gpt-4.1-mini (formatação) |
| ElevenLabs | Voz IKne3meq5aSn9XLyUdCD · eleven_flash_v2_5 |
| Google Calendar | OAuth2 · calendário primary (Alexandre) |

---

## Status producao - 2026-06-20

Registro completo: [[02-Projetos/Sistema-Hermes-Orquestrador/05-Auditoria/Operacao-Producao-N8N-2026-06-20]]

### Funil principal testado

| Workflow | ID producao | Resultado |
|---|---|---|
| `01 - Captura Lotus` | `NdyImJFEz8NNuGxx` | Testado, execucao `1518`, lead no Supabase e conversa no Chatwoot |
| `01.1 - Captacao Spot One` | `KJeGDPpQOKWtjF7H` | Testado, execucao `1517`, lead no Supabase e conversa no Chatwoot |
| `02 - Sync Chatwoot CRM` | `NHct6w0VfIZYjpX9` | Testado; alias `crm-step-sync` criado e validado |
| `03 - Hermes SDR` | `HFM5h8hZE6gkzfdK` | Corrigido e testado, execucao `1531` |
| `04 - Follow-up` | `87LFS2eSGiiKEdE7` | Testado, execucao `1537`, retorno `followup_enviado` |
| `05 - Escalar Alexandre` | `0TtdnliBJ4ATHO3u` | Corrigido e testado, execucao `1539`, retorno `escalado_alexandre` |

### Operacao realizada

- 43 workflows exportados antes da limpeza.
- 23 workflows inativos/obsoletos removidos apos backup.
- 20 workflows exportados no backup final.
- n8n hardenizado com `N8N_PROXY_HOPS=1` e prune de execucoes.
- Hermes gateway removido da exposicao publica; segue ativo via gateway.
- Workflow temporario de teste `codexTempTest0405` removido; nenhum webhook `codex-test-*` ficou registrado.
- Estado final: n8n healthy, baixo consumo, sem erro recente de `unknown webhook` ou proxy.


---

## Referencias tecnicas

### Fazer.ai / Chatwoot nodes

| Referencia | Uso |
|---|---|
| [[referencias/fazer-ai-nodes/README|Fazer.ai nodes - README]] | Entrada geral das referencias Fazer.ai usadas no Hermes/n8n |
| [[referencias/fazer-ai-nodes/nodes-trigger|Nodes Trigger]] | Eventos Chatwoot, principalmente inbound/message incoming |
| [[referencias/fazer-ai-nodes/nodes-conversa|Nodes Conversa]] | Envio de mensagem, notas, leitura e operacoes de conversa |
| [[referencias/fazer-ai-nodes/nodes-kanban|Nodes Kanban]] | Board, steps, tasks e movimentacao de funil |
| [[referencias/fazer-ai-nodes/uso-no-hermes|Uso no Hermes]] | Como os nodes Fazer.ai se encaixam no Hermes SDR e sub-workflows |

### Landing pages

| Referencia | Uso |
|---|---|
| [[referencias/landing-pages/README|Landing pages - README]] | Entrada geral da documentacao das landings |
| [[referencias/landing-pages/lotus-business|Lótus Business]] | Payload, campos e webhook `/webhook/lotus-lead` |
| [[referencias/landing-pages/the-spot-one|The Spot One]] | Payload, campos e webhook `/webhook/the-spot-one-lead` |
| [[referencias/landing-pages/hilton-template|Hilton template]] | Referencia para futura landing Hilton |

### Operacao relacionada

- [[02-Projetos/Sistema-Hermes-Orquestrador/05-Auditoria/Operacao-Producao-N8N-2026-06-20|Operacao Producao n8n - 2026-06-20]]
- [[02-Projetos/Sistema-Hermes-Orquestrador/05-Auditoria/Inventario-Nodes-Fazer-AI|Inventario Nodes Fazer.ai]]
- [[02-Projetos/Sistema-Hermes-Orquestrador/05-Auditoria/Auditoria-Landing-Pages|Auditoria Landing Pages]]

