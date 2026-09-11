# Contratos de API

O Backend é a única camada com service role do Supabase e a única que chama a OpenAI. Todos os contratos abaixo serão detalhados (payloads, validações, respostas) na fase correspondente da implementação. Este documento define escopo, autenticação e responsabilidade de cada grupo.

## 1. Endpoints públicos

Requisitos obrigatórios: rate limit, logs e trilha de auditoria.

| Endpoint | Método | Função |
|---|---|---|
| /api/leads | POST | Captação de formulário. Valida, deduplica por telefone, cria/atualiza lead, gera evento lead_criado |
| /api/imoveis | GET | Lista via view pública (sem preco_interno) |
| /api/imoveis/[slug] | GET | Detalhe via view pública |

## 2. Webhooks

Requisitos obrigatórios: assinatura/token validados, logs e auditoria.

| Endpoint | Método | Função |
|---|---|---|
| /api/webhooks/chatwoot | POST | Mensagens recebidas do WhatsApp. Dispara o fluxo do SDR |
| /api/webhooks/meta | POST | Leads de formulários Meta Ads |

## 3. Endpoints autenticados (Supabase Auth, papel validado)

| Endpoint | Função |
|---|---|
| CRUD /api/empreendimentos | Gestão de empreendimentos |
| CRUD /api/unidades | Gestão de unidades |
| POST /api/unidades/[id]/status | Muda status/preço com registro obrigatório no histórico |
| CRUD /api/leads (autenticado) | Gestão do funil |
| CRUD /api/agendamentos | Visitas e reuniões |
| CRUD /api/propostas | Propostas comerciais |
| CRUD /api/follow-ups | Tarefas e retornos |
| POST /api/documentos/analisar | Extração + embeddings + análise via OpenAI |
| POST /api/busca | Busca semântica de imóveis (pgvector) |
| POST /api/leads/[id]/recomendar | Recomendações por perfil |

## 4. Endpoints internos (chave de API, uso do n8n)

| Endpoint | Função |
|---|---|
| POST /api/ia/mensagem-reengajamento | Geração de mensagem contextual, sujeita aos limites de reengajamento |
| GET /api/eventos/pendentes | Consumo da fila de eventos |
| POST /api/eventos/[id]/confirmar | Confirmação de processamento (atualiza processado, processado_em, tentativas, ultimo_erro) |

## 5. APIs externas consumidas

| Serviço | Uso | Quem chama |
|---|---|---|
| OpenAI | Chat (SDR, análises, reengajamento) e embeddings | **Somente Backend** |
| Chatwoot | Envio de mensagens, atribuição de conversas | Backend e n8n |
| WhatsApp | Canal de mensagens | **Nunca direto — sempre via Chatwoot** |
| Meta Ads | Recebimento de leads e eventos de conversão | n8n |
| Google Calendar | Agendamentos de corretores | n8n |
| Telegram | Alertas internos | n8n |

## 6. Autenticação entre serviços

| Origem → Destino | Mecanismo |
|---|---|
| Frontend público → Backend | Anon + rate limit |
| Painel → Backend | Sessão Supabase Auth, papel validado por endpoint |
| Chatwoot → Backend | Token de webhook |
| n8n → Backend | Chave de API interna |
| Backend → Supabase | Service role (variável de ambiente, nunca no cliente) |
| Backend → OpenAI | Chave em variável de ambiente do Backend, exclusiva |

## 7. Regras transversais de API

1. Nenhum endpoint expõe `preco_interno` fora do contexto autenticado com papel adequado.
2. Toda resposta de IA gravada antes do envio, com prompt_version, modelo e origem_contexto.
3. Endpoints que mudam estado de unidade gravam histórico na mesma transação.
4. Erros de webhook não são engolidos: registrados em eventos_automacao ou logs para reprocessamento.
