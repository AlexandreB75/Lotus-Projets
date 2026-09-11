# CRM Agent — DECISIONS.md
# v1.0 — 2026-06-25
# Registro de decisões arquiteturais. Referência: obsidian-vault/00-Sistema/PRINCIPLES.md (P04)

---

## ADR-01: Agente emite operações declarativas — n8n executa

**Status:** Aceito

**Contexto:**
O CRM Agent poderia ter acesso direto ao Supabase via MCP ou HTTP. Isso simplificaria o código, mas criaria um agente com efeitos colaterais diretos e dificulta auditoria.

**Opções consideradas:**
1. Agente faz chamadas HTTP diretas ao Supabase — mais rápido, menos auditável
2. Agente emite operações declarativas em JSON — n8n executa, auditável
3. Agente emite SQL raw — flexível, mas perigoso

**Decisão:**
Operações declarativas. O agente produz `supabase_ops` como JSON estruturado; o n8n lê, valida, e executa. Isso garante: (a) o agente não tem credenciais de banco; (b) o n8n pode logar cada operação antes de executar; (c) falhas de execução ficam no n8n, não no agente.

**Consequências:**
- Um passo extra de latência (n8n executa após receber o JSON)
- Auditabilidade total: cada operação planejada vs. executada fica registrada no n8n
- Alinhado com P01 (nunca executar ação destrutiva sem aprovação) e arquitetura ARCHITECTURE.md

---

## ADR-02: Máquina de estados explícita com transições permitidas

**Status:** Aceito

**Contexto:**
Sem um grafo de transições definido, o agente poderia aceitar qualquer mudança de stage, criando inconsistências no pipeline (ex: lead marcado como `fechado_ganho` sem ter passado por `qualificado`).

**Opções consideradas:**
1. Sem validação — qualquer stage é aceito
2. Validação apenas de valores válidos (enum), sem checar transições
3. Grafo de transições explícito com regras por source_agent

**Decisão:**
Grafo de transições com dois modos: automático (apenas transições listadas) e manual (qualquer transição, mas com aviso). Transições terminais (`fechado_ganho`) não são reversíveis automaticamente.

**Consequências:**
- Agentes SDR/Router não podem criar estados incoerentes no pipeline
- Operadores humanos mantêm controle total para casos especiais
- A máquina de estados deve ser revisada se o processo comercial mudar

---

## ADR-03: Nunca sobrescrever campos com null

**Status:** Aceito

**Contexto:**
Se o SDR Agent informa apenas `budget` em um update, os outros campos (`location`, `timeline`, etc.) não são incluídos no payload. Incluir esses campos como `null` na operação Supabase apagaria dados existentes.

**Opções consideradas:**
1. Enviar todos os campos, usando `null` para ausentes — apaga dados existentes
2. Enviar apenas campos presentes no payload — preserva dados existentes
3. Fazer merge client-side antes de enviar — mais complexo

**Decisão:**
Apenas campos explicitamente presentes em `payload` são incluídos em `supabase_ops.data`. O n8n usa `PATCH` semântico (equivalente a `UPDATE SET col = val WHERE id = X` sem tocar em outras colunas).

**Consequências:**
- Dados existentes são preservados entre chamadas parciais
- O agente não precisa carregar o estado completo do lead antes de cada update
- Risco: se o operador quiser explicitamente limpar um campo, deve passar `clear_fields: ["campo"]` no payload — decisão a documentar quando surgir o caso de uso

---

## ADR-04: Notificações Slack por canal + urgência

**Status:** Aceito

**Contexto:**
Notificações genéricas em um único canal criam ruído. Leads VIP, deals fechados e escalações humanas têm audiências e urgências diferentes.

**Opções consideradas:**
1. Canal único `#crm-geral` para tudo — simples, barulhento
2. Três canais com urgência (`#vip-leads`, `#crm-alerts`, `#deals`) — específico
3. Nenhuma notificação do CRM Agent — n8n decide tudo

**Decisão:**
Três canais com urgência definida no output do agente. O n8n lê `slack_notification` e faz a chamada. O agente define o que notificar; o n8n define o como (formatação, @mentions, etc.).

**Consequências:**
- CRM Agent precisa conhecer a estrutura de canais Slack — acoplamento leve, aceitável
- Se um canal mudar de nome, SKILL.md precisa ser atualizado
- Urgência `critical` pode ser configurada no n8n para acionar @canal ou @here

---

## ADR-05: Deduplicação de notas por conteúdo idêntico

**Status:** Aceito

**Contexto:**
n8n pode reprocessar um evento (retry em falha de rede). Sem deduplicação, a mesma nota seria inserida múltiplas vezes.

**Opções consideradas:**
1. Sem deduplicação — notas duplicadas acumulam
2. Deduplicação por hash do conteúdo — precisa do estado atual
3. Deduplicação por comparação de string com a última nota

**Decisão:**
Comparação de string com as notas existentes em `current_crm_state.notes`. Se conteúdo idêntico já existe, não gerar `insert`. Alinhado com ADR-03 (n8n injeta estado atual antes de chamar o agente).

**Consequências:**
- Protege contra retries do n8n
- Não protege contra notas muito similares mas não idênticas — aceitável por ora
- `current_crm_state.notes` deve ser injetado pelo n8n (últimas N notas, ordenadas por data)

---

## ADR-06: Stage `fechado_ganho` como terminal

**Status:** Aceito

**Contexto:**
Uma vez que um negócio é fechado, reabrir o lead automaticamente poderia gerar dados inconsistentes (ex: SDR enviando qualificações para um lead já convertido).

**Opções consideradas:**
1. `fechado_ganho` permite retorno automático — flexível, propenso a erro
2. `fechado_ganho` é terminal para agentes, requer operador humano para reabrir
3. `fechado_ganho` é totalmente imutável

**Decisão:**
Terminal para agentes automáticos. Operadores humanos podem reativar via `source_agent = "human_operator"`. Qualquer tentativa automática gera `validation_errors` e `suggested_action = "notify_human"`.

**Consequências:**
- Impede que retries ou loops do n8n reprocessem leads já convertidos
- Casos legítimos de reabertura (ex: distrato) requerem intervenção humana — correto

---

## ADR-07: Dual-field para campos de valor livre (original + normalizado)

**Status:** Aceito — revisado

**Contexto:**
Campos como `location` e `property_type` chegam como strings livres do SDR Agent. Guardar apenas o texto original prejudica filtros e agrupamentos futuros. Normalizar no lugar do original perde o contexto de como o lead se expressou.

**Opções consideradas:**
1. Strings livres apenas — inutilizável para filtros e analytics
2. Enums fixos — rígido, incompatível com extração natural do SDR
3. Normalização no lugar do original — perde o texto original
4. Dual-field: preservar original + gravar campo `_normalized` — melhor dos dois

**Decisão:**
Dual-field. Para cada campo de valor livre (`location`, `property_type`, `interest`), o CRM Agent grava o original intacto e um campo `_normalized` no mesmo update. Regras na seção "Normalização de Campos Livres" do SKILL.md.

**Consequências:**
- Original preservado para auditoria e contexto
- Campo normalizado pronto para filtros e agrupamentos no Analytics Agent
- Supabase precisa de colunas `location_normalized`, `property_type_normalized`, `interest_normalized` na tabela `contacts`
- Se as regras de normalização evoluírem, um job pode reprocessar os campos normalizados sem tocar nos originais
