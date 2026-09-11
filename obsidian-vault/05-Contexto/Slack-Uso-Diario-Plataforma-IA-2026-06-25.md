---
title: Slack — Uso Diario da Plataforma de IA
type: operational-guide
created: 2026-06-25
tags:
  - slack
  - plataforma-ia
  - operacao
  - n8n
status: ativo
---

# Slack — Uso Diario da Plataforma de IA

## Objetivo

Usar o Slack como painel diario de operacao da plataforma de IA: alertas, tarefas humanas, erros e resumos. Slack nao e fonte de verdade e nao substitui n8n, Supabase ou Obsidian.

## Primeira acao obrigatoria

No canal configurado para notificacoes, convidar o bot:

```text
/invite @hknove_ai_bot
```

Motivo: em 2026-06-25, o teste de API retornou `not_in_channel`. O token autentica corretamente, mas o bot ainda nao esta dentro do canal alvo.

## Rotina diaria recomendada

### Manha

1. Abrir `#analytics` e revisar o resumo diario.
2. Abrir `#n8n-errors` e verificar se houve falha de workflow durante a noite.
3. Abrir `#crm-alerts` e priorizar leads que chegaram em proposta, visita, reserva ou handoff humano.

### Durante o dia

1. Usar `#overflow` para casos que o Router Agent nao classificou com confianca.
2. Usar `#operacao-ia` para manutencao da plataforma: MCPs, agentes, bugs, deploys, auditorias.
3. Evitar tratar decisoes finais somente no Slack. Decisoes importantes devem virar registro em Obsidian, Supabase ou workflow n8n.

### Fim do dia

1. Conferir se todos os alertas de `#n8n-errors` foram resolvidos ou registrados.
2. Conferir se todos os handoffs humanos em `#crm-alerts` tiveram responsavel.
3. Criar nota/resumo se houver mudanca estrutural no sistema.

## Canais recomendados

| Canal | Uso |
|-------|-----|
| `#n8n-errors` | Falhas, timeouts, payload invalido, credenciais quebradas |
| `#crm-alerts` | Leads importantes, mudancas de pipeline, proposta, visita, reserva |
| `#analytics` | Relatorio diario e indicadores |
| `#overflow` | Casos de baixa confianca ou necessidade humana |
| `#operacao-ia` | Plataforma, agentes, MCPs, auditoria, governanca |

## Regras

- Slack e notificacao, nao orquestracao.
- n8n continua sendo o orquestrador principal.
- Supabase continua sendo a fonte de verdade para dados operacionais.
- Obsidian continua sendo a base humana de conhecimento.
- Nunca colar token, API key, webhook secreto ou dado sensivel de cliente em canal Slack.
- Alertas automaticos devem ser curtos, com contexto suficiente e um proximo responsavel claro.

## Status tecnico em 2026-06-25

- MCP Slack no Claude Code: conectado.
- n8n MCP: configurado, mas ainda falhando conexao/autenticacao.
- Workflows n8n Slack `08` e `09`: saneados e mantidos inativos.
- Token Slack removido dos workflows e movido para `SLACK_BOT_TOKEN` no ambiente do n8n.
- Pendencia: convidar `@hknove_ai_bot` para o canal configurado ou ajustar o canal/escopos.
