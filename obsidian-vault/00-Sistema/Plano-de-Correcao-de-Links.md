---
tags: [sistema, links, plano, vault-librarian]
status: aguardando-aprovacao
baseado_em: 00-Sistema/Relatorios-Vault/Vault-Librarian-2026-08-23-112630.md
---

# Plano de Correção de Links

## Escopo e segurança

Este plano usa o [[00-Sistema/Relatorios-Vault/Vault-Librarian-2026-08-23-112630|relatório Vault Librarian de 2026-08-23 11:26]], que registrou 301 links quebrados, 43 ambíguos e 130 notas sem links recebidos.

Nenhuma correção foi aplicada nesta etapa. Não mover, excluir, fundir, arquivar ou trocar links até haver aprovação explícita para o lote proposto ao final deste documento.

O relatório não contém origem em `01-Dashboard/Dashboard.md`; portanto, o Dashboard não foi alterado.

> Atenção de triagem: muitos links de projetos ativos usam subcaminhos como `agents/...` e `brand-os/...`. Há arquivos correspondentes na pasta do próprio projeto, o que é evidência de destino provável, mas a confirmação deve respeitar a semântica de resolução do Obsidian antes de qualquer edição em massa.

## Classificação dos 301 links quebrados

| Prioridade | Critério | Links | Tratamento |
|---|---|---:|---|
| P0 | `CLAUDE.md`, Dashboard, `MASTER`/`00-INDEX` e projetos ativos | 190 | Corrigir somente links com destino local comprovado; validar manualmente os demais. |
| P1 | Documentação operacional, skills, agentes e sistemas | 80 | Revisar por domínio operacional, sem lote automático. |
| P2 | Histórico, referências, 08-Raw, 09-Wiki e materiais de contexto | 31 | Revisar depois de P0/P1; preservar conteúdo histórico. |

### Inventário P0 por origem

| Grupo de origem | Links P0 | Situação de evidência |
|---|---:|---|
| Piccolo Bambino — `MASTER`, agentes, Brand OS, dados e operações | 89 | Predominam subcaminhos com arquivos homônimos existentes dentro do projeto; verificar como links relativos. |
| Hilton Garden Inn — `MASTER` | 10 | Quatro índices de subprojetos existem; referências a antigos squads exigem revisão separada. |
| Lótus Business — `MASTER` e campanha | 13 | Índices internos de público existem; links para squads removidos não têm destino comprovado. |
| Agente Orquestrador — `00-INDEX` | 8 | Arquivos inventário, arquitetura, integrações, backlog e auditoria existem nas subpastas correspondentes. |
| Imobiliária Online — `00-INDEX` | 8 | Playbook MayBrokes existe na subpasta correspondente. |
| Índices de skills e n8n | 13 | Há destinos atuais para parte dos fluxos; antigos squads requerem análise manual. |
| Índices de 08-Raw e 09-Wiki | 49 | Predominam índices, PDFs e materiais de origem; manter como P0 de navegação, mas corrigir após validação de cada artefato. |

### P0 com destino provável comprovado — aplicado em 2026-08-23

Os itens abaixo têm arquivo Markdown existente no caminho indicado. São os únicos elegíveis para o primeiro lote.

| Origem | Link quebrado no relatório | Destino comprovado aplicado | Status |
|---|---|---|---|
| `02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema.md` | `Centro-Medico-Hilton/00-INDEX-Centro-Medico-Hilton` | `02-Projetos/Hilton Garden Inn Itapema/Centro-Medico-Hilton/00-INDEX-Centro-Medico-Hilton.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema.md` | `Hotel-Hilton/00-INDEX-Hotel-Hilton` | `02-Projetos/Hilton Garden Inn Itapema/Hotel-Hilton/00-INDEX-Hotel-Hilton.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema.md` | `Residencial-Pool/00-INDEX-Residencial-Pool` | `02-Projetos/Hilton Garden Inn Itapema/Residencial-Pool/00-INDEX-Residencial-Pool.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Hilton Garden Inn Itapema/MASTER - Hilton Garden Inn Itapema.md` | `Multipropriedade-Hilton/00-INDEX-Multipropriedade-Hilton` | `02-Projetos/Hilton Garden Inn Itapema/Multipropriedade-Hilton/00-INDEX-Multipropriedade-Hilton.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Piccolo Bambino/MASTER - Piccolo Bambino.md` | `agents/CEO-Piccolo` | `02-Projetos/Piccolo Bambino/agents/CEO-Piccolo.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Piccolo Bambino/MASTER - Piccolo Bambino.md` | `agents/Agente-Bling` | `02-Projetos/Piccolo Bambino/agents/Agente-Bling.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Piccolo Bambino/MASTER - Piccolo Bambino.md` | `agents/Agente-Nuvemshop` | `02-Projetos/Piccolo Bambino/agents/Agente-Nuvemshop.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Piccolo Bambino/MASTER - Piccolo Bambino.md` | `agents/Agente-Marketplaces` | `02-Projetos/Piccolo Bambino/agents/Agente-Marketplaces.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Piccolo Bambino/MASTER - Piccolo Bambino.md` | `agents/Agente-Marketing` | `02-Projetos/Piccolo Bambino/agents/Agente-Marketing.md` | Aplicado — 2026-08-23 |
| `02-Projetos/Piccolo Bambino/MASTER - Piccolo Bambino.md` | `agents/Agente-Dados` | `02-Projetos/Piccolo Bambino/agents/Agente-Dados.md` | Aplicado — 2026-08-23 |

### P1 — documentação operacional e sistemas

80 links, concentrados em: `00-Sistema` (22), `04-Skills` (51), `06-Scripts` (6) e backlog do Agente Orquestrador (1). A maior parte referencia squads antigos, documentação de skills e workflows. Revisar por arquivo de origem e registrar destinos sem evidência em [[00-Sistema/Pendencias-de-Organizacao|Pendências de Organização]].

### P2 — histórico, referências e materiais arquivados

31 links, concentrados em contexto, respostas a objeções, 08-Raw e 09-Wiki-Compilado. Esses itens devem ser corrigidos apenas depois de P0/P1 e sem reorganização automática de fontes brutas ou sínteses históricas.

## Links ambíguos — não sugerir troca automática

Os 43 links abaixo correspondem a mais de uma nota possível. Nenhum destino é proposto neste plano.

| Origem | Links ambíguos | Qtde. |
|---|---|---:|
| `MASTER - Hilton Garden Inn Itapema` | `Argumentario-Comercial`, `Pitch-de-Vendas`, `Scripts-WhatsApp`, `Objeções-e-Respostas` (2x), `Publico-Alvo` (2x), `Follow-up-CRM`, `Campanhas-Instagram` | 9 |
| `Pitch-de-Vendas` (Hilton) | `Objeções-e-Respostas` | 1 |
| `hk9/docs/ROADMAP` | `IMPLEMENTATION_ORDER`, `DEVELOPMENT_PHASES`, `ARCHITECTURE` | 3 |
| `HK9 Platform/00 - Visão Geral/ROADMAP` | `IMPLEMENTATION_ORDER`, `DEVELOPMENT_PHASES`, `ARCHITECTURE` | 3 |
| `HK9 Platform/02 - Desenvolvimento` | `DECISIONS`, `IMPLEMENTATION_ORDER` | 2 |
| `HK9 Platform/03 - IA` | `DECISIONS`, `DATABASE`, `ARCHITECTURE`, `DEVELOPMENT_PHASES` | 4 |
| `HK9 Platform/04 - Infraestrutura/Supabase` | `DATABASE` | 1 |
| `HK9 Platform/99 - Ideias` | `ROADMAP`, `DECISIONS`, `ARCHITECTURE` (com repetições) | 5 |
| `MASTER - Lótus Business` | `Argumentario-Comercial`, `Publico-Alvo`, `Objeções-e-Respostas`, `Scripts-WhatsApp`, `Pitch-de-Vendas`, `Follow-up-CRM`, `Campanhas-Instagram` | 7 |
| `04-Skills/00-INDEX-Skills` | `Instagram` (4x), `Meta-Ads` (4x) | 8 |

## Notas órfãs por área

“Órfã” significa sem links recebidos de outras notas Markdown; não significa que a nota possa ser removida.

| Área | Qtde. | Indicação de revisão |
|---|---:|---|
| `00-Sistema`, `Agentes-Operacionais`, raiz e `Templates` | 11 | Notas ativas de sistema, templates e instruções; conectar a índices quando fizer sentido. |
| Agente Orquestrador | 8 | Índice, inventário, arquitetura, integrações, backlog e auditorias; parecem notas operacionais ativas. |
| Hilton Garden Inn Itapema | 7 | Argumentário, campanha, CRM, objeções, pitch, público e scripts; notas ativas. |
| Imobiliária Online (HK9, Platform e Playbook) | 42 | Documentação de projeto e desenvolvimento; candidatas a revisão de navegação, sem alteração de código. |
| Lótus Business | 9 | Índices de segmentos, campanhas e workflow; notas ativas/candidatas a indexação. |
| Piccolo Bambino | 17 | Agentes, Brand OS, dados, operações e vídeo; notas ativas, com alguns arquivos de mídia/referência. |
| Contexto, OpenClaw, objeções e Javis-XD | 4 | Contexto permanente, proposta e histórico; revisar conexão, não remover. |
| `08-Raw` | 15 | Fontes brutas, índices e materiais de mídia; manter e revisar somente a indexação. |
| `09-Wiki-Compilado` | 17 | Índices e sínteses ativas; candidatas a ligação com hubs temáticos. |

## Primeira correção pequena proposta — aguardar aprovação

Lote aplicado em 2026-08-23: os 10 links P0 da tabela acima foram corrigidos exclusivamente nos dois arquivos `MASTER` e validados pelo Vault Librarian. Não foram incluídos links ambíguos, referências a `03-Squads`, arquivos de mídia, documentos de código nem qualquer operação de mover, excluir, fundir ou arquivar.

## Resumo executivo

- P0: **190** links — priorizar hubs e projetos ativos; primeiro lote limitado a 10 destinos comprovados.
- P1: **80** links — documentação operacional e sistemas, para revisão por domínio.
- P2: **31** links — histórico, referências e materiais brutos/compilados, para revisão posterior.
- Ambíguos: **43** — sem troca automática proposta.
- Órfãs: **130** — agrupadas para revisão de indexação, sem exclusão.
