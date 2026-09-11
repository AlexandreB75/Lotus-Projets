# Fases de desenvolvimento

Racional: valor comercial primeiro (Fases 1–2 já captam leads), risco depois (IA autônoma por último). Cada fase é entregável e testável isoladamente. Não avance de fase sem cumprir o critério de pronto da anterior.

## Fase 1 — Fundação

**Escopo:**
- Schema completo no Supabase conforme [DATABASE.md](DATABASE.md), incluindo `organizacao_id` em todas as tabelas centrais.
- RLS completa e view pública sem `preco_interno`.
- Tabela `eventos_automacao` com tentativas, ultimo_erro e processado_em.
- Backend: endpoints públicos de leitura e `POST /api/leads` com rate limit, logs e auditoria.
- Triggers de eventos (lead_criado no mínimo).

**Pronto quando:** lead entra pelo formulário e aparece no banco com evento gravado.

## Fase 2 — Portal Público

**Escopo:**
- Catálogo de imóveis lendo da view pública.
- Páginas de empreendimento.
- Landing pages de campanha integradas ao endpoint de captação.

**Pronto quando:** portal no ar captando leads reais.

## Fase 3 — Painel Admin

**Escopo:**
- Supabase Auth com papéis (admin, gestor, corretor).
- CRUD de empreendimentos e unidades, com mudança de status/preço gravando histórico.
- Funil de leads (visão por estágio, atribuição de responsável).
- Follow-ups e tarefas.

**Pronto quando:** a equipe gerencia empreendimentos, leads e follow-ups sem planilha.

## Fase 4 — Automações base (n8n)

**Escopo:**
- Consumo da fila `eventos_automacao` com confirmação e reprocessamento.
- Boas-vindas para lead novo (WhatsApp via Chatwoot).
- Alertas Telegram (score_quente, handoff_humano, follow_up_vencido).
- Confirmação e lembretes de agendamento + Google Calendar.

**Pronto quando:** nenhum lead novo fica sem primeira resposta.

## Fase 5 — SDR IA

**Escopo:**
- Webhook do Chatwoot → Backend → OpenAI → resposta.
- Contexto: lead + resumo de conversa (pgvector) + unidades relevantes + restrições do empreendimento.
- Qualificação BANT com atualização de score.
- Handoff: status humano bloqueia IA; score 80+ escala.
- Estrutura de prompts versionados por agente criada nesta fase (o SDR é o primeiro agente do padrão).
- Rastreabilidade obrigatória (R9).

**Modo de operação:** começa **assistido** (IA sugere, humano aprova o envio). Só migra para autônomo após validação.

**Pronto quando:** IA qualifica de ponta a ponta com score confiável e handoff funcionando.

## Fase 6 — Inteligência avançada

**Escopo:**
- Busca semântica no portal.
- Recomendações por perfil do lead.
- Análise de documentos (upload → extração → embeddings → análise estruturada).
- Reengajamento com as três travas (teto diário, janela de horário, aprovação humana inicial).

**Pronto quando:** cada recurso ativado isoladamente com métrica própria.

## Critérios transversais (válidos em todas as fases)

- Nenhuma escrita no banco fora do Backend.
- Nenhuma chamada à OpenAI fora do Backend.
- Nenhum WhatsApp fora do Chatwoot.
- Toda mudança de unidade com histórico.
- Toda mensagem de IA rastreável.
