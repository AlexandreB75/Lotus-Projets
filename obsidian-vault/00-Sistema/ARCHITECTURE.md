---
type: sistema
versao: 1.0
data: 2026-08-23
---

# Arquitetura do Ecossistema — OpenBotXD

Visão consolidada de todos os componentes ativos, seus papéis e integrações.

---

## Camada de Atendimento (Fazer.ai + Chatwoot)

```
Lead → WhatsApp
         ↓
    Chatwoot (inbox unificado)
         ↓
    Fazer.ai Agent
    agente.alexandreborgescorretor.com.br
         ↓
    Resposta automática → WhatsApp
```

**Responsabilidade:** qualificação, atendimento e roteamento de leads dos projetos Lótus Business e Hilton Garden Inn Itapema.

**Escopo:** SDR, follow-up, tratamento de objeções, encaminhamento para o Closer (Alexandre).

---

## Camada de Automações Paralelas (N8N)

| Workflow | Função | Arquivo |
|----------|--------|---------|
| Vault Librarian Semanal | Manutenção do vault — links quebrados, órfãs, relatório | `n8n-workflows/vault-librarian-semanal.json` |

**Uso atual do N8N:** relatórios, integrações CRM, follow-up programado, notificações Slack.

**Não usar N8N para:** atendimento direto ao lead — isso é responsabilidade do Fazer.ai.

---

## Camada de Conhecimento (Obsidian + Smart Connections)

**Vault:** `obsidian-vault/` — base de conhecimento estruturada em PARA.

**Smart Connections:** embeddings locais (TaylorAI/bge-micro-v2) para busca semântica offline.

**Manutenção:** `scripts/vault-librarian.py` — roda semanalmente via N8N.

---

## Camada de Desenvolvimento (Claude Code)

**Papel:** criação e evolução de arquivos do vault, scripts, workflows N8N, documentação.

**Repositório:** `alexandreb75/lotus-projets` → branch `claude/organize-obsidian-vault-9scbT`

**Sync:** Git — VPS (Hostinger) ↔ GitHub ↔ Obsidian local.

---

## Componentes de Suporte

| Componente | Papel |
|------------|-------|
| Supabase | Armazenamento persistente, CRM, vector search |
| Chatwoot | Inbox unificado — WhatsApp + web |
| Slack | Notificações internas (alertas N8N, relatórios) |
| GitHub | Sync e versionamento do vault |

---

## Arquivo Histórico

| Item | Motivo | Localização |
|------|--------|-------------|
| Agentes Omnigent (YAMLs) | Substituído pelo Fazer.ai | `_arquivo/omnigent-agents/` |
| Workflow Manager-Comercial N8N | Substituído pelo Fazer.ai + Chatwoot | `n8n-workflows/manager-comercial-workflow.json` + `06-Scripts/n8n/Manager-Comercial-N8N.md` |

---

## Decisões de Arquitetura

| Data | Decisão |
|------|---------|
| 2026-08 | Fazer.ai + Chatwoot adotado como camada de atendimento — Omnigent descontinuado |
| 2026-08 | N8N restrito a automações paralelas (relatórios, CRM, agendamentos) |
| 2026-08 | Smart Connections com embeddings locais — sem envio de notas a APIs externas |
