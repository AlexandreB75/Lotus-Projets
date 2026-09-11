---
tags: [sistema, obsidian, manutencao, notas-soltas, indices]
status: manutencao
data: 2026-06-20
---

# Mapa de Notas Soltas

## Objetivo

Manter um mapa operacional das notas que precisam de costura, indice, revisao ou decisao de arquivamento. Esta nota nao move arquivos automaticamente; ela orienta manutencao segura do vault.

## Diagnostico rapido

- O vault tem estrutura principal boa e nenhuma nota Markdown solta na raiz.
- A maior concentracao de notas pouco conectadas esta em `03-Squads`, mas muitas sao bibliotecas de agentes/tasks e nao devem ser tratadas como lixo.
- Os projetos comerciais estao bem separados em `02-Projetos`, mas algumas notas de campanha/briefing podem receber links a partir dos MASTERs ou indices locais.
- O padrao de indice dominante e `00-INDEX-*`, mas ainda existem `Index.md` e `INDEX.md`.

## Politica proposta para indices

| Nivel | Padrao recomendado | Observacao |
|---|---|---|
| Pasta de dominio/projeto/squad | `00-INDEX-Nome-da-Pasta.md` | Melhor para Obsidian, ordena no topo e descreve escopo |
| Pacotes externos/copias de plugin | `README.md` pode permanecer | Evitar alterar material importado se for referencia externa |
| Arquivos antigos `Index.md`/`INDEX.md` | Renomear gradualmente | Atualizar wikilinks antes/depois do rename |

## Indices fora do padrao

- [x] `03-Squads/Agentes-Operacionais/00-INDEX-Agentes-Operacionais.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/00-INDEX-n8n-workflows.md`
- [x] `03-Squads/Brand-Squad/00-INDEX-Brand-Squad.md`
- [x] `03-Squads/Copy-Squad/00-INDEX-Copy-Squad.md`
- [x] `03-Squads/Design-Squad/00-INDEX-Design-Squad.md`
- [x] `03-Squads/Instagram-Imoveis/00-INDEX-Instagram-Imoveis.md`
- [x] `03-Squads/Traffic-Masters/00-INDEX-Traffic-Masters.md`

## Candidatos em projetos comerciais

Notas diretamente dentro de um projeto que podem ganhar link no MASTER/indice local ou virar arquivo de campanha.

- [x] `02-Projetos/Hilton Garden Inn Itapema/Argumentario-Comercial.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Campanhas-Instagram.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Follow-up-CRM.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Objeções-e-Respostas.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Pitch-de-Vendas.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Publico-Alvo.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Scripts-Operacionais.md`
- [x] `02-Projetos/Hilton Garden Inn Itapema/Scripts-WhatsApp.md`
- [x] `02-Projetos/Lótus Business/Argumentario-Comercial.md`
- [x] `02-Projetos/Lótus Business/campaign-brief.md`
- [x] `02-Projetos/Lótus Business/Campanha-Salas-Comerciais.md`
- [x] `02-Projetos/Lótus Business/Campanhas-Instagram.md`
- [x] `02-Projetos/Lótus Business/Follow-up-CRM.md`
- [x] `02-Projetos/Lótus Business/image-prompts.md`
- [x] `02-Projetos/Lótus Business/Landing-Page-Elementor.md`
- [x] `02-Projetos/Lótus Business/Leads-Remarketing-Meta-Ads.md`
- [x] `02-Projetos/Lótus Business/Lotus-Business-Legacy.md`
- [x] `02-Projetos/Lótus Business/Lotus-Landing.md`
- [x] `02-Projetos/Lótus Business/The spot One/CAMPANHA-META-ADS.md`
- [x] `02-Projetos/Lótus Business/Objeções-e-Respostas.md`
- [x] `02-Projetos/Lótus Business/Pitch-de-Vendas.md`
- [x] `02-Projetos/Lótus Business/Publico-Alvo.md`
- [x] `02-Projetos/Lótus Business/Scripts-WhatsApp.md`

## Referencias tecnicas a costurar

Estas notas parecem corretas, mas devem ser linkadas a partir do indice do n8n/Hermes para nao ficarem escondidas.

- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/fazer-ai-nodes/nodes-conversa.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/fazer-ai-nodes/nodes-kanban.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/fazer-ai-nodes/nodes-trigger.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/fazer-ai-nodes/README.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/fazer-ai-nodes/uso-no-hermes.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/landing-pages/hilton-template.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/landing-pages/lotus-business.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/landing-pages/README.md`
- [x] `03-Squads/Agentes-Operacionais/n8n-workflows/referencias/landing-pages/the-spot-one.md`

## Squads e bibliotecas geradas

Nao tratar como notas soltas automaticamente. Preferir criar/reforcar indice da pasta quando faltar entrada clara.

| Squad/Pasta | Tem 00-INDEX | Tem Index.md | Tem README.md | Acao sugerida |
|---|---:|---:|---:|---|
| `advisory-board` | True | False | True | Criado `00-INDEX-advisory-board.md` |
| `Agentes-Operacionais` | True | False | False | Padronizado em `00-INDEX-Agentes-Operacionais.md` |
| `Brand-Squad` | True | False | True | Padronizado em `00-INDEX-Brand-Squad.md` |
| `c-level-squad` | True | False | True | Criado `00-INDEX-c-level-squad.md` |
| `claude-code-mastery` | True | False | True | Criado `00-INDEX-claude-code-mastery.md` |
| `Copy-Squad` | True | False | True | Padronizado em `00-INDEX-Copy-Squad.md` |
| `cybersecurity` | True | False | True | Criado `00-INDEX-cybersecurity.md` |
| `data-squad` | True | False | True | Criado `00-INDEX-data-squad.md` |
| `Design-Squad` | True | False | True | Padronizado em `00-INDEX-Design-Squad.md` |
| `hormozi-squad` | True | False | True | Criado `00-INDEX-hormozi-squad.md` |
| `Instagram-Imoveis` | True | False | False | Padronizado em `00-INDEX-Instagram-Imoveis.md` |
| `movement` | True | False | True | Criado `00-INDEX-movement.md` |
| `storytelling` | True | False | True | Criado `00-INDEX-storytelling.md` |
| `Traffic-Masters` | True | False | True | Padronizado em `00-INDEX-Traffic-Masters.md` |

## Ordem segura de execucao

1. Padronizar primeiro os indices locais de squads que ja sao usados no Dashboard: Agentes Operacionais, Brand, Copy, Design, Instagram e Traffic.
2. Atualizar wikilinks que apontam para `/Index` ou `/INDEX`.
3. Linkar as referencias de n8n/Hermes no indice `03-Squads/Agentes-Operacionais/n8n-workflows/00-INDEX-n8n-workflows.md`.
4. Revisar notas comerciais de Lotus/Spot One e conectar ao MASTER Lotus ou a um indice de campanha.
5. So arquivar notas quando houver duplicidade clara ou substituicao documentada.

## Proxima acao recomendada

Indices fora do padrao padronizados em 2026-06-20. Referencias tecnicas n8n/Hermes costuradas em 2026-06-20. Notas comerciais candidatas revisadas/costuradas em 2026-06-20. Squads externos com README receberam 00-INDEX local em 2026-06-20. Proxima manutencao: rodar nova auditoria de links/orfaos e decidir se algum README externo deve permanecer como fonte primaria.





