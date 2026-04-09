# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sistema de Inteligência de Prospecção para a **Lótus Business** (centro comercial premium em Itapema/SC). Analisa perfis de prospects e gera estratégias de abordagem personalizadas por canal via Claude API.

## Architecture

Todo o projeto é um único componente React em `lotus-prospecting.jsx` (~1.300 linhas). Não há `package.json`, build config ou dependências declaradas — é um componente JSX para ser integrado em um projeto React existente (Next.js, CRA, etc.).

**Estrutura interna do arquivo:**
- `STYLE` — string CSS completa do design system (dark theme, ouro #C9A96E)
- Constantes de dados (`PROFESSIONS`, `SITUATIONS`, `ORIGINS`) — arrays de opções dos formulários
- `export default function App()` — componente único com toda a lógica

**3 abas da aplicação:**
1. **Inteligência de Prospecto** — formulário de entrada + chamada à Claude API + exibição do resultado
2. **Pipeline** — métricas de pipeline e fontes de dados (LinkedIn, CRM SC, OAB, CNPJ, Instagram)
3. **Arquitetura do Sistema** — diagrama do fluxo: Fontes → N8N → Claude API → Chatwoot → Telegram Bot

## Claude API Integration

Chamada direta ao endpoint `https://api.anthropic.com/v1/messages` (modelo `claude-sonnet-4-20250514`, `max_tokens: 1000`). O prompt em pt-BR instrui o Claude a agir como sistema de inteligência comercial da Lótus Business.

**Formato de resposta esperado (JSON):**
```json
{
  "categoria": "NECESSIDADE_IMEDIATA | NECESSIDADE_LATENTE | INVESTIDOR_PURO",
  "temperatura": "QUENTE | MORNO | FRIO",
  "score": 0-100,
  "dor_principal": "...",
  "argumento_chave": "...",
  "objecao_provavel": "...",
  "resposta_objecao": "...",
  "mensagem_whatsapp|linkedin|instagram|email": "...",
  "proximos_passos": ["..."]
}
```

## How to Run

Sem build próprio. Para desenvolver, integre o componente em um projeto React:

```bash
# Exemplo com Vite
npm create vite@latest my-app -- --template react
cd my-app
cp /path/to/lotus-prospecting.jsx src/App.jsx
npm install && npm run dev
```

A API Key do Anthropic deve ser inserida diretamente no estado inicial ou via variável de ambiente no projeto hospedeiro.

## Key Patterns

- **CSS embutido:** todo o styling fica na constante `STYLE` e é injetado via `<style>` no JSX
- **Estado local:** `useState` para `tab`, `form`, `loading`, `result`, `error`, `copied`
- **Sem estado global:** tudo gerenciado localmente no único componente
- **Idioma:** toda a UI e os prompts da API estão em pt-BR
