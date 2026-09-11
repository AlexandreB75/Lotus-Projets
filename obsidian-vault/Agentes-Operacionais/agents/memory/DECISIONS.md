# Memory Agent — DECISIONS.md
# v1.0 — 2026-06-25
# Registro de decisões arquiteturais. Referência: obsidian-vault/00-Sistema/PRINCIPLES.md (P04)

---

## ADR-01: Dois modos (write + consolidate) no mesmo agente

**Status:** Aceito

**Contexto:**
A gestão de memória tem duas operações distintas: escrita imediata após um turno (latência crítica) e consolidação periódica de limpeza/merge (pode ser assíncrona). Criar dois agentes separados duplicaria o contexto de sistema. Usar um único agente com `mode` é mais simples.

**Opções consideradas:**
1. Dois agentes separados (MemoryWriter + MemoryConsolidator)
2. Um agente com dois modos via campo `mode`
3. Lógica de consolidação inteiramente no n8n (sem agente)

**Decisão:**
Um agente com dois modos. O modo `write` é chamado a cada turno do SDR; o `consolidate` é chamado pelo n8n em job noturno. A diferença de input/output está documentada no SKILL.md.

**Consequências:**
- SKILL.md é maior, mas uma única versão para manter
- Se os modos divergirem muito no futuro, criar agentes separados (ADR revisável)
- n8n controla quando chamar cada modo

---

## ADR-02: Deduplicação semântica por raciocínio do LLM

**Status:** Aceito com limitação documentada

**Contexto:**
A deduplicação ideal usaria embeddings (pgvector) para comparar similaridade semântica numericamente. Porém, o Memory Agent é chamado inline após o SDR — adicionar uma chamada pgvector antes de chamar o agente aumenta a latência. Para a versão 1.0, o LLM avalia semanticamente.

**Opções consideradas:**
1. Comparação por string exact apenas — simples, perde duplicatas semânticas
2. LLM avalia semanticamente — bom, com inconsistência conhecida (ver ME-13)
3. pgvector antes de chamar o agente — ideal, mais latência

**Decisão:**
LLM avalia semanticamente para v1.0. A falha conhecida (ME-13) está documentada. Migrar para pgvector pré-filtro na Sprint 3+, quando o volume de memórias justificar.

**Consequências:**
- Inconsistências ocasionais na deduplicação semântica
- Aceitável para volume inicial (dezenas de leads/dia)
- Caminho de upgrade claro: n8n faz `pgvector search` com threshold 0.85, injeta candidatos pré-filtrados

---

## ADR-03: TTL por tipo de memória

**Status:** Aceito

**Contexto:**
Memórias sem expiração acumulam indefinidamente e poluem o contexto de futuras chamadas. Tipos diferentes têm vida útil diferente no contexto imobiliário.

**Opções consideradas:**
1. Sem TTL — memórias permanentes
2. TTL global único (ex: 180 dias para todos)
3. TTL por tipo (preference: 365, fact: 180, objection: 90, interest: 180)
4. TTL configurável via input — mais flexível, mais complexo

**Decisão:**
TTL por tipo, hardcoded no SKILL.md. Fatos imutáveis (nome, telefone identificado como permanente) recebem `expires_at: null`. O raciocínio do LLM identifica se um `fact` é imutável.

**Consequências:**
- Memórias expiram naturalmente sem intervenção humana
- Objeções têm o TTL mais curto (90d) — adequado para ciclo imobiliário
- Se o ciclo de vendas mudar, TTLs devem ser revisados

---

## ADR-04: Content do update nunca muda — apenas confidence

**Status:** Aceito

**Contexto:**
Quando um candidato é semanticamente similar a uma memória existente mas com maior confiança, há dois caminhos: atualizar o conteúdo para o novo texto, ou apenas atualizar a confiança mantendo o texto original.

**Opções consideradas:**
1. Atualizar conteúdo para o texto mais novo — perde histórico
2. Atualizar apenas confidence — preserva o texto original
3. Criar nova entrada e deletar a antiga — mais limpo, mais operações

**Decisão:**
Atualizar apenas `confidence`. O conteúdo original é preservado. Isso evita que atualizações menores sobrescrevam informações mais completas e mantém o histórico implícito.

**Consequências:**
- Textos originais mais ricos são preservados mesmo com atualizações de confiança
- Risco: o texto original pode ser menos preciso que o candidato novo — aceitável para v1.0
- No modo `consolidate`, o merge pode ser mais agressivo (substituir conteúdo se similaridade > 0.95)

---

## ADR-05: Memory Agent não tem acesso direto ao Supabase

**Status:** Aceito — alinhado com CRM Agent ADR-01

**Contexto:**
Consistência arquitetural: todos os agentes que precisam escrever no Supabase emitem operações declarativas para o n8n executar. O Memory Agent não é exceção.

**Decisão:**
Mesmo padrão do CRM Agent: `supabase_ops` é declarativo, n8n executa. O n8n também injeta `existing_memories` antes de chamar o agente (Enrich-then-Call pattern do ARCHITECTURE.md).

**Consequências:**
- Latência adicional de um round-trip (n8n busca existing → chama agente → executa ops)
- Auditabilidade total
- Alinhado com P01 e ARCHITECTURE.md

---

## ADR-06: Stats como campo de output obrigatório

**Status:** Aceito

**Contexto:**
O Memory Agent processa lotes de memórias. O n8n precisa saber quantas foram salvas, puladas e por quê, para logs e alertas (ex: se 100% dos candidatos forem pulados por duplicata, pode indicar loop de reprocessamento).

**Decisão:**
`stats` é um campo obrigatório em todos os outputs. Deve estar presente mesmo quando `supabase_ops = []`.

**Consequências:**
- n8n pode monitorar a saúde do Memory Agent via stats
- Se `stats.inserted = 0` e `stats.candidates_received > 0`, n8n pode logar para investigação
