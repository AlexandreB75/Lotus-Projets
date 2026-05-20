---
title: Claude no WhatsApp — Responder Leads em 1 Minuto
tags:
  - claude
  - whatsapp
  - leads
  - vendas
  - ia
  - automacao
date: 2026-05-20
fonte: Allessandra Sinisgalli | IA Club Comunidade
---

# Claude no WhatsApp — Como Responder Todos os Seus Leads em 1 Minuto

> [[01-Dashboard/Dashboard|← Dashboard]] | Relacionado: [[03-Squads/Instagram-Imoveis/Index|Instagram Imóveis]] · [[04-Skills/HubSpot|HubSpot]] · [[04-Skills/N8N|N8N]]

## O que é

Usar a extensão do Claude no Chrome para abrir o WhatsApp Web e pedir para a IA analisar conversas, identificar leads não respondidos e escrever respostas personalizadas no seu tom de voz.

**Sem programação. Sem automação complexa.** Qualquer pessoa consegue fazer.

---

## Passo a Passo

### Passo 1 — Instalar a Extensão do Claude

1. Acesse `claude.ai/download` ou pesquise "Claude for Chrome" na Chrome Web Store
2. Clique em **Adicionar ao Chrome**
3. Confirme a instalação
4. O ícone do Claude vai aparecer na barra do navegador

> Funciona também no **Comet** (browser da Perplexity) — processo idêntico.

### Passo 2 — Abrir o WhatsApp Web

1. Acesse `web.whatsapp.com`
2. Escaneie o QR code com o celular
3. Aguarde as conversas carregarem

### Passo 3 — Ativar o Claude na Barra Lateral

1. Clique no ícone do Claude no canto do navegador
2. A barra lateral do Claude vai abrir ao lado do WhatsApp
3. O Claude consegue ver o que está na tela

---

## Prompts Prontos

### Prompt Básico

```
Analisa minhas conversas do WhatsApp dos últimos 30 dias.

Identifica todos os potenciais leads que demonstraram interesse nos meus produtos 
ou serviços e que ainda não foram respondidos.

Para cada um deles, escreva uma resposta personalizada com base em tudo que você 
já sabe sobre mim: meu negócio, meus produtos, meu tom de voz e minha forma de 
comunicar.

As respostas devem soar naturais, diretas e no meu estilo. Não use linguagem 
formal nem excessivamente comercial.
```

### Prompt Avançado — Claude como Vendedor Treinado

```
Você é meu assistente de vendas treinado no meu negócio.

Meu nome é [SEU NOME]. Eu trabalho com [SEU NICHO/PRODUTO]. 
Meu público são [DESCRIÇÃO DO PÚBLICO].

Meu tom de comunicação é: direto, sem enrolação, prático e próximo.

Agora analisa minhas conversas do WhatsApp dos últimos 30 dias. Identifica:
1. Leads que perguntaram sobre meus produtos ou serviços e não foram respondidos
2. Leads que demonstraram interesse mas a conversa ficou sem resposta
3. Leads que enviaram mensagens e estão aguardando retorno

Para cada lead identificado:
- Escreva uma resposta personalizada considerando o contexto da conversa
- Use meu tom de voz
- Inclua uma chamada para ação clara e natural
- Não use respostas genéricas — cada resposta deve ser específica para aquela conversa
```

### Prompt de Contexto do Negócio (fazer isso primeiro)

```
Vou te dar informações sobre o meu negócio para você usar nas suas respostas.

Meu negócio: [descreva]
Meus produtos/serviços: [liste]
Preços: [informe]
Meu público: [descreva]
Minha forma de comunicar: [explique]
Objeções mais comuns: [liste]
O que me diferencia: [explique]
```

> Faça isso uma vez. O Claude vai usar essas informações em toda a sessão.

---

## Importante: Não Causa Ban no WhatsApp

A extensão do Claude funciona de forma diferente de bots de disparo:

| Bots que causam ban | Extensão do Claude |
|---|---|
| Disparam mensagens automaticamente | Apenas sugere respostas |
| Injetam código no WhatsApp | Lê o que está na tela |
| Enviam sem interação humana | Você digita e envia |
| Usam APIs não oficiais | Funciona como extensão visual |

**O comportamento no WhatsApp é 100% manual** — o Claude só ajuda a pensar, não age no seu lugar.

### O que de fato pode causar ban
- Extensões que disparam mensagens em massa automaticamente
- Ferramentas que enviam mensagens sem interação humana
- Uso de APIs não oficiais do WhatsApp
- Envio em massa para listas sem consentimento

---

## Aplicação no Lotus

Para usar com o [[02-Projetos/Lotus-Business|Lotus Business]], use o prompt de contexto com:

```
Meu negócio: Corretor de imóveis comerciais
Meu produto: Salas comerciais no Lotus Business (Porto Velho/RO)
Meu público: Investidores e empresários que querem renda passiva
Tom: Direto, consultivo, sem enrolação
Diferencial: Imóvel ativo gera renda — sala de 60m² = R$6.000/mês
```

Ver argumentos completos em [[03-Squads/Instagram-Imoveis/Treinamento-Kaka-HKnove/Notas-Completas|Treinamento Kaká HKnove]].

---

## Próximos Passos

- Integrar com [[04-Skills/N8N|N8N]] para automações mais completas
- Conectar leads gerados ao [[04-Skills/HubSpot|HubSpot]] CRM
- Escalar com ManyChat para automações de funil

---

## Notas Relacionadas

- [[03-Squads/Instagram-Imoveis/Index|Instagram Imóveis]] — squad de captação
- [[04-Skills/HubSpot|HubSpot]] — CRM para organizar os leads respondidos
- [[04-Skills/N8N|N8N]] — automação avançada de follow-up
- [[03-Squads/Copy-Squad/Index|Copy Squad]] — tom de voz e scripts
