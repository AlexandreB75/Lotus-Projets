---
tags: [hermes, n8n, aplicacao-remota, p0, concluido]
status: concluido
data: 2026-06-18
---

# Aplicacao Remota n8n - 2026-06-18

## Objetivo

Aplicar na instancia ativa `n8n.alexandreborges.site` as correcoes P0 da auditoria:

1. Remover dependencia de `testando-agente` no Hermes.
2. Adicionar `Respond to Webhook` no sync Chatwoot -> Supabase/CRM.

## Resultado final

Status: CONCLUIDO.

## 1. Hermes - Agente ativado?

Workflow verificado:

| Campo | Valor |
|---|---|
| Workflow ID | `HFM5h8hZE6gkzfdK` |
| Nome | `01. Hermes XD — SDR HK Nove` |
| Workflow ativo | `false` no momento da verificacao |
| Node | `Agente ativado?` |
| Contem `testando-agente` | Nao |
| Contem `agente-off` | Sim |

Regra confirmada na instancia:

```text
$json.etiquetas notContains agente-off
```

Conclusao: o bug P0 do `testando-agente` ja nao estava presente no workflow real da instancia. Nao foi necessario reconstruir o Hermes.

## 2. Sync Chatwoot -> Supabase/CRM - Respond to Webhook

Workflow atualizado e publicado:

| Campo | Valor |
|---|---|
| Workflow ID | `NHct6w0VfIZYjpX9` |
| Nome | `CRM Sync — Chatwoot → CRM XD PRO` |
| Ativo | Sim |
| Nova versao publicada | `5968ea8d-edc0-4999-affd-ba9d84be6d27` |
| Node count | 7 |
| Node adicionado | `Responder 200` |
| Tipo | `n8n-nodes-base.respondToWebhook` |
| Webhook responseMode | `responseNode` |
| Conexoes para responder | Sim |

Fluxo corrigido:

```text
Receber Chatwoot
  -> Extrair Dados
  -> Step valido?
      true -> Buscar Lead -> Lead existe?
          true -> Atualizar Status CRM -> Responder 200
          false -> Responder 200
      false -> Responder 200
```

Resposta configurada:

```json
{
  "ok": true,
  "workflow": "04-Sync-Chatwoot-Supabase",
  "message": "Evento recebido"
}
```

## Observacoes tecnicas

- A API REST do n8n continuou retornando `401`; a aplicacao foi feita pelo MCP oficial do n8n.
- A ferramenta `update_workflow` cria nova versao; foi necessario executar `publish_workflow` para que a versao ativa passasse a usar o `Responder 200`.
- A validacao MCP apontou warnings ja conhecidos da auditoria: headers sensiveis hardcoded nos HTTP Requests Supabase. Isso permanece como proxima etapa de seguranca.

## Pendencias restantes

- Migrar `apikey` e `Authorization` Supabase para credenciais/variaveis do n8n.
- Testar o webhook `chatwoot-crm-sync` com payload real do Chatwoot.
- Verificar se o workflow Hermes deve ser publicado/ativado posteriormente, pois estava `active=false` na verificacao.
