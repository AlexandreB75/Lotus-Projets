# Arquitetura

Versão 1.0 — aprovada em julho de 2026.

## 1. Diagrama geral

```
Visitante → Next.js Portal (Vercel) ─┐
Admin → Next.js Painel (Auth) ───────┤→ Backend/API → Supabase (estado)
                                     │       ↓
Lead → WhatsApp → Chatwoot ──────────┘   API OpenAI (inteligência)
                     ↕
                    n8n (automações) → Telegram, APIs externas
```

## 2. Módulos

### 2.1 Portal Público (Next.js / Vercel)
Catálogo de imóveis, páginas de empreendimento, landing pages de campanha, formulários de captação. Apresenta e captura. Leitura pública via view sem preço interno; escrita sempre pelo Backend.

### 2.2 Painel Administrativo (Next.js + Supabase Auth)
Gestão de empreendimentos, unidades, funil de leads, agendamentos, follow-ups e conversas. Mesmo repositório do portal, rotas protegidas por papel (admin, gestor, corretor). Nenhuma regra de negócio no frontend.

### 2.3 Backend/API (camada de regras)
API routes do Next.js na Vercel, com service role do Supabase. Responsabilidades exclusivas:

- Toda chamada à API OpenAI (a chave nunca sai daqui).
- Scoring BANT de leads.
- Permissões e validação de toda escrita.
- Regras sensíveis (preço, restrições de amenidades, handoff).

Portal, Painel, Chatwoot e n8n falam com o Backend, nunca direto com a OpenAI.

### 2.4 Supabase (fonte única de dados)
PostgreSQL, Auth, Storage e pgvector. Todo estado da plataforma vive aqui, protegido por RLS. Ver [DATABASE.md](DATABASE.md).

### 2.5 Atendimento (Chatwoot + WhatsApp)
Hub de mensagens e interface humana. Recebe mensagem, dispara webhook ao Backend, exibe a resposta. Handoff humano quando o SDR escala.

**Regra fixa:** WhatsApp é via Chatwoot. Nenhum envio de WhatsApp fora desse fluxo, em nenhum módulo.

### 2.6 Inteligência (API OpenAI, via Backend)
Quatro funções: SDR conversacional com qualificação BANT, busca semântica de imóveis, recomendações por perfil, análise de documentos. Sem estado próprio: todo contexto vem do Supabase. Prompts versionados no repositório, organizados por agente.

### 2.7 Orquestração (n8n na VPS)
Automações não conversacionais. Reage exclusivamente a eventos registrados em `eventos_automacao`. n8n nunca inicia conversa comercial sem evento claro.

### 2.8 APIs externas
Meta Ads, Google Calendar, Telegram e futuras integrações. Sempre via n8n ou Backend, nunca pelo frontend.

## 3. Comunicação entre serviços

| Origem | Destino | Mecanismo |
|---|---|---|
| Next.js público | Backend | HTTP anon com rate limit |
| Next.js painel | Backend | Sessão Supabase Auth, papel validado |
| Chatwoot | Backend | Webhook com token validado |
| n8n | Backend | Chave de API interna |
| Backend | Supabase | Service role (nunca exposta) |
| Backend | OpenAI | Chave segura, exclusiva do Backend |
| Supabase | n8n | Trigger → eventos_automacao → webhook |
| n8n | Chatwoot / Meta / Calendar / Telegram | APIs respectivas |

## 4. Fluxos principais

### 4.1 Captação de lead
Formulário (portal/landing) → Backend valida e deduplica por telefone → cria/atualiza lead → evento `lead_criado` → n8n dispara primeira mensagem WhatsApp e registra follow-up inicial.

### 4.2 Conversa do SDR
WhatsApp → Chatwoot → webhook → Backend carrega contexto (lead, resumo via pgvector, unidades relevantes, restrições do empreendimento) → chama OpenAI → grava mensagem com rastreabilidade → atualiza score_bant → responde via API do Chatwoot → score 80+ gera `score_quente` → n8n alerta e atribui corretor.

**Regra de segurança:** se a conversa está com status `humano`, o Backend não chama a OpenAI. IA nunca fala por cima do corretor.

### 4.3 Agendamento de visita
Agendamento criado → evento → n8n envia confirmação, cria evento no Google Calendar do corretor, agenda lembretes (24h e 2h). No_show ou cancelamento gera follow-up de remarcação.

### 4.4 Reengajamento
Job diário no n8n identifica leads sem interação há X dias → evento `lead_abandono` → Backend gera mensagem contextual via OpenAI → envio dentro dos limites (teto diário, janela 9h–19h, aprovação humana nas primeiras semanas). Resposta do lead reativa o fluxo 4.2.

### 4.5 Análise de documentos
Upload no Painel → Storage → Backend extrai texto, gera embeddings, chama OpenAI para análise estruturada → resultado disponível no Painel e como contexto do SDR quando pertinente.

### 4.6 Mudança de estado de unidade
Reserva, venda ou alteração de preço no Painel → Backend valida permissão → grava em unidades e no histórico → evento registrado. Notificação automática a clientes fica desativada até existir regra comercial aprovada.

## 5. Nota de escalabilidade

Se o volume de chamadas do SDR crescer, o Backend pode migrar das API routes da Vercel para um serviço Docker na VPS (mesmo código Node), evitando limites de timeout. A arquitetura não muda.

## 6. Arquitetura evolutiva

A plataforma escala por adição, nunca por reforma. Novos portais e apps são novas faces consumindo as mesmas APIs. Duas decisões antecipadas na Fase 1 por causa do futuro: `organizacao_id` no schema e prompts versionados por agente.

| # | Módulo futuro | Objetivo | Dependências | Impacto | Prioridade | Fase |
|---|---|---|---|---|---|---|
| 1 | Portal do Corretor | Corretor gerencia leads, agenda e materiais | Fase 3 + papéis no Auth | Nenhum (recorte do Painel via RLS) | Alta | Pós-Fase 5 |
| 2 | Portal do Cliente | Comprador acompanha proposta, contrato e obra | Propostas/documentos + papel "cliente" | Baixo | Média | Após primeiras vendas |
| 3 | Portal do Proprietário | Dono do imóvel captado acompanha divulgação e propostas | Relação unidade–proprietário + Portal do Cliente | Baixo | Média | Junto/após Portal do Cliente |
| 4 | Portal da Imobiliária (multi-tenant) | Parceiros operando na plataforma | Decisão de negócio; organizacao_id já existe | Médio; schema preparado | Baixa como produto | Só se o negócio pedir |
| 5 | App iOS/Android | Presença mobile nativa | APIs estáveis e documentadas | Nenhum | Baixa (PWA primeiro) | Quando o PWA provar limitação |
| 6 | Dashboard da Diretoria | Funil, conversão, VGV, desempenho | 60–90 dias de dados | Nenhum | Alta e barata | Fase 6 |
| 7 | Central de Documentos | Repositório com busca semântica | documentos + embeddings | Nenhum | Média | Extensão da Fase 6 |
| 8 | Assinatura Eletrônica | Assinar propostas/contratos | Propostas ativas | Baixo | Alta quando propostas rodarem | Pós-Fase 6 |
| 9 | Simulação de Financiamento | Lead simula parcelas; qualificação | Portal | Nenhum | Alta | Pode entrar na Fase 6 |
| 10 | Reserva Online de Unidades | Reserva com sinal pago online | Gateway + trava de concorrência | Médio | Média-baixa | Futura, por demanda |
| 11 | Portais Imobiliários (ZAP, VivaReal, OLX) | Publicar unidades e receber leads | Catálogo + n8n (feeds) | Nenhum | Alta para captação | Pós-Fase 4 |
| 12 | ERP Financeiro | Contratos e recebíveis no financeiro | Definição do ERP + propostas maduras | Baixo a médio | Média | Por volume de contratos |
| 13 | Business Intelligence | Coorte, atribuição, previsão | Dados históricos | Nenhum (Metabase na VPS) | Média | Após 6 meses de dados |
| 14 | Agentes Especializados (OpenAI) | Pós-venda, análise jurídica, copiloto do corretor | Padrão do SDR consolidado | Nenhum (molde da Fase 5) | Alta a médio prazo | Incremental pós-Fase 6 |
| 15 | API Pública para Parceiros | Catálogo e leads programáticos | APIs estáveis + gestão de chaves | Baixo | Baixa | Última, por demanda real |
