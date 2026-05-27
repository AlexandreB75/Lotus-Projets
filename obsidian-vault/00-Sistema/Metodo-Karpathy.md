---
title: Método Karpathy — Knowledge Compiler
tags:
  - metodologia
  - vault
  - llm
  - obsidian
  - automacao
  - karpathy
date: 2026-05-20
status: documentado
---

# Método Karpathy — Knowledge Compiler

> [[01-Dashboard/Dashboard|← Dashboard]] | Relacionado: [[05-Contexto/CONTEXTO-ALEXANDRE|Contexto]] · [[04-Skills/N8N|N8N]] · [[04-Skills/SEO-AEO-GEO|SEO+AEO+GEO]]

## O que é

Arquitetura proposta por **Andrej Karpathy**, co-fundador da OpenAI e ex-diretor de IA da Tesla. Publicada no GitHub como gist e viralizou com milhares de stars em poucos dias.

---

## A Inversão de Lógica

| Método Tradicional (Kepano, CEO do Obsidian) | Método Karpathy |
|---|---|
| Você escreve suas próprias notas | Quem escreve é o LLM, não você |
| Obsidian como second brain pessoal | Obsidian como **knowledge compiler** |
| Minimalista e manual | Compilado automaticamente |

> **Os dois são complementares, não concorrentes.**
> - Kepano → notas pessoais, reflexões, daily notes, ideias brutas
> - Karpathy → knowledge base técnica compilada automaticamente

---

## Arquitetura em 3 Camadas

```
vault/
├── raw/          ← Camada 1: fontes imutáveis (você só adiciona)
├── wiki/         ← Camada 2: compilado pelo LLM (não editar manualmente)
└── CLAUDE.md     ← Camada 3: schema com regras de compilação
```

### Camada 1 — `raw/` (Fontes Imutáveis)

Tudo que entra como fonte bruta. Você não edita, só adiciona.

**Exemplos para o vault Lotus:**
- Resumos de mercado diários
- PDFs dos empreendimentos
- Transcrições de treinamentos (ex: [[03-Squads/Instagram-Imoveis/Treinamento-Kaka-HKnove/Transcricao-Original|Transcrição Kaká]])
- Newsletters de mercado imobiliário
- Artigos sobre Itapema e litoral SC
- Guias como [[04-Skills/Claude-WhatsApp-Leads|Claude no WhatsApp]]

### Camada 2 — `wiki/` (Gerada pelo LLM)

Compilação automática das fontes brutas. O LLM lê o `raw/` e escreve/atualiza o wiki.

**Exemplos para o vault Lotus:**
- Ficha do [[02-Projetos/Lotus-Business|Lotus Business]] atualizada automaticamente
- Objeções e respostas compiladas de transcrições
- [[05-Contexto/CONTEXTO-ALEXANDRE|Contexto]] com padrões de mercado identificados pelo LLM
- Conexões entre conceitos que você não veria manualmente

### Camada 3 — `CLAUDE.md` (Schema de Regras)

Arquivo que define como o LLM deve compilar:
- Quais páginas existem e como atualizar
- Quais wikilinks criar automaticamente
- Como conectar fontes com argumentos de venda

---

## Por que é Diferente de RAG Tradicional

| RAG Tradicional | Método Karpathy |
|---|---|
| Reprocessa fontes brutas toda vez | Consulta o wiki já compilado |
| Respostas menos consistentes | Respostas muito mais precisas |
| Conhecimento estático | Conhecimento cresce com o tempo (compounding) |

---

## Aplicação Real no Vault Lotus

### O que entraria no `raw/`
- Resumos de mercado diários
- Transcrições de treinamentos imobiliários
- PDFs técnicos dos empreendimentos
- Guias como [[04-Skills/SEO-AEO-GEO|SEO+AEO+GEO]]
- Resultados de campanhas do [[04-Skills/Meta-Ads|Meta Ads]]

### O que o `wiki/` compilaria automaticamente
- Fichas atualizadas do [[02-Projetos/Lotus-Business|Lotus Business]]
- Objeções e respostas crescendo com padrões
- Contexto de mercado consolidado
- Conexões entre empreendimentos e cenário macro

### O que o schema definiria
- Regras de como atualizar cada ficha
- Quais wikilinks criar automaticamente
- Como conectar resumo de mercado com argumentos de venda

---

## Ferramenta Necessária

**Claude Code** (linha de comando) — não é o Claude.ai

Exige setup técnico dedicado. **Não implementar agora** — guardar como próximo nível.

---

## Status de Implementação

- [x] Conceito entendido e documentado
- [x] Arquitetura mapeada pro contexto Lotus
- [ ] Criar pasta `raw/` com primeiras fontes
- [ ] Definir schema inicial no `CLAUDE.md`
- [ ] Primeira compilação de teste

> **Quando implementar:** Depois que o vault atual estiver populado com uso real.
> Não faz sentido compilar automaticamente um vault vazio.
> **Primeiro usar, depois automatizar.**

---

## Notas Relacionadas

- [[05-Contexto/CONTEXTO-ALEXANDRE|Contexto Alexandre]] — base para o schema
- [[04-Skills/N8N|N8N]] — automações complementares
- [[03-Squads/Instagram-Imoveis/Treinamento-Kaka-HKnove/Transcricao-Original|Transcrição Kaká]] — exemplo de fonte para o `raw/`
- [[02-Projetos/Lotus-Business|Lotus Business]] — primeiro wiki a ser compilado
