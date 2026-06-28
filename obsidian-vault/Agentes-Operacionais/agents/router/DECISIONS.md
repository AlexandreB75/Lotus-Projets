# Router Agent — DECISIONS.md
# v1.1 — 2026-06-25
# Changelog v1.1: ADR-02 threshold 0.75→0.80 | ADR-03 api como origem permitida | ADR-04 spam→SLACK_OVERFLOW

---

## ADR-01 — Router é stateless (sem acesso direto ao Supabase)

**Status:** Aprovado

**Contexto:**
O Router precisa de informações sobre o contato (existe? qual estágio?) para classificar corretamente. A questão é: quem consulta o Supabase — o Router ou o n8n?

**Opções consideradas:**

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| A | Router consulta Supabase diretamente via tool_use | Router tem dados frescos | Acoplamento forte, latência extra, custos de tool_use |
| B | n8n consulta Supabase e injeta no input do Router | Router focado em classificação | Dados podem estar desatualizados se n8n falhar na query |

**Decisão:** Opção B — n8n injeta contexto, Router é stateless.

**Justificativa:**
O Router é um classificador de linguagem natural, não um agente de dados. Misturar responsabilidades aumenta complexidade e custo. Se o n8n falhar na query do Supabase, `contact_exists` será `false` e o Router roteará como `sdr` — comportamento degradado mas seguro.

**Consequências:**
- n8n deve sempre fazer a query antes de chamar o Router
- Router não pode ter certeza de 100% sobre o estado do contato
- Simplificação significativa do SKILL.md e do custo por chamada

---

## ADR-02 — Threshold de confidence em 0.80

**Status:** Aprovado — revisado em 2026-06-25

**Contexto:**
Qual o threshold mínimo de confidence para rotear uma mensagem? Um threshold muito alto aumenta falsos `unknown`. Um threshold muito baixo aumenta roteamentos errados.

**Opções consideradas:**

| Threshold | Falsos unknown esperados | Roteamentos errados esperados |
|-----------|--------------------------|-------------------------------|
| 0.90 | Alto (~15%) | Baixo |
| **0.80** | **Médio (~8%)** | **Baixo** |
| 0.75 | Baixo (~5%) | Aceitável |
| 0.65 | Muito baixo (~2%) | Alto |

**Decisão:** 0.80

**Justificativa:**
Em contexto de atendimento comercial e CRM, um roteamento errado tem custo alto: lead qualificado tratado como suporte, ou follow-up enviado como sdr. É preferível ter ~8% de escalações humanas a mais do que um roteamento equivocado. A diferença entre 0.75 e 0.80 representa uma camada extra de segurança sem overhead operacional significativo.

**Consequências:**
- ~8% das mensagens vão para SLACK_OVERFLOW inicialmente (vs ~5% com 0.75)
- Humano valida os casos de unknown e retroalimenta o SKILL.md
- Revisão do threshold obrigatória após 500 mensagens processadas em produção

---

## ADR-03 — Intent `marketing` aceita canais `slack` e `api`

**Status:** Aprovado — revisado em 2026-06-25

**Contexto:**
O intent `marketing` ativa o WF-08 (Campaign Brief), um workflow interno. Ele não deve ser ativado por mensagens de leads via WhatsApp/Telegram/Web — o contexto seria ambíguo e o workflow errado.

**Decisão:**
`marketing` é classificado quando `channel = "slack"` OU `channel = "api"`. Em qualquer outro canal, mensagens com keywords de marketing são tratadas como `unknown`.

**Origens permitidas:** slack, api
**Origens bloqueadas:** whatsapp, telegram, web

**Justificativa:**
- `slack`: requisições internas de time (comportamento original)
- `api`: automações futuras que disparam briefings programaticamente (ex: campanha sazonal automática, integração com ferramentas externas). Preparar para esse caso evita reescrita do agente quando a automação for implementada.

**Consequências:**
- WhatsApp com keywords de marketing → SLACK_OVERFLOW (humano avalia)
- Quando automações via API forem criadas, já estão cobertas sem alterar o SKILL.md
- Novo canal deve ser adicionado explicitamente à lista de origens permitidas — padrão é bloquear

---

## ADR-04 — `spam` vai para SLACK_OVERFLOW com label `spam_review`

**Status:** Aprovado — revisado em 2026-06-25

**Contexto:**
A decisão original (v1.0) era descartar spam silenciosamente (DISCARD). O argumento era não sobrecarregar o time com revisão de mensagens irrelevantes.

**Problema identificado:**
DISCARD impede auditoria. Se o agente começar a classificar leads reais como spam (falso positivo), o problema seria invisível até que leads reclamassem de não ter recebido retorno — dano direto ao negócio.

**Decisão revisada:**
Spam vai para SLACK_OVERFLOW com `escalation_reason = "spam_review"`. O n8n cria uma thread dedicada no Slack com label `spam_review`. Exclusão automática após X dias (a definir na implementação do WF).

**Fluxo:**
```
spam detectado
    → SLACK_OVERFLOW (spam_review)
    → humano verifica em batch (não urgente)
    → exclusão automática após X dias sem ação
```

**Consequências:**
- Volume de spam_review deve ser monitorado — se > 5% do total, revisar critérios de detecção
- Permite retroalimentação do SKILL.md com casos de falso positivo identificados
- Custo: pequeno overhead no Slack — aceitável dado o risco eliminado

---

## ADR-05 — `routing_rationale` como campo obrigatório na saída

**Status:** Aprovado

**Contexto:**
Em versões iniciais do schema, `routing_rationale` era opcional. Sem ele, roteamentos incorretos eram impossíveis de diagnosticar.

**Decisão:**
`routing_rationale` é obrigatório — sempre uma frase curta explicando a decisão.

**Justificativa:**
Observabilidade é crítica em sistemas de agentes. É o primeiro campo que o time olha quando um roteamento é questionado.

**Consequências:**
- n8n deve salvar `routing_rationale` em `workflow_runs.metadata`

---

## ADR-06 — Escalação automática para VIP + Proposta

**Status:** Aprovado

**Contexto:**
Um lead VIP em estágio de proposta que entra em contato é o cenário de maior risco de perda.

**Decisão:**
Quando `priority = "vip"` E `contact_stage = "proposta"`, o Router força `escalate_to_human = true` independente do intent classificado.

**Justificativa:**
O custo de perder um lead VIP em proposta supera qualquer eficiência operacional.

**Consequências:**
- Volume de escalações VIP deve ser monitorado
- Se threshold de VIP for muito baixo, muitos leads serão marcados como VIP incorretamente

---

## ADR-07 — Confidence máxima é 0.99, nunca 1.0

**Status:** Aprovado

**Contexto:**
Permitir confidence = 1.0 cria risco sistêmico: o agente pode parar de questionar casos aparentemente óbvios.

**Decisão:**
Confidence máxima é 0.99. Instrução explícita no SKILL.md.

**Justificativa:**
Humildade epistêmica como invariante de sistema.

---

## ADR-08 — Conversation history: 5 mensagens (não 3)

**Status:** Aprovado — 2026-06-25

**Contexto:**
A v1.0 recomendava injetar as últimas 3 mensagens do histórico. A falha RT-15 (ambiguidade follow_up vs sdr) indicou que 3 mensagens podem ser insuficientes para distinguir continuação de nova abordagem.

**Decisão:**
n8n injeta as últimas **5 mensagens** quando `contact_exists = true`.

**Justificativa:**
5 mensagens cobrem melhor conversas com múltiplos turnos (qualificação de imóvel pode durar 4-6 mensagens). O custo adicional de tokens é marginal (~300-500 tokens extras) comparado ao benefício na precisão de classificação.

**Consequências:**
- n8n deve selecionar as últimas 5 mensagens da tabela `messages` filtradas por `conversation_id`
- Se a conversa tiver menos de 5 mensagens, injetar o que existir

---

## Revisões Futuras Programadas

| Decisão | Gatilho de Revisão |
|---------|-------------------|
| ADR-02 (threshold 0.80) | Após 500 mensagens processadas em produção |
| ADR-04 (spam_review TTL) | Definir prazo de exclusão automática na implementação do WF |
| ADR-03 (origens marketing) | Quando nova automação via API for planejada |
| Intents disponíveis | A cada novo canal ou domínio de negócio adicionado |
| Schema de saída | Se algum campo se mostrar insuficiente após 60 dias |
