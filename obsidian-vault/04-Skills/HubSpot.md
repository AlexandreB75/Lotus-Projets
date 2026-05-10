---
tags: [skill, hubspot, crm, marketing]
data: 2025-05-10
nivel: intermediario
---

# Skill — HubSpot: CRM e Marketing

## O que é

HubSpot é uma plataforma de CRM que integra marketing, vendas e atendimento em um só lugar.

## Projetos que Usam

- [[02-Projetos/Lotus-Business|Lotus Business]]
- [[02-Projetos/Lotus-Landing|Lotus Landing]]

## Squads que Usam

- [[03-Squads/Instagram-Imoveis/Index|Instagram Imóveis]]
- [[03-Squads/Traffic-Masters/Index|Traffic Masters]]

## Integração com N8N

Ver [[04-Skills/N8N|N8N]] para automações que conectam HubSpot com outros sistemas.

---

## Recursos Principais

### Pipeline de Vendas
- Cria etapas do funil (Lead → Qualificado → Proposta → Fechado)
- Cada deal tem valor, responsável e prazo
- Automações movem deals entre etapas

### Contacts (Contatos)
- Centraliza todos os leads
- Histórico de interações
- Segmentação por listas

### Forms (Formulários)
- Embeds em landing pages
- Cada submissão cria contato automaticamente
- Integra com [[04-Skills/N8N|N8N]] via webhook

### Sequences (Sequências de Email)
- Follow-up automático após captação
- Cadência de 3-7 emails
- Personalização com tokens `{{contact.firstname}}`

### Reports (Relatórios)
- Leads por fonte (Instagram, Meta Ads, Organic)
- Taxa de conversão por etapa
- Receita por período

---

## Integrações Comuns

| De | Para | Via |
|---|---|---|
| Instagram Lead Ads | HubSpot Contact | [[04-Skills/N8N\|N8N]] |
| Landing Page Form | HubSpot Contact | HubSpot nativo |
| HubSpot Deal | Slack notificação | [[04-Skills/N8N\|N8N]] |
| HubSpot Contact | Email sequência | HubSpot nativo |

---

## Boas Práticas

- Sempre preencher **source** do lead (de onde veio)
- Usar **lifecycle stage** para segmentar (Lead → MQL → SQL → Customer)
- Criar **listas dinâmicas** baseadas em comportamento
- Nunca deixar deal sem **próxima atividade** agendada
