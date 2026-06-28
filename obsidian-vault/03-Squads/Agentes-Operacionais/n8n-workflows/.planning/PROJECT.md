# Sistema Hermes XD — Automação Imobiliária Completa

## What This Is

Sistema de automação comercial para Alexandre Borges, corretor imobiliário (CRECI-SC 45148, Itapema/SC), construído sobre N8N + Chatwoot + CRM XD PRO + Supabase. O núcleo é o **agente Hermes XD** — um SDR imobiliário inteligente que atende leads no WhatsApp via GPT-5.2, qualifica perfil, agenda visitas, envia propostas e escala para Alexandre quando necessário.

## Core Value

**Leads chegam pela landing page → Hermes XD atende no WhatsApp autonomamente → Alexandre só fecha a venda.**

Sem isso, Alexandre responde manualmente cada mensagem, perde leads fora do horário e não escala. Com isso funcionando, o sistema opera 24/7 e Alexandre foca em negociar e fechar.

## Context

### Quem
- **Alexandre Borges** — corretor imobiliário, CRECI-SC 45148, Itapema/SC
- Operador único do sistema (não há equipe técnica interna)

### Stack Existente
| Componente | Endpoint / Config |
|------------|-------------------|
| N8N | n8n.alexandreborges.site |
| Chatwoot | chatwoot.alexandreborges.site · account_id=1 · inbox_id=2 |
| WhatsApp | +5547988695350 (Fone Escritório HK9) |
| Supabase | supabase.alexandreborges.site · tabela: leads |
| CRM XD PRO | Next.js 16 + Supabase (C:\Users\alexa\projetos\crm-xd-pro) |
| Postgres | n8n_historico_mensagens · n8n_fila_mensagens · n8n_status_atendimento |
| Kanban | board_id=5 · steps 30-38 |
| GPT Agente | gpt-5.2 (Hermes) · gpt-4o-mini (CRM intake) · gpt-4.1-mini (SSML/texto) |
| ElevenLabs | Voz IKne3meq5aSn9XLyUdCD · eleven_flash_v2_5 |
| Google Calendar | OAuth2 · calendário primary (Alexandre) |

### Produtos Vendidos
- Hilton Garden Inn Itapema (multipropriedade)
- Hilton Residencial (residencial + pool locação)
- Hilton Hotel (hotelaria)
- Shopping Center Hilton (salas comerciais)
- MedCenter Hilton (salas clínicas)
- Lótus Business (centro empresarial corporativo)
- The Spot One (investimento / moradia / locação)
- Casa de alto padrão no Condomínio Plaza, Itapema

### Estado Atual dos Workflows
- ✅ `00-Setup-Infraestrutura` — executado (tabelas e Kanban criados)
- ✅ `01-Captura-Landing-The-Spot-One` — ativo
- ✅ `01-Captura-Landing-Lotus-Business` — ativo
- ✅ `01-CRM-XD-PRO-Lead-Intake` — ativo
- ⚠️ `02-Hermes-Roteador-SEMENTE` — ativo mas com bugs críticos
- ⏸️ `03-SDR-Hilton-Outbound` — standby (aguarda LP Hilton)
- ✅ `04-Sync-Steps-CRM` — ativo
- ✅ `04-Sync-Chatwoot-Supabase` — ativo
- ✅ `05-Agendar-Visita` (sub) — documentado
- ✅ `07-Escalar-Alexandre` (sub) — documentado
- ✅ `08-Follow-Up` (sub) — documentado
- ✅ `09-Gerar-Reserva` (sub) — documentado
- ❌ `02-Informacoes` (sub) — não exportado
- ❌ `02b-Simular-ROI` (sub) — não exportado
- ❌ `03-Enviar-Proposta` (sub) — não exportado
- ❌ `04-Verificar-Disponibilidade` (sub) — não exportado
- ❌ `06-Cancelar-Interesse` (sub) — não exportado

## Bugs Críticos (Produção)

| # | Node | Problema | Impacto |
|---|------|----------|---------|
| 🔴 | `Agente ativado?` | Exige label `testando-agente` — leads reais são ignorados | **Sistema não responde nenhum lead real** |
| 🟡 | `07-Escalar-Alexandre` | ID divergente: semente usa `qOyuDrytX5GnVva7`, sumário usa `HQr37y9CEfriRkd4` | Escalada pode falhar silenciosamente |
| 🟡 | `09-Gerar-Reserva` | `updateFields` vazio — atributos não são persistidos | Proposta registrada sem dados |
| 🟡 | `/reset` | Limpa 17 atributos de "seguros" (de outro projeto) | Ruído/erros no reset |
| 🟡 | Tokens hardcoded | `CHATWOOT_TOKEN` e Supabase anon key no código | Difícil de manter, risco de segurança |
| 🟡 | `Horário comercial?` | Hardcoded TRUE — agente responde 24h | Sem restrição de horário real |
| 🟡 | `04-Sync-Chatwoot-Supabase` | Sem `Respond to Webhook` — Chatwoot pode timeout | Sync pode falhar silenciosamente |

## Requirements

### Validated (já existe e funciona)

- ✓ Webhook de captura de leads (The Spot One + Lótus Business)
- ✓ Criação de contato e conversa no Chatwoot ao capturar lead
- ✓ Fila anti-encavalamento de mensagens (Postgres, 10s)
- ✓ Lock de atendimento por sessão (telefone)
- ✓ Transcrição de áudio via Whisper
- ✓ Resposta em áudio (ElevenLabs) com fallback texto
- ✓ Memória de conversas no Postgres (50 mensagens de contexto)
- ✓ Agendamento de visitas com Google Calendar (freeBusy + criação)
- ✓ Sync bidirecional Kanban ↔ Supabase CRM
- ✓ Sub-workflow Follow-Up com 4 tipos de mensagem

### Active (a construir/corrigir)

- [ ] Filtro `Agente ativado?` corrigido para produção
- [ ] Sub-workflow 07 com ID verificado e testado
- [ ] `09-Gerar-Reserva` com updateFields funcionando
- [ ] `/reset` limpo (sem atributos de seguros)
- [ ] Tokens em variáveis de ambiente n8n
- [ ] `Horário comercial?` com lógica real implementada
- [ ] `04-Sync-Chatwoot-Supabase` com Respond to Webhook
- [ ] 5 sub-workflows exportados e documentados no vault
- [ ] Landing page Hilton online com captura de leads
- [ ] SDR Hilton ativo processando leads
- [ ] Cron de follow-up automático (leads sem resposta >24h)
- [ ] Follow-up agendado por tipo (proposta, visita, negociação)

### Out of Scope

- Integração bancária — não planejado
- CRM customizado além do CRM XD PRO — Alexandre já usa esse
- Multi-idiomas — apenas português
- App mobile — sistema é web/WhatsApp

## Key Decisions

| Decisão | Racional | Outcome |
|---------|----------|---------|
| Bugs antes de features | Sistema atualmente não responde leads reais | Fase 1 = correções críticas |
| LP Hilton antes de ativar SDR | SDR precisa de source de leads para processar | Fase 3 = LP, Fase 4 = SDR |
| Cron n8n para follow-up | Independente do agente, roda mesmo sem mensagem nova | Fase 5 = cron schedule |
| YOLO mode | Alexandre conhece o sistema, quer executar rápido | Auto-approve nas fases |
| Tokens em env vars n8n | Segurança e manutenção — token único para todos workflows | Fase 1 |

## Evolution

Este documento evolui em cada transição de fase.

**Após cada fase:**
1. Requisitos validados? → Mover para Validated
2. Novos requisitos emergiram? → Adicionar em Active
3. Decisões tomadas? → Adicionar em Key Decisions

---
*Inicializado em 2026-06-18 via /gsd-new-project*
