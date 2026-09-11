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

**Pronto para implementar** — copy e estrutura completas em [[Landing-Page-Elementor]].
