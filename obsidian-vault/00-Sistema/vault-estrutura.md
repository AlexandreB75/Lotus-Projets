# Estrutura do Vault — OpenBotXD

> Estrutura operacional atual do vault Obsidian de Alexandre Borges.

---

## Estrutura atual

```text
obsidian-vault/
├── 00-Sistema/                  ← sistema, regras, auditorias e Knowledge Compiler
├── 01-Dashboard/                ← painel central operacional
├── 02-Projetos/                 ← projetos comerciais ativos
│   ├── Hilton Garden Inn Itapema/
│   └── Lótus Business/
├── 03-Squads/                   ← agentes e squads por função operacional
│   ├── 00-INDEX-Agentes-e-Squads.md
│   ├── Agentes-Operacionais/
│   ├── Instagram-Imoveis/
│   ├── Brand-Squad/
│   ├── Copy-Squad/
│   ├── Design-Squad/
│   └── Traffic-Masters/
├── 04-Skills/                   ← skills operacionais e capacidades reutilizáveis
├── 05-Contexto/                 ← contexto permanente
├── 06-Scripts/                  ← scripts gerais
├── 07-Objecoes/                 ← biblioteca geral de objeções
├── 08-Raw/                      ← fontes brutas do Knowledge Compiler
├── 09-Wiki-Compilado/           ← inteligência comercial compilada
└── Templates/                   ← modelos reutilizáveis
```

---

## Decisões estruturais

### `xquads`

`xquads` é legado.

Não existe mais como pasta ativa.

Todo conteúdo de squads deve ficar em:

- [[03-Squads/00-INDEX-Agentes-e-Squads|03-Squads]]

Auditoria: [[00-Sistema/Auditoria-Xquads]]

Manutencao: [[00-Sistema/Mapa-de-Notas-Soltas]]

---

### `_opensquad`

`_opensquad` também é legado.

Conteúdo de sistema deve ficar em:

- `00-Sistema/`

---

### Skills

Skills devem ficar em:

- [[04-Skills/00-INDEX-Skills|04-Skills]]

Conceitos antigos como `opensquads-skill-creator` foram renomeados para:

- [[04-Skills/Skill-Builder-Operacional|Skill Builder Operacional]]

---

## Regra anti-bagunça

Não criar pastas antigas novamente:

- `xquads/`
- `squads/` na raiz
- `_opensquad/`
- `skills/` na raiz

Tudo deve entrar nas pastas numeradas atuais.

---

## Fluxo recomendado

1. Projeto comercial → `02-Projetos/`
2. Agente ou squad → `03-Squads/`
3. Capacidade reutilizável → `04-Skills/`
4. Fonte bruta → `08-Raw/`
5. Inteligência compilada → `09-Wiki-Compilado/`
6. Script geral → `06-Scripts/`

