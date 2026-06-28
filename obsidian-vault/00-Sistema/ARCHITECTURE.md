# Arquitetura do Ecossistema de Agentes
> Versão 2.0 — pós-Hermes. Baseada em engenharia reversa do Fable 5 + melhores práticas 2026.
> Última atualização: 2026-06-25

---

## Diagrama Geral

```
┌─────────────────────────────────────────────────────────┐
│                    ENTRADA DE DADOS                      │
│         WhatsApp · Slack · Telegram · Web Forms         │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                     CHATWOOT                             │
│         Unificação de inbox · Histórico humano           │
│         Webhook OUT → n8n para cada mensagem nova        │
└────────────────────────┬────────────────────────────────┘
                         │ webhook
┌────────────────────────▼────────────────────────────────┐
│                       n8n                                │
│              CAMADA DE ORQUESTRAÇÃO                      │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │Router Agent │  │ Enrich Node  │  │ Memory Node   │  │
│  │(classificar │  │(buscar dados │  │(ler/escrever  │  │
│  │ e rotear)   │  │ frescos)     │  │ Supabase)     │  │
│  └──────┬──────┘  └──────────────┘  └───────────────┘  │
│         │                                                │
│  ┌──────▼────────────────────────────────────────────┐  │
│  │              SWITCH DE ROTEAMENTO                  │  │
│  └──┬──────────┬──────────┬────────────┬────────────┘  │
│     │          │          │            │                │
│  ┌──▼──┐  ┌───▼──┐  ┌────▼───┐  ┌────▼──────────┐    │
│  │ SDR │  │ CRM  │  │ Mktg   │  │  Follow-up    │    │
│  │Agent│  │Agent │  │ Agent  │  │  Agent        │    │
│  └──┬──┘  └───┬──┘  └────┬───┘  └────┬──────────┘    │
└─────┼─────────┼──────────┼───────────┼────────────────┘
      │         │          │           │
┌─────▼─────────▼──────────▼───────────▼────────────────┐
│                    OPENLAW                              │
│         Claude API (HTTP node no n8n)                  │
│   Cada agente injeta: SKILL.md + contexto Supabase     │
│   Output sempre em JSON estruturado                    │
└────────────────────────┬───────────────────────────────┘
                         │
┌────────────────────────▼───────────────────────────────┐
│                    SUPABASE                             │
│   contacts · conversations · messages                   │
│   agent_memories · agent_outputs · workflow_runs        │
│   (pgvector para busca semântica)                      │
└────────────────────────┬───────────────────────────────┘
                         │ sync seletivo
┌────────────────────────▼───────────────────────────────┐
│                    OBSIDIAN                             │
│   Notas humanas · SKILL.md dos agentes                 │
│   Raw captures · Knowledge base                        │
└────────────────────────────────────────────────────────┘
```

---

## Responsabilidades de Cada Componente

### n8n — Orquestrador Principal

**O que faz:**
- Recebe webhooks do Chatwoot, Slack, Telegram, formulários web
- Classifica e roteia mensagens para o agente correto
- Enriquece contexto antes de chamar o Claude (dados frescos, histórico)
- Chama Claude API via HTTP node
- Persiste resultados no Supabase
- Envia respostas de volta ao canal de origem

**O que NÃO faz:**
- Não toma decisões de negócio (isso é papel do agente Claude)
- Não armazena estado em variáveis n8n — tudo vai para Supabase
- Não processa lógica complexa em Function nodes — se a lógica crescer, vira agente

**Padrão de workflow obrigatório:**
```
[Trigger] → [Buscar contexto no Supabase] → [Montar prompt] → [Chamar Claude] → [Parsear JSON] → [Salvar no Supabase] → [Enviar resposta]
```

---

### OpenClaw — Camada de Persona

**O que é:**
Cada agente OpenClaw é um conjunto de:
1. `SKILL.md` — instrução do sistema do agente
2. Contexto injetado pelo n8n (histórico, dados do lead, dados de mercado)
3. Output format JSON definido

**Localização dos SKILL.md:**
`obsidian-vault/Agentes-Operacionais/agents/<nome-do-agente>.md`

**Regra de ouro:**
O agente só sabe o que o n8n injeta. Se algo precisa estar disponível para o agente, precisa estar no Supabase e ser buscado no nó de enriquecimento.

---

### Supabase — Fonte de Verdade

**Schema recomendado:**

```sql
-- Contatos (leads, clientes, prospects)
contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE,
  email text,
  name text,
  source text,          -- 'whatsapp' | 'web' | 'slack' | 'telegram'
  metadata jsonb,       -- dados customizados por domínio
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)

-- Conversas (uma por sessão/canal)
conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  channel text,         -- 'whatsapp' | 'slack' | 'telegram' | 'chatwoot'
  external_id text,     -- ID no Chatwoot ou plataforma de origem
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  summary text          -- resumo comprimido gerado ao fechar conversa
)

-- Mensagens individuais
messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id),
  role text,            -- 'user' | 'assistant' | 'system'
  content text,
  agent_name text,      -- qual agente gerou (null se humano)
  tokens_used int,
  created_at timestamptz DEFAULT now()
)

-- Memórias de agentes (com vetor para busca semântica)
agent_memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  memory_type text,     -- 'preference' | 'fact' | 'objection' | 'interest'
  content text,
  embedding vector(1536),  -- pgvector
  confidence float,     -- 0.0 a 1.0
  source_message_id uuid REFERENCES messages(id),
  created_at timestamptz DEFAULT now()
)

-- Outputs de agentes (auditoria)
agent_outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id text,     -- ID do workflow n8n
  agent_name text,
  input_summary text,   -- resumo do input (não o prompt completo)
  output jsonb,         -- output estruturado do agente
  latency_ms int,
  created_at timestamptz DEFAULT now()
)

-- Runs de workflow (observabilidade)
workflow_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name text,
  trigger_type text,    -- 'webhook' | 'schedule' | 'manual'
  contact_id uuid REFERENCES contacts(id),
  status text,          -- 'success' | 'error' | 'partial'
  error_message text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
)
```

**Row Level Security obrigatório em:**
- `contacts`
- `conversations`
- `messages`
- `agent_memories`

---

### Chatwoot — Inbox Unificado

**Papel:** Centralizar todas as mensagens de entrada e manter histórico legível por humanos. Não processa lógica — apenas recebe e encaminha.

**Integração com n8n:**
- Webhook de "nova mensagem" → n8n Router
- n8n envia resposta via Chatwoot API `POST /api/v1/accounts/{id}/conversations/{conv_id}/messages`

---

### Obsidian — Base de Conhecimento Humana

**O que armazena:**
- `SKILL.md` de cada agente (fonte de verdade dos prompts)
- Raw captures (08-Raw/) — capturas brutas para análise
- Wiki compilado (09-Wiki-Compilado/) — conhecimento estruturado
- Contexto de projetos (05-Contexto/)

**O que NÃO armazena:**
- Dados de leads ou clientes (vai para Supabase)
- Logs de execução (vai para Supabase/n8n)
- Arquivos temporários de campanha (ad-assets/, ficam no projeto)

---

## Agentes — Design Detalhado

### Router Agent

**Input:** mensagem bruta + metadata (canal, contato, timestamp)

**Lógica:**
1. Classifica intenção: `sdr` | `crm_update` | `follow_up` | `support` | `marketing` | `unknown`
2. Extrai entidades: nome, telefone, imóvel de interesse, objeção
3. Verifica se contato existe no Supabase
4. Roteia para workflow correto

**Output JSON:**
```json
{
  "intent": "sdr",
  "confidence": 0.92,
  "entities": {
    "name": "João Silva",
    "phone": "+5511999999999",
    "interest": "apartamento 2 dormitórios Brooklin"
  },
  "contact_exists": false,
  "route_to": "sdr_workflow"
}
```

---

### SDR Agent (substitui Hermes VPS)

**Input:** dados do lead + contexto de memórias anteriores (se existir) + dados de mercado frescos

**Responsabilidades:**
- Primeira abordagem consultiva (nunca agressiva)
- Qualificação: budget, prazo, preferências
- Identificar objeções e registrá-las como memória
- Nunca fazer promessa de preço, prazo ou disponibilidade sem confirmação

**Restrição crítica:**
> "Nunca comprometer a empresa com valores, prazos ou disponibilidade de imóveis. Sempre dizer 'vou verificar com nossa equipe' para qualquer dado específico."

**Limite de contexto injetado:** últimas 5 conversas + 10 memórias mais relevantes

---

### Follow-up Agent

**Input:** lead_id + stage atual no pipeline + dias desde último contato + histórico

**Lógica:**
1. Analisa estágio do lead
2. Gera mensagem de acompanhamento adequada ao estágio
3. Nunca repete a última mensagem enviada
4. Detecta se lead esfriou (>14 dias sem resposta) — muda abordagem

**Regra de frequência:**
- Dias 1, 3, 7, 14, 30 após primeiro contato
- Máximo 7 tentativas sem resposta antes de marcar como `cold`

---

### CRM Agent

**Input:** evento (nova conversa, mudança de status, solicitação de update)

**Responsabilidades:**
- Atualizar `contacts.metadata` com novas informações extraídas
- Mover lead no pipeline (Supabase ou Chatwoot)
- Gerar `agent_memories` de fatos novos aprendidos
- Criar resumo de conversa ao final de cada sessão

**Output JSON:**
```json
{
  "contact_update": { "metadata": { "budget": "800k", "timeline": "3 meses" } },
  "new_memories": [
    { "type": "preference", "content": "prefere apartamento, não casa", "confidence": 0.95 }
  ],
  "pipeline_move": { "from": "novo", "to": "qualificado" },
  "conversation_summary": "Lead qualificado, budget de 800k, interesse em aptos 2/3 dorms Brooklin ou Vila Olímpia, prazo 3 meses."
}
```

---

### Marketing Agent

**Input:** brand-profile.json + brief da campanha + plataforma alvo

**Responsabilidades:**
- Gerar copy para Meta, Google, LinkedIn
- Adaptar tom por plataforma
- Sempre validar contra brand-profile.json antes de propor
- Output em formato de deck, não texto corrido

**Vinculação com Claude Ads:**
Usa os sub-skills do projeto Claude Ads: `ads-meta`, `ads-google`, `ads-creative`, `ads-dna`.

---

## Padrões de Integração

### Padrão 1: Enrich-then-Call
Todo workflow que chama Claude deve primeiro enriquecer o contexto:

```
[Webhook] 
  → [SELECT * FROM contacts WHERE phone = $phone]
  → [SELECT content FROM agent_memories WHERE contact_id = $id ORDER BY created_at DESC LIMIT 10]
  → [Montar system prompt + contexto]
  → [POST /v1/messages]
  → [Parsear JSON response]
  → [INSERT INTO messages + agent_outputs]
  → [Enviar resposta ao canal]
```

### Padrão 2: Memory Write
Após toda interação significativa:

```
[Response do agente]
  → [Extrair fatos estruturados (nome, preferências, objeções)]
  → [Gerar embedding via API]
  → [UPSERT agent_memories]
```

### Padrão 3: Conversation Compression
Ao fechar uma conversa (lead respondeu, sessão terminou):

```
[Detectar fim de sessão]
  → [Buscar todas as messages da conversation]
  → [Gerar resumo em 3-5 frases]
  → [UPDATE conversations SET summary = $resumo, ended_at = now()]
```

### Padrão 4: Semantic Context Retrieval
Quando o contexto exato não é suficiente — recuperar por similaridade:

```
[Receber nova mensagem]
  → [Gerar embedding da mensagem]
  → [SELECT content FROM agent_memories ORDER BY embedding <=> $embedding LIMIT 5]
  → [Injetar no prompt como "contexto relevante"]
```

---

## Limites e Restrições

| Recurso | Limite recomendado |
|---------|-------------------|
| Tokens por chamada Claude | Máximo 20k (prompt + response) |
| Mensagens no histórico injetado | Últimas 10 |
| Memórias injetadas por chamada | Máximo 10 (por similarity rank) |
| Tentativas de follow-up por lead | 7 |
| Timeout de workflow n8n | 30 segundos |
| Tamanho máximo de agent_output | 10k caracteres |

---

## Observabilidade

**O que monitorar:**
1. `workflow_runs` — taxa de erro por workflow
2. `agent_outputs` — latência média por agente
3. `messages` — volume por canal por dia
4. `agent_memories` — crescimento da base de memória por contato

**Alertas recomendados (via n8n → Slack):**
- Workflow com >3 erros em 1 hora
- Latência de resposta ao lead > 5 minutos em horário comercial
- Lead qualificado sem follow-up há >3 dias
