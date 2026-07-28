# Vault — OpenBotXD
# Ponto de entrada para Claude Code e agentes IA

## Configuração global
→ `00-Sistema/CLAUDE.md` — comunicação, memória, orquestração, segurança

## Princípios
→ `00-Sistema/PRINCIPLES.md` — 10 princípios que governam todo o ecossistema

## Estrutura do vault

| Pasta | Conteúdo |
|-------|----------|
| `00-Sistema/` | Configuração global, agentes, workflows, arquitetura |
| `01-Dashboard/` | Dashboard operacional central |
| `02-Projetos/` | Lótus Business · Hilton Garden Inn Itapema |
| `03-Squads/` | Agentes operacionais + squads de marketing |
| `04-Skills/` | Skills: N8N, HubSpot, Meta Ads, Instagram, SEO |
| `05-Contexto/` | Contexto permanente de Alexandre |
| `06-Scripts/` | Scripts WhatsApp, eventos, n8n |
| `07-Objecoes/` | Respostas a objeções imobiliárias |
| `08-Raw/` | Fontes brutas (conversas, PDFs, prints) |
| `09-Wiki-Compilado/` | Sínteses compiladas pelo Knowledge Compiler |
| `Agentes-Operacionais/` | Agentes com SKILL.md, TESTS.md, DECISIONS.md |

## Regra de retrieval

Antes de responder sobre qualquer projeto, agente, script ou objeção:
1. Buscar em `02-Projetos/` o material relevante do projeto
2. Verificar `03-Squads/Agentes-Operacionais/agents/` se existe agente para o caso
3. Consultar `04-Skills/` para protocolos e frameworks
4. Usar `07-Objecoes/` para qualquer resposta a objeção comercial
5. Citar o arquivo de origem na resposta

## Regras de escrita

- Nunca criar arquivo sem projeto, agente ou skill associado
- Nunca prometer valorização ou renda garantida em materiais comerciais
- Todo novo agente precisa de SKILL.md + TESTS.md + DECISIONS.md (ver P09)
- CLAUDE.md e AGENTS.md são imutáveis sem aprovação explícita (ver P07)

## Projetos principais

- **Lótus Business** → `02-Projetos/Lótus Business/MASTER - Lótus Business.md`
- **Hilton Garden Inn** → `02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema.md`
- **Centro Médico Hilton** → `02-Projetos/Hilton Garden Inn Itapema/Centro-Medico-Hilton/`

## Automação no N8N

- Workflow Manager-Comercial → `n8n-workflows/manager-comercial-workflow.json`
- Documentação → `06-Scripts/n8n/Manager-Comercial-N8N.md`
- Agentes Omnigent → `omnigent-agents/`
