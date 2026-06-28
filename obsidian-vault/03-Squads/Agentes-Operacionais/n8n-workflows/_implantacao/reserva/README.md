# Reserva de Workflows

Atualizado em: 2026-06-18

Esta pasta guarda COPIAS de artefatos que nao devem entrar no fluxo principal agora, mas que ainda podem servir como referencia, fallback ou rollback.

## Regra

Nao excluir workflows nesta fase. Primeiro deixar em reserva, testar o fluxo principal e so depois decidir arquivamento/exclusao.

## Artefatos copiados para reserva

| Arquivo em reserva | Origem | Status | Motivo |
|---|---|---|---|
| $(@{Arquivo=05-Chatwoot-Inbound-Hermes-API__RESERVA-PROTOTIPO.json; Origem=05-Chatwoot-Inbound-Hermes\05-Chatwoot-Inbound-Hermes-API.json; Status=copiado; Motivo=Prototipo com URLs placeholder; manter fora do fluxo principal ate validar endpoint real.}.Arquivo) | $(@{Arquivo=05-Chatwoot-Inbound-Hermes-API__RESERVA-PROTOTIPO.json; Origem=05-Chatwoot-Inbound-Hermes\05-Chatwoot-Inbound-Hermes-API.json; Status=copiado; Motivo=Prototipo com URLs placeholder; manter fora do fluxo principal ate validar endpoint real.}.Origem) | copiado | Prototipo com URLs placeholder; manter fora do fluxo principal ate validar endpoint real. |
| $(@{Arquivo=07-Escalar-Alexandre-Simples__RESERVA-FALLBACK.json; Origem=02-Hermes-Roteador-Leads\sub-workflows\07-Escalar-Alexandre-Simples.json; Status=copiado; Motivo=Versao simplificada; manter como fallback, fluxo principal usa versao completa.}.Arquivo) | $(@{Arquivo=07-Escalar-Alexandre-Simples__RESERVA-FALLBACK.json; Origem=02-Hermes-Roteador-Leads\sub-workflows\07-Escalar-Alexandre-Simples.json; Status=copiado; Motivo=Versao simplificada; manter como fallback, fluxo principal usa versao completa.}.Origem) | copiado | Versao simplificada; manter como fallback, fluxo principal usa versao completa. |
| $(@{Arquivo=02-Hermes-Roteador-SEMENTE-COMPLETO__RESERVA-REFERENCIA.json; Origem=02-Hermes-Roteador-Leads\02-Hermes-Roteador-SEMENTE-COMPLETO.json; Status=copiado; Motivo=Arquivo fundacional/manifesto; nao e workflow importavel completo, manter como referencia.}.Arquivo) | $(@{Arquivo=02-Hermes-Roteador-SEMENTE-COMPLETO__RESERVA-REFERENCIA.json; Origem=02-Hermes-Roteador-Leads\02-Hermes-Roteador-SEMENTE-COMPLETO.json; Status=copiado; Motivo=Arquivo fundacional/manifesto; nao e workflow importavel completo, manter como referencia.}.Origem) | copiado | Arquivo fundacional/manifesto; nao e workflow importavel completo, manter como referencia. |

## Workflows remotos sugeridos para reserva logica

Estes workflows aparecem na instancia n8n, mas nao foram arquivados/excluidos remotamente nesta etapa.

| Workflow | ID | Status | Motivo |
|---|---|---|---|
| Hermes - Chatwoot Mensagens | $(@{Workflow=Hermes - Chatwoot Mensagens; Id=yUz01KASTFVkjaAD; Status=reserva-remota-sugerida; Motivo=Workflow antigo/prototipo; inactive e unavailableInMCP.}.Id) | reserva-remota-sugerida | Workflow antigo/prototipo; inactive e unavailableInMCP. |
| Landing Lótus - Captura de Lead | $(@{Workflow=Landing Lótus - Captura de Lead; Id=a3P841iYUmbHXvO3; Status=reserva-remota-sugerida; Motivo=Workflow antigo/prototipo; comparar com fluxo atual antes de arquivar.}.Id) | reserva-remota-sugerida | Workflow antigo/prototipo; comparar com fluxo atual antes de arquivar. |

## Criterio para excluir futuramente

Excluir somente se:

1. existe backup/export salvo;
2. nao esta ativo no n8n;
3. nao e chamado por outro workflow;
4. nao aparece em campanhas, landing pages ou sub-workflows;
5. passou por auditoria de dependencia;
6. existe rollback claro.
