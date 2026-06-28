# Auditoria Técnica — Sistema Hermes XD
> Data: 2026-06-18 | Instância: n8n.alexandreborges.site | Auditor: Claude Code

---

## 1. Resumo Executivo

O sistema Hermes XD está **parcialmente operacional**. A infraestrutura está montada (Chatwoot, Postgres, Kanban, Google Calendar, ElevenLabs), mas o workflow principal tem um bug crítico que faz o agente ignorar **100% dos leads reais em produção**. Além disso, 5 dos 9 sub-workflows usados como ferramentas do agente não estão exportados/documentados, tornando impossível auditar o comportamento completo do sistema.

| Dimensão | Status | Nota |
|----------|--------|------|
| Infraestrutura | 🟡 Parcial | Tabelas OK, tokens hardcoded |
| Workflow Principal | 🔴 Com bug crítico | Não atende leads reais |
| Sub-workflows (tools) | 🟡 4/9 exportados | 5 não documentados |
| Captura de Leads | ✅ Funcional | 2 LPs + CRM intake ativos |
| Sync CRM | 🟡 Funcional c/ risco | Sem Respond to Webhook |
| SDR Outbound | ⏸️ Standby | Aguarda LP Hilton |
| Follow-up Automático | ❌ Não existe | A construir |

---

## 2. Inventário de Nodes Fazer.ai Disponíveis

O pacote `@fazer-ai/n8n-nodes-chatwoot` (fazer.ai Pro) oferece nodes nativos que **eliminam a necessidade de HTTP Request manual** para as operações mais comuns do Chatwoot. Este é o diferencial técnico do stack.

### 2.1 Nodes Disponíveis e Operações

| Node | Operação | O que faz | Usado em |
|------|----------|-----------|----------|
| `chatwootTrigger` | `message_incoming` | Dispara ao receber mensagem WhatsApp | Hermes principal |
| `chatwoot` (tool) | `sendMessage` | Envia mensagem de texto ao lead | Hermes principal |
| `chatwoot` (tool) | `sendFile` | Envia áudio (ElevenLabs) ou arquivo | Hermes principal |
| `chatwoot` | `downloadAttachment` | Baixa arquivo de áudio para transcrição Whisper | Pipeline áudio |
| `chatwoot` | `kanbanTask.get` | Busca dados da task (steps, atributos, contato) | 05-Agendar, 09-Reserva |
| `chatwoot` | `kanbanTask.update` | Move step + atualiza atributos da task | 05-Agendar, 09-Reserva |
| `chatwoot` (tool) | `updateTask` | Atualiza campos da task pelo agente (Title, Description, End_Date) | Hermes (tool nativo) |
| `chatwoot` (tool) | `reactMessage` | Coloca emoji de reação na mensagem | Hermes (tool nativo) |

### 2.2 Parâmetros Especiais do sendMessage

O node `sendMessage` do fazer.ai aceita parâmetros que **não existem na API REST padrão**:

| Parâmetro | Valor | Efeito |
|-----------|-------|--------|
| `split_message` | `true` | Divide blocos `\n\n` em mensagens separadas |
| `wait_before_sending` | `dynamic` | Simula tempo de digitação humana entre blocos |
| `isRecordedAudio` | `true` | Marca áudio como gravado (não arquivo) no WhatsApp |

### 2.3 O que ainda usa HTTP Request manual (poderia usar node nativo)

Os sub-workflows exportados (07, 08, 09) usam **HTTP Request direto** para operações que o node fazer.ai já cobre. Isso significa tokens hardcoded e mais código para manter.

| Sub-workflow | Operação | Atual | Deveria usar |
|--------------|----------|-------|--------------|
| 07-Escalar | Aplicar label | httpRequest POST `/labels` | `chatwoot.updateConversation` ou API |
| 07-Escalar | Atribuir Alexandre | httpRequest POST `/assignments` | `chatwoot.updateConversation` |
| 07-Escalar | Enviar mensagem | httpRequest POST `/messages` | `chatwoot.sendMessage` |
| 08-Follow-Up | Enviar mensagem | httpRequest POST `/messages` | `chatwoot.sendMessage` |
| 09-Reserva | Enviar confirmação | httpRequest POST `/messages` | `chatwoot.sendMessage` |
| 09-Reserva | Atualizar atributos | `kanbanTask.update` c/ campos vazios | `kanbanTask.update` com campos corretos |

**Impacto:** Migrando para nodes nativos, eliminamos o token hardcoded em 5 lugares e ganhamos split_message + wait automático.

---

## 3. Auditoria do Workflow Principal (02-Hermes-Roteador-Leads)

### 3.1 Pipeline Completo

```
[Gatilho WhatsApp]
    │ chatwootTrigger (inbox_id=2)
    ▼
[Info] — extrai 20+ campos do payload Chatwoot
    │
    ├─/reset → limpa histórico + atributos + step + labels → reply "Memória resetada."
    ├─/teste → aplica label "testando-agente" → reply "Modo de teste habilitado."
    │
    ▼
[Agente ativado?]  ← 🔴 BUG CRÍTICO
    │ condição: etiquetas notContains "agente-off" AND contains "testando-agente"
    │ resultado: apenas conversas com label "testando-agente" passam
    ▼
[Horário comercial?]  ← 🟡 HARDCODED TRUE
    │
    ▼
[Tipo mensagem?]
    ├─ áudio → [Download] → [Extract] → [Convert] → [Whisper] → [Extrair mensagem]
    └─ texto → [Extrair mensagem]
    │
    ▼
[Enfileirar] → INSERT n8n_fila_mensagens
    │
    ▼
[Esperar 10s]
    │
    ▼
[Buscar fila] → SELECT por telefone ORDER BY timestamp
    │
    ▼
[Mensagem encavalada?]
    │ JS: última mensagem da fila == id deste workflow?
    ├─ NÃO → abandona (retorna [])
    └─ SIM → continua com dedup
    │
    ▼
[Verificar status] → SELECT n8n_status_atendimento WHERE session=telefone
    │
    ▼
[Agente já terminou?]
    │ OR: isEmpty OR lock=false OR runIndex>=5
    ├─ OCUPADO → volta para Esperar (loop até 5x)
    └─ PRONTO ↓
    │
    ▼
[Bloquear status] → lock=true
[Limpar fila] → DELETE n8n_fila_mensagens
[Marcar como lida] → chatwoot mark as read
    │
    ▼
[Resposta referenciada?]
    ├─ SIM → busca contexto da mensagem original
    └─ NÃO ↓
    │
    ▼
[Coletar mensagens do contexto]
    │
    ▼
[Agente Imobiliário GPT-5.2]
    │ memória: n8n_historico_mensagens (50 msgs, key: inbox_id_telefone)
    │ 9 ferramentas (sub-workflows como toolWorkflow)
    │ 3 tools nativas: Refletir (think), Reagir mensagem, Atualizar tarefa
    │
    ▼
[Output válido?]
    ├─ INVÁLIDO → Limpar status → StopAndError
    └─ VÁLIDO ↓
    │
    ▼
[Buscar novas entradas fila]
    ├─ SIM (chegou msg enquanto respondia) → re-processa
    └─ NÃO ↓
    │
    ▼
[Usou tools?] → salva intermediateSteps no Postgres
    │
    ▼
[mensagem_de_audio?]
    ├─ SIM → SSML (gpt-4.1-mini) → ElevenLabs → sendFile
    │         └─ FALLBACK: se ElevenLabs falha → texto
    └─ NÃO → Formatar texto (gpt-4.1-mini) → sendMessage
    │
    ▼
[Limpar status] → lock=false
```

### 3.2 Bugs e Riscos Identificados no Workflow Principal

| ID | Node | Severidade | Problema | Correção |
|----|------|-----------|----------|---------|
| B-01 | `Agente ativado?` | 🔴 CRÍTICO | Condição dupla bloqueia leads reais. `contains "testando-agente"` nunca é true em produção | Remover condição `contains testando-agente`. Manter apenas `notContains agente-off` |
| B-02 | `Horário comercial?` | 🟡 MÉDIO | Node bypassed/hardcoded TRUE. Agente responde 24h sem verificar hora real | Implementar JS com `toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})` |
| B-03 | `Info` | 🟡 MÉDIO | `alerta_conversation_id=90` hardcoded (provavelmente sobra de teste) | Remover ou parametrizar |
| B-04 | `Resetar task` | 🟡 MÉDIO | Tenta limpar 17 atributos de seguros (ramo, operadora, premio_mensal...) que não existem | Substituir pela lista de atributos imobiliários reais |
| B-05 | `session_key lock` | 🟡 BAIXO | Lock usa `telefone` apenas; memória usa `inbox_id + '_' + telefone` | Padronizar para `inbox_id + '_' + telefone` nos dois |
| B-06 | Tool `07. Escalar Alexandre` | 🟡 MÉDIO | ID na semente: `qOyuDrytX5GnVva7`; no arquivo exportado: `HQr37y9CEfriRkd4`. Um está errado | Verificar no n8n qual ID é real e corrigir semente |

---

## 4. Auditoria dos Sub-workflows (Ferramentas do Agente)

### 4.1 Status Geral

| # | Nome | ID n8n | Exportado | Auditado | Usa node fazer.ai | Token hardcoded |
|---|------|--------|-----------|----------|-------------------|-----------------|
| 01 | 02-Informacoes | 5yqbPEIEAHWRKuLm | ❌ | ❌ | ? | ? |
| 02 | 02b-Simular-ROI | h21Hv4e2HfISf45m | ❌ | ❌ | ? | ? |
| 03 | 03-Enviar-Proposta | swXlsuJ4ukfx8OeF | ❌ | ❌ | ? | ? |
| 04 | 04-Verificar-Disponibilidade | CP6f2tCXalIJoLRN | ❌ | ❌ | ? | ? |
| 05 | 05-Agendar-Visita | geLNi1Kw0VmXkk0M | ✅ | ✅ | ✅ kanbanTask.get/update | ✅ sim |
| 06 | 06-Cancelar-Interesse | h1xS3Z9xenaFjj1d | ❌ | ❌ | ? | ? |
| 07 | 07-Escalar-Alexandre | HQr37y9CEfriRkd4? | ✅ | ✅ | ❌ usa httpRequest | ✅ sim |
| 08 | 08-Follow-Up | 87LFS2eSGiiKEdE7 | ✅ | ✅ | ❌ usa httpRequest | ✅ sim |
| 09 | 09-Gerar-Reserva | LP5qzJBbxAD0W5FH | ✅ | ✅ | ✅ kanbanTask.get/update | ✅ sim |

**5 de 9 sub-workflows não exportados** — o comportamento real deles é desconhecido.

### 4.2 Auditoria dos Sub-workflows Exportados

#### 05 — Agendar Visita ✅
- **Funciona bem:** freeBusy check + criação de evento + move Kanban por nome (robusto)
- **Riscos:** offset -03:00 hardcoded (horário de verão), duração fixa de 1h, `onError: continueRegularOutput` em nodes críticos ignora falhas silenciosamente
- **Melhoria:** usar node nativo `sendMessage` no lugar do httpRequest final

#### 07 — Escalar Alexandre 🟡
- **Funciona:** labels + assign + step 34 + horário comercial + nota privada
- **Risco principal:** todos os 5 httpRequests têm `onError: continueRegularOutput` — se Chatwoot retornar 401 (token inválido), o fluxo continua sem avisar
- **Versão Simples:** existe `07-Escalar-Alexandre-Simples.json` que NÃO faz label/assign/step. Qual versão está conectada ao agente?
- **Melhoria:** substituir httpRequests por nodes nativos fazer.ai

#### 08 — Follow-Up 🟡
- **Funciona:** 4 tipos de mensagem + mensagem_custom override
- **Risco:** sem verificação de horário comercial — envia a qualquer hora
- **Melhoria:** adicionar verificação de horário antes de enviar; usar node nativo

#### 09 — Gerar Reserva 🔴
- **Bug confirmado:** node `Atualizar atributos tarefa` tem `updateFields VAZIO` — `numero_proposta` e `valor_venda` não estão sendo salvos
- **Risco:** step "Em Negociacao" buscado por nome — se step_id null, PATCH falha silenciosamente
- **Melhoria:** corrigir updateFields + verificar se step foi encontrado antes de mover

---

## 5. Auditoria dos Workflows de Captura e Sync

### 5.1 — 01-Captura-Landing-The-Spot-One ✅
- Webhook `/webhook/the-spot-one-lead`
- Campos: nome, whatsapp, email, cidade
- Cria contato + conversa no Chatwoot, label `the-spot-one-landing`
- **Status:** Funcional

### 5.2 — 01-Captura-Landing-Lotus-Business ✅
- Webhook `/webhook/lotus-lead`
- Campos: nome, whatsapp, **perfil**, cidade (sem email — diferente do The Spot One)
- Label `lotus-landing`
- **Divergência:** campo `perfil` ao invés de `email` — pode causar inconsistência no CRM
- **Status:** Funcional mas com campo diferente

### 5.3 — 01-CRM-XD-PRO-Lead-Intake ✅
- Receptor interno chamado por ambas as LPs acima
- POST leads Supabase → GPT-4o-mini gera `resumo_ia` → PATCH de volta
- **Atenção:** dois valores de Supabase anon key detectados entre workflows (datas de `iat` diferentes)
- **Status:** Funcional

### 5.4 — 04-Sync-Steps-CRM 🟡
- Webhook `/crm-step-sync`
- CRM XD PRO → extrai phone + step_id → POST para CRM webhook
- **Status:** Funcional

### 5.5 — 04-Sync-Chatwoot-Supabase 🟡
- Webhook `chatwoot-crm-sync`
- Chatwoot board_step_id change → Supabase PATCH
- **Bug:** sem node `Respond to Webhook` — Chatwoot pode timeout após 30s
- Mapeamento de steps: `{30→lead_novo, 31→em_contato, 32→visita_agendada, 33→proposta_enviada, 34→em_negociacao, 35/36→fechado, 37→perdido, 38→lead_novo}`
- **Status:** Funcional mas com risco de timeout

---

## 6. Auditoria de Credenciais e Variáveis

### 6.1 Credenciais n8n (IDs das credentials)

| Serviço | Credential ID | Onde é usada |
|---------|---------------|--------------|
| Chatwoot (fazer.ai node) | `Oganm2I5WSEBasX4` | Trigger, kanbanTask, sendFile |
| OpenAI | `6G79NMutiZQYhCC1` | Agente GPT-5.2, Whisper, formatação |
| Postgres | `1cqlgjrWeup8stbp` | Memória, fila, lock |
| ElevenLabs | `ZohXn1MkfFNOjH5L` | Geração de áudio |
| Google Calendar | `uqH5AeK7xR8aN0Xf` | freeBusy + criação de evento |

### 6.2 Tokens Hardcoded (risco de segurança e manutenção)

| Token | Valor parcial | Occorrências | Impacto se rotacionado |
|-------|---------------|--------------|------------------------|
| Chatwoot API token | `i8sWiqTrcAyAQbRnVekJavXQ` | 5+ workflows | Todos os sub-workflows param |
| Supabase anon key v1 | `iat: ...` | 01-Captura-The-Spot-One | Captura LP para |
| Supabase anon key v2 | `iat: diferente` | 01-CRM-XD-PRO | CRM intake para |

**Ação necessária:** criar variáveis de ambiente no n8n e referenciar via `{{ $env.CHATWOOT_TOKEN }}`.

---

## 7. Auditoria das Tabelas Postgres

| Tabela | Campos conhecidos | Função | Risco |
|--------|-------------------|--------|-------|
| `n8n_historico_mensagens` | session_id, type, content, tool_calls | Memória do agente (50 msgs) | Sem limpeza automática — crescimento ilimitado |
| `n8n_fila_mensagens` | telefone, mensagem, timestamp, id_mensagem | Anti-encavalamento | Sem TTL — mensagens antigas acumulam |
| `n8n_status_atendimento` | session_id, lock_conversa, updated_at | Lock de atendimento | Lock pode travar se workflow abortar sem limpar |

**Risco de lock travado:** se o workflow falhar após `lock=true` e antes de `lock=false`, a conversa fica bloqueada. Sem job de limpeza automática.

---

## 8. Matriz de Risco Consolidada

| ID | Componente | Severidade | Categoria | Impacto | Esforço de Correção |
|----|-----------|-----------|-----------|---------|---------------------|
| R-01 | Filtro `Agente ativado?` | 🔴 CRÍTICO | Bug | Sistema não atende nenhum lead real | Baixo — 1 clique no n8n |
| R-02 | 5 sub-workflows não exportados | 🔴 ALTO | Visibilidade | Comportamento desconhecido em produção | Médio — export + doc |
| R-03 | `09-Gerar-Reserva` updateFields vazio | 🔴 ALTO | Bug | Dados de proposta não salvos no Kanban | Baixo — corrigir campos |
| R-04 | Tokens hardcoded (5+ lugares) | 🟡 MÉDIO | Segurança | Rotação de token derruba tudo | Médio — env vars n8n |
| R-05 | `04-Sync` sem Respond to Webhook | 🟡 MÉDIO | Confiabilidade | Chatwoot timeout, sync pode falhar | Baixo — 1 node |
| R-06 | ID sub-workflow 07 divergente | 🟡 MÉDIO | Bug | Escalada pode chamar workflow errado | Baixo — verificar no n8n |
| R-07 | `Horário comercial?` hardcoded TRUE | 🟡 MÉDIO | Funcional | Hermes responde 24h (pode ser desejável por ora) | Baixo — JS de data |
| R-08 | `onError: continueRegularOutput` em sub-workflows | 🟡 MÉDIO | Confiabilidade | Erros silenciosos — difícil diagnosticar | Médio — adicionar error handling |
| R-09 | Lock travado sem job de limpeza | 🟡 MÉDIO | Confiabilidade | Conversa pode ficar bloqueada após falha | Médio — cron de limpeza |
| R-10 | `/reset` limpa atributos de seguros | 🟡 BAIXO | Ruído | Erros no log, não afeta fluxo | Baixo — lista de campos |
| R-11 | Supabase anon key divergente entre workflows | 🟡 BAIXO | Manutenção | Confusão em manutenção futura | Baixo — padronizar |
| R-12 | Follow-up sem controle de horário | 🟡 BAIXO | Funcional | Mensagens fora do horário | Baixo — condicional |
| R-13 | Sem follow-up automático (cron) | 🟠 LACUNA | Feature | Leads frios perdidos | Alto — novo workflow |
| R-14 | LP Hilton não existe | 🟠 LACUNA | Feature | Sem captação Hilton | Alto — nova LP |
| R-15 | SDR Hilton em standby | 🟠 LACUNA | Feature | Hilton sem SDR ativo | Médio — ativar após LP |

---

## 9. Mapa de Dependências

```
LEADS
  └─ LP The Spot One ──────────────────────────┐
  └─ LP Lótus Business ────────────────────────┤
  └─ LP Hilton [NÃO EXISTE] ──────────────────→│ 01-CRM-XD-PRO-Lead-Intake
                                                │    └─ Supabase (leads)
                                                │         └─ SDR Hilton [STANDBY]
                                                │              └─ Chatwoot (conversa)
                                                ↓
CHATWOOT (inbox_id=2)
  └─ chatwootTrigger → Hermes XD [BUG ATIVO]
       └─ 9 ferramentas (sub-workflows):
            ├─ 02-Informacoes          [NÃO EXPORTADO]
            ├─ 02b-Simular-ROI         [NÃO EXPORTADO]
            ├─ 03-Enviar-Proposta      [NÃO EXPORTADO]
            ├─ 04-Verificar-Disp.      [NÃO EXPORTADO]
            ├─ 05-Agendar-Visita       [✅ auditado]
            ├─ 06-Cancelar-Interesse   [NÃO EXPORTADO]
            ├─ 07-Escalar-Alexandre    [✅ auditado — ID a verificar]
            ├─ 08-Follow-Up            [✅ auditado — sem horário]
            └─ 09-Gerar-Reserva        [✅ auditado — bug updateFields]

SYNC
  └─ Chatwoot Kanban → 04-Sync-Chatwoot-Supabase [sem Respond]
  └─ CRM XD PRO → 04-Sync-Steps-CRM [✅ ok]

AUTOMAÇÃO
  └─ Follow-up Cron [NÃO EXISTE]
```

---

## 10. Plano de Ação Estruturado

Com base na auditoria, as ações estão ordenadas por **impacto imediato**.

### Ação Imediata (hoje, < 30min)

| # | Ação | Onde | Risco se não feito |
|---|------|------|-------------------|
| A-01 | Remover condição `testando-agente` no filtro | n8n → Hermes → `Agente ativado?` | Sistema continua ignorando leads |
| A-02 | Adicionar node `Respond to Webhook` com `{"status":"ok"}` | n8n → `04-Sync-Chatwoot-Supabase` | Sync falha por timeout |
| A-03 | Verificar qual ID existe para WF-07 | n8n → buscar por ID qOyuDrytX5GnVva7 e HQr37y9CEfriRkd4 | Escalada chama workflow inexistente |

### Ação de Limpeza (1-2h)

| # | Ação | Onde |
|---|------|------|
| A-04 | Criar variáveis de ambiente n8n: `CHATWOOT_TOKEN`, `SUPABASE_ANON_KEY` | n8n Settings → Variables |
| A-05 | Substituir token hardcoded em 07, 07-Simples, 08, 09, 04-Sync | Cada sub-workflow |
| A-06 | Corrigir `updateFields` em 09-Gerar-Reserva (adicionar `numero_proposta`, `valor_venda`) | n8n → 09-Gerar-Reserva |
| A-07 | Corrigir `/reset` — substituir atributos de seguros pelos corretos da imobiliária | n8n → Hermes → node `Resetar task` |
| A-08 | Implementar horário comercial real (JS) em `Horário comercial?` | n8n → Hermes |

### Ação de Documentação (2-4h)

| # | Ação |
|---|------|
| A-09 | Exportar 5 sub-workflows faltando do n8n (02, 02b, 03, 04, 06) |
| A-10 | Documentar cada um no vault no padrão dos existentes |
| A-11 | Verificar se sub-workflows 07-Simples vs 07-Completo — qual está wired no agente |
| A-12 | Atualizar INDEX.md com status auditado de cada componente |

### Construção (4-8h)

| # | Ação |
|---|------|
| A-13 | Criar landing page Hilton (HTML + webhook n8n `/webhook/hilton-lead`) |
| A-14 | Ativar SDR Hilton Outbound após LP online |
| A-15 | Criar workflow cron follow-up automático (verifica conversas >24h sem resposta) |

### Melhorias Técnicas (opcional, após estabilização)

| # | Ação | Benefício |
|---|------|-----------|
| A-16 | Migrar sub-workflows 07, 08 de httpRequest para nodes nativos fazer.ai | Elimina tokens; ganha split_message e wait dinâmico |
| A-17 | Adicionar job de limpeza de lock travado (cron a cada 30min) | Evita conversas bloqueadas após falhas |
| A-18 | Adicionar error output explícito nos sub-workflows (substituir `continueRegularOutput`) | Diagnóstico de falhas mais fácil |
| A-19 | Padronizar session_key em lock e memória Postgres | Consistência no sistema |

---

## 11. Nodes Fazer.ai — Oportunidades de Refatoração

Os sub-workflows 07 e 08 foram construídos com HTTP Request manual. Abaixo o mapeamento de como cada operação poderia usar o node nativo:

### 07-Escalar-Alexandre (refatoração proposta)

```
ANTES (httpRequest manual)          DEPOIS (node nativo fazer.ai)
─────────────────────────────       ────────────────────────────────
POST /labels                    →   chatwoot.updateConversation (labels)
POST /assignments               →   chatwoot.updateConversation (assignee)
PATCH /kanban/tasks/{id}        →   chatwoot.kanbanTask.update (step_id)
POST /messages (cliente)        →   chatwoot.sendMessage (split_message=true)
POST /messages (nota privada)   →   chatwoot.sendMessage (private=true)
```

**Ganho:** sem token hardcoded, mensagens com split_message automático, código menor.

### 08-Follow-Up (refatoração proposta)

```
ANTES                               DEPOIS
─────────────────────────────       ────────────────────────────────
POST /messages                  →   chatwoot.sendMessage (split_message=true, wait_before_sending=dynamic)
```

**Ganho:** mensagem enviada em blocos com timing humano — mais natural para o lead.

---
*Documento gerado via auditoria manual assistida. Próxima revisão: após correção dos itens A-01 a A-03.*
