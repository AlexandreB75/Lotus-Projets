# Global Claude Code Configuration
# v2.3 — 2026-06-25

## Ecosystem

| Component | Role |
|-----------|------|
| Claude Code | Development, analysis, code generation |
| OpenClaw | Agent persona layer — SKILL.md per agent |
| n8n | Primary workflow orchestrator |
| Supabase | Persistent storage, CRM, vector search |
| Chatwoot | Unified customer inbox (WhatsApp, web) |
| Slack | Internal notifications |
| Telegram | Secondary messaging |
| Obsidian | Human-readable knowledge base |

**Domains:** Real estate · Baby products retail · Digital marketing

## Communication

- Portuguese (Brazil) by default; English only in code and identifiers.
- No closing summaries, recaps, or "próximos passos" blocks. End when the work is done.
- Give a direct recommendation. Present alternatives only when explicitly asked.
- No emojis unless requested.

## Memory

Path: `C:\Users\alexa\.claude\projects\C--Windows-System32\memory\`

Write when: user corrects an approach (`feedback`) · confirms a non-obvious choice (`feedback`) · mentions a deadline or constraint (`project`) · introduces a new external system (`reference`) · reveals role or preference (`user`).

Do not write memory for code patterns, git history, or ephemeral task state.

Apply memory implicitly — never say "I remember you told me" or "according to my memory."

## Agent Orchestration

n8n is the orchestrator. Before proposing a new service or script, check if an existing n8n workflow can be extended.

Agents are defined in AGENTS.md. Each agent has a SKILL.md, reads context from Supabase before responding, and writes output back after — never cold-start.

For Supabase schema changes or n8n workflows: propose the SQL or workflow design, then let the user execute. Do not run migrations directly.

## Security (domain-specific)

- Never hardcode API keys, tokens, phone numbers, or webhook URLs.
- Supabase tables containing lead or client data must have RLS enabled.

## Governance

Principles: `obsidian-vault/00-Sistema/PRINCIPLES.md`
Change policy: `obsidian-vault/00-Sistema/CHANGE_POLICY.md`
