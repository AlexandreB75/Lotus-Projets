---
tags: [skills, index, automacao, marketing, crm]
status: operacional
data: 2026-06-09
---

# Skills — Índice Operacional

> Mapa das capacidades operacionais usadas pelo OpenBotXD. Skills existem para gerar execução, não para acumular documentação solta.

---

## Criação de skills

- [[Skill-Builder-Operacional]] — transforma conhecimento comercial em skills operacionais reutilizáveis.
- [[Karpathy-Guidelines]] — diretrizes de qualidade para código gerado por IA (pensar antes, simplicidade, mudanças cirúrgicas, critérios verificáveis).

### Skills comerciais propostas

- **WhatsApp SDR Hilton** — atendimento e qualificação de leads Hilton.
- **Follow-up Centro Médico Hilton** — cadência para leads de alto ticket sem resposta.
- **Qualificação Lótus Business** — diagnóstico por perfil e potencial comercial.
- **Objeções Imobiliárias Premium** — respostas seguras para objeções de leads premium.

---

## Automação e CRM

| Skill | Uso principal | Agente/Projeto conectado |
|---|---|---|
| [[N8N]] | Automação de workflows, WhatsApp, CRM e notificações | [[../03-Squads/Agentes-Operacionais/agents/Gestor-Operacional|Gestor Operacional]] |
| [[HubSpot]] | CRM, funil, oportunidades e histórico comercial | [[../03-Squads/Agentes-Operacionais/agents/Follow-Up-Inteligente|Follow-Up Inteligente]] |
| [[Claude-WhatsApp-Leads]] | Apoio em leads e conversas via WhatsApp | [[../03-Squads/Agentes-Operacionais/agents/SDR-Hilton|SDR-Hilton]] / [[../03-Squads/Agentes-Operacionais/agents/SDR-Lotus-Business|SDR-Lotus Business]] / [[../03-Squads/Agentes-Operacionais/agents/SDR-HK-Nove|SDR-HK-Nove]] |

---

## Marketing e aquisição

| Skill | Uso principal | Agente/Projeto conectado |
|---|---|---|
| [[Instagram]] | Conteúdo, autoridade e engajamento | [[../03-Squads/Instagram-Imoveis/00-INDEX-Instagram-Imoveis|Instagram Imóveis]] |
| [[Meta-Ads]] | Tráfego pago, campanhas e segmentação | [[../03-Squads/Traffic-Masters/00-INDEX-Traffic-Masters|Traffic Masters]] |
| [[SEO-AEO-GEO]] | Busca, autoridade, páginas, FAQs e presença em mecanismos/IA | [[../03-Squads/Brand-Squad/00-INDEX-Brand-Squad|Brand Squad]] / [[../03-Squads/Copy-Squad/00-INDEX-Copy-Squad|Copy Squad]] / [[../03-Squads/storytelling/00-INDEX-storytelling|Storytelling]] |
| [[Open-Design]] | Design, criativos, Figma, PPT, vídeo e geração de imagem IA | [[../03-Squads/Design-Squad/00-INDEX-Design-Squad|Design Squad]] / [[../03-Squads/Brand-Squad/00-INDEX-Brand-Squad|Brand Squad]] |

---

## Aplicação por projeto

### Hilton Garden Inn Itapema

- [[Instagram]] — autoridade e materiais de conteúdo.
- [[Meta-Ads]] — campanhas para investidores, compradores e público premium.
- [[Claude-WhatsApp-Leads]] — scripts e atendimento comercial.
- [[HubSpot]] — organização de leads e follow-up.
- [[N8N]] — automações futuras de notificação e CRM.
- [[SEO-AEO-GEO]] — páginas, FAQs e conteúdos de autoridade para busca e IA.

Projeto: [[../02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema|Hilton Garden Inn Itapema]]

---

### Centro Médico Hilton

- [[Instagram]] — autoridade para médicos, clínicas e investidores.
- [[Meta-Ads]] — campanhas segmentadas de alto ticket.
- [[Claude-WhatsApp-Leads]] — follow-up consultivo.
- [[HubSpot]] — controle de decisores, operadores e investidores.
- [[SEO-AEO-GEO]] — FAQ e página de autoridade para médicos, clínicas e investidores.

Produto: [[../02-Projetos/Hilton Garden Inn Itapema/Centro-Medico-Hilton/00-INDEX-Centro-Medico-Hilton|Centro Médico Hilton]]

---

### Lótus Business

- [[Instagram]] — captação de profissionais liberais e investidores.
- [[Meta-Ads]] — campanhas para médicos, advogados, empresários e investidores.
- [[Claude-WhatsApp-Leads]] — atendimento e qualificação.
- [[HubSpot]] — CRM e follow-up.
- [[SEO-AEO-GEO]] — conteúdo de autoridade sobre sala comercial, ativo patrimonial e investimento.

Projeto: [[../02-Projetos/Lótus Business/MASTER - Lótus Business|Lótus Business]]

---

## Regra para novas skills

Toda skill nova precisa ter:

1. Uso prático claro.
2. Projeto ou rotina associada.
3. Saída esperada.
4. Responsável ou agente que usa.

Se não tiver isso, não criar.

---

## Regra anti-ruído

Skill solta sem aplicação vira ruído no gráfico.

Antes de criar ou manter uma skill, ela deve estar conectada a pelo menos um destes pontos:

- projeto comercial;
- agente operacional;
- rotina de execução;
- automação real;
- canal de aquisição.

