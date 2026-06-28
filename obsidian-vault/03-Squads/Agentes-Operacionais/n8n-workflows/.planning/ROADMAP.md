# Roadmap — Sistema Hermes XD

> Gerado em 2026-06-18 | 5 fases | 24 requisitos mapeados

---

## Visão Geral

| # | Fase | Meta | Requisitos | Critérios de Sucesso |
|---|------|------|------------|----------------------|
| 1 | Estabilização | Sistema responde leads reais sem bugs | BUGFIX-01..05, ENV-01..04 | 5 |
| 2 | Sub-workflows Completos | 9 ferramentas do Hermes documentadas e testadas | SUB-01..06 | 3 |
| 3 | Landing Page Hilton | Hilton captura leads e alimenta o Hermes | LP-01..03 | 4 |
| 4 | SDR Hilton Ativo | Leads Hilton sendo abordados automaticamente | SDR-01..04 | 4 |
| 5 | Follow-up Automático | Sistema reengaja leads frios sem intervenção | FU-01..04 | 4 |

---

## Phase 1: Estabilização do Sistema

**Meta:** O agente Hermes responde leads reais, tokens estão em variáveis de ambiente, e todos os workflows secundários funcionam corretamente.

**Por que primeiro:** O sistema atualmente ignora 100% dos leads reais devido ao filtro de teste. Sem corrigir isso, nada mais importa.

### Requisitos
- [ ] BUGFIX-01 — Corrigir filtro `Agente ativado?`
- [ ] BUGFIX-02 — Verificar e corrigir ID sub-workflow 07
- [ ] BUGFIX-03 — Corrigir `updateFields` em 09-Gerar-Reserva
- [ ] BUGFIX-04 — Limpar `/reset` de atributos de seguros
- [ ] BUGFIX-05 — Adicionar Respond to Webhook em 04-Sync-Chatwoot-Supabase
- [ ] ENV-01 — CHATWOOT_TOKEN em variável de ambiente n8n
- [ ] ENV-02 — Supabase anon key em variável de ambiente n8n
- [ ] ENV-03 — Horário comercial com lógica real (seg-sáb 8h-20h)
- [ ] ENV-04 — session_key padronizado entre lock e memória Postgres

### Plano 1.1 — Bug Fixes
1. Acessar n8n → workflow 02-Hermes-Roteador-Leads → node `Agente ativado?`
2. Remover condição `etiquetas contains testando-agente` (manter apenas `notContains agente-off`)
3. Verificar qual ID existe no n8n para workflow 07 → atualizar toolWorkflow no agente
4. Abrir `09-Gerar-Reserva` → node `Atualizar atributos tarefa` → adicionar campos `numero_proposta` e `valor_venda`
5. Abrir workflow principal → node `Resetar task` → remover os 17 campos de seguros, manter apenas campos imobiliários
6. Abrir `04-Sync-Chatwoot-Supabase` → adicionar node `Respond to Webhook` com `{"status": "ok"}` ao final

### Plano 1.2 — Variáveis de Ambiente
1. Em n8n Settings → Variables: criar `CHATWOOT_TOKEN=i8sWiqTrcAyAQbRnVekJavXQ`
2. Criar `SUPABASE_ANON_KEY=<anon key>` (verificar qual dos dois valores é o correto)
3. Substituir hardcoded em: 07-Escalar-Alexandre, 07-Escalar-Simples, 08-Follow-Up, 09-Gerar-Reserva, 04-Sync
4. Implementar node `Horário comercial?` com JS real: `new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})` → verificar hora e dia
5. Decidir session_key: padronizar para `inbox_id + '_' + telefone` em ambos lock e memória

### Critérios de Sucesso Phase 1
1. Enviar mensagem WhatsApp real → Hermes responde (sem label `testando-agente`)
2. `/reset` executado → sem erros de campos inexistentes
3. Proposta registrada → Kanban mostra atributos `numero_proposta` e `valor_venda` preenchidos
4. Chatwoot envia evento board_step_id → Supabase atualizado sem timeout
5. `n8n.alexandreborges.site → Settings → Variables` mostra CHATWOOT_TOKEN e SUPABASE_ANON_KEY

---

## Phase 2: Sub-workflows Completos

**Meta:** Os 5 sub-workflows faltando estão exportados, documentados no vault e testados. O Hermes tem todas as 9 ferramentas funcionando.

**Por que segundo:** Antes de trazer novos leads (LP Hilton), o agente deve estar completo para atendê-los adequadamente.

### Requisitos
- [ ] SUB-01 — 02-Informacoes exportado e documentado
- [ ] SUB-02 — 02b-Simular-ROI exportado e documentado
- [ ] SUB-03 — 03-Enviar-Proposta exportado e documentado
- [ ] SUB-04 — 04-Verificar-Disponibilidade exportado e documentado
- [ ] SUB-05 — 06-Cancelar-Interesse exportado e documentado
- [ ] SUB-06 — Todos os 9 sub-workflows testados com pin data

### Plano 2.1 — Exportar e Documentar
1. No n8n, acessar cada workflow pelos IDs: 5yqbPEIEAHWRKuLm, h21Hv4e2HfISf45m, swXlsuJ4ukfx8OeF, CP6f2tCXalIJoLRN, h1xS3Z9xenaFjj1d
2. Exportar cada um como JSON e salvar em `02-Hermes-Roteador-Leads/sub-workflows/`
3. Para cada um, criar versão documentada no mesmo padrão dos existentes (campos, fluxo, inputs, observações)
4. Atualizar INDEX.md com status ✅ para cada sub-workflow
5. Usar "Test with pin data" no n8n para validar I/O de cada sub-workflow

### Critérios de Sucesso Phase 2
1. `ls sub-workflows/` mostra 9 arquivos JSON (não 4)
2. Cada sub-workflow tem `tipo: "sub_workflow_ferramenta"` documentado
3. Test pin data retorna `{status: "..."}` correto para cada ferramenta
4. INDEX.md atualizado sem entradas ❌

---

## Phase 3: Landing Page Hilton

**Meta:** Formulário Hilton online, coletando leads e alimentando o Hermes via webhook n8n → Chatwoot.

**Por que terceiro:** Hilton é o produto flagship. Sem LP, o SDR não tem source de leads. A LP precisa existir antes de ativar o SDR.

### Requisitos
- [ ] LP-01 — Landing page Hilton online com formulário
- [ ] LP-02 — Webhook n8n `/webhook/hilton-lead` processando leads
- [ ] LP-03 — Integração com CRM XD PRO (Supabase + GPT summary)

### Plano 3.1 — Criar LP e Webhook
1. Criar `01-Captura-Landing-Hilton.json` baseado em `01-Captura-Landing-The-Spot-One.json`
   - Webhook: `/webhook/hilton-lead`
   - Campos: nome, whatsapp, cidade, produto_interesse (enum: hotel/residencial/comercial/medcenter)
   - Label Chatwoot: `hilton-landing`
   - Mensagem boas-vindas: apresentar Complexo Hilton Itapema
2. Criar HTML/CSS da landing page com:
   - Hero section: Complexo Hilton Itapema
   - Cards dos produtos (Hotel, Residencial, Shopping, MedCenter)
   - Formulário de captura com campo produto de interesse
   - POST para `n8n.alexandreborges.site/webhook/hilton-lead`
3. Hospedar LP (Vercel ou VPS existente)
4. Conectar ao `01-CRM-XD-PRO-Lead-Intake` via executeWorkflow

### Critérios de Sucesso Phase 3
1. LP acessível em URL pública, carrega em < 3s
2. Formulário submetido → lead aparece no Chatwoot com label `hilton-landing` em < 30s
3. Lead aparece no Supabase com `resumo_ia` preenchido pelo GPT
4. Kanban mostra novo card em "Novo Lead" com dados do lead Hilton

---

## Phase 4: SDR Hilton Ativo

**Meta:** Leads Hilton capturados pela LP são abordados automaticamente pelo SDR com mensagem personalizada por perfil.

**Por que quarto:** Com a LP gerando leads, o SDR pode começar a processá-los. Fase depende da Phase 3.

### Requisitos
- [ ] SDR-01 — `03-SDR-Hilton-Outbound` ativado
- [ ] SDR-02 — Classificação por perfil Hilton (hotelaria/residencial/comercial/saúde)
- [ ] SDR-03 — Labels Chatwoot por perfil
- [ ] SDR-04 — Lead marcado como processado no Supabase

### Plano 4.1 — Ativar e Configurar SDR
1. Abrir `03-SDR-Hilton-Outbound` no n8n
2. Atualizar filtro Supabase: `origem=hilton-landing` e `status=nao_processado`
3. Configurar GPT-4o mini para classificar por produto (hotel / residencial / comercial / medcenter)
4. Mapear labels Chatwoot: `hilton-hotel`, `hilton-residencial`, `hilton-comercial`, `hilton-medcenter`
5. Adicionar PATCH Supabase marcando lead como `processado=true`
6. Ativar o workflow (Schedule: a cada 15min)
7. Verificar logs de execução nas primeiras 24h

### Critérios de Sucesso Phase 4
1. Lead enviado pelo formulário Hilton → recebe mensagem WhatsApp em < 15min
2. Label no Chatwoot reflete produto de interesse correto
3. Lead no Supabase com `processado=true` após abordagem
4. Hermes XD responde quando lead responde ao SDR

---

## Phase 5: Follow-up Automático

**Meta:** Sistema reengaja leads que pararam de responder, sem intervenção manual de Alexandre.

**Por que quinto:** Com o sistema funcionando e leads entrando, o follow-up é o que fecha o gap de receita (leads quentes que esfriaram).

### Requisitos
- [ ] FU-01 — Cron job n8n a cada 2h em horário comercial
- [ ] FU-02 — Tipo de follow-up por estágio Kanban
- [ ] FU-03 — Limite de 3 follow-ups por conversa
- [ ] FU-04 — Respeita horário comercial seg-sáb 8h-20h

### Plano 5.1 — Workflow de Follow-up Automático
1. Criar novo workflow `05-Follow-Up-Automatico-Cron.json`
2. Trigger: Schedule (a cada 2h, apenas seg-sáb 8h-20h)
3. Buscar no Chatwoot: conversas abertas sem mensagem há >24h
   - Query: last_activity_at < now() - interval '24 hours'
   - Status: open, não atribuída ao Alexandre (escaladas não fazem follow-up automático)
4. Para cada conversa: verificar atributo `followup_count` (default 0)
   - Se followup_count >= 3: pular (lead frio, Alexandre decide manualmente)
   - Se followup_count < 3: chamar sub-workflow `08-Follow-Up` com tipo baseado no step Kanban
5. Incrementar `followup_count` no atributo da conversa
6. Logar execução (quem recebeu, qual tipo, resultado)

### Critérios de Sucesso Phase 5
1. Lead sem resposta por 24h recebe mensagem de follow-up automaticamente
2. Tipo de follow-up correto para cada estágio (proposta → tipo proposta, etc.)
3. Lead com 3 follow-ups não recebe mais (apenas nota privada para Alexandre)
4. Sem follow-ups fora de seg-sáb 8h-20h (verificar logs de execução)

---

## Dependências entre Fases

```
Phase 1 (Estabilização)
  └── Phase 2 (Sub-workflows)
        └── Phase 3 (LP Hilton)
              └── Phase 4 (SDR Hilton)
                    └── Phase 5 (Follow-up)
```

Todas as fases são sequenciais — cada uma depende da anterior.

---

## Estimativas

| Fase | Complexidade | Estimativa |
|------|--------------|------------|
| Phase 1 | Baixa (configuração) | 2-4h |
| Phase 2 | Baixa (export + doc) | 1-2h |
| Phase 3 | Média (LP + webhook) | 4-8h |
| Phase 4 | Baixa (ativar + config) | 1-2h |
| Phase 5 | Média (novo workflow) | 3-5h |
| **Total** | | **11-21h** |

---
*Criado em 2026-06-18 | Sistema: Hermes XD | Corretor: Alexandre Borges CRECI-SC 45148*
