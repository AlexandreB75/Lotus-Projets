---
tags: [projeto, lotus, lótus, landing-page, leads, github, marketing]
status: operacional
data: 2026-06-09
---

# Projeto — Lótus Landing

> Estrutura de landing e prospecção digital do Lótus Business no GitHub.

Projeto relacionado:

[[02-Projetos/Lótus Business/MASTER - Lótus Business|MASTER — Lótus Business]]

---

## Decisão operacional atual

Existem dois ativos diferentes:

| Arquivo | Função | Público |
|---|---|---|
| `lotus-prospecting.jsx` | ferramenta interna de inteligência/prospecção | Alexandre/equipe |
| `lotus-landing-public.jsx` | landing pública para tráfego e captação | leads/clientes |

A ferramenta interna não deve ser usada como landing pública, porque expõe arquitetura, pipeline, Claude API, N8N, Chatwoot e lógica de prospecção.

A landing pública deve ser simples, consultiva e orientada para conversão.

---

## Landing pública

**Arquivo:** `lotus-landing-public.jsx`  
**Função:** receber tráfego de Instagram/LinkedIn/Meta Ads no WordPress e iniciar análise de perfil.

### Objetivos

- explicar o Lótus de forma clara;
- segmentar por perfil;
- reduzir promessa exagerada;
- gerar conversa qualificada;
- direcionar para WhatsApp/SDR;
- apoiar SEO/AEO/GEO.

---

## Ferramenta interna

**Arquivo:** `lotus-prospecting.jsx`  
**Função:** análise interna de prospect, score, objeção provável, argumento-chave e mensagem personalizada.

### Observação importante

A chamada para IA/API deve preferencialmente passar por backend, N8N ou ambiente seguro. Não expor chave no navegador.

---

## Onde se encaixa

| Camada | Uso |
|---|---|
| [[03-Squads/Traffic-Masters/Index|Traffic Masters]] | campanhas e destino de tráfego |
| [[03-Squads/Copy-Squad/Index|Copy Squad]] | headlines, CTA, páginas e mensagens |
| [[03-Squads/Oferta-Hormozi/Index|Oferta Hormozi]] | proposta de valor e ângulos de conversão |
| [[03-Squads/Storytelling/Index|Storytelling]] | narrativa e diferenciação |
| [[04-Skills/SEO-AEO-GEO|SEO + AEO + GEO]] | FAQ, autoridade e busca |
| [[03-Squads/Agentes-Operacionais/SDR-Lotus-Business|SDR-Lotus Business]] | atendimento depois do lead entrar |

---

## Campanhas e integrações relacionadas

- [[Lótus Business/Campanhas-Instagram-LinkedIn|Campanhas Instagram + LinkedIn — Lótus Business]]
- [[Lótus Business/Fluxo-WordPress-HubSpot-CRM|Fluxo WordPress + HubSpot CRM — Lótus Business]]

---

## Próximos ajustes técnicos

1. WhatsApp configurado na landing: `+55 74 98869-5350`.
2. Publicar a landing no WordPress: `alexandreborgescorretor.com.br`.
3. Conectar formulário com HubSpot CRM.
4. Adicionar pixel/eventos quando a estrutura de campanha estiver pronta.
5. Conectar HubSpot com n8n/Chatwoot para alertas e follow-up.
6. Criar variações por público se a campanha validar.
