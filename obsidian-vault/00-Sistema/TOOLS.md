# TOOLS.md — Ferramentas do Ecossistema
# v1.0 — 2026-06-25
# Registro de todas as ferramentas disponíveis, seus usos e responsáveis.

---

## Supabase

**Uso:** Banco de dados principal, CRM, memória de agentes, busca vetorial.
**Quem usa:** Todos os agentes, Claude Code, n8n.
**Projeto:** Colify (CRM XD Pro).
**Extensões ativas:** pgvector (busca semântica).
**Regra:** RLS obrigatório em tabelas com dados de leads e clientes.

---

## n8n

**Uso:** Orquestração de workflows — roteamento, enriquecimento, chamadas de agentes, persistência.
**Quem usa:** Ponto central que conecta todos os outros componentes.
**Instância:** VPS própria.
**Versão:** 2.15.1.
**Regra:** Toda lógica de negócio fica nos agentes (Claude). n8n é plumbing, não cérebro.

---

## Chatwoot

**Uso:** Inbox unificado de atendimento (WhatsApp, web chat).
**Quem usa:** Router Agent (entrada), SDR Agent (resposta), CRM Agent (histórico).
**Instância:** fazer.ai Pro.
**Regra:** Toda mensagem de entrada dispara webhook para n8n. Nenhuma lógica de agente roda dentro do Chatwoot.

---

## Slack

**Uso:** Notificações internas, alertas de sistema, relatórios do Analytics Agent.
**Quem usa:** Router Agent (alertas VIP), CRM Agent (mudanças de pipeline), Analytics Agent (relatórios diários), n8n (erros de workflow).
**Regra:** Slack é saída, nunca entrada. Não usar como gatilho de agentes.

---

## Telegram

**Uso:** Canal de mensagens secundário para leads ou notificações.
**Quem usa:** n8n (envio), Router Agent (entrada via webhook).
**Regra:** Mesmo padrão do Chatwoot — toda mensagem entra pelo n8n.

---

## Obsidian

**Uso:** Base de conhecimento humana — SKILL.md dos agentes, raw captures, wiki compilado, contexto de projetos.
**Quem usa:** Claude Code (via mcp__vault__*), agentes via n8n HTTP node (leitura de SKILL.md).
**Vault:** `C:\Users\alexa\OneDrive\Documentos\CLAUDE CODE\obsidian-vault\`
**Regra:** Dados de leads e clientes nunca entram no vault — ficam no Supabase. Obsidian é para conhecimento estrutural, não operacional.

---

## Claude API (Anthropic)

**Uso:** Motor de inteligência de todos os agentes OpenClaw.
**Quem usa:** n8n via HTTP node (POST /v1/messages).
**Modelo padrão:** claude-sonnet-4-6 para agentes operacionais; claude-opus-4-8 para tarefas de análise profunda.
**Regra:** Nunca hardcodar API key — usar variável de ambiente `ANTHROPIC_API_KEY` no n8n.

---

## Meta Ads (Facebook Ads Manager)

**Uso:** Gestão de campanhas pagas para Piccolo Bambino e outros clientes.
**Quem usa:** Marketing Agent, Claude Code (via MCP claude_ai_facebook).
**Conta:** act=365853568158684 / business_id=209589424281107.
**Regra:** Nunca alterar campanhas ativas automaticamente — apenas propor mudanças para aprovação humana.

---

## Bling

**Uso:** ERP e emissão de boletos para Piccolo Bambino.
**Quem usa:** Integrações manuais hoje; candidato a integração n8n futura.
**Regra:** Integração ainda não automatizada. Qualquer automação proposta deve passar pela CHANGE_POLICY.md.

---

## CPlug

**Uso:** Processamento de pagamentos para Piccolo Bambino.
**Quem usa:** Piccolo Bambino (operacional).
**Regra:** Dados de pagamento nunca transitam por agentes de IA — tratamento direto pelo sistema.

---

## OpenClaw

**Uso:** Framework de persona para agentes Claude — define identidade, tom e restrições de cada agente via SKILL.md.
**Quem usa:** Todos os agentes.
**Localização:** `obsidian-vault/Agentes-Operacionais/agents/`
**Regra:** Cada agente tem exatamente um SKILL.md. Comportamento é definido no SKILL.md, nunca no workflow n8n.

---

## Ferramentas Planejadas (não ativas)

| Ferramenta | Finalidade | Status |
|------------|------------|--------|
| pgvector (Supabase) | Busca semântica de memórias | A implementar |
| Portal de Imóveis API | Dados de mercado para Research Agent | A avaliar |
| Google Analytics API | Dados de performance para Analytics Agent | A avaliar |
| WhatsApp Business API | Canal direto sem Chatwoot como intermediário | A avaliar |

> Toda nova ferramenta deve seguir o processo definido em `CHANGE_POLICY.md` antes de ser adicionada.

---

## Slack — Uso Diario Operacional

**Status em 2026-06-25:** MCP do Slack conectado no Claude Code. n8n consegue carregar `SLACK_BOT_TOKEN` por variavel de ambiente, sem token hardcoded nos workflows 08/09.

**Bot:** `hknove_ai_bot`.

**Regra operacional:** Slack deve ser usado diariamente como central de notificacoes internas, nao como cerebro nem como fonte de verdade. Decisoes e memoria ficam em Supabase/n8n/Obsidian; Slack recebe alertas, resumos e tarefas humanas.

**Canais recomendados:**
- `#n8n-errors` — falhas de workflows, timeouts, payload invalido.
- `#crm-alerts` — lead qualificado, mudanca relevante de pipeline, proposta, visita, reserva.
- `#analytics` — resumo diario automatico.
- `#overflow` — casos com baixa confianca do Router Agent ou necessidade humana.
- `#operacao-ia` — manutencao da plataforma, MCPs, agentes, auditorias.

**Pendencia atual:** o canal configurado nos workflows Slack (`C0BD26YETCZ`) retornou `not_in_channel`. O bot autentica corretamente, mas precisa ser convidado para o canal no Slack ou receber escopo adicional. Acao manual: no canal alvo, enviar `/invite @hknove_ai_bot`.
