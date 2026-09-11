# Operações — Piccolo Bambino

Procedimentos operacionais (SOPs), checklists, erros comuns e boas práticas.

---

## Como funciona

Esta pasta armazena tudo que o usuário ensina aos agentes sobre processos operacionais. Cada aprendizado gera 4 artefatos:

| Artefato | Sufixo | O que contém |
|----------|--------|-------------|
| **SOP** (Standard Operating Procedure) | `sop-[agente]-[nome].md` | Passo a passo detalhado do procedimento |
| **Checklist** | `checklist-[agente]-[nome].md` | Lista rápida de verificação (para consultar na hora) |
| **Erros comuns** | `erros-comuns-[agente].md` | Erros que o usuário já cometeu e como evitar |
| **Boas práticas** | `boas-praticas-[agente].md` | Atalhos, dicas e otimizações descobertas |

---

## Regras

1. **Nunca** criar SOP que duplica conteúdo existente — verificar antes
2. **Todo** SOP deve ter um checklist correspondente
3. **Todo** erro cometido durante aprendizado deve ser registrado
4. **Toda** boa prática descoberta deve ser registrada
5. **Sempre** que um SOP é criado, atualizar o agente correspondente em `agents/`

---

## Agentes vinculados

| Agente | Prefixo de arquivos | SOPs pendentes |
|--------|--------------------|----------------|
| [[agents/Agente-Bling]] | `sop-bling-*`, `checklist-bling-*` | 9 procedimentos |
| [[agents/Agente-Nuvemshop]] | `sop-nuvemshop-*`, `checklist-nuvemshop-*` | 10 procedimentos |
| [[agents/Agente-Marketplaces]] | `sop-marketplaces-*`, `checklist-marketplaces-*` | 8 procedimentos |
