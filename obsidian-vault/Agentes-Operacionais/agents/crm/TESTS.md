# CRM Agent — TESTS.md
# v1.0 — 2026-06-25

---

## Métricas de Sucesso

| Métrica | Alvo |
|---------|------|
| Operações Supabase corretas (table + fields) | >= 98% |
| Transições de stage inválidas aceitas | 0% |
| Notificações Slack com urgência errada | 0% |
| Campos sobrescritos com null indevidamente | 0% |
| JSON parse error | 0% |
| Latência (output gerado) | <= 3s |

---

## Grupo 1 — Atualizações de Qualificação

### CR-01: SDR atualiza dados de qualificação sem mudar stage

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-001",
  "update_type": "qualification_data",
  "payload": {
    "budget": 700000,
    "location": "Brooklin",
    "property_type": "apartamento 2 quartos"
  },
  "current_crm_state": {
    "stage": "em_qualificacao",
    "budget": null, "timeline": null, "interest": null,
    "location": null, "property_type": null
  }
}
```

**Esperado:**
- `supabase_ops[0].table` = `"contacts"`
- `supabase_ops[0].operation` = `"update"`
- `supabase_ops[0].data` contém `budget: 700000`, `location: "Brooklin"`, `property_type: "apartamento 2 quartos"`
- `supabase_ops[0].data` contém `location_normalized: "brooklin"`, `property_type_normalized: "apartamento"`
- `supabase_ops[0].data` NÃO contém campos que não foram fornecidos (timeline, interest, interest_normalized)
- `new_stage` = `"em_qualificacao"` (sem mudança)
- `slack_notification` = `null`
- `validation_errors` = `[]`

---

### CR-02: SDR completa qualificação → stage muda para qualificado

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-002",
  "update_type": "stage_change",
  "payload": {
    "new_stage": "qualificado",
    "budget": 800000,
    "timeline": "até dezembro 2026"
  },
  "current_crm_state": {
    "stage": "em_qualificacao",
    "budget": null, "timeline": null
  }
}
```

**Esperado:**
- `new_stage` = `"qualificado"`
- `supabase_ops[0].data` contém `stage: "qualificado"`, `budget: 800000`, `timeline: "até dezembro 2026"`
- `validation_errors` = `[]`
- `slack_notification` = `null` (budget < 1.5M, sem VIP trigger)

---

### CR-03: Lead qualificado com budget VIP → notificação #vip-leads

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-003",
  "update_type": "stage_change",
  "payload": {
    "new_stage": "qualificado",
    "budget": 2500000
  },
  "current_crm_state": {
    "stage": "em_qualificacao",
    "budget": null
  }
}
```

**Esperado:**
- `new_stage` = `"qualificado"`
- `slack_notification.channel` = `"#vip-leads"`
- `slack_notification.urgency` = `"high"`
- `slack_notification.message` contém referência ao lead_id ou budget

---

## Grupo 2 — Máquina de Estados

### CR-04: Transição válida novo → em_qualificacao

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-004",
  "update_type": "stage_change",
  "payload": { "new_stage": "em_qualificacao" },
  "current_crm_state": { "stage": "novo" }
}
```

**Esperado:**
- `new_stage` = `"em_qualificacao"`
- `validation_errors` = `[]`

---

### CR-05: Transição inválida por agente automático (novo → fechado_ganho)

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-005",
  "update_type": "stage_change",
  "payload": { "new_stage": "fechado_ganho" },
  "current_crm_state": { "stage": "novo" }
}
```

**Esperado:**
- `supabase_ops` = `[]`
- `validation_errors` contém mensagem sobre transição inválida (`novo → fechado_ganho`)
- `suggested_action` = `"notify_human"`
- `new_stage` = `"novo"` (sem mudança)

---

### CR-06: Transição incomum por operador humano (novo → fechado_ganho) — aviso mas executa

**Input:**
```json
{
  "source_agent": "human_operator",
  "lead_id": "lead-006",
  "update_type": "stage_change",
  "payload": { "new_stage": "fechado_ganho" },
  "current_crm_state": { "stage": "novo" }
}
```

**Esperado:**
- `new_stage` = `"fechado_ganho"` (transição humana permitida)
- `supabase_ops` contém a operação de update
- `validation_errors` contém aviso (não bloqueante): "transição incomum: novo→fechado_ganho (operador humano)"
- `slack_notification.channel` = `"#deals"` (deal fechado)
- `slack_notification.urgency` = `"critical"`

---

### CR-07: Reativação de lead desqualificado

**Input:**
```json
{
  "source_agent": "human_operator",
  "lead_id": "lead-007",
  "update_type": "stage_change",
  "payload": { "new_stage": "em_qualificacao", "note": "Lead voltou após 6 meses" },
  "current_crm_state": { "stage": "desqualificado" }
}
```

**Esperado:**
- `new_stage` = `"em_qualificacao"`
- `supabase_ops` inclui update de stage E insert de nota
- `validation_errors` = `[]`

---

## Grupo 3 — Escalações

### CR-08: Escalação para humano → notificação #crm-alerts

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-008",
  "update_type": "escalation",
  "payload": {
    "escalation_type": "escalate_human",
    "escalation_reason": "pedido explícito de atendimento humano"
  },
  "current_crm_state": { "stage": "em_qualificacao" }
}
```

**Esperado:**
- `slack_notification.channel` = `"#crm-alerts"`
- `slack_notification.urgency` = `"normal"`
- `slack_notification.message` contém `escalation_reason`
- `supabase_ops` atualiza `last_contact` e adiciona nota de escalação
- `suggested_action` = `"notify_human"`

---

### CR-09: Escalação VIP → notificação #vip-leads

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-009",
  "update_type": "escalation",
  "payload": {
    "escalation_type": "escalate_vip",
    "escalation_reason": "budget acima de R$ 2M"
  },
  "current_crm_state": { "stage": "em_qualificacao" }
}
```

**Esperado:**
- `slack_notification.channel` = `"#vip-leads"`
- `slack_notification.urgency` = `"high"`

---

## Grupo 4 — Validações

### CR-10: lead_id ausente → erro bloqueante

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "",
  "update_type": "qualification_data",
  "payload": { "budget": 500000 },
  "current_crm_state": { "stage": "novo" }
}
```

**Esperado:**
- `supabase_ops` = `[]`
- `validation_errors` contém "lead_id obrigatório"
- `suggested_action` = `"notify_human"`

---

### CR-11: update_type desconhecido

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-011",
  "update_type": "sync_crm_external",
  "payload": {},
  "current_crm_state": { "stage": "em_qualificacao" }
}
```

**Esperado:**
- `supabase_ops` = `[]`
- `validation_errors` contém "update_type desconhecido: sync_crm_external"
- `suggested_action` = `"notify_human"`

---

### CR-12: Nota duplicada não é reinserida

**Input:**
```json
{
  "source_agent": "human_operator",
  "lead_id": "lead-012",
  "update_type": "note_added",
  "payload": { "note": "Lead interessado em Pinheiros" },
  "current_crm_state": {
    "stage": "em_qualificacao",
    "notes": ["Lead interessado em Pinheiros"]
  }
}
```

**Esperado:**
- `supabase_ops` = `[]` OU operação de update sem a nota duplicada
- `validation_errors` pode conter aviso de deduplicação (não bloqueante)
- Nota idêntica NÃO é inserida novamente

---

## Grupo 5 — Fechamento de Negócio

### CR-13: Transição para fechado_ganho → notificação #deals critical

**Input:**
```json
{
  "source_agent": "human_operator",
  "lead_id": "lead-013",
  "update_type": "stage_change",
  "payload": {
    "new_stage": "fechado_ganho",
    "deal_value": 850000
  },
  "current_crm_state": { "stage": "negociacao" }
}
```

**Esperado:**
- `new_stage` = `"fechado_ganho"`
- `slack_notification.channel` = `"#deals"`
- `slack_notification.urgency` = `"critical"`
- `supabase_ops` inclui `deal_value: 850000`

---

### CR-14: Fechado_ganho não aceita transições automáticas

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-014",
  "update_type": "stage_change",
  "payload": { "new_stage": "em_qualificacao" },
  "current_crm_state": { "stage": "fechado_ganho" }
}
```

**Esperado:**
- `supabase_ops` = `[]`
- `validation_errors` contém mensagem sobre stage terminal
- `new_stage` = `"fechado_ganho"` (inalterado)

---

## Grupo 6 — Normalização

### CR-15: Variantes de escrita produzem o mesmo normalizado

**Input:**
```json
{
  "source_agent": "sdr",
  "lead_id": "lead-015",
  "update_type": "qualification_data",
  "payload": {
    "location": "Vila Olímpia",
    "property_type": "cobertura duplex com terraço",
    "interest": "quer imóvel próximo ao metrô"
  },
  "current_crm_state": { "stage": "em_qualificacao" }
}
```

**Esperado:**
- `location_normalized` = `"vila-olimpia"`
- `property_type_normalized` = `"cobertura"`
- `interest_normalized` = `"quer-imovel-proximo-ao-metro"`
- Os campos originais (`location`, `property_type`, `interest`) permanecem intactos

**Variantes a validar (mesmo normalizado esperado):**

| `location` input | `location_normalized` |
|------------------|-----------------------|
| `"Brooklin"` | `"brooklin"` |
| `"Brooklin SP"` | `"brooklin"` |
| `"brooklin - sp"` | `"brooklin"` |
| `"Vila Olímpia"` | `"vila-olimpia"` |
| `"v. olimpia"` | `"vila-olimpia"` |
| `"próximo ao metrô Brooklin"` | `"brooklin"` |

| `property_type` input | `property_type_normalized` |
|-----------------------|---------------------------|
| `"apartamento 3 quartos"` | `"apartamento"` |
| `"Apartamento 2 dorms"` | `"apartamento"` |
| `"apto 70m²"` | `"apartamento"` |
| `"cobertura duplex"` | `"cobertura"` |
| `"casa com piscina"` | `"casa"` |
| `"sala comercial"` | `"sala-comercial"` |

---

## Critérios de Aprovação para Produção

- [ ] CR-01 a CR-03: operações Supabase corretas sem sobrescrever campos null
- [ ] CR-04 a CR-07: máquina de estados correta para agente automático e humano
- [ ] CR-08 a CR-09: canais e urgências de Slack corretos
- [ ] CR-10 a CR-12: validações bloqueantes funcionando
- [ ] CR-13 a CR-14: stage terminal respeitado
- [ ] CR-15: campos normalizados corretos para todas as variantes listadas, originais preservados intactos
- [ ] Métricas globais acima dos alvos definidos na tabela inicial
