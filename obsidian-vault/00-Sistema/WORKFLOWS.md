# WORKFLOWS.md — Fluxos do n8n
# v1.0 — 2026-06-25
# Mapa dos workflows principais do ecossistema.
# Detalhes de implementação ficam no n8n — este arquivo documenta a lógica e as responsabilidades.

---

## Convenções

- Todo workflow começa com um **trigger** e termina com uma **resposta ou persistência**.
- Nenhum workflow toma decisão de negócio sozinho — decisões passam por um agente Claude.
- Todo workflow escreve resultado no Supabase antes de encerrar.
- Erros são capturados, logados em `workflow_runs` e notificados no Slack `#n8n-errors`.

---

## WF-01 — Inbound Lead (entrada de lead novo)

**Trigger:** Webhook do Chatwoot (nova mensagem de contato desconhecido)

```
[Chatwoot webhook]
  → [Buscar contato no Supabase por phone/email]
  → [SE não existe: criar registro em contacts]
  → [Router Agent] — classifica intenção
  → [SE intent = "sdr"] → WF-02 (SDR Outreach)
  → [SE intent = "support"] → WF-05 (Support)
  → [SE intent = "unknown"] → Notificar Slack + aguardar humano
  → [Salvar em workflow_runs]
```

**Responsável:** Router Agent
**Tempo esperado:** < 5 segundos

---

## WF-02 — SDR Outreach (qualificação de lead)

**Trigger:** WF-01 (roteamento) ou webhook manual

```
[Receber lead_id]
  → [Buscar últimas 5 conversas no Supabase]
  → [Buscar 10 memórias mais relevantes (pgvector)]
  → [Research Agent: dados de mercado frescos para o interesse do lead]
  → [SDR Agent] — gera resposta de qualificação
  → [Salvar mensagem em messages]
  → [CRM Agent] — extrai fatos e cria memórias
  → [Enviar resposta via Chatwoot]
  → [SE qualificado: mover pipeline no Supabase]
  → [Agendar WF-03 (Follow-up) para T+3 dias]
```

**Responsável:** SDR Agent + CRM Agent + Research Agent
**Tempo esperado:** < 15 segundos

---

## WF-03 — Follow-up Sequence (acompanhamento de lead)

**Trigger:** Schedule (roda 2x por dia) ou evento de agendamento do WF-02

```
[Buscar leads com status = "em_qualificacao" e last_contact < now() - 3 dias]
  → [Para cada lead:]
      → [Buscar histórico + memórias no Supabase]
      → [Follow-up Agent] — gera mensagem de acompanhamento personalizada
      → [Verificar: mensagem é diferente da última enviada?]
      → [Enviar via Chatwoot]
      → [Salvar em messages]
      → [Incrementar contagem de tentativas]
      → [SE tentativas >= 7 e sem resposta: mover para "cold" + notificar Slack]
```

**Responsável:** Follow-up Agent
**Frequência:** Dias 1, 3, 7, 14, 30 após primeiro contato

---

## WF-04 — CRM Update (atualização de pipeline)

**Trigger:** Evento de mudança de status no Chatwoot ou webhook manual

```
[Receber evento de mudança]
  → [Buscar conversa completa no Supabase]
  → [CRM Agent] — extrai fatos, gera resumo, decide novo estágio
  → [Atualizar contacts + conversations no Supabase]
  → [SE mudança relevante (ex: chegou em "proposta")]: notificar Slack #crm-alerts
  → [Memory Agent] — salvar novas memórias com embeddings
```

**Responsável:** CRM Agent + Memory Agent

---

## WF-05 — Support (atendimento pós-venda ou dúvidas)

**Trigger:** Router Agent (intent = "support")

```
[Receber mensagem de suporte]
  → [Buscar histórico do contato]
  → [Classificar: dúvida simples / reclamação / solicitação complexa]
  → [SE simples: responder via FAQ do Obsidian + Claude]
  → [SE complexo: criar tarefa no Slack #suporte + notificar humano responsável]
  → [Salvar interação no Supabase]
```

**Responsável:** Humano (com suporte de agente para triagem)

---

## WF-06 — Analytics Report (relatório diário)

**Trigger:** Schedule (diário às 08:00)

```
[Executar queries no Supabase:]
  — leads novos nas últimas 24h
  — leads movidos de estágio
  — taxa de erro de workflows
  — latência média dos agentes
  — campanhas com gasto acima de threshold
[Analytics Agent] — formata relatório em markdown
[Enviar para Slack #analytics]
[Arquivar em Obsidian 05-Contexto/Relatorios/YYYY-MM-DD.md]
```

**Responsável:** Analytics Agent

---

## WF-07 — Memory Write (escrita de memória assíncrona)

**Trigger:** Chamado ao final de WF-02, WF-03, WF-04

```
[Receber fatos extraídos pelo agente anterior]
  → [Memory Agent: estruturar em formato de memória]
  → [Gerar embedding via Claude API]
  → [UPSERT em agent_memories no Supabase]
  → [SE confidence < 0.75: descartar silenciosamente]
```

**Responsável:** Memory Agent
**Nota:** Workflow assíncrono — não bloqueia a resposta ao lead.

---

## WF-08 — Campaign Brief → Ads (criação de campanha)

**Trigger:** Manual (Claude Code ou Slack command)

```
[Receber brief da campanha]
  → [Marketing Agent: ler brand-profile.json]
  → [Marketing Agent: gerar copy deck por plataforma]
  → [Salvar campaign-brief.md em Obsidian]
  → [Notificar Slack #marketing com link para revisão]
  → [Aguardar aprovação humana antes de publicar no Ads Manager]
```

**Responsável:** Marketing Agent
**Regra:** Nenhum criativo vai ao ar sem aprovação humana explícita.

---

## Mapa de Dependências

```
WF-01 (Inbound)
  └→ WF-02 (SDR)
       └→ WF-03 (Follow-up)  [agendado]
       └→ WF-04 (CRM Update) [sempre após WF-02]
       └→ WF-07 (Memory)     [assíncrono]

WF-01 (Inbound)
  └→ WF-05 (Support)         [se intent = support]

Schedule diário
  └→ WF-03 (Follow-up)       [varredura de leads pendentes]
  └→ WF-06 (Analytics)       [relatório diário]
```

---

## Erros e Fallbacks

| Cenário | Comportamento |
|---------|---------------|
| Agente retorna JSON inválido | Logar erro, notificar Slack, não enviar resposta ao lead |
| Supabase indisponível | Retry 3x com backoff exponencial, depois abortar e notificar |
| Claude API timeout | Retry 2x, depois resposta padrão "Em breve retornaremos" ao lead |
| Lead envia mensagem fora do horário | Registrar no Supabase, resposta automática de horário comercial |
| Confidence do Router < 0.7 | Rotear para Slack #overflow para revisão humana |

---

## Workflows Utilitarios Reais no n8n — Slack

> Nota: esta secao registra workflows existentes hoje no n8n. Eles nao substituem necessariamente o roadmap conceitual acima; quando houver conflito de numeracao, o nome/ID real do n8n prevalece para auditoria operacional.

### n8n `08- HKNove • Slack Notify`

**ID:** `yUz01KASTFVkjaAD`  
**Status:** inativo; disponivel via MCP quando o MCP n8n estiver funcional.  
**Funcao:** modulo padrao de notificacao Slack da HKNove. Recebe dados estruturados, envia mensagem interna e valida retorno da API Slack.

**Estado apos hardening 2026-06-25:**
- token Slack removido do workflow;
- Authorization usa `SLACK_BOT_TOKEN` no ambiente do n8n;
- adicionado `continueOnFail` no HTTP Request;
- adicionado IF `Slack OK?`;
- adicionado branch `Slack Falhou`;
- descricao corrigida para refletir comportamento real.

**Pendencia:** bot `hknove_ai_bot` precisa ser convidado para o canal configurado ou o canal deve ser alterado para um canal onde o bot ja seja membro.

### n8n `09- HKNove • Slack Notify Test`

**ID:** `9NKwztKcynYIbETj`  
**Status:** inativo; teste manual.  
**Funcao:** validar envio de mensagem Slack pelo n8n.

**Estado apos hardening 2026-06-25:**
- token Slack removido do workflow;
- body do HTTP Request passou a usar os dados montados no node anterior;
- adicionado `continueOnFail`;
- branch de falha preservado/criado.

**Regra:** manter como teste ou arquivar depois que `08- HKNove • Slack Notify` estiver validado em canal real.
