# Workflows Ajustados para Producao

Atualizado em: 2026-06-18

Esta pasta guarda COPIAS dos artefatos ajustados/verificados. Os originais permanecem nas pastas de origem para preservar historico e referencias.

## Ajustados/verificados

| Arquivo | Workflow n8n | Status |
|---|---|---|
| `04-Sync-Chatwoot-Supabase__AJUSTADO.json` | `NHct6w0VfIZYjpX9` / `CRM Sync — Chatwoot → CRM XD PRO` | Aplicado e publicado na instancia n8n |
| `02-Hermes-Roteador-Leads__VERIFICADO.json` | `HFM5h8hZE6gkzfdK` / `01. Hermes XD — SDR HK Nove` | Verificado: sem `testando-agente`, com `agente-off` |
| `02-Hermes-Roteador-SEMENTE-COMPLETO__CORRIGIDO-MODELO.json` | Manifesto fundacional Hermes | Modelo local corrigido |

## Confirmacoes n8n

- Sync publicado com activeVersionId `7cd13153-0d82-4b40-a8af-217f1e2091af`.
- Sync contem node `Responder 200`.
- Sync usa `responseMode: responseNode`.
- Sync usa `$vars.SUPABASE_ANON_KEY` em vez de chave Supabase literal.
- Hermes `Agente ativado?` usa `notContains agente-off` e nao contem `testando-agente`.

## Regra

Tudo nesta pasta e candidato a fluxo principal. Nao apagar originais sem auditoria posterior.
