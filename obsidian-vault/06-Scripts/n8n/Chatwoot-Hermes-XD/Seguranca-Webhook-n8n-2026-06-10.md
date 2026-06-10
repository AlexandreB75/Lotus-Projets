---
tags: [n8n, chatwoot, webhook, seguranca, hermes-xd]
status: operacional
data: 2026-06-10
---

# Segurança do Webhook n8n — 2026-06-10

## Contexto

Teste externo feito por Alexandre mostrou que o endpoint do n8n respondia a POST direto:

`https://n8n.alexandreborges.site/webhook/chatwoot-hermes-xd`

O endpoint retornava:

```json
{"message":"Workflow was started"}
```

Isso é comportamento normal do n8n, mas cria risco se o workflow executar ações caras ou alterar CRM sem validar origem.

---

## Execução analisada

Execução n8n:

- ID: `1018`
- Status: sucesso
- Conversation ID simulado: `98765`
- Resultado: `shouldSkip: true`
- Motivo: payload veio com `inbox_id: 1`, mas o WhatsApp real é `inbox_id: 2`.

Conclusão:\n\n> O POST direto iniciou o workflow, mas não atualizou o Chatwoot porque caiu no filtro interno.

---

## Travamento aplicado

Workflow atualizado:

- Nome: `HK Nove — Chatwoot Hermes XD Silent v0`
- ID: `A0NVoqTkb8R7JmJY`
- Status: ativo
- Atualizado em: `2026-06-10T16:42:13Z`

Novas regras de entrada:

1. Exigir headers de assinatura/timestamp do Chatwoot:
   - `X-Chatwoot-Signature`
   - `X-Chatwoot-Timestamp`
2. Exigir conversa com label:
   - `testando-agente`
3. Continuar exigindo:
   - mensagem incoming;
   - inbox real `2`;
   - conteúdo não vazio;
   - não possuir label `agente-off`.

---

## Teste após travamento

Execução n8n:

- ID: `1019`
- Teste: POST direto sem assinatura
- Inbox ID: `2`
- Resultado: `shouldSkip: true`
- Motivo: `sem assinatura/timestamp do Chatwoot`

Conclusão:\n\n> Mesmo com inbox correto, POST direto sem assinatura não passa para ações no Chatwoot.

---

## Webhook de teste criado no Chatwoot

Foi criado um segundo webhook no Chatwoot, sem substituir o webhook antigo.

- Nome: `[N8N] Hermes XD Silent Test`
- ID: `28`
- URL: `https://n8n.alexandreborges.site/webhook/chatwoot-hermes-xd`
- Inbox: `2` — Fone Escritorio HK9
- Subscription: `message_incoming`
- Secret configurado no Chatwoot: sim

O secret não deve ser salvo no vault.

---

## Estado operacional

Fluxo antigo continua existindo:

- Webhook antigo Chatwoot: `[N8N] Gatilho WhatsApp` — ID `27`
- Workflow antigo/ativo: `01. Agente Imobiliário`

Fluxo novo roda em paralelo, mas só processa conversas marcadas com `testando-agente`.

---

## Próximo teste correto

1. Abrir uma conversa real no Chatwoot.
2. Adicionar label `testando-agente`.
3. Enviar uma mensagem real pelo WhatsApp.
4. Conferir execução no n8n.
5. Conferir se criou:
   - labels;
   - custom attributes;
   - nota interna;
   - atribuição para Alexandre, se lead quente.

---

## Próxima melhoria de segurança

Implementar validação HMAC real usando:

- `X-Chatwoot-Signature`;
- `X-Chatwoot-Timestamp`;
- raw body;
- secret do webhook.

A documentação do Chatwoot define a assinatura como:

```text
sha256=HMAC-SHA256(webhook_secret, "{timestamp}.{raw_body}")
```

A trava atual é suficiente para teste controlado, mas a validação HMAC completa é recomendada antes de abrir produção ampla.
