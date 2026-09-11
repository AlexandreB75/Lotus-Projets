# Memory Agent — TESTS.md
# v1.0 — 2026-06-25

---

## Métricas de Sucesso

| Métrica | Alvo |
|---------|------|
| Duplicatas exatas corretamente puladas | 100% |
| Duplicatas semânticas corretamente detectadas | >= 85% |
| Memórias novas corretamente inseridas | >= 98% |
| Memórias com confidence < 0.80 inseridas | 0% |
| `expires_at` calculado incorretamente | 0% |
| JSON parse error | 0% |
| Latência (output gerado) | <= 3s |

---

## Grupo 1 — Modo Write: Inserção

### ME-01: Candidatos novos são inseridos

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-001",
  "source_agent": "sdr",
  "candidates": [
    { "type": "preference", "content": "prefere apartamento", "confidence": 0.92 },
    { "type": "fact",       "content": "budget até R$ 700k",  "confidence": 0.88 }
  ],
  "existing_memories": []
}
```

**Esperado:**
- `supabase_ops` contém 2 operações com `operation: "insert"`
- `stats.inserted` = 2
- `stats.skipped_duplicate` = 0
- `supabase_ops[0].data.expires_at` calculado como hoje + 365 dias (preference)
- `supabase_ops[1].data.expires_at` calculado como hoje + 180 dias (fact)

---

### ME-02: Candidato com confidence abaixo de 0.80 é pulado

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-002",
  "source_agent": "sdr",
  "candidates": [
    { "type": "objection", "content": "talvez prefira casa", "confidence": 0.65 }
  ],
  "existing_memories": []
}
```

**Esperado:**
- `supabase_ops[0].operation` = `"skip"`
- `supabase_ops[0].skip_reason` = `"low_confidence"`
- `stats.skipped_low_confidence` = 1
- `stats.inserted` = 0

---

### ME-03: Fact imutável recebe expires_at null

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-003",
  "source_agent": "sdr",
  "candidates": [
    { "type": "fact", "content": "nome: Carlos", "confidence": 0.98 }
  ],
  "existing_memories": []
}
```

**Esperado:**
- `supabase_ops[0].operation` = `"insert"`
- `supabase_ops[0].data.expires_at` = `null` (fato imutável)

---

## Grupo 2 — Modo Write: Deduplicação

### ME-04: Duplicata exata é pulada

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-004",
  "source_agent": "sdr",
  "candidates": [
    { "type": "preference", "content": "prefere apartamento", "confidence": 0.90 }
  ],
  "existing_memories": [
    { "id": "mem-001", "type": "preference", "content": "prefere apartamento", "confidence": 0.88 }
  ]
}
```

**Esperado:**
- `supabase_ops[0].operation` = `"skip"`
- `supabase_ops[0].skip_reason` = `"duplicate_exact"`
- `stats.skipped_duplicate` = 1

---

### ME-05: Duplicata semântica com confiança maior → update

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-005",
  "source_agent": "sdr",
  "candidates": [
    { "type": "preference", "content": "quer apartamento, não casa", "confidence": 0.95 }
  ],
  "existing_memories": [
    { "id": "mem-002", "type": "preference", "content": "prefere apartamento", "confidence": 0.82 }
  ]
}
```

**Esperado:**
- `supabase_ops[0].operation` = `"update"`
- `supabase_ops[0].match.id` = `"mem-002"`
- `supabase_ops[0].data.confidence` = 0.95
- `stats.updated` = 1

---

### ME-06: Duplicata semântica com confiança menor → skip

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-006",
  "source_agent": "sdr",
  "candidates": [
    { "type": "fact", "content": "budget disponível: 700k", "confidence": 0.82 }
  ],
  "existing_memories": [
    { "id": "mem-003", "type": "fact", "content": "budget até R$ 700k", "confidence": 0.91 }
  ]
}
```

**Esperado:**
- `supabase_ops[0].operation` = `"skip"`
- `supabase_ops[0].skip_reason` = `"duplicate_semantic_lower_confidence"`
- `stats.skipped_duplicate` = 1

---

### ME-07: Candidatos mistos (novo + duplicata)

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-007",
  "source_agent": "sdr",
  "candidates": [
    { "type": "preference", "content": "prefere apartamento", "confidence": 0.92 },
    { "type": "interest",   "content": "região Pinheiros",   "confidence": 0.88 }
  ],
  "existing_memories": [
    { "id": "mem-004", "type": "preference", "content": "prefere apartamento", "confidence": 0.90 }
  ]
}
```

**Esperado:**
- `supabase_ops` contém 2 operações:
  - preference → `skip` (duplicata, confiança <= existente)
  - interest → `insert` (novo)
- `stats.inserted` = 1
- `stats.skipped_duplicate` = 1

---

## Grupo 3 — TTL

### ME-08: TTL correto por tipo

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-008",
  "source_agent": "sdr",
  "candidates": [
    { "type": "preference", "content": "quer varanda",         "confidence": 0.85 },
    { "type": "objection",  "content": "condomínio alto",      "confidence": 0.82 },
    { "type": "interest",   "content": "interesse em Moema",   "confidence": 0.88 }
  ],
  "existing_memories": []
}
```

**Esperado:**
- preference → `expires_at` = hoje + 365 dias
- objection → `expires_at` = hoje + 90 dias
- interest → `expires_at` = hoje + 180 dias

---

## Grupo 4 — Modo Consolidate

### ME-09: Memórias expiradas são removidas

**Input:**
```json
{
  "mode": "consolidate",
  "lead_id": "lead-009",
  "existing_memories": [
    {
      "id": "mem-010", "type": "objection", "content": "preocupado com condomínio",
      "confidence": 0.85, "expires_at": "2025-12-01T00:00:00Z"
    },
    {
      "id": "mem-011", "type": "preference", "content": "prefere 3 quartos",
      "confidence": 0.92, "expires_at": "2027-06-01T00:00:00Z"
    }
  ]
}
```

**Esperado:**
- `supabase_ops` contém operação de delete para `mem-010` (expirada em 2025-12-01)
- `mem-011` não é removida
- `stats.expired_removed` = 1

---

### ME-10: Merge de memórias similares na consolidação

**Input:**
```json
{
  "mode": "consolidate",
  "lead_id": "lead-010",
  "existing_memories": [
    { "id": "mem-012", "type": "preference", "content": "prefere apartamento", "confidence": 0.82, "expires_at": "2027-01-01T00:00:00Z" },
    { "id": "mem-013", "type": "preference", "content": "quer apartamento, não casa", "confidence": 0.91, "expires_at": "2027-03-01T00:00:00Z" }
  ]
}
```

**Esperado:**
- `supabase_ops` contém delete de `mem-012` (menor confidence) e permanência de `mem-013`
- `stats.merged` = 1

---

## Grupo 5 — Validações e Falhas Conhecidas

### ME-11: lead_id ausente → nenhuma operação

**Input:**
```json
{
  "mode": "write",
  "lead_id": "",
  "source_agent": "sdr",
  "candidates": [
    { "type": "preference", "content": "prefere apartamento", "confidence": 0.90 }
  ],
  "existing_memories": []
}
```

**Esperado:**
- `supabase_ops` = `[]`
- `stats.inserted` = 0

---

### ME-12: Candidatos vazios não geram operações

**Input:**
```json
{
  "mode": "write",
  "lead_id": "lead-012",
  "source_agent": "sdr",
  "candidates": [],
  "existing_memories": []
}
```

**Esperado:**
- `supabase_ops` = `[]`
- `stats` todos zeros

---

### ME-13 (Falha Conhecida): Detecção de duplicata semântica complexa

**Contexto:** A detecção semântica é feita pelo LLM sem embedding — baseada em raciocínio sobre significado. Para pares muito similares mas não óbvios (ex: "prefere perto do metrô" vs "valoriza transporte público"), a detecção pode ser inconsistente.

**Mitigação futura:** Na Sprint 3+, usar pgvector para comparação por embedding antes de chamar o agente. O agente só recebe candidatos pré-filtrados por similaridade > 0.85.

---

## Critérios de Aprovação para Produção

- [ ] ME-01 a ME-03: inserções corretas com TTL calculado
- [ ] ME-04 a ME-07: deduplicação por exact e semântica funcionando
- [ ] ME-08: TTL por tipo correto (365/180/90)
- [ ] ME-09 a ME-10: modo consolidate funcionando
- [ ] ME-11 a ME-12: validações bloqueantes
- [ ] Métricas globais acima dos alvos definidos na tabela inicial
