# Melhorias Priorizadas — Ecossistema de Agentes
> Baseado em engenharia reversa do Fable 5 + análise do ecossistema atual.
> Ordenado por impacto no negócio (maior → menor).
> Data: 2026-06-25

---

## Legenda de Prioridade

| Prioridade | Significado |
|------------|-------------|
| P0 — Crítico | Sem isso, os agentes são inúteis ou quebram |
| P1 — Alto | Multiplica o valor dos agentes existentes |
| P2 — Médio | Melhora qualidade e confiabilidade |
| P3 — Baixo | Refinamentos e conveniência |

---

## P0 — Crítico (fazer primeiro)

### 1. Persistência de Conversa no Supabase

**Problema atual:** Cada workflow n8n começa do zero. O SDR Agent não sabe o que foi dito na semana passada. Leads precisam repetir informações. Parece um bot burro.

**O que fazer:**
1. Criar tabelas `contacts`, `conversations`, `messages` no Supabase (schema em ARCHITECTURE.md)
2. No início de todo workflow n8n: buscar conversa existente por `phone`
3. No final de todo workflow: salvar mensagem gerada
4. Ao fechar conversa: gerar e salvar `summary`

**Impacto:** Transforma o SDR Agent de chatbot em agente com memória. Diferença de percepção pelo lead é enorme.

**Estimativa:** 1-2 dias de setup no n8n + Supabase.

---

### 2. Router Agent no n8n

**Problema atual:** Toda mensagem que chega ao Chatwoot segue para o mesmo workflow, independente de contexto. Leads com perguntas sobre preço recebem o mesmo fluxo de qualificação que leads prontos para assinar.

**O que fazer:**
1. Criar workflow "Router" no n8n que recebe TODOS os webhooks do Chatwoot
2. Chamar Claude para classificar a intenção (JSON output)
3. Switch node roteia para SDR, Follow-up, CRM ou Support conforme classificação
4. Router também decide se precisa de intervenção humana (alertar no Slack)

**Impacto:** Respostas certas para as perguntas certas. Elimina respostas fora de contexto.

**Estimativa:** 1 dia de desenvolvimento.

---

### 3. CLAUDE.md Global Atualizado

**Problema atual:** O `~/.claude/CLAUDE.md` atual é focado no projeto Claude Ads. Claude Code não tem contexto completo do ecossistema — não sabe sobre n8n, OpenClaw, Hermes ter sido removido.

**O que fazer:**
Copiar `00-Sistema/CLAUDE.md` deste vault para `~/.claude/CLAUDE.md`.

```powershell
Copy-Item "C:\Users\alexa\OneDrive\Documentos\CLAUDE CODE\obsidian-vault\00-Sistema\CLAUDE.md" `
          "C:\Users\alexa\.claude\CLAUDE.md"
```

**Nota:** O conteúdo atual do `~/.claude/CLAUDE.md` é específico do projeto Claude Ads — mover para `C:\Users\alexa\projetos\claude-ads\CLAUDE.md` antes de substituir.

**Impacto:** Claude Code passa a ter contexto correto do ecossistema em toda sessão.

**Estimativa:** 15 minutos.

---

## P1 — Alto Impacto

### 4. Memória Semântica de Leads (pgvector)

**Problema atual:** Mesmo com conversas salvas, encontrar informação relevante requer busca exata (por phone, por id). Não é possível perguntar "quais leads mencionaram objeção de preço nos últimos 30 dias?"

**O que fazer:**
1. Ativar extensão `vector` no Supabase
2. Criar tabela `agent_memories` com coluna `embedding vector(1536)`
3. Após cada resposta de agente: extrair fatos estruturados + gerar embedding via API Anthropic
4. Antes de cada chamada de agente: buscar top-5 memórias por similarity + inject no prompt

**Impacto:** Agentes que "lembram" de preferências, objeções e interesses de cada lead de forma natural. Base para personalização real.

**Estimativa:** 2-3 dias.

---

### 5. SKILL.md para Cada Agente OpenClaw

**Problema atual:** Os agentes no n8n usam prompts de sistema ad hoc, sem estrutura padronizada. Difícil versionar, difícil melhorar, difícil auditar.

**O que fazer:**
1. Criar em `obsidian-vault/Agentes-Operacionais/agents/`:
   - `router-agent.md`
   - `sdr-agent.md`
   - `follow-up-agent.md`
   - `crm-agent.md`
   - `marketing-agent.md`
2. Cada SKILL.md segue o padrão: Role → Tools → Constraints → Output Format → Examples
3. No n8n, o nó de montagem de prompt lê o SKILL.md do agente via n8n Code node ou HTTP para o vault

**Impacto:** Prompts versionados, auditáveis, melhoráveis sem tocar nos workflows.

**Estimativa:** 1 dia para criar os 5 SKILL.md iniciais.

---

### 6. Enriquecimento Obrigatório Antes de Toda Chamada Claude

**Problema atual:** Claude responde com dados de treinamento. Preços de imóveis, taxas, legislação — tudo pode estar desatualizado.

**O que fazer:**
1. Identificar quais workflows precisam de dados frescos
2. Para SDR Agent: buscar últimas transações no bairro de interesse (via web ou API de imóveis)
3. Para Marketing Agent: verificar métricas atuais de campanha antes de sugerir ajustes
4. Padrão: `[Identificar tipo de dado necessário] → [Buscar via HTTP] → [Injetar no prompt como "dados de contexto atual"]`

**Impacto:** Agentes que falam de mercado com dados reais, não inventados.

**Estimativa:** 1-2 dias por domínio.

---

### 7. Sistema de Follow-up Automatizado

**Problema atual:** Follow-up é manual ou não existe. Leads qualificados esfriam por falta de acompanhamento sistemático.

**O que fazer:**
1. Criar workflow n8n com Schedule trigger (roda 2x por dia)
2. Busca no Supabase leads com `status = 'qualificado'` e `last_contact < now() - interval '3 days'`
3. Para cada lead, chama Follow-up Agent para gerar mensagem personalizada
4. Envia via Chatwoot e registra no histórico
5. Após 7 tentativas sem resposta: muda status para `cold` e notifica no Slack

**Impacto:** Nenhum lead qualificado esquecido. Revenue direto.

**Estimativa:** 1-2 dias.

---

## P2 — Médio Impacto

### 8. Alertas Inteligentes no Slack

**Problema atual:** Você descobre problemas quando o cliente já reclamou.

**O que fazer:**
Criar workflow n8n de monitoramento que roda a cada hora:
- Lead qualificado sem resposta há >24h → Slack `#crm-alerts`
- Workflow com >2 erros em 1h → Slack `#n8n-errors`
- Campanha Meta com gasto acima de threshold → Slack `#ads-alerts`
- Lead novo de alto potencial (budget >1M) → Slack `#vip-leads`

**Estimativa:** 4 horas.

---

### 9. Compressão de Contexto por Conversa Longa

**Problema atual:** Conversas longas (>20 mensagens) excedem o que é eficiente injetar no Claude. Não há mecanismo para comprimir.

**O que fazer:**
1. Ao atingir 20 mensagens em uma conversa: gerar resumo dos primeiros 15
2. Salvar resumo em `conversations.summary`
3. A partir daí, injetar: `summary` + últimas 5 mensagens (não o histórico completo)

**Estimativa:** 4 horas.

---

### 10. Output Format JSON Padronizado para Todos os Agentes

**Problema atual:** Cada agente retorna texto livre. n8n precisa fazer parsing frágil com regex.

**O que fazer:**
Definir JSON schema de output para cada agente e forçar no prompt:
```json
{
  "response_text": "...",
  "intent_detected": "...",
  "suggested_action": "send_message | escalate | update_crm | none",
  "memory_to_save": [...],
  "crm_update": {...}
}
```

**Estimativa:** 4 horas por agente (parsear no n8n + ajustar prompt).

---

### 11. Sincronização Obsidian → Supabase para Knowledge Base

**Problema atual:** Conhecimento útil fica preso no Obsidian e não está disponível para os agentes.

**O que fazer:**
1. Criar workflow n8n com File Watch (via webhook ou schedule) que monitora `09-Wiki-Compilado/`
2. Ao detectar mudança: ler arquivo via vault MCP → gerar embedding → upsert em tabela `knowledge_base` no Supabase
3. Agentes podem buscar `knowledge_base` via similarity search

**Estimativa:** 1 dia.

---

### 12. Auditoria de Agente — Dashboard Simples

**Problema atual:** Não há visibilidade sobre o que os agentes estão dizendo ou quantas interações ocorrem.

**O que fazer:**
Usar os dados do Supabase (`agent_outputs`, `workflow_runs`, `messages`) para criar uma view básica:
- Número de leads abordados hoje/semana/mês
- Taxa de conversão por estágio
- Erros por workflow
- Tempo médio de resposta

Pode ser uma query Supabase em um dashboard Retool/Metabase, ou simplesmente um workflow n8n que gera relatório diário e envia pro Slack.

**Estimativa:** 4-8 horas.

---

## P3 — Baixo Impacto (refinamentos)

### 13. Restrições de Domínio por Agente (em vez de safety genérica)

Substituir qualquer safety framework genérico por restrições específicas de negócio em cada SKILL.md.

Exemplos:
- SDR: "Nunca prometer preço, prazo ou disponibilidade sem confirmação"
- CRM: "Nunca expor dados de outros leads"
- Marketing: "Usar apenas informações aprovadas no brand-profile.json"

**Estimativa:** 30 minutos por agente.

---

### 14. Detecção de Lead VIP no Router Agent

Adicionar lógica ao Router Agent para identificar sinais de lead de alto potencial (vocabulário, budget mencionado, urgência) e desviar para fluxo de atenção prioritária + notificação Slack imediata.

**Estimativa:** 4 horas.

---

### 15. Ferramentas de Domínio para Agents (MCP ou HTTP)

Criar ferramentas específicas que os agentes podem "chamar" (via tool_use da API Claude):
- `buscar_imovel(id)` — dados de imóvel específico do CRM
- `verificar_disponibilidade(empreendimento)` — status de unidades
- `calcular_financiamento(valor, entrada, prazo)` — simulador
- `buscar_concorrentes(bairro)` — análise de mercado

**Estimativa:** 1-2 dias.

---

### 16. Template de Onboarding de Novo Lead

Criar workflow n8n que, ao detectar um lead totalmente novo (não existe no Supabase), executa um "checklist de onboarding":
1. Criar registro no Supabase
2. Enviar mensagem de boas-vindas personalizada
3. Fazer 3 perguntas de qualificação (budget, prazo, preferência)
4. Criar primeira memória com respostas

**Estimativa:** 4 horas.

---

## Ordem de Execução Recomendada

```
Semana 1:
  [x] CLAUDE.md global atualizado (P0 - 15 min)
  [ ] Tabelas Supabase criadas (P0 - 4h)
  [ ] Persistência de conversa no n8n (P0 - 1 dia)
  [ ] Router Agent básico (P0 - 1 dia)

Semana 2:
  [ ] SKILL.md dos 5 agentes principais (P1 - 1 dia)
  [ ] Follow-up automatizado (P1 - 1 dia)
  [ ] Output JSON padronizado (P2 - 4h/agente)

Semana 3:
  [ ] pgvector + agent_memories (P1 - 2 dias)
  [ ] Enriquecimento de dados frescos (P1 - 1-2 dias)
  [ ] Alertas no Slack (P2 - 4h)

Semana 4+:
  [ ] Compressão de contexto (P2)
  [ ] Obsidian → Supabase sync (P2)
  [ ] Dashboard de auditoria (P2)
  [ ] Ferramentas de domínio (P3)
```
