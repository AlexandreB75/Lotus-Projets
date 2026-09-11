# Banco de dados

Supabase (PostgreSQL + Auth + Storage + pgvector). Este documento define o schema lógico. SQL será escrito na Fase 1 seguindo exatamente esta especificação.

## 1. Decisão estrutural: multi-tenant preparado, desativado

Todas as tabelas centrais nascem com `organizacao_id` desde a Fase 1, preenchida com um único valor (HK Nove). O produto não expõe multi-tenant. Custo quase zero agora; refatoração cara depois.

## 2. Tabelas

### organizacoes
`id, nome, ativo`
Registro único inicialmente.

### empreendimentos
`id, organizacao_id, nome, slug, tipo, endereco, cidade, status_obra, data_entrega, descricao, destaques (jsonb), publicado (bool)`
Tipos: residencial, comercial, hotel, multipropriedade.

### unidades
`id, organizacao_id, empreendimento_id, identificador, tipologia, area_privativa, quartos, banheiros, vagas, andar, preco_interno, preco_avaliacao, status, mobiliada (bool), fotos (referências ao Storage)`
Status: disponível, reservada, vendida.
**preco_interno nunca aparece na view pública.**

### unidade_status_historico
`id, unidade_id, campo_alterado (status | preco), valor_anterior, valor_novo, alterado_por, motivo, criado_em`
Toda mudança de status ou preço gera registro. Rastreabilidade obrigatória.

### leads
`id, organizacao_id, nome, telefone (único), email, origem, campanha, interesse_empreendimento_id, orcamento_declarado, score_bant (0–100), estagio, decisor_conjunto (bool), responsavel_id, criado_em, ultimo_contato_em`
Telefone é a chave de identidade no WhatsApp.
Origens: meta_ads, landing, portal, indicação.
Estágios: novo, em_qualificação, quente, visita_agendada, proposta, ganho, perdido.

### follow_ups
`id, organizacao_id, lead_id, responsavel_id, tipo (contato | retorno | tarefa), descricao, vencimento, status (pendente | concluido | vencido), concluido_em`
Tarefas nunca ficam escondidas dentro de leads.

### conversas
`id, lead_id, canal (whatsapp), chatwoot_conversation_id, status (ia | humano | encerrada), iniciada_em`

### mensagens
`id, conversa_id, direcao (entrada | saida), autor (lead | ia | humano), conteudo, metadata (jsonb), criada_em`
metadata guarda: chatwoot_message_id, mídia, anexos, erro_envio. Para mensagens de IA, obrigatoriamente: `prompt_version`, `modelo`, `origem_contexto`. Sem esses três campos, a mensagem não é enviada.

### agendamentos
`id, organizacao_id, lead_id, unidade_id, tipo (visita | reuniao), data_hora, status, corretor_id, observacoes`
Status: marcado, confirmado, realizado, no_show, cancelado.

### propostas
`id, organizacao_id, lead_id, unidade_id, valor, condicoes (jsonb), status, criada_em`
Status: rascunho, enviada, negociação, aceita, recusada.

### documentos
`id, organizacao_id, tipo (matricula | contrato | proposta | planta), empreendimento_id?, unidade_id?, lead_id?, proposta_id?, arquivo (Storage), texto_extraido, analisado_em`
Vínculo polimórfico: ao menos um dos quatro FKs preenchido.

### usuarios_internos
`id (Supabase Auth), organizacao_id, nome, papel (admin | gestor | corretor), ativo`

### eventos_automacao
`id, organizacao_id, tipo, payload (jsonb), processado (bool), processado_em, tentativas (int), ultimo_erro`
Fila leve consumida pelo n8n, com reprocessamento seguro.

## 3. Relacionamentos

- organização 1:N tudo
- empreendimento 1:N unidades
- unidade 1:N histórico, agendamentos, propostas, documentos
- lead 1:N conversas, agendamentos, propostas, follow-ups
- conversa 1:N mensagens
- usuário interno 1:N leads (responsável), agendamentos (corretor), follow-ups

## 4. pgvector

| Tabela | Conteúdo | Uso |
|---|---|---|
| embeddings_unidades | descrição + destaques + tipologia | Busca semântica e recomendação |
| embeddings_conversas | Resumos por conversa (não mensagem a mensagem) | Memória de longo prazo do SDR |
| embeddings_documentos | Chunks do texto extraído | Análise e consulta de documentos |

Resumo por conversa, não por mensagem: controle de custo deliberado.

## 5. RLS e exposição de preço

- **Anon (público):** apenas view pública de empreendimentos e unidades com `publicado = true`, sem a coluna `preco_interno`. A regra de nunca expor preço é política de banco, não convenção de frontend.
- **Leads, conversas, mensagens, propostas, follow-ups, documentos:** nenhum acesso anon. Corretor lê apenas seus leads; gestor e admin leem tudo dentro da organização.
- **Escrita pelo portal:** somente via Backend com service role. Nenhum insert direto do cliente.
- **eventos_automacao:** apenas service role.

## 6. Eventos que acionam o n8n

| Evento | Gatilho | Ação |
|---|---|---|
| lead_criado | Insert em leads | Sequência de boas-vindas WhatsApp |
| score_quente | score_bant cruza 80 | Alerta Telegram + atribuição de corretor |
| agendamento_criado / agendamento_alterado | Insert/update em agendamentos | Confirmação e lembretes (24h e 2h) |
| lead_abandono | Job diário: sem interação há X dias | Reengajamento com limites |
| follow_up_vencido | Vencimento ultrapassado | Cobrança ao corretor |
| handoff_humano | conversa.status → humano | Notificação imediata |
| unidade_status_alterado | Insert no histórico | Registro; notificação a clientes desligada por padrão |

Todos gravados por trigger em `eventos_automacao`. n8n consome por webhook e confirma processamento via API do Backend.
