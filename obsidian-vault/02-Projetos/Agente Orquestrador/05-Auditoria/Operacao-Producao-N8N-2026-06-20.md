---
tags: [hermes, n8n, producao, vps, chatwoot, supabase, auditoria, conclusao]
status: concluido
data: 2026-06-20
---

# Operacao Producao n8n - 2026-06-20

## Resumo executivo

Em 2026-06-20 foi feita uma rodada completa de estabilizacao da VPS Hermes, limpeza controlada do n8n, separacao do Hermes gateway da rota publica, hardening do n8n e teste dos workflows principais do funil.

Resultado: o n8n ficou saudavel, com 8 workflows ativos, workflows obsoletos removidos com backup previo, proxy publico recuperado, webhooks principais testados e funil principal validado de `01` a `05`.

## Estado final

| Item | Resultado |
|---|---|
| VPS | SSH funcional, swap ativa, apps acessiveis |
| Coolify proxy | Recuperado e healthy |
| n8n | Healthy, baixo consumo, 8 workflows ativos |
| Hermes gateway | Ativo sem rota publica e sem porta publica |
| Chatwoot | Acessivel e recebendo contatos/conversas de teste |
| Supabase | Recebendo leads de teste |
| Webhooks antigos | Alias `crm-step-sync` adicionado ao workflow correto |
| Workflows temporarios | Removidos apos teste |

## Backups criados

| Tipo | Caminho |
|---|---|
| Backup completo antes da limpeza | `/tmp/hermes-n8n-backup-20260620-195835/workflows` |
| Backup final dos workflows | `/tmp/hermes-n8n-final-20260620-212918/workflows` |
| Backup Hermes compose antes de remover dominio | `/data/coolify/services/wsi435ei67jxqlp7lvd6ir33/docker-compose.yml.bak-disable-hermes-domain-20260620` |
| Backup Hermes compose antes de remover porta | `/data/coolify/services/wsi435ei67jxqlp7lvd6ir33/docker-compose.yml.bak-remove-hermes-port-20260620b` |
| Backup n8n compose proxy hops | `/data/coolify/services/b88g7p9iwbs4e8zknw55aosj/docker-compose.yml.bak-n8n-proxy-hops-20260620` |
| Backup n8n compose prune | `/data/coolify/services/b88g7p9iwbs4e8zknw55aosj/docker-compose.yml.bak-n8n-execution-prune-20260620` |
| Backup workflow 03 antes de correcao | `/tmp/wf-03-hermes-before-info-fix-20260620-222203.json` |
| Backup workflow 05 antes de correcao | `/tmp/wf-05-escalar-before-fix-20260620-222018.json` |

## Limpeza n8n

- Exportados 43 workflows antes da limpeza.
- Removidos 23 workflows inativos/obsoletos: arquivos arquivados, TMP, testes de pagina, duplicatas, `reserva` antigo e versoes stale.
- Preservados sub-workflows inativos que ainda funcionam como ferramentas do Hermes:
  - `05. Agendar Visita`
  - `02. Informacoes do Empreendimento`
  - `02b. Simular ROI`
  - `03. Enviar Proposta`
  - `04. Verificar Disponibilidade`
  - `06. Cancelar Interesse`
  - `09. Gerar Reserva`

## Correcoes aplicadas

### Proxy e disponibilidade

- `coolify-proxy` estava parado; foi iniciado por Docker Compose em `/data/coolify/proxy`.
- `n8n.alexandreborges.site` e `chatwoot.alexandreborges.site` voltaram a responder HTTP 200.
- `ERR_ERL_UNEXPECTED_X_FORWARDED_FOR` foi corrigido com `N8N_PROXY_HOPS=1` no compose do n8n.

### Retencao de execucoes n8n

Foram adicionadas variaveis de prune ao compose do n8n:

```text
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=336
EXECUTIONS_DATA_PRUNE_MAX_COUNT=5000
```

Objetivo: reduzir crescimento do banco de execucoes e evitar pressao futura na VPS.

### Hermes gateway

- `hermes.alexandreborges.site` foi removido da exposicao publica.
- `traefik.enable=false` no compose do Hermes.
- Porta publica `8642:8642` removida.
- Hermes segue ativo via gateway, sem rota publica direta.

### Workflow 02 - Sync Chatwoot CRM

- Adicionado alias webhook `crm-step-sync` ao workflow `02 - Sync Chatwoot CRM`.
- Endpoint antigo agora responde 200 e usa o mesmo processamento de `chatwoot-crm-sync`.
- Corrigiu logs repetidos de `unknown webhook`.

### Workflow 03 - Hermes SDR

- Corrigido node `Info`:
  - `agente_pode_responder` usava `.conversation` em vez de `$json.conversation`.
  - referencias a anexos foram protegidas para nao quebrar mensagens de texto sem anexo.
- Workflow publicado e n8n reiniciado.

### Workflow 05 - Escalar Alexandre

- Corrigido JavaScript quebrado no node `Preparar contexto`:
  - strings sem aspas;
  - timezone sem aspas;
  - labels sem aspas;
  - referencia `$('Gatilho')` corrigida.
- Workflow publicado e n8n reiniciado.

## Workflows ativos finais

| ID | Nome | Status |
|---|---|---|
| `NdyImJFEz8NNuGxx` | `01 - Captura Lotus` | ativo e testado |
| `KJeGDPpQOKWtjF7H` | `01.1 - Captacao Spot One` | ativo e testado |
| `NHct6w0VfIZYjpX9` | `02 - Sync Chatwoot CRM` | ativo e testado |
| `HFM5h8hZE6gkzfdK` | `03 - Hermes SDR` | ativo e testado |
| `87LFS2eSGiiKEdE7` | `04 - Follow-up` | ativo e testado |
| `0TtdnliBJ4ATHO3u` | `05 - Escalar Alexandre` | ativo e testado |
| `Camv6nWUL9nvmvZC` | `03. SDR Hilton — Outbound WhatsApp` | ativo, nao faz parte do funil testado hoje |
| `FDeg0fNBt4tjJc2s` | `CRM XD PRO — Captura e IA` | ativo, nao faz parte do funil testado hoje |

## Testes executados

### 01 - Captura Lotus

- Landing: `https://alexandreborgescorretor.com.br/lotus-business/`
- Webhook: `/webhook/lotus-lead`
- Execucao n8n: `1518`, status `success`.
- Supabase lead criado: `a306f95e-9f01-4057-a393-7596a3cc38b3`.
- Chatwoot contato/conversa: contato `12265`, conversa `184`.

### 01.1 - Captacao Spot One

- Landing: `https://alexandreborgescorretor.com.br/the-spot-one`
- Webhook: `/webhook/the-spot-one-lead`
- Execucao n8n: `1517`, status `success`.
- Supabase lead criado: `89369911-4bda-451c-9f5e-0c3ea6e3daa0`.
- Chatwoot contato/conversa: contato `12266`, conversa `185`.

### 02 - Sync Chatwoot CRM

- Endpoint principal: `/webhook/chatwoot-crm-sync`
- Alias legado corrigido: `/webhook/crm-step-sync`
- Teste do alias retornou HTTP 200.
- Execucao n8n de validacao: `1529`, status `success`.

### 03 - Hermes SDR

- Testado pelo webhook registrado do Chatwoot com payload `/teste` em conversa TESTE CODEX.
- Execucao n8n: `1531`, status `success`.

### 04 - Follow-up

- Testado via workflow temporario de driver, removido apos validacao.
- Execucao n8n: `1537`, status `success`.
- Retorno: `followup_enviado`.

### 05 - Escalar Alexandre

- Testado via workflow temporario de driver, removido apos validacao.
- Execucao n8n: `1539`, status `success`.
- Retorno: `escalado_alexandre`.
- Task da conversa TESTE CODEX `184` movida para step `34`.

## Workflow temporario de teste

Foi criado o workflow temporario `CODEX TEMP - Testar 04 e 05` (`codexTempTest0405`) apenas para chamar sub-workflows `04` e `05` dentro da instancia ativa do n8n.

Motivo: `n8n execute` nao podia ser usado enquanto o Task Broker da instancia principal estava ocupando a porta `5679`.

Status final:

- Workflow temporario exportado em `/tmp/codex-temp-test-04-05-final-backup.json`.
- Workflow temporario removido do banco do n8n.
- Webhooks `codex-test-followup-0405` e `codex-test-escalar-0405` removidos.
- n8n reiniciado e validado healthy.

## Resultado final de saude

Ultima checagem apos limpeza:

| Servico | Estado |
|---|---|
| n8n | healthy, ~328.6 MiB, CPU baixa |
| Coolify proxy | healthy |
| Chatwoot | rodando |
| Browser/OpenClaw | rodando, ainda sao maiores consumidores que n8n |

Logs recentes do n8n nao mostraram:

- `unknown webhook`
- `ERR_ERL_UNEXPECTED_X_FORWARDED_FOR`
- erros novos apos a limpeza

## Pendencias conhecidas

- Aviso nao bloqueante do n8n sobre Python task runner ausente. Workflows atuais usam JS/nodes n8n, entao nao bloqueia operacao atual.
- A landing `the-spot-one` tem `fetch(' https://...')` com espaco inicial no JavaScript. O teste direto do endpoint passou, mas vale ajustar no codigo da landing para eliminar risco de navegador ou minificador tratar diferente.
- Browser/OpenClaw continuam sendo consumidores relevantes de memoria. Se a VPS voltar a travar, a proxima acao mais provavel e reduzir/parar Browser/OpenClaw quando nao estiverem em uso.

## Decisao operacional

O funil principal `01`, `01.1`, `02`, `03`, `04`, `05` esta validado em producao com payloads controlados e evidencias no n8n, Supabase e Chatwoot.

A skill local `hermes-ops` tambem foi atualizada com o estado operacional, backups, correcoes, testes e pendencias.

