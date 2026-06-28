---
tags: [skill, qualidade, codigo, ia, diretrizes, karpathy]
status: operacional
data: 2026-06-11
nivel: meta
---

# Skill — Karpathy Guidelines: Qualidade de Código com IA

## O que é

Diretrizes comportamentais derivadas das observações de Andrej Karpathy sobre os erros mais comuns de LLMs ao escrever código. Aplicadas automaticamente via plugin `karpathy-skills` no Claude Code.

---

## Os 4 princípios

### 1. Pensar antes de codar
- Explicitar suposições antes de implementar.
- Se houver múltiplas interpretações, apresentar todas.
- Se algo estiver confuso, parar e perguntar — não assumir.

### 2. Simplicidade primeiro
- Mínimo de código que resolve o problema.
- Nenhuma feature além do que foi pedido.
- Nenhuma abstração para uso único.
- Sem error handling para cenários impossíveis.

### 3. Mudanças cirúrgicas
- Tocar apenas o que é necessário.
- Não "melhorar" código adjacente sem pedido.
- Seguir o estilo existente, mesmo que diferente do preferido.
- Cada linha alterada deve ter rastreabilidade direta ao pedido.

### 4. Execução orientada a objetivo
- Definir critérios de sucesso verificáveis antes de começar.
- "Corrija o bug" → "Escreva um teste que reproduz o bug, depois faça-o passar."
- Para tarefas multi-etapa: plano explícito com verificação por etapa.

---

## Quando usar

- Ao revisar código gerado por IA.
- Ao construir automações n8n, scripts ou workflows.
- Ao dar instruções ao Claude Code para implementar funcionalidades.
- Como checklist antes de considerar uma tarefa concluída.

---

## Projeto associado

Qualidade operacional de todos os projetos:
- [[../02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema|Hilton Garden Inn Itapema]]
- [[../02-Projetos/Lótus Business/MASTER - Lótus Business|Lótus Business]]
