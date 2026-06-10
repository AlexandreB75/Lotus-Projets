---
tags: [n8n, chatwoot, kanban, fazer-ai, hermes-xd]
status: operacional
data: 2026-06-10
---

# Integração Kanban Chatwoot — 2026-06-10

## Contexto

Alexandre confirmou que o Chatwoot funcionou e faltava conectar o Kanban anexado ao Chatwoot.

Foi identificada credencial nativa Fazer.ai:

- Nome: `Chatwoot`
- ID: `Oganm2I5WSEBasX4`
- Tipo: `fazerAiChatwootApi`

E também credencial HTTP usada pelo fluxo próprio:

- Nome: `Chatwoot API Token`
- ID: `WVX2kNzb8Wt35w1o`
- Tipo: `httpHeaderAuth`

---

## Board Kanban identificado

Endpoint:

```http
GET /api/v1/accounts/1/kanban/tasks?board_id=3
```

Board principal:

- Board ID: `3`
- Nome: `Imobiliária Comercial — Vendas`
- Inbox anexado: `2` — Fone Escritorio HK9
- `auto_create_task_for_conversation`: `true`
- `sync_task_and_conversation_agents`: `true`
- `sync_task_and_conversation_labels_priority`: `true`

Isso significa que o Chatwoot/Fazer.ai já cria card automaticamente para conversas do inbox WhatsApp.

---

## Etapas do board

| Etapa | ID | Status |
|---|---:|---|
| Novo Lead | 17 | open |
| Qualificado | 18 | open |
| Visita Agendada | 19 | open |
| Proposta Enviada | 20 | open |
| Em Negociação | 21 | open |
| Proposta Aceita | 22 | open |
| Escritura Assinada | 23 | open |
| Perdido | 24 | completed |

---

## Endpoint de update testado

Endpoint funcional:

```http
PATCH /api/v1/accounts/1/kanban/tasks/{task_id}?board_id=3
```

Teste feito no card:

- Task ID: `148`
- Conversation ID: `151`
- Resultado: update OK

Payload mínimo funcional:

```json
{
  "board_step_id": 17,
  "description": "Teste de conexão Kanban via API - Hermes XD",
  "custom_attributes": {
    "hermes_status": "teste_conexao"
  }
}
```

---

## Alteração aplicada no workflow

Workflow atualizado:

- Nome: `HK Nove — Chatwoot Hermes XD Silent v0`
- ID: `A0NVoqTkb8R7JmJY`
- Atualizado em: `2026-06-10T17:17:43Z`
- Nodes totais: `12`

Novos nodes adicionados:

1. `Kanban — Buscar task da conversa`
2. `Kanban — Preparar atualização`
3. `Tem task Kanban?`
4. `Kanban — Atualizar card`

---

## Lógica de movimento no Kanban

| Etapa Hermes | Etapa Kanban |
|---|---|
| `novo_lead` | Novo Lead — 17 |
| `atendimento_inicial` | Novo Lead — 17 |
| `qualificacao` | Qualificado — 18 |
| `produto_direcionado` | Qualificado — 18 |
| `material_enviado` | Qualificado — 18 |
| `reuniao_visita_agendada` | Visita Agendada — 19 |
| `proposta_negociacao` | Em Negociação — 21 |
| `fechado` | Proposta Aceita — 22 |
| `perdido_nutricao` | Perdido — 24 |

Regras adicionais:

- se gatilho `pediu_proposta`, mover para `Proposta Enviada` — 20;
- se gatilho `agendou_reuniao`, mover para `Visita Agendada` — 19.

---

## O que o workflow atualiza no card

Quando encontra a task da conversa, o workflow atualiza:

- etapa Kanban;
- descrição com bloco Hermes XD;
- custom attributes:
  - `hermes_score`
  - `hermes_temperatura`
  - `hermes_produto`
  - `hermes_perfil`
  - `hermes_etapa`
  - `hermes_proxima_acao`

---

## Próximo teste correto

1. Conversa real no Chatwoot.
2. Label `testando-agente` aplicada.
3. Mensagem real recebida pelo WhatsApp.
4. Conferir no card Kanban:
   - se mudou etapa;
   - se descrição recebeu bloco Hermes;
   - se atributos Hermes foram gravados.

---

## Observação

O fluxo continua em modo silencioso: não envia resposta automática ao cliente.

---

## Correção aplicada — criação automática de card

Em 2026-06-10 17:31 UTC foi identificado que o Kanban estava com `0` cards, mesmo com a conversa 150 já classificada pelo Hermes XD.

Diagnóstico:

- labels e atributos da conversa foram aplicados corretamente;
- o board estava anexado ao inbox;
- porém o recurso `auto_create_task_for_conversation` não criou task/card automaticamente.

Correção:\n\n- criado manualmente o card da conversa `150` para validar endpoint;\n- adicionado fallback no workflow:
  - se a task Kanban existir, atualizar/mover card;
  - se a task Kanban não existir, criar card automaticamente.

Node novo adicionado:

- `Kanban — Criar card`

Endpoint funcional de criação:\n\n```http\nPOST /api/v1/accounts/1/kanban/tasks?board_id=3
```

Payload base:

```json
{
  "board_id": 3,
  "board_step_id": 18,
  "title": "Conversa #150 - Nome do Lead",
  "description": "Bloco Hermes XD",
  "custom_attributes": {},
  "conversation_ids": [150]
}
```

Resultado validado:

- Board `Imobiliária Comercial — Vendas`: `1` card
- Etapa `Qualificado`: `1` card
- Task criada: `156`
- Conversa vinculada: `150`

