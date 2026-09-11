# SDR Agent — DECISIONS.md
# v1.0 — 2026-06-25
# Registro de decisões arquiteturais. Referência: obsidian-vault/00-Sistema/PRINCIPLES.md (P04)

---

## ADR-01: BANT-lite em vez de BANT completo

**Status:** Aceito

**Contexto:**
BANT completo (Budget, Authority, Need, Timeline) é o framework de vendas clássico. No entanto, "Authority" raramente é relevante no contexto imobiliário residencial B2C — o comprador geralmente é o próprio tomador de decisão. Incluir "Authority" como dimensão obrigatória aumentaria o atrito da conversa sem benefício real.

**Opções consideradas:**
1. BANT completo (4 dimensões incluindo Authority)
2. BANT-lite com Budget, Need, Area, Timeline (renomear Need → interesse + tipo de imóvel, incluir localização como dimensão)
3. Framework proprietário sem nomenclatura externa

**Decisão:**
BANT-lite com as 4 dimensões: Budget, Need (interest + property_type), Area (location), Timeline.

**Consequências:**
- Conversa mais natural, sem perguntas de "autoridade" artificiais
- Threshold de qualificação: 3 de 4 dimensões coletadas com dados concretos
- Se no futuro surgir segmento B2B (ex: empresas comprando salas comerciais), rever para incluir Authority

---

## ADR-02: Máximo 3 parágrafos por mensagem

**Status:** Aceito

**Contexto:**
Leads de WhatsApp têm atenção limitada. Mensagens longas são percebidas como spam e reduzem o engajamento. Mensagens curtas e diretas têm taxa de resposta maior em canais de chat.

**Opções consideradas:**
1. Sem limite de tamanho — o agente decide conforme a pergunta
2. Limite de 200 palavras
3. Limite de 3 parágrafos curtos
4. Uma frase por resposta (muito restritivo)

**Decisão:**
Máximo 3 parágrafos. Definido como "parágrafo" = bloco de texto separado por linha em branco. Não há limite de palavras por parágrafo, mas o tom implícito é conversacional (frases curtas).

**Consequências:**
- Perguntas complexas são respondidas de forma resumida, com encaminhamento para especialista quando necessário
- Métricas de teste: zero respostas com mais de 3 parágrafos (ver SD-12)

---

## ADR-03: Uma pergunta por turno

**Status:** Aceito

**Contexto:**
Fazer múltiplas perguntas em um mesmo turno é a causa mais comum de abandono em conversas de chatbot. O lead não sabe qual responder primeiro e tende a responder nenhuma.

**Opções consideradas:**
1. Sem limite — o agente faz quantas perguntas precisar por turno
2. Máximo 2 perguntas (lógica de agrupamento)
3. Exatamente 1 pergunta por turno

**Decisão:**
Uma pergunta por turno, sempre ao final da mensagem. A pergunta deve ser sobre a próxima dimensão BANT-lite ainda não coletada, em ordem de prioridade: Need → Area → Timeline → Budget.

**Consequências:**
- Qualificação demora mais turnos, mas conversa é mais natural
- Métricas de teste: zero respostas com mais de 1 ponto de interrogação (ver SD-11)
- Budget é intencionalmente deixado para o final — perguntar budget logo no início é percebido como invasivo

---

## ADR-04: Nunca prometer preço, disponibilidade ou prazo

**Status:** Aceito — Proibição absoluta

**Contexto:**
Corretores e construtoras têm regras específicas sobre o que pode ser prometido. O SDR Agent não tem acesso a dados atualizados de estoque, não conhece as condições de negociação de cada imóvel específico, e qualquer promessa incorreta pode gerar responsabilidade legal ou dano de reputação.

**Opções consideradas:**
1. Proibição total — nunca mencionar valores ou disponibilidade
2. Proibição com exceção para dados injetados em `market_context.enrichment_data`
3. Permitir faixas genéricas ("em torno de X") sem compromisso formal

**Decisão:**
Proibição total para qualquer dado não confirmado por humano. Se `market_context.enrichment_data` contiver dados de mercado públicos (ex: média de preço por bairro do CRECI), o agente pode mencioná-los com qualificação explícita ("dados de mercado, não garantidos"). Nunca sobre imóvel específico.

**Consequências:**
- Pode frustrar leads que querem resposta rápida sobre preço
- Mitiga riscos legais e de credibilidade
- Força a qualificação antes da revelação de preços — alinhado com boa prática comercial

---

## ADR-05: Saída estruturada em JSON

**Status:** Aceito

**Contexto:**
O agente opera em pipeline: n8n lê o output, atualiza Supabase, decide próximo passo. Um output em texto livre seria impossível de processar de forma confiável.

**Opções consideradas:**
1. Texto livre — mais fácil de gerar, impossível de parsear
2. JSON parcial — apenas campos essenciais, resto em texto livre
3. JSON completo com todos os campos sempre presentes
4. JSON com campos opcionais omitidos quando vazios

**Decisão:**
JSON completo com todos os campos sempre presentes. Campos sem valor usam `null`, não são omitidos. Isso evita erros de chave ausente no n8n.

**Consequências:**
- Output previsível e parseável
- Todos os campos do schema são obrigatórios; testes devem verificar presença de todos eles
- `memories_to_save` pode ser `[]` (array vazio), nunca omitido

---

## ADR-06: Threshold de confidence para salvar memória: 0.80

**Status:** Aceito — revisado para alinhar com Router Agent

**Contexto:**
Memórias de baixa confiança poluem o contexto futuro. O Router Agent usa 0.80 como threshold. Manter o mesmo valor em todos os agentes cria uma escala uniforme: abaixo de 0.80 = incerto, não persiste; acima de 0.80 = confiável, persiste.

**Opções consideradas:**
1. Threshold 0.75 — mais memórias salvas, mais ruído
2. Threshold 0.80 — alinhado com Router Agent, escala uniforme no ecossistema
3. Threshold 0.85 — mais conservador, menos cobertura

**Decisão:**
Threshold 0.80. Declarações incertas ("talvez", "acho que", "não sei") devem receber confidence < 0.80 e não devem ser salvas.

**Consequências:**
- Escala de confidence uniforme entre todos os agentes do ecossistema
- Memórias salvas têm ao menos 80% de probabilidade de serem corretas
- Ver teste SD-14 para validação

---

## ADR-07: Escalação VIP a partir de R$ 2M

**Status:** Aceito

**Contexto:**
Leads com budget alto merecem atendimento diferenciado e mais rápido do time comercial senior. O threshold de R$ 2M foi definido como ponto de corte para mercado de luxo/alto padrão no segmento imobiliário em São Paulo.

**Opções consideradas:**
1. R$ 1M — muito baixo, incluiria muitos leads de médio padrão
2. R$ 1.5M — possível, mas ainda amplo
3. R$ 2M — alinha com definição de "alto padrão" do mercado paulistano
4. Configurável via `market_context.enrichment_data.vip_budget_threshold` — mais flexível

**Decisão:**
R$ 2M hardcoded na SKILL.md, mas com nota para migrar para `market_context.enrichment_data.vip_budget_threshold` quando o agente amadurecer. Por ora, R$ 2M é o valor correto para os domínios servidos.

**Consequências:**
- Escalação VIP automática para perfis de alto padrão
- Revisão necessária se a operação expandir para outros segmentos ou cidades

---

## ADR-08: Contexto limitado a 5 mensagens + 10 memórias

**Status:** Aceito

**Contexto:**
O n8n injeta contexto antes de chamar o agente. Quanto mais contexto, maior o custo por chamada e maior o risco de diluição de instruções. O SDR Agent precisa de contexto suficiente para ser consultivo sem ser caro.

**Opções consideradas:**
1. 3 mensagens + 5 memórias — muito pouco para conversas longas
2. 5 mensagens + 10 memórias — equilibrio
3. 10 mensagens + 20 memórias — mais contexto, maior custo
4. Contexto ilimitado — inviável para escala

**Decisão:**
Últimas 5 mensagens do histórico + top 10 memórias por relevância semântica (pgvector). Alinhado com o Router Agent (ADR-08, também 5 mensagens). Memórias são ranqueadas por similaridade ao input atual, não por data.

**Consequências:**
- Conversas muito longas perdem o histórico mais antigo — aceitável porque memórias compensam
- Custo por chamada controlado
- n8n deve fazer a busca pgvector e injetar apenas as 10 mais relevantes
