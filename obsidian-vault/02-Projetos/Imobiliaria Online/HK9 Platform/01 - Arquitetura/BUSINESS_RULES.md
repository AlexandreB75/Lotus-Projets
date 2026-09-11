# Regras de negócio

Estas 15 regras são invioláveis. Nenhuma implementação, refatoração ou conveniência técnica pode contorná-las. Em caso de conflito entre um pedido de feature e uma regra deste documento, a regra vence até que este documento seja formalmente alterado.

## Comerciais

**R1 — Preço interno nunca em canal público.**
A view pública é a única fonte do portal. `preco_interno` só existe atrás de autenticação com papel adequado. A proteção é RLS no banco, não código de frontend.

**R2 — Toda conversa empurra para visita presencial.**
Nada fecha por mensagem. O objetivo do SDR e das automações é agendar visita, não vender por chat.

**R3 — Cônjuge/decisor sempre incluído.**
`decisor_conjunto` é obrigatório antes de agendar visita. Qualificação incompleta sem essa informação.

**R4 — Qualificar antes de informar.**
O SDR só entrega detalhes sensíveis (condições, valores, disponibilidade específica) após coletar BANT mínimo.

**R5 — Amenidades não confirmadas nunca são citadas.**
Cada empreendimento tem lista de restrições no contexto do SDR. Exemplo vigente: centro médico e restaurante rooftop do Hilton Garden Inn Itapema não são confirmados e não podem ser apresentados como amenidades.

**R6 — Objeção de prazo de entrega tem resposta padrão aprovada.**
Com prova física definida. Exemplo vigente: Bloco C do Hilton (7 andares, fisicamente completo) é o ponto de prova para visitas.

## Operacionais de IA

**R7 — IA não responde quando a conversa está com status humano.**
Bloqueio no Backend, antes de qualquer chamada à OpenAI. IA nunca fala por cima do corretor.

**R8 — Reengajamento com três travas.**
Teto diário de leads, janela de horário 9h–19h, e modo de aprovação humana ativo nas primeiras semanas de operação. Nenhuma chamada em massa à OpenAI sem limite.

**R9 — Toda mensagem de IA é rastreável.**
`prompt_version`, `modelo` e `origem_contexto` gravados no metadata antes do envio. Sem esses campos, a mensagem não é enviada. Sem exceção.

**R10 — Prompts versionados no repositório, por agente.**
Estrutura de pastas por agente (o SDR é o primeiro). Nunca editados direto em produção.

## Sistêmicas

**R11 — WhatsApp somente via Chatwoot.**
Qualquer envio de WhatsApp fora desse fluxo é violação de arquitetura, mesmo que funcione.

**R12 — n8n só age por evento registrado.**
Toda automação nasce de um registro em `eventos_automacao`: lead_criado, score_quente, agendamento, lead_abandono, follow_up_vencido, handoff_humano, unidade_status_alterado. n8n nunca inicia conversa comercial sem evento claro.

**R13 — Escrita no banco somente via Backend.**
Frontend nunca escreve direto no Supabase. Leitura pública apenas pela view.

**R14 — Mudança de unidade sempre gera histórico.**
Status e preço registrados em `unidade_status_historico` na mesma transação. Notificação automática a clientes fica desligada por padrão até existir regra comercial aprovada.

**R15 — Endpoints públicos e webhooks têm rate limit, logs e auditoria.**
Obrigatórios desde a Fase 1, não adicionados depois.
