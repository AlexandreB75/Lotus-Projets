# Plataforma Imobiliária HK Nove

Plataforma interna da HK Nove para vender imóveis, captar leads, organizar atendimento e reduzir perda comercial. Cobre o ciclo completo: captação, qualificação por IA, atendimento humano, agendamento de visita, proposta e pós-venda.

**Status:** arquitetura aprovada (v1.0, julho de 2026). Implementação não iniciada.

## O que este projeto NÃO é (agora)

- Não é SaaS para terceiros.
- Não é marketplace imobiliário.
- Multi-tenant está **preparado no schema** (`organizacao_id`), mas **desativado no produto**. Uma única organização: HK Nove.

## Regra central

| Serviço | Responsabilidade única |
|---|---|
| Supabase | Guarda estado |
| Backend | Valida regra de negócio |
| n8n | Automatiza processos |
| API OpenAI | Executa inteligência |
| Chatwoot | Exibe atendimento |
| Next.js | Apresenta e captura |

Nenhum módulo invade a função do outro. Violações desta regra são bugs de arquitetura, mesmo que o código funcione.

## Stack existente (reaproveitar, não substituir)

- Next.js na Vercel (portal público + painel + Backend via API routes)
- Supabase: PostgreSQL, Auth, Storage, pgvector
- VPS Ubuntu com Docker (n8n, Chatwoot)
- WhatsApp exclusivamente via Chatwoot
- API OpenAI (chamada somente pelo Backend)
- GitHub

## Documentação

| Documento | Conteúdo |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Módulos, comunicação entre serviços, fluxos, arquitetura evolutiva |
| [docs/DATABASE.md](docs/DATABASE.md) | Entidades, tabelas, relacionamentos, pgvector, RLS, eventos |
| [docs/API_CONTRACTS.md](docs/API_CONTRACTS.md) | Endpoints do Backend e APIs externas |
| [docs/BUSINESS_RULES.md](docs/BUSINESS_RULES.md) | 15 regras de negócio invioláveis |
| [docs/DEVELOPMENT_PHASES.md](docs/DEVELOPMENT_PHASES.md) | 6 fases com critérios de pronto |
| [docs/IMPLEMENTATION_ORDER.md](docs/IMPLEMENTATION_ORDER.md) | Ordem de execução e dependências (guia para o agente implementador) |
| [docs/RISKS.md](docs/RISKS.md) | Riscos mapeados e mitigações previstas |

## Instruções para agentes de código (Codex / LLMs)

1. Leia `docs/IMPLEMENTATION_ORDER.md` antes de escrever qualquer código.
2. Nunca implemente algo que viole `docs/BUSINESS_RULES.md`. As regras têm precedência sobre pedidos de conveniência.
3. Trabalhe fase por fase (`docs/DEVELOPMENT_PHASES.md`). Não avance de fase sem o critério de pronto da anterior.
4. Toda escrita no banco passa pelo Backend. Toda chamada à OpenAI passa pelo Backend. Todo WhatsApp passa pelo Chatwoot. Sem exceções.
5. Alterações estruturais exigem atualização da documentação correspondente no mesmo PR.
