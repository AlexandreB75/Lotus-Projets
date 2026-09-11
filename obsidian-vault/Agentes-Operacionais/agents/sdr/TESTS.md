# SDR Agent — TESTS.md
# v1.0 — 2026-06-25

---

## Métricas de Sucesso

| Métrica | Alvo |
|---------|------|
| Qualificação correta (stage) | >= 90% |
| Extração de memória com precision >= 0.75 | >= 85% |
| Falso escalate_human por mensagem inocente | <= 2% |
| Violação da regra "nunca prometer" | 0% |
| JSON parse error | 0% |
| Mensagem com mais de 3 parágrafos | 0% |
| Mais de 1 pergunta por turno | 0% |
| Latência (resposta gerada) | <= 5s |

---

## Grupo 1 — Happy Path: Qualificação Completa

### SD-01: Lead novo inicia conversa no WhatsApp

**Input:**
```json
{
  "lead_id": "lead-001",
  "channel": "whatsapp",
  "message": "Oi, vi um anúncio de apartamento e quero saber mais",
  "contact": { "name": null, "phone": "+5511999999001", "stage": "novo" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": { "min_budget": 300000 } }
}
```

**Esperado:**
- `qualification_update.stage` = `"em_qualificacao"`
- `response_text` contém acolhimento + uma pergunta sobre necessidade
- `suggested_action` = `"continue"`
- `memories_to_save` = `[]` (turno 1, sem dados concretos ainda)
- Máximo 3 parágrafos em `response_text`
- Exatamente 1 ponto de interrogação em `response_text`

---

### SD-02: Lead fornece interesse e localização (turno 2)

**Input:**
```json
{
  "lead_id": "lead-002",
  "channel": "whatsapp",
  "message": "Quero um apê de 3 quartos na Mooca, perto do metrô",
  "contact": { "name": "Carlos", "phone": "+5511999999002", "stage": "em_qualificacao" },
  "conversation_history": [
    { "role": "agent", "content": "Olá! O que você está buscando?" },
    { "role": "user", "content": "Quero um apê de 3 quartos na Mooca, perto do metrô" }
  ],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:05:00Z", "enrichment_data": { "min_budget": 300000 } }
}
```

**Esperado:**
- `qualification_update.property_type` = `"apartamento 3 quartos"`
- `qualification_update.location` = `"Mooca"` ou similar
- `memories_to_save` inclui entrada com `type: "preference"` e `confidence >= 0.85`
- `response_text` usa o nome "Carlos"
- Pergunta no response_text é sobre prazo ou budget (próxima dimensão BANT)

---

### SD-03: Lead completa 3 dimensões → stage qualificado

**Input:**
```json
{
  "lead_id": "lead-003",
  "channel": "whatsapp",
  "message": "Tenho uns 700 mil disponíveis e quero comprar até o final do ano",
  "contact": { "name": "Ana", "phone": "+5511999999003", "stage": "em_qualificacao" },
  "conversation_history": [
    { "role": "user", "content": "apartamento 2 dormitórios no Brooklin" },
    { "role": "agent", "content": "Ótimo! Você tem alguma ideia de prazo?" }
  ],
  "memories": [
    { "type": "preference", "content": "apartamento 2 dormitórios", "confidence": 0.90 },
    { "type": "interest", "content": "região Brooklin", "confidence": 0.92 }
  ],
  "market_context": { "date": "2026-06-25T10:10:00Z", "enrichment_data": { "min_budget": 300000 } }
}
```

**Esperado:**
- `qualification_update.stage` = `"qualificado"`
- `qualification_update.budget` contém "700k" ou "R$ 700.000" ou similar
- `qualification_update.timeline` contém referência a "final do ano" ou "dezembro"
- `suggested_action` = `"escalate_vip"` OU `"update_crm"` — depende da implementação, mas nunca `"continue"` com 3+ dimensões sem encaminhar
- `memories_to_save` inclui budget e timeline com `confidence >= 0.85`

---

### SD-04: Lead com nome extraído da mensagem

**Input:**
```json
{
  "lead_id": "lead-004",
  "channel": "web",
  "message": "Olá, meu nome é Roberto, estou procurando uma casa com quintal",
  "contact": { "name": null, "phone": null, "stage": "novo" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": { "min_budget": 300000 } }
}
```

**Esperado:**
- `response_text` usa "Roberto" no próximo turno
- `memories_to_save` inclui `{ "type": "fact", "content": "nome: Roberto", "confidence": >= 0.95 }` OU nome registrado em qualification_update
- `qualification_update.property_type` contém "casa" ou "casa com quintal"

---

## Grupo 2 — Escalações

### SD-05: Escalação VIP por budget alto

**Input:**
```json
{
  "lead_id": "lead-005",
  "channel": "whatsapp",
  "message": "Tenho 3 milhões para investir, quero ver coberturas em Moema",
  "contact": { "name": "Ricardo", "phone": "+5511999999005", "stage": "novo" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": { "min_budget": 300000 } }
}
```

**Esperado:**
- `suggested_action` = `"escalate_vip"`
- `escalation_reason` contém referência ao budget acima de R$ 2M
- `qualification_update.budget` contém "3 milhões" ou similar
- `response_text` confirma recebimento e informa que especialista vai contatar

---

### SD-06: Escalação human por pedido explícito

**Input:**
```json
{
  "lead_id": "lead-006",
  "channel": "whatsapp",
  "message": "Para de me mandar mensagem automática, quero falar com um humano",
  "contact": { "name": null, "phone": "+5511999999006", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `suggested_action` = `"escalate_human"`
- `escalation_reason` contém "pedido explícito" ou similar
- `response_text` é empático, não defensivo, confirma que pessoa vai atender

---

### SD-07: Escalação por pergunta técnica/jurídica

**Input:**
```json
{
  "lead_id": "lead-007",
  "channel": "whatsapp",
  "message": "Meu apartamento está em inventário, consigo financiar mesmo assim?",
  "contact": { "name": "Paula", "phone": "+5511999999007", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `suggested_action` = `"escalate_human"`
- `escalation_reason` menciona "jurídico" ou "inventário" ou "situação sensível"
- Proibido: `response_text` NÃO pode dar resposta sobre viabilidade jurídica

---

## Grupo 3 — Desqualificação

### SD-08: Budget explicitamente abaixo do mínimo

**Input:**
```json
{
  "lead_id": "lead-008",
  "channel": "whatsapp",
  "message": "Estou procurando apartamentos de 100 a 150 mil reais",
  "contact": { "name": null, "phone": "+5511999999008", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": { "min_budget": 300000 } }
}
```

**Esperado:**
- `suggested_action` = `"mark_disqualified"`
- `qualification_update.stage` = `"desqualificado"`
- `response_text` é respeitoso, não envergonha o lead
- Proibido: `response_text` não promete "talvez encontremos algo" sem base real

---

### SD-09: Timeline muito longo sem flexibilidade

**Input:**
```json
{
  "lead_id": "lead-009",
  "channel": "web",
  "message": "Só vou comprar daqui a uns 3 anos, por enquanto estou pesquisando",
  "contact": { "name": "Fabio", "phone": "+5511999999009", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `qualification_update.stage` = `"desqualificado"` OU `"em_qualificacao"` com `suggested_action = "schedule_followup"` e `followup_delay_days >= 540`
- Se schedule_followup: `followup_delay_days` deve refletir ~2,5 anos
- Proibido: iniciar processo de qualificação ativo com esse lead

---

## Grupo 4 — Regras de Comunicação

### SD-10: Proibição de promessa de preço

**Input:**
```json
{
  "lead_id": "lead-010",
  "channel": "whatsapp",
  "message": "Quanto custa um apartamento de 3 quartos na Saúde?",
  "contact": { "name": "Marcos", "phone": "+5511999999010", "stage": "novo" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `response_text` NÃO contém valores específicos como "custa R$ X" ou "a partir de R$ X"
- `response_text` explica que depende de características e redireciona para entender necessidade
- `suggested_action` = `"continue"`

---

### SD-11: Regra de uma pergunta por turno

**Input (qualquer turno):**
```json
{
  "lead_id": "lead-011",
  "channel": "whatsapp",
  "message": "Estou procurando um apartamento",
  "contact": { "name": null, "phone": "+5511999999011", "stage": "novo" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `response_text` contém exatamente 1 ponto de interrogação ("?")
- Máximo 3 parágrafos

---

### SD-12: Limite de parágrafos

**Input (contexto longo):**
```json
{
  "lead_id": "lead-012",
  "channel": "web",
  "message": "Pode me explicar como funciona o processo de compra de imóvel financiado pela Caixa?",
  "contact": { "name": "Leticia", "phone": "+5511999999012", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `response_text` contém no máximo 3 parágrafos
- Se o agente precisar explicar processo, direciona para especialista ao invés de dar aula

---

## Grupo 5 — Memórias e Contexto

### SD-13: Contexto implícito de memórias injetadas

**Input:**
```json
{
  "lead_id": "lead-013",
  "channel": "whatsapp",
  "message": "Você tem alguma novidade?",
  "contact": { "name": "Julia", "phone": "+5511999999013", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [
    { "type": "preference", "content": "apartamento 2 quartos", "confidence": 0.90 },
    { "type": "interest", "content": "região Pinheiros", "confidence": 0.88 },
    { "type": "fact", "content": "budget até R$ 600k", "confidence": 0.85 }
  ],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- `response_text` reflete conhecimento das preferências ("vou verificar opções de 2 quartos em Pinheiros na sua faixa")
- Proibido: `response_text` NÃO diz "eu me lembro que você mencionou" ou "de acordo com minha memória"
- Proibido: `response_text` NÃO pergunta novamente preferências que já estão nas memórias

---

### SD-14: Memória com confidence abaixo de 0.80 não é salva

**Input:**
```json
{
  "lead_id": "lead-014",
  "channel": "whatsapp",
  "message": "Talvez eu queira uma garagem, não sei...",
  "contact": { "name": "Bruno", "phone": "+5511999999014", "stage": "em_qualificacao" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Esperado:**
- Se `memories_to_save` incluir garagem, `confidence < 0.80`
- O campo `confidence` deve ser < 0.80 para uma declaração incerta como essa
- Ou `memories_to_save = []` (igualmente válido se o agente julgar irrelevante)

---

## Grupo 6 — Falhas Conhecidas

### SD-15: Ambiguidade de domínio (imóvel vs bebê)

**Input:**
```json
{
  "lead_id": "lead-015",
  "channel": "whatsapp",
  "message": "Quero ver opções de berço e carrinho",
  "contact": { "name": null, "phone": "+5511999999015", "stage": "novo" },
  "conversation_history": [],
  "memories": [],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Comportamento atual:** O SDR Agent opera no contexto imobiliário por padrão. Mensagem de bebê chegando aqui indica roteamento incorreto pelo Router.

**Ação esperada:**
- `suggested_action` = `"escalate_human"`
- `escalation_reason` contém "fora do domínio" ou similar
- Proibido: responder como se fosse uma loja de bebê

---

### SD-16: Follow-up em lead que não respondeu

**Input:**
```json
{
  "lead_id": "lead-016",
  "channel": "whatsapp",
  "message": "[follow_up_trigger]",
  "contact": { "name": "Sandra", "phone": "+5511999999016", "stage": "em_qualificacao" },
  "conversation_history": [
    { "role": "agent", "content": "Olá Sandra! Você ainda está procurando imóvel?" }
  ],
  "memories": [
    { "type": "preference", "content": "apartamento 3 quartos", "confidence": 0.85 }
  ],
  "market_context": { "date": "2026-06-25T10:00:00Z", "enrichment_data": {} }
}
```

**Comportamento atual:** Trigger de follow-up não é um formato de mensagem natural. O agente pode gerar resposta inconsistente.

**Mitigação:** n8n deve injetar a mensagem de follow-up como um texto natural ("Olá! Vi que você estava interessada em apartamentos de 3 quartos...") antes de chamar o agente.

---

## Critérios de Aprovação para Produção

- [ ] SD-01 a SD-09: 100% de acerto em `stage` e `suggested_action`
- [ ] SD-10: Zero violações da regra "nunca prometer preço"
- [ ] SD-11: Zero respostas com mais de 1 ponto de interrogação
- [ ] SD-12: Zero respostas com mais de 3 parágrafos
- [ ] SD-13: Contexto implícito funcionando sem anunciar memória
- [ ] SD-14: Nenhuma memória com confidence incorreta salva
- [ ] SD-15: Fora-do-domínio sempre escalado, nunca respondido
- [ ] Métricas globais acima dos alvos definidos na tabela inicial
