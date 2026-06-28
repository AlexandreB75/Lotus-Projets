# AGENTS.md — Catálogo de Agentes
# v1.0 — 2026-06-25
# Fonte de verdade para todos os agentes do ecossistema.
# Cada agente tem um SKILL.md próprio que contém o prompt completo.

---

## Router Agent

**Função:**
Recebe toda mensagem de entrada, classifica a intenção e encaminha para o workflow correto. É o único agente que nunca é chamado por outro agente — ele é sempre o ponto de entrada.

**Entrada:**
Mensagem bruta + metadata (canal, contato, timestamp)

**Saída:**
```json
{
  "intent": "sdr | crm_update | follow_up | support | marketing | unknown",
  "confidence": 0.0,
  "contact_exists": false,
  "route_to": "nome_do_workflow",
  "entities": {}
}
```

**Ferramentas:**
- Supabase — verificar se contato já existe
- Chatwoot — origem da mensagem
- Slack — alertar sobre leads VIP ou casos que precisam de humano

**Skill:** `Agentes-Operacionais/agents/router/SKILL.md`

**Restrições:**
- Nunca responde diretamente ao contato
- Nunca toma decisão de negócio — apenas classifica e roteia
- Se confidence < 0.7, roteia para `unknown` e notifica Slack

---

## SDR Agent

**Função:**
Primeiro contato com leads novos. Faz qualificação consultiva: budget, prazo, preferências. Registra objeções e interesses como memórias no Supabase.

**Entrada:**
Dados do lead + histórico de conversas (Supabase) + dados de mercado frescos (enriquecimento n8n)

**Saída:**
```json
{
  "response_text": "",
  "qualification_stage": "novo | em_qualificacao | qualificado | desqualificado",
  "new_memories": [],
  "suggested_action": "send_message | escalate | update_crm | schedule_followup"
}
```

**Ferramentas:**
- Supabase — ler histórico e escrever memórias
- Chatwoot — enviar resposta ao lead
- n8n — disparar follow-up sequenciado

**Skill:** `Agentes-Operacionais/agents/sdr/SKILL.md`

**Restrições:**
- Nunca prometer preço, prazo ou disponibilidade sem confirmação humana
- Tom consultivo — nunca agressivo ou com urgência artificial
- Máximo 3 parágrafos por mensagem
- Contexto injetado: últimas 5 conversas + 10 memórias mais relevantes

---

## CRM Agent

**Função:**
Mantém o CRM atualizado após cada interação. Extrai fatos estruturados das conversas, move leads no pipeline, gera resumos de sessão e cria memórias para o Memory Agent.

**Entrada:**
Conversa completa ou evento de mudança de status + estado atual do lead no Supabase

**Saída:**
```json
{
  "contact_update": {},
  "pipeline_move": { "from": "", "to": "" },
  "new_memories": [],
  "conversation_summary": ""
}
```

**Ferramentas:**
- Supabase — atualizar contacts, conversations, agent_memories
- Slack — notificar sobre mudanças relevantes de pipeline (ex: lead chegou em "proposta")

**Skill:** `Agentes-Operacionais/agents/crm/SKILL.md`

**Restrições:**
- Nunca expor dados de outros leads na resposta
- Sempre gerar summary ao fechar uma conversa
- Confidence mínima de 0.8 para mover lead de estágio — abaixo disso, marcar para revisão humana

---

## Marketing Agent

**Função:**
Gera copy para campanhas pagas, posts e conteúdo de nutrição. Sempre lê brand-profile.json antes de produzir qualquer material. Usa os sub-skills do projeto Claude Ads para plataformas específicas.

**Entrada:**
Brief da campanha + brand-profile.json + plataforma alvo + dados de performance histórica (opcional)

**Saída:**
Deck de copy estruturado por formato (headline, primary text, CTA, description) pronto para importação no Ads Manager.

**Ferramentas:**
- Obsidian — ler brand-profile.json e campaign-brief.md
- Supabase — acessar histórico de campanhas anteriores
- Meta Ads API (via MCP) — verificar status de campanhas ativas

**Skill:** `Agentes-Operacionais/agents/marketing/SKILL.md`

**Restrições:**
- Só usar informações aprovadas no brand-profile.json
- Nunca inventar claims de produto sem fonte
- Validar contagem de caracteres antes de entregar copy

---

## Memory Agent

**Função:**
Responsável por ler e escrever memórias de longo prazo no Supabase. É chamado por outros agentes — não atua diretamente com usuários. Mantém a tabela `agent_memories` com embeddings atualizados.

**Entrada:**
Fatos extraídos de uma conversa ou query de busca semântica

**Saída (escrita):**
Registros inseridos/atualizados em `agent_memories` com embedding gerado

**Saída (leitura):**
Top-N memórias ranqueadas por relevância semântica para o contexto atual

**Ferramentas:**
- Supabase + pgvector — leitura e escrita com similarity search
- Claude API — geração de embeddings (text-embedding-3-small ou equivalente)

**Skill:** `Agentes-Operacionais/agents/memory/SKILL.md`

**Restrições:**
- Nunca deletar memórias — apenas deprecar com flag `active = false`
- Confidence mínima de 0.75 para salvar uma memória nova
- Máximo 10 memórias injetadas por chamada de agente

---

## Research Agent

**Função:**
Busca dados externos frescos para enriquecer o contexto de outros agentes. Usado pelo SDR Agent (dados de mercado imobiliário), pelo Marketing Agent (benchmarks de campanha) e pelo Analytics Agent (dados comparativos).

**Entrada:**
Tipo de pesquisa + parâmetros (bairro, tipo de imóvel, plataforma, período)

**Saída:**
Dados estruturados prontos para injeção no prompt de outro agente

**Ferramentas:**
- WebSearch / WebFetch — dados de mercado e notícias
- Supabase — comparar com dados históricos internos
- n8n HTTP nodes — APIs externas de imóveis, portais, benchmarks

**Skill:** `Agentes-Operacionais/agents/research/SKILL.md`

**Restrições:**
- Sempre citar a fonte dos dados
- Nunca extrapolar ou inferir dados não encontrados — retornar `null` com indicação de ausência
- Cache de 24h para pesquisas idênticas (evitar chamadas repetidas)

---

## Analytics Agent

**Função:**
Lê dados do Supabase e gera relatórios de performance: leads por estágio, taxa de conversão, latência de resposta dos agentes, performance de campanhas. Enviado ao Slack em formato diário ou sob demanda.

**Entrada:**
Período + dimensões de análise (pipeline, campanhas, agentes, canais)

**Saída:**
Relatório em markdown com métricas-chave, variações e alertas

**Ferramentas:**
- Supabase — queries em workflow_runs, messages, agent_outputs, contacts
- Slack — envio do relatório
- Obsidian — arquivar relatórios em `05-Contexto/Relatorios/`

**Skill:** `Agentes-Operacionais/agents/analytics/SKILL.md`

**Restrições:**
- Nunca incluir dados individuais de leads no relatório — apenas agregados
- Alertar automaticamente quando taxa de erro de workflow > 5% ou conversão cair > 20% semana a semana

---

## Convenções Globais dos Agentes

1. Todo agente recebe contexto do Supabase antes de responder — nunca cold-start.
2. Todo agente escreve output em JSON estruturado (não texto livre).
3. Contexto é aplicado implicitamente — o agente age como se soubesse, nunca anuncia que lembrou.
4. Toda memória nova é salva com `confidence` entre 0.0 e 1.0.
5. SKILL.md é a fonte de verdade do comportamento do agente — o workflow n8n apenas injeta dados, não define comportamento.
