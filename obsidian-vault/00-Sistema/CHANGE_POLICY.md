# Change Policy — Claude Code Environment
# v1.0 — 2026-06-25
# Esta política rege qualquer alteração ao ambiente Claude Code.

## Princípio

Este ambiente é a versão 1.0 de um ecossistema de agentes. Cada adição carrega custo de contexto, risco de conflito e dívida de manutenção. A presunção padrão é **não adicionar** — o ônus da prova é de quem quer mudar.

---

## Antes de Instalar Qualquer Coisa

Antes de instalar skill, MCP, ferramenta, prompt externo, framework (ex: gstack) ou qualquer componente novo:

### 1. Análise de Valor
- Que problema concreto isso resolve hoje?
- O ecossistema atual (n8n, Supabase, OpenClaw, Claude Code) já resolve isso de outra forma?
- Se a resposta for "pode ser útil no futuro" — não instalar.

### 2. Análise de Conflito com CLAUDE.md
- A nova regra ou ferramenta contradiz alguma instrução existente?
- Aumenta o consumo de contexto por sessão?
- Quebra algum padrão de orquestração definido (n8n como hub, Supabase como fonte de verdade)?

### 3. Arquivo Correto
Cada tipo de informação tem um arquivo-lar. Nada vai para CLAUDE.md por padrão.

| Tipo de conteúdo | Arquivo |
|------------------|---------|
| Regras de comportamento do Claude Code | `CLAUDE.md` |
| Arquitetura do ecossistema, fluxos, schema Supabase | `ARCHITECTURE.md` |
| Ferramentas externas, MCPs, CLIs, APIs | `TOOLS.md` |
| Agentes OpenClaw — papéis, SKILL.md, constraints | `AGENTS.md` |
| Workflows n8n — padrões, gatilhos, convenções | `WORKFLOWS.md` |

### 4. CLAUDE.md é Imutável sem Proposta Aprovada
CLAUDE.md não pode ser alterado automaticamente. Toda mudança requer proposta explícita e aprovação antes de qualquer escrita.

---

## Formato Obrigatório de Proposta

Antes de qualquer alteração, apresentar:

```
## Proposta de Mudança: [nome da mudança]

**Benefício:** O que melhora concretamente.
**Risco:** O que pode quebrar ou conflitar.
**Impacto de contexto:** Quantos tokens adicionais por sessão (se aplicável).
**Arquivos afetados:** Lista de arquivos que serão criados ou modificados.
**Recomendação:** Instalar / Não instalar / Instalar com ajustes.
```

Aguardar aprovação explícita antes de executar.

---

## Critérios de Aprovação

Uma mudança é aprovada quando:
- Resolve um problema real e presente (não hipotético)
- Não contradiz nenhuma regra do CLAUDE.md
- Vai para o arquivo correto (não para CLAUDE.md por padrão)
- O benefício é maior que o custo de contexto adicionado

Uma mudança é recusada quando:
- O benefício é vago ("pode ser útil")
- Duplica capacidade já existente no ecossistema
- Aumenta consumo de tokens sem comportamento diferente
- Pertence a um arquivo diferente do proposto

---

## Versionamento

Ao aprovar uma mudança que altere um dos arquivos de sistema:
- Incrementar a versão no cabeçalho do arquivo afetado
- Registrar a mudança em `00-Sistema/CHANGELOG.md` (a ser criado quando houver a primeira mudança aprovada)

---

## Arquivos de Sistema Protegidos

```
00-Sistema/
  CLAUDE.md          ← comportamento do Claude Code
  ARCHITECTURE.md    ← arquitetura do ecossistema
  CHANGE_POLICY.md   ← este arquivo
  TOOLS.md           ← (a criar quando necessário)
  AGENTS.md          ← (a criar quando necessário)
  WORKFLOWS.md       ← (a criar quando necessário)
  CHANGELOG.md       ← (a criar na primeira mudança aprovada)
```

Nenhum desses arquivos é alterado sem proposta aprovada.
