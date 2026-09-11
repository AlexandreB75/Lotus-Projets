---
tags: [n8n, workflow, whatsapp, claude, manager-agent]
status: arquivo
projeto: Lótus Business + Hilton Garden Inn Itapema
---

> **Nota:** Este workflow foi supersedido pelo Fazer.ai + Chatwoot (`agente.alexandreborgescorretor.com.br`). Mantido como referência de arquitetura — não reimplementar sem necessidade específica.

# Manager-Comercial — Workflow N8N (Referência)

> WhatsApp → N8N → Claude API (Manager Agent) → resposta automática → WhatsApp

---

## Fluxo

```
Lead envia mensagem no WhatsApp
        ↓
Z-API / Evolution dispara webhook
        ↓
N8N recebe (Webhook WhatsApp)
        ↓
Extrai telefone + mensagem
        ↓
Chama Claude API com prompt do Manager Agent
        ↓
Claude analisa e responde como SDR correto
        ↓
N8N envia resposta de volta ao WhatsApp
```

---

## Como importar

1. No N8N: **Workflows → Import → From File**
2. Selecionar: `n8n-workflows/manager-comercial-workflow.json`
3. Configurar variáveis (ver abaixo)
4. Ativar o workflow

---

## Variáveis obrigatórias

Configurar em **Settings → Variables** no N8N:

| Variável | Valor |
|----------|-------|
| `ANTHROPIC_API_KEY` | Sua chave da Anthropic (console.anthropic.com) |
| `ZAPI_URL` | URL da instância Z-API (ex: `https://api.z-api.io/instances/SEU-ID/token/SEU-TOKEN`) |
| `ZAPI_TOKEN` | Client-Token do Z-API |

> Se usar **Evolution API** em vez de Z-API: troque o nó "Envia WhatsApp (Z-API)" por um HTTP Request apontando para `POST /message/sendText/{instance}` com o body `{"number": "{{phone}}", "text": "{{resposta}}"}`.

---

## Nós do Workflow

| Nó | Função |
|----|--------|
| Webhook WhatsApp | Recebe POST do provedor WhatsApp |
| Extrai Mensagem | Normaliza formato Z-API / Evolution / Chatwoot |
| Claude — Manager Agent | Chama Anthropic API com o prompt do gestor |
| Formata Resposta | Extrai o texto da resposta do Claude |
| Envia WhatsApp (Z-API) | Envia resposta ao lead |
| Responde Webhook | Retorna `{"status":"ok"}` ao provedor |

---

## URL do Webhook

Após ativar o workflow, a URL será:
```
https://SEU-N8N/webhook/manager-comercial
```

Configure esta URL no Z-API ou Evolution como **webhook de mensagens recebidas**.

---

## O que o Manager Agent faz

Recebe qualquer mensagem e decide internamente:

- Mensagem sobre **Porto Velho / sala comercial / Lótus** → responde como SDR-Lotus
- Mensagem sobre **Hilton / Itapema / multipropriedade** → responde como SDR-Hilton
- Lead **frio / sem resposta** → gera follow-up
- Lead com **objeção ou reunião** → responde como Closer

A resposta já vem formatada para WhatsApp: curta, direta, sem robótica.

---

## Regras que o agente respeita

- Nunca promete valorização ou renda garantida
- Qualifica antes de enviar material pesado
- Máx 3 parágrafos por mensagem
- Identifica automaticamente o projeto pelo contexto

---

## Links relacionados

- [[../../04-Skills/N8N|N8N Skill]]
- [[../../04-Skills/Claude-WhatsApp-Leads|Claude + WhatsApp Leads]]
- [[../../03-Squads/Agentes-Operacionais/SDR-Hilton|SDR-Hilton]]
- [[../../03-Squads/Agentes-Operacionais/SDR-Lotus-Business|SDR-Lotus Business]]
