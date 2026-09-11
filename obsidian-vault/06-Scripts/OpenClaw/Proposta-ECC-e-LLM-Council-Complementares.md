---
tags: [openclaw, ecc, llm-council, arquitetura-ia, proposta]
status: proposta
data: 2026-08-23
---

# Proposta — ECC e LLM Council como referências complementares

## Decisão proposta

Manter [[06-Scripts/OpenClaw/Referencia-ECC-Agent-Harness|ECC / Agent Harness]] e [[06-Scripts/OpenClaw/Referencia-LLM-Council-Karpathy|LLM Council / Karpathy]] como notas independentes e complementares. Não excluir, fundir ou substituir conteúdo entre elas.

## Papéis distintos

| Referência | Papel no OpenBotXD |
|---|---|
| ECC / Agent Harness | Arquitetura operacional: agentes, skills, memória, regras, segurança, workflows e padrões reutilizáveis. |
| LLM Council / Karpathy | Deliberação estratégica: revisão multi-modelo sob demanda para decisões, prompts, compliance e mudanças críticas. |

## Aplicação conjunta futura

1. Usar o ECC como referência para estruturar a operação contínua dos agentes.
2. Acionar o modelo de Council somente para decisões de alto impacto, antes de produção ou quando houver risco comercial, técnico ou de compliance.
3. Manter o atendimento em tempo real simples e de baixa latência; o Council não participa do primeiro atendimento automático.

## Limites atuais

As duas referências permanecem em avaliação. Esta proposta não autoriza instalação, mudança de código, alteração de repositórios nem ativação automática de novos workflows.
