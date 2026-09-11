---
tags: [hermes, auditoria, modelo, governanca, n8n, fazer-ai]
status: modelo-estrutural
data: 2026-06-18
---

# Modelo de Auditoria Estrutural - Sistema Hermes

## Principio

Antes de alterar workflows, ativar automacoes ou corrigir bugs em producao, o Sistema Hermes deve passar por uma auditoria estrutural. A auditoria separa diagnostico de execucao: primeiro entender, classificar e priorizar; depois agir com plano e criterio de rollback.

## Objetivo da auditoria

Avaliar se os workflows, agentes, integracoes e dados do Sistema Hermes estao prontos para operar de forma confiavel entre landing pages, n8n, Supabase, Chatwoot, Hermes SDR, CRM XD PRO, Fazer.ai e segundo cerebro.

## Escopo

| Area | O que auditar |
|---|---|
| Workflows n8n | Estrutura, gatilhos, nodes, credenciais, erros, duplicidade, importabilidade |
| Hermes Orquestrador | Prompt, roteamento, ferramentas, regras de ativacao, seguranca contra resposta indevida |
| Landing pages | Payload enviado, campos obrigatorios, webhook, origem do lead |
| Supabase | Schema, normalizacao, status, logs, deduplicacao |
| Chatwoot | Contato, conversa, inbox, labels, Kanban, responsavel, eventos inbound |
| CRM XD PRO | Lead intake, funil, steps, payloads, sync bidirecional quando existir |
| Fazer.ai | Nodes nativos disponiveis, automacoes ja prontas, oportunidades de substituir HTTP manual |
| OpenClaw/Obsidian | Memoria operacional, scripts, objecoes, aprendizados, documentacao viva |
| Seguranca | Tokens hardcoded, webhooks publicos, permissao de service keys, vazamento de payload |
| Observabilidade | Logs, retries, status de execucao, alertas, motivo de falha |

## Evidencias obrigatorias

Cada ponto auditado deve citar pelo menos uma evidencia:

- arquivo analisado;
- node/workflow envolvido;
- endpoint ou webhook, sem expor segredo;
- payload esperado;
- status atual;
- risco;
- decisao recomendada.

## Classificacao de status

| Status | Significado |
|---|---|
| `OK` | Pode seguir sem alteracao imediata |
| `ATENCAO` | Funciona, mas tem risco ou dependencia nao validada |
| `CRITICO` | Pode quebrar producao, ignorar leads, duplicar dados ou expor segredo |
| `PENDENTE` | Falta evidencia para concluir |
| `NAO-USAR-AINDA` | Deve ficar bloqueado ate correcao/teste |

## Classificacao de prioridade

| Prioridade | Criterio |
|---|---|
| P0 | Corrigir antes de qualquer lead real |
| P1 | Corrigir antes de escalar volume |
| P2 | Corrigir para melhorar robustez |
| P3 | Melhorias futuras |

## Matriz de decisao: n8n vs Fazer.ai vs codigo proprio

| Caso | Preferencia |
|---|---|
| Existe node nativo confiavel no Fazer.ai | Usar Fazer.ai se reduzir HTTP manual e manutencao |
| Existe node nativo no n8n ja configurado | Usar n8n para manter orquestracao central |
| Precisa de logica customizada curta | Code node no n8n, bem documentado |
| Precisa de regra critica/reutilizavel | API/servico proprio ou modulo do CRM XD PRO |
| Precisa de memoria e decisao IA | Hermes + base operacional documentada |

## Criterios para usar nodes nativos do Fazer.ai

Usar nodes nativos do Fazer.ai quando:

- ja existir conector pronto para a ferramenta;
- o node reduzir tokens hardcoded ou HTTP manual;
- o payload ficar mais padronizado;
- houver ganho de velocidade sem perder logs;
- a automacao puder ser monitorada e reproduzida;
- o node permitir credenciais seguras;
- a dependencia nao criar caixa-preta dificil de auditar.

Nao usar ainda quando:

- o node nao expuser erro detalhado;
- a automacao ficar fora do mapa central;
- nao houver controle claro de retry;
- o fluxo precisar de estado transacional forte;
- o conector exigir segredo fora do cofre correto.

## Template de item auditado

```text
ID:
Area:
Workflow/arquivo:
Node/etapa:
Objetivo:
Entrada:
Saida:
Ferramentas envolvidas:
Status:
Prioridade:
Evidencia:
Risco:
Recomendacao:
Plano de correcao:
Teste de validacao:
Rollback:
Responsavel:
```

## Gates antes de execucao

Nenhuma acao tecnica deve ser executada sem passar por estes gates:

1. Inventario atualizado.
2. Risco classificado.
3. Dependencias conhecidas.
4. Segredos protegidos.
5. Teste definido.
6. Rollback definido.
7. Decisao registrada no relatorio.

## Saidas da auditoria

- Relatorio executivo.
- Lista de riscos P0/P1.
- Mapa de workflows reutilizaveis.
- Mapa de workflows bloqueados.
- Recomendacao n8n/Fazer.ai/codigo proprio por integracao.
- Plano de execucao por fase.
