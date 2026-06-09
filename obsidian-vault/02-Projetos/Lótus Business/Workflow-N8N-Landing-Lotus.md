---
tags: [lotus, n8n, workflow, landing, hubspot, chatwoot, wordpress]
status: rascunho-operacional
data: 2026-06-09
projeto: Lótus Business
---

# Workflow N8N — Landing Lótus

> Workflow separado para receber leads da landing pública do Lótus. Não substituir o workflow da fazer.ai/Chatwoot, que continua sendo o fluxo de atendimento após o lead entrar em conversa.

---

## Decisão

Criar um workflow dedicado:

```text
Landing Elementor / WordPress
  ↓
Webhook n8n dedicado: `/webhook/lotus-landing`
  ↓
Normalizar + validar lead
  ↓
Criar/atualizar contato no HubSpot
  ↓
Notificar Chatwoot/n8n/Alexandre
  ↓
Responder sucesso para a landing
  ↓
Landing abre WhatsApp comercial
```

---

## Arquivo importável

Workflow JSON:

`workflows/n8n/landing-lotus-lead-capture.json`

---

## Payload esperado da landing

```json
{
  "nome": "Dr. João",
  "whatsapp": "47999999999",
  "email": "joao@email.com",
  "perfil": "Médico / saúde",
  "objetivo": "Uso próprio / consultório / escritório",
  "momento": "Quero entender melhor",
  "observacao": "Tenho clínica e penso em Itapema",
  "consentimento_lgpd": true,
  "honeypot_site": "",
  "projeto_interesse": "Lótus Business",
  "origem_pagina": "https://alexandreborgescorretor.com.br/...",
  "canal_origem": "instagram",
  "utm_source": "instagram",
  "utm_medium": "paid_social",
  "utm_campaign": "lotus_medicos",
  "utm_content": "criativo_01",
  "utm_term": "",
  "lead_source": "landing_lotus_wordpress"
}
```

---

## Campos normalizados

- `nome`
- `telefone`
- `email`
- `contato_original`
- `consentimento_lgpd`
- `honeypot_site`
- `perfil_profissional`
- `objetivo_do_lead`
- `momento_de_compra`
- `observacao`
- `projeto_interesse`
- `status_qualificacao`
- `temperatura_lead`
- `prioridade`
- `score_inicial`
- `lifecyclestage`
- `criar_deal`
- `canal_origem`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

---

## Regra de qualificação inicial

### Lead quente

Momento contém:\n\n- quero falar com especialista;\n- próximos meses;\n- comparando opções.\n\nOu objetivo contém:\n\n- uso próprio;\n- expansão;\n- investimento.\n\n### Lead morno\n\n- quer entender melhor;\n- ainda está avaliando;\n- observação incompleta.\n\n### Lead frio

- dados incompletos;
- sem telefone/e-mail;
- perfil genérico.

---

## Validação e proteção

O workflow rejeita ou ignora leads quando:

- não há nome;
- não há WhatsApp;
- não há aceite LGPD;
- o honeypot foi preenchido.

---

## HubSpot

Recomendações:

- criar/atualizar contato usando telefone ou e-mail;
- `projeto_interesse = Lótus Business`;
- `lifecyclestage = lead` ou `salesqualifiedlead` para lead quente;
- `temperatura_lead = frio/morno/quente`;
- `status_qualificacao = lead_frio_lotus`, `lead_morno_lotus` ou `lead_quente_lotus`;
- criar deal apenas depois de validação comercial ou lead quente.

---

## Chatwoot / WhatsApp

Não tentar simular conversa do lead automaticamente dentro do Chatwoot sem necessidade.

Fluxo recomendado:

1. n8n salva o lead no HubSpot;
2. n8n envia alerta interno para Chatwoot/Telegram ou conversa de alerta;
3. landing abre WhatsApp do número comercial;
4. quando o lead mandar mensagem, entra no workflow Chatwoot existente.

---

## Variáveis/credenciais necessárias

Preferir variáveis de ambiente ou credenciais n8n:

- `HUBSPOT_PRIVATE_APP_TOKEN`
- `CHATWOOT_API_TOKEN`
- `CHATWOOT_BASE_URL=https://chatwoot.alexandreborges.site`
- `CHATWOOT_ACCOUNT_ID=1`
- `CHATWOOT_ALERT_CONVERSATION_ID=90`

Nunca hardcodear tokens no workflow.

---

## Próximos passos

1. Importar `workflows/n8n/landing-lotus-lead-capture.json` no n8n.
2. Ajustar credenciais/token do HubSpot.
3. Ajustar token/alerta do Chatwoot, se for usar.
4. Ativar workflow.
5. Confirmar URL final do webhook.
6. Atualizar `lotus-landing-public.html` com o webhook novo.
7. Testar envio real pelo Elementor.
