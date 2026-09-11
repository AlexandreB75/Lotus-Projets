---
tags: [n8n, chatwoot, workflow, setup, hermes-xd]
status: importado-inativo
data: 2026-06-10
---

# Setup n8n importado — 2026-06-10

## Ação realizada

Workflow importado no n8n via API pública.

- Nome: `HK Nove — Chatwoot Hermes XD Silent v0`
- Workflow ID: `A0NVoqTkb8R7JmJY`
- Status: **inativo**
- Criado em: `2026-06-10T16:11:56Z`

Arquivo base:

- `workflow-chatwoot-hermes-silent-v0.json`

---

## Credencial criada no n8n

Credencial HTTP Header Auth criada para Chatwoot.

- Nome: `Chatwoot API Token`
- Credential ID: `WVX2kNzb8Wt35w1o`
- Tipo: `httpHeaderAuth`
- Header: `api_access_token`

Token não foi salvo no vault.

---

## URL do n8n

- `https://n8n.alexandreborges.site`

Webhook do novo workflow:

- Produção: `https://n8n.alexandreborges.site/webhook/chatwoot-hermes-xd`
- Teste: `https://n8n.alexandreborges.site/webhook-test/chatwoot-hermes-xd`

---

## Estado atual encontrado

Já existe webhook no Chatwoot:

- Nome: `[N8N] Gatilho WhatsApp`
- ID no Chatwoot: `27`
- Inbox: `2` — Fone Escritorio HK9
- Subscription: `message_incoming`
- URL atual: aponta para workflow n8n antigo/ativo

Workflows relacionados encontrados no n8n:

- `01. Agente Imobiliário` — ID `BTG2mhh3I90a8kQQ` — **ativo**
- `01. Agente Corretor` — ID `VVX0ZFShm6IYQGqN` — arquivado/inativo
- `Hermes - Chatwoot Mensagens` — ID `yUz01KASTFVkjaAD` — inativo
- `HK Nove — Chatwoot Hermes XD Silent v0` — ID `A0NVoqTkb8R7JmJY` — importado/inativo

---

## Decisão de segurança

Não substituir o webhook atual automaticamente.

Motivo:

- workflow `01. Agente Imobiliário` está ativo;
- substituir sem teste pode interromper atendimento atual;
- ativar os dois simultaneamente pode gerar duplicidade de automação.

---

## Caminho recomendado

### Opção segura A — Teste isolado

1. Abrir workflow `HK Nove — Chatwoot Hermes XD Silent v0` no n8n.
2. Rodar em modo teste.
3. Usar webhook-test temporariamente.
4. Simular payload real.
5. Validar labels, atributos e nota interna.

### Opção B — Migração controlada

1. Desativar `01. Agente Imobiliário` temporariamente.
2. Ativar `HK Nove — Chatwoot Hermes XD Silent v0`.
3. Atualizar webhook Chatwoot ID `27` para:
   `https://n8n.alexandreborges.site/webhook/chatwoot-hermes-xd`
4. Enviar mensagem real de teste.
5. Se falhar, reverter webhook para URL anterior e reativar fluxo antigo.

---

## Próxima decisão necessária

Alexandre precisa escolher:

1. **Testar isolado primeiro**, sem mexer no fluxo ativo; ou
2. **Migrar agora**, desativando o fluxo antigo e apontando o webhook para o novo fluxo silencioso.
