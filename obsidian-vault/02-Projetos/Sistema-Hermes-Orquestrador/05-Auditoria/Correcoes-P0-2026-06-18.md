---
tags: [hermes, correcao, p0, n8n, auditoria]
status: aplicado-no-vault
data: 2026-06-18
---

# Correcoes P0 - 2026-06-18

## Escopo

Correcoes solicitadas a partir da auditoria estrutural:

1. Remover a dependencia de `testando-agente` no node `Agente ativado?` do Hermes.
2. Adicionar `Respond to Webhook` no workflow `04-Sync-Chatwoot-Supabase`.

## Correcao 1 - Hermes `testando-agente`

| Campo | Valor |
|---|---|
| Arquivo | `03-Squads/Agentes-Operacionais/n8n-workflows/02-Hermes-Roteador-Leads/02-Hermes-Roteador-SEMENTE-COMPLETO.json` |
| Status | Aplicado no manifesto/local vault |
| Condicao removida | `etiquetas contains 'testando-agente'` |
| Regra final | `etiquetas notContains 'agente-off'` |
| Observacao | O arquivo e manifesto/fundacional. Se o workflow real no n8n ainda tiver a condicao antiga, replicar manualmente na UI/API do n8n. |

### Regra operacional final

```text
O Hermes pode responder quando a conversa NAO tiver a label agente-off.
A label testando-agente nao deve ser requisito para producao.
```

## Correcao 2 - Respond to Webhook

| Campo | Valor |
|---|---|
| Arquivo | `03-Squads/Agentes-Operacionais/n8n-workflows/04-Sync-Steps-CRM/04-Sync-Chatwoot-Supabase.json` |
| Status | Aplicado no manifesto/local vault |
| Node adicionado | `Responder 200` |
| Tipo | `respondToWebhook` |
| HTTP status | `200` |
| Body | `{ ok: true, workflow: "04-Sync-Chatwoot-Supabase", message: "Evento recebido" }` |

## Validacao executada

- Os dois arquivos foram parseados com `ConvertFrom-Json` sem erro.
- O manifesto Hermes registra `regra_corrigida` e `condicao_removida`.
- O workflow Chatwoot -> Supabase registra node `Responder 200` e objeto `resposta_webhook`.

## Pendencia antes de producao

Confirmar se estes artefatos sao a fonte importada no n8n. Se a instancia `n8n.alexandreborges.site` estiver com uma versao diferente, aplicar a mesma correcao diretamente no workflow ativo.
