---
tags: [checklist, implementação, n8n, chatwoot, segurança]
status: em-desenho
data: 2026-06-10
---

# Checklist de Implementação — Chatwoot + n8n + Hermes XD

## Regra de ouro

Não começar com automação respondendo cliente.

Começar em modo silencioso:

- classifica;
- pontua;
- aplica tags;
- cria nota interna;
- não envia mensagem automática.

---

## Fase 0 — Preparação

- [x] Confirmar URL do Chatwoot: `https://chatwoot.alexandreborges.site/`.
- [x] Confirmar conta/account ID do Chatwoot: `1`.
- [x] Criar token API com permissão adequada. **Não salvar token em arquivo. Usar credencial/env do n8n.**
- [x] Identificar `ALEXANDRE_AGENT_ID`: `1` — Alexandre Souza.
- [x] Identificar inbox WhatsApp correto: `2` — Fone Escritorio HK9 / Channel::Whatsapp / Baileys / +5547988695350.
- [x] Confirmar URL pública do n8n: `https://n8n.alexandreborges.site`.
- [ ] Criar credenciais no n8n sem expor token em node.

---

## Fase 1 — Estrutura no Chatwoot

- [x] Criar labels de etapa.
- [x] Criar labels de temperatura.
- [x] Criar labels de produto.
- [x] Criar labels de perfil.
- [x] Criar labels de gatilho.
- [ ] Criar labels de follow-up/nutrição.
- [x] Criar custom attributes da conversa:
  - [x] `funil_etapa`
  - [x] `lead_score`
  - [x] `lead_temperatura`
  - [x] `produto_interesse`
  - [x] `perfil_lead`
  - [x] `gatilho_quente`
  - [x] `responsavel_sugerido`
  - [x] `proxima_acao`
  - [x] `ultimo_resumo_hermes`
  - [x] `ultima_classificacao_em`

---

## Fase 2 — Webhook Chatwoot → n8n

- [x] Criar template importável do workflow n8n silencioso: `workflow-chatwoot-hermes-silent-v0.json`.
- [x] Criar guia de instalação/teste: [[Guia-Instalar-Workflow-n8n-Silent-v0]].
- [x] Criar webhook de teste no Chatwoot apontando para n8n: `[N8N] Hermes XD Silent Test` — ID `28`.
- [x] Adicionar trava no workflow: exige assinatura/timestamp Chatwoot e label `testando-agente`.
- [ ] Validar execução com conversa real marcada com `testando-agente`.
- [ ] Eventos iniciais:
  - `message_created`
  - opcional: `conversation_created`
- [ ] Testar recebimento com conversa interna.
- [ ] Validar payload recebido.
- [ ] Mapear onde vem:
  - `conversation_id`
  - `account_id`
  - `message_id`
  - `content`
  - `message_type`
  - `sender`
  - `inbox_id`

---

## Fase 3 — Workflow n8n silencioso

- [ ] Criar node Webhook.
- [ ] Criar filtro de mensagem válida.
- [ ] Criar deduplicação por `message_id`.
- [ ] Buscar conversa no Chatwoot.
- [ ] Buscar mensagens recentes.
- [ ] Enviar contexto para Hermes XD.
- [ ] Validar JSON de resposta.
- [ ] Atualizar custom attributes.
- [ ] Atualizar labels.
- [ ] Criar nota interna.
- [ ] Não enviar mensagem automática.

---

## Fase 4 — Teste com casos reais simulados

Testar mensagens:

- [ ] “Quero tabela da multipropriedade.”
- [ ] “Qual valor de entrada?”
- [ ] “Sou médico e quero sala para clínica.”
- [ ] “Tenho interesse no Lótus.”
- [ ] “Quero investir para Airbnb.”
- [ ] “Só estou curioso.”
- [ ] “Sou corretor, quero material.”

Para cada teste, conferir:

- [ ] produto correto;
- [ ] perfil correto;
- [ ] etapa correta;
- [ ] score coerente;
- [ ] tags aplicadas;
- [ ] nota interna útil;
- [ ] handoff correto para Alexandre.

---

## Fase 5 — Handoff para Alexandre

- [ ] Confirmar ID de Alexandre no Chatwoot.
- [ ] Testar atribuição automática.
- [ ] Testar nota interna de lead quente.
- [ ] Confirmar que conversa aparece corretamente para Alexandre.
- [ ] Criar label `lead_prioridade_alexandre`.

---

## Fase 6 — Respostas automáticas controladas

Só ativar depois da fase silenciosa validada.

Permitir resposta automática apenas quando:

- [ ] etapa 1–3;
- [ ] conversa sem humano atribuído;
- [ ] lead não está em negociação;
- [ ] resposta passou por compliance;
- [ ] não há pedido sensível de proposta/condição.

Bloquear resposta automática quando:

- [ ] lead pediu proposta;
- [ ] lead pediu desconto;
- [ ] lead pediu contrato;
- [ ] lead está em negociação;
- [ ] conversa foi assumida por humano;
- [ ] mensagem envolve promessa de rentabilidade/valorização/intercâmbio.

---

## Fase 7 — Follow-ups separados

Criar workflows independentes:

### Follow-up 24h

- [ ] Lead recebeu material e não respondeu.
- [ ] Enviar mensagem curta.
- [ ] Se responder, reclassificar.

### Nutrição 7 dias

- [ ] Lead morno/frio sem resposta.
- [ ] Enviar conteúdo conforme produto.

### Conteúdo 30 dias

- [ ] Reativação leve.
- [ ] Sem pressão comercial.

---

## Fase 8 — Métricas

Métricas mínimas:

- leads recebidos;
- leads classificados;
- leads quentes;
- leads assumidos por Alexandre;
- reuniões geradas;
- propostas enviadas;
- fechamentos;
- produto mais procurado;
- origem/campanha, quando disponível.

---

## Rollback simples

Se algo der errado:

- [ ] Desativar workflow n8n.
- [ ] Remover webhook do Chatwoot temporariamente.
- [ ] Manter Chatwoot funcionando normalmente.
- [ ] Não precisa alterar Docker/Coolify.

---

## Pendências antes de produção

- [ ] Token Chatwoot.
- [ ] Account ID.
- [ ] Agent ID Alexandre.
- [ ] Inbox ID WhatsApp.
- [ ] Endpoint Hermes XD/OpenBotXD.
- [ ] Decidir se Hermes responderá via OpenAI, OpenClaw session ou API própria.
