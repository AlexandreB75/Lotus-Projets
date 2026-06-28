---
tags: [claude-code, ecc, orquestrador, agente-autonomo, instalado]
data: 2026-06-20
status: instalado
tipo: agente-orquestrador
---

# ECC — Agente Orquestrador

> ECC transforma o Claude Code em um **sistema autônomo de agentes** — substitui AutoGPT, Hermes e frameworks similares usando apenas recursos nativos do Claude Code.

## O que é o ECC como Orquestrador

O ECC não é só uma coleção de skills. É a **camada de orquestração** que conecta:

```
┌────────────────────────────────────────────────┐
│              Claude Code Runtime               │
│                                                │
│  Crons      Dispatch    Memory     Computer    │
│  (Schedule) (Remoto)   (Store)    (Use)        │
│       │          │         │          │        │
│       ▼          ▼         ▼          ▼        │
│    ┌──────────────────────────────────────┐    │
│    │     ECC — Skill + Agent Layer        │    │
│    │  skills/ agents/ commands/ hooks/    │    │
│    └──────────────────────────────────────┘    │
│       │          │         │          │        │
│       ▼          ▼         ▼          ▼        │
│    ┌──────────────────────────────────────┐    │
│    │         MCP Server Layer             │    │
│    │  memory  github  exa  supabase       │    │
│    └──────────────────────────────────────┘    │
└────────────────────────────────────────────────┘
```

## Dois Modos de Orquestração

### 1. Orquestrador Autônomo — `autonomous-agent-harness`
Agente que roda continuamente, com memória persistente, schedules e loops:

```
/ecc:autonomous-agent-harness
```

**Quando usar:**
- Tarefas recorrentes ("rodar todo dia às 9h")
- Monitoramento contínuo de PRs, deploys, leads
- Substituir AutoGPT/Hermes com Claude Code nativo
- Loops de longa duração com checkpoint

**Componentes:**
| Componente | Função |
|---|---|
| Persistent Memory | `~/.claude/projects/*/memory/` — carregada automaticamente |
| Crons | Agendamento via `mcp__scheduled-tasks__create_scheduled_task` |
| Dispatch | Agentes remotos paralelos |
| Computer Use | Automação de interface quando necessário |

### 2. Multi-Agente Paralelo — `dmux-workflows`
Múltiplos agentes em paralelo via tmux:

```
/ecc:dmux-workflows
```

**Quando usar:**
- Dividir tarefas grandes entre agentes simultâneos
- Coordenar Claude Code + Codex + OpenCode juntos
- "Roda em paralelo", "divide esse trabalho", "multi-agent"

## Skills de Orquestração Instaladas

| Skill | Função |
|---|---|
| `/ecc:orch-add-feature` | Feature end-to-end: research → plan → TDD → review → commit |
| `/ecc:orch-build-mvp` | MVP completo do zero com GAN harness |
| `/ecc:orch-change-feature` | Altera feature existente com segurança |
| `/ecc:orch-fix-defect` | Bug → teste falhando → fix → commit |
| `/ecc:orch-refine-code` | Refactor sem mudar comportamento |
| `/ecc:multi-workflow` | Pipeline completo multi-modelo |
| `/ecc:loop-start` | Loop autônomo com stop conditions |
| `/ecc:santa-loop` | Loop de revisão cíclica |

## Instalação (feita em 2026-06-20)

```powershell
git clone https://github.com/affaan-m/everything-claude-code.git C:\Users\alexa\everything-claude-code
cd C:\Users\alexa\everything-claude-code
.\install.ps1 --target claude --profile full
```

**821 operações** — 271 skills · 67 agentes · 92 commands  
**Estado:** `C:\Users\alexa\.claude\ecc\install-state.json`

## Atualizar

```powershell
cd C:\Users\alexa\everything-claude-code
git pull
.\install.ps1 --target claude --profile full
```

## Referências

- Repo local: `C:\Users\alexa\everything-claude-code`
- Skill principal: `skills\autonomous-agent-harness\SKILL.md`
- Skill paralela: `skills\dmux-workflows\SKILL.md`
- GitHub: https://github.com/affaan-m/ECC

## Links internos

- [[claude-code-mastery/README]]
- [[03-Squads/Agentes-Operacionais/00-INDEX-Agentes-Operacionais]]

