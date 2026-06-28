# Requisitos — Sistema Hermes XD

> Gerado em 2026-06-18 via /gsd-new-project (brownfield)

---

## v1 Requirements

### BUGFIX — Correções Críticas de Produção

- [ ] **BUGFIX-01**: Filtro `Agente ativado?` corrigido: remover condição `contains testando-agente`, manter apenas `notContains agente-off`
- [ ] **BUGFIX-02**: ID do sub-workflow 07 verificado no n8n e corrigido na semente (qOyuDrytX5GnVva7 vs HQr37y9CEfriRkd4)
- [ ] **BUGFIX-03**: Node `Atualizar atributos tarefa` em 09-Gerar-Reserva com campos `numero_proposta` e `valor_venda` funcionando
- [ ] **BUGFIX-04**: `/reset` limpo — remover os 17 atributos de seguros (ramo, operadora, numero_apolice etc.)
- [ ] **BUGFIX-05**: `04-Sync-Chatwoot-Supabase` com node `Respond to Webhook` para evitar timeout do Chatwoot

### ENV — Padronização de Ambiente

- [ ] **ENV-01**: `CHATWOOT_TOKEN` movido para variável de ambiente n8n (atualmente hardcoded: `i8sWiqTrcAyAQbRnVekJavXQ`)
- [ ] **ENV-02**: Supabase anon key movida para variável de ambiente n8n (dois valores diferentes detectados entre workflows)
- [ ] **ENV-03**: `Horário comercial?` no workflow principal com lógica real (seg-sáb 8h-20h, America/Sao_Paulo)
- [ ] **ENV-04**: session_key padronizado — lock usa apenas `telefone`, mas memória Postgres usa `inbox_id + telefone`. Decidir e padronizar.

### SUB — Sub-workflows Faltando

- [ ] **SUB-01**: `02-Informacoes` (ID: 5yqbPEIEAHWRKuLm) exportado do n8n e documentado no vault
- [ ] **SUB-02**: `02b-Simular-ROI` (ID: h21Hv4e2HfISf45m) exportado do n8n e documentado no vault
- [ ] **SUB-03**: `03-Enviar-Proposta` (ID: swXlsuJ4ukfx8OeF) exportado do n8n e documentado no vault
- [ ] **SUB-04**: `04-Verificar-Disponibilidade` (ID: CP6f2tCXalIJoLRN) exportado do n8n e documentado no vault
- [ ] **SUB-05**: `06-Cancelar-Interesse` (ID: h1xS3Z9xenaFjj1d) exportado do n8n e documentado no vault
- [ ] **SUB-06**: Todos os 9 sub-workflows testados com pin data para validar I/O

### LP — Landing Page Hilton

- [ ] **LP-01**: Landing page Hilton online (URL pública) com formulário: nome, whatsapp, cidade, produto de interesse
- [ ] **LP-02**: Webhook n8n `/webhook/hilton-lead` processando submissões → cria contato+conversa no Chatwoot com label `hilton-landing`
- [ ] **LP-03**: Lead Hilton integrado ao `01-CRM-XD-PRO-Lead-Intake` (GPT summary + POST Supabase)

### SDR — SDR Hilton Outbound

- [ ] **SDR-01**: `03-SDR-Hilton-Outbound` ativo — lê leads Supabase com `origem=hilton-landing` e status `nao_processado`
- [ ] **SDR-02**: Classificação de perfil Hilton por GPT-4o mini (hotelaria / residencial / comercial / saúde)
- [ ] **SDR-03**: Conversa criada no Chatwoot com label por perfil (hotel, residencial, comercial, medcenter)
- [ ] **SDR-04**: Lead marcado como processado no Supabase após abertura de conversa

### FU — Follow-up Automático

- [ ] **FU-01**: Cron job n8n rodando a cada 2h (horário comercial), buscando conversas sem resposta há >24h
- [ ] **FU-02**: Follow-up selecionado por estágio Kanban: proposta enviada → tipo `proposta`, visita agendada → tipo `visita`, negociação → tipo `negociacao`, outros → tipo `geral`
- [ ] **FU-03**: Limite de 3 follow-ups por conversa (evitar spam) — contador em atributo Chatwoot
- [ ] **FU-04**: Follow-up respeita horário comercial (seg-sáb 8h-20h) e não envia fins de semana

---

## v2 Requirements (Deferred)

- Dashboard de leads por estágio no CRM XD PRO
- Logs estruturados de execução dos sub-workflows em tabela Postgres
- Monitoramento de falhas ElevenLabs com alertas Telegram/email
- Landing pages The Spot One e Lótus Business com analytics UTM
- Integração com WhatsApp Business API oficial (além do Chatwoot)
- Relatório semanal automático de leads + conversões

---

## Out of Scope

- Integração bancária — fora do escopo do projeto imobiliário
- Multi-idiomas — apenas português
- App mobile — sistema é web + WhatsApp
- CRM customizado além do CRM XD PRO — Alexandre já usa esse
- Automação de documentos (contratos, escrituras) — manual por ora
- Pagamentos online — outside scope

---

## Traceability

| REQ-ID | Fase | Plano |
|--------|------|-------|
| BUGFIX-01..05 | Phase 1 | 1.1 |
| ENV-01..04 | Phase 1 | 1.2 |
| SUB-01..06 | Phase 2 | 2.1 |
| LP-01..03 | Phase 3 | 3.1 |
| SDR-01..04 | Phase 4 | 4.1 |
| FU-01..04 | Phase 5 | 5.1 |
