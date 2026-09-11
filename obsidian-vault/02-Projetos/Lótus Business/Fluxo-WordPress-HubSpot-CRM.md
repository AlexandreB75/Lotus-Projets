---
tags: [lotus, lótus, wordpress, hubspot, crm, landing, formulario, whatsapp]
status: operacional
data: 2026-06-09
projeto: Lótus Business
---

# Fluxo WordPress + HubSpot CRM — Lótus Business

> Fluxo operacional para captar leads da landing pública do Lótus no site de Alexandre.

---

## Site e contas

- Domínio: `alexandreborgescorretor.com.br`
- Landing pública base: `lotus-landing-public.jsx`
- WhatsApp comercial conectado ao Chatwoot/n8n: `+55 47 98869-5350`
- HubSpot portal/developer ID: `51028942`
- HubSpot Developer Overview: `https://app.hubspot.com/developer-overview/51028942`

---

## Decisão operacional

A landing pública deve ser publicada no WordPress e o formulário deve enviar os dados para o HubSpot CRM.

O WhatsApp da landing deve direcionar para o número conectado ao Chatwoot/n8n, não para o número pessoal do Alexandre.

---

## Fluxo recomendado

```text
Instagram / LinkedIn / Meta Ads
  ↓
Landing no WordPress
  ↓
Formulário HubSpot
  ↓
Contato no HubSpot CRM
  ↓
N8N / automações / tags
  ↓
Chatwoot / WhatsApp comercial
  ↓
SDR-Lotus / Alexandre quando o lead estiver quente
```

---

## Campos mínimos do formulário

1. Nome
2. WhatsApp
3. Perfil
   - Médico / saúde
   - Advogado
   - Empresário
   - Investidor
   - Profissional liberal
   - Outro
4. Objetivo
   - Uso próprio
   - Presença em Itapema
   - Patrimônio empresarial
   - Investimento com renda potencial
   - Ainda estou avaliando
5. Momento
   - Quero entender melhor
   - Estou comparando opções
   - Tenho interesse nos próximos meses
   - Quero falar com um especialista
6. Observação opcional
7. Consentimento LGPD / aceite de contato

---

## Propriedades recomendadas no HubSpot

Criar ou mapear propriedades:

- `projeto_interesse` = Lótus Business
- `perfil_profissional`
- `objetivo_do_lead`
- `momento_de_compra`
- `origem_campanha`
- `canal_origem` = Instagram / LinkedIn / Meta Ads / Orgânico
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `status_qualificacao`
- `proxima_acao`

---

## Observação sobre HubSpot Developer / CLI

A tela Developer Overview do portal `51028942` é útil para integrações avançadas.

Para o fluxo atual — WordPress + formulário + CRM — a HubSpot CLI não é prioridade.

A CLI faz sentido se for necessário criar aplicativo customizado, extensões de UI, objetos personalizados avançados ou desenvolvimento mais técnico dentro da HubSpot.

Para começar rápido, priorizar:

1. formulário HubSpot ou plugin/form embed no WordPress;
2. propriedades do contato;
3. integração com n8n;
4. pipeline/funil comercial;
5. automações simples de notificação e follow-up.

Se depois precisarmos de app customizado, usar o portal developer `51028942` como referência.

---

## Eventos e tags

### HubSpot

- Novo lead Lótus
- Lead médico
- Lead advogado
- Lead empresário
- Lead investidor
- Lead quente
- Lead para follow-up

### Meta/LinkedIn

- PageView / ViewContent
- Lead
- Contact
- WhatsApp click
- Form submit

---

## Regra de roteamento

- Lead frio/morno: entra pelo HubSpot + Chatwoot/n8n.
- Lead qualificado/quente: pode ser encaminhado para Alexandre.
- Cliente/corretor conhecido: manter relacionamento no número pessoal quando fizer sentido.

---

## Próximas ações

1. Publicar a landing no WordPress.
2. Criar/embutir formulário HubSpot.
3. Mapear campos do formulário para propriedades do HubSpot.
4. Configurar UTMs nas campanhas.
5. Configurar evento de envio de formulário.
6. Criar alerta no n8n para lead quente.
