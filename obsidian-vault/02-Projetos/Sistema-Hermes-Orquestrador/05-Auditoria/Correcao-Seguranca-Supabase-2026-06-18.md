---
tags: [hermes, n8n, seguranca, supabase, credenciais]
status: aplicado
data: 2026-06-18
---

# Correcao Seguranca Supabase - 2026-06-18

## Objetivo

Remover headers sensiveis hardcoded do workflow ativo de sync Chatwoot -> Supabase/CRM.

## Workflow alterado

| Campo | Valor |
|---|---|
| Workflow ID | `NHct6w0VfIZYjpX9` |
| Nome | `CRM Sync — Chatwoot → CRM XD PRO` |
| Nova versao ativa | `7cd13153-0d82-4b40-a8af-217f1e2091af` |
| Node count | 7 |
| Status | Publicado |

## Alteracao aplicada

Antes, os nodes `Buscar Lead` e `Atualizar Status CRM` tinham `apikey` e `Authorization` com a chave Supabase literal.

Agora usam variavel n8n:

```text
apikey: ={{ $vars.SUPABASE_ANON_KEY }}
Authorization: ={{ "Bearer " + $vars.SUPABASE_ANON_KEY }}
```

## Validacao

- `validate_workflow`: valido.
- Warnings de `HARDCODED_CREDENTIALS`: removidos.
- Confirmacao remota: workflow ativo usa `$vars.SUPABASE_ANON_KEY`.
- Confirmacao remota: token Supabase literal antigo nao aparece mais na versao ativa.
- `Responder 200` continua presente.

## Requisito operacional

A variavel `SUPABASE_ANON_KEY` precisa existir em:

```text
n8n -> Settings -> Variables -> SUPABASE_ANON_KEY
```

Se a variavel nao existir ou estiver vazia, o sync vai responder webhook, mas as chamadas Supabase podem falhar por autenticacao.

## Proxima verificacao recomendada

Executar teste real do webhook `chatwoot-crm-sync` com payload de mudanca de step do Chatwoot e confirmar:

1. resposta HTTP 200;
2. busca do lead por `whatsapp`;
3. atualizacao do campo `status` no Supabase;
4. ausencia de erro de autenticacao Supabase.
