# Princípios Globais do Ecossistema
# v1.0 — 2026-06-25
# Regras que governam todo o ecossistema: agentes, workflows, ferramentas e decisões.
# Referenciado por: CLAUDE.md · CHANGE_POLICY.md · AGENTS.md · WORKFLOWS.md

---

## P01 — Nunca executar ações destrutivas sem aprovação

Ações irreversíveis (deletar registros, pausar campanhas, remover leads, sobrescrever arquivos críticos) exigem confirmação explícita antes de execução.

**O que conta como destrutivo:** delete em banco, pausa de campanha ativa, reset de pipeline, sobrescrita de CLAUDE.md ou AGENTS.md, encerramento de conversa com cliente.

**Aplica-se a:** Claude Code, todos os agentes n8n, workflows automatizados.

**Ver também:** CHANGE_POLICY.md

---

## P02 — Sempre reutilizar workflows do n8n antes de criar novos

Antes de propor um novo workflow, verificar se um existente pode ser estendido com um nó adicional.

**Critério de novo workflow:** a lógica é suficientemente diferente do existente para que extender causaria mais confusão do que criar separado.

**Aplica-se a:** toda proposta de automação, toda sugestão de Claude Code para n8n.

---

## P03 — Consultar memória antes de responder

Antes de responder sobre um contato, projeto ou decisão já conhecida, verificar o que está registrado no Supabase (agentes) ou em `memory/` (Claude Code).

**Memória implícita:** o contexto é usado para moldar a resposta — nunca anunciado ("me lembro que você disse...").

**Aplica-se a:** todos os agentes OpenClaw, Claude Code.

**Ver também:** CLAUDE.md › Memory

---

## P04 — Registrar decisões importantes

Toda decisão arquitetural relevante — escolha de threshold, estrutura de dados, comportamento em falha, mudança de política — deve ter um ADR registrado no `DECISIONS.md` do agente ou em `00-Sistema/` quando for transversal.

**O que é importante:** qualquer decisão que, sem registro, seria difícil de entender ou reproduzir por outra pessoa 6 meses depois.

**Aplica-se a:** agentes (DECISIONS.md), Claude Code (CHANGE_POLICY.md), arquitetura (ARCHITECTURE.md).

---

## P05 — Nunca inventar dados

Quando um dado não está disponível, retornar `null` ou indicar ausência explicitamente. Nunca inferir, extrapolar ou fabricar valores para preencher lacunas.

**Exemplos de violação:** inventar preço de imóvel não consultado, assumir budget de lead não informado, gerar estatísticas sem fonte.

**Quando dados são necessários mas ausentes:** retornar o campo como `null` com `routing_rationale` explicando a ausência. Para Claude Code: solicitar ao usuário ou buscar via WebFetch.

**Aplica-se a:** todos os agentes, Claude Code, respostas em geral.

---

## P06 — Preferir simplicidade à complexidade

A solução mais simples que resolve o problema atual é a correta. Não construir para requisitos hipotéticos.

**Manifestações práticas:**
- Estender workflow antes de criar novo (ver P02)
- Um nó n8n antes de um agente
- Um agente antes de um multi-agente
- Uma tabela Supabase antes de um schema complexo

**Quando complexidade é justificada:** quando a simplicidade atual cria dívida técnica comprovada, não especulativa.

**Aplica-se a:** arquitetura, código, workflows, prompts de agente.

---

## P07 — Propor mudanças antes de aplicá-las

Toda mudança em arquivos de sistema, workflows ativos, agentes em produção ou dados críticos deve ser proposta com: benefício, risco, impacto, arquivos afetados e recomendação.

**CLAUDE.md é imutável sem aprovação explícita.**

**Aplica-se a:** Claude Code, qualquer agente com acesso a write.

**Ver também:** CHANGE_POLICY.md

---

## P08 — Registrar falhas conhecidas

Falhas conhecidas de agentes, limitações de classificação, edge cases sem solução atual — tudo deve ser documentado no `TESTS.md` do agente, seção "Falhas Conhecidas".

**Por quê:** falhas não documentadas são redescobertas em produção. Falhas documentadas são monitoradas e resolvidas quando os dados justificam.

**Aplica-se a:** todos os agentes (TESTS.md), workflows (WORKFLOWS.md › Erros e Fallbacks).

---

## P09 — Todo agente deve possuir SKILL.md, TESTS.md e DECISIONS.md

Nenhum agente vai a produção sem os três artefatos:

| Artefato | Conteúdo mínimo |
|----------|-----------------|
| `SKILL.md` | Missão, entrada, saída (JSON schema), ferramentas, restrições, fluxograma |
| `TESTS.md` | Happy path, edge cases, falhas conhecidas, métricas de sucesso |
| `DECISIONS.md` | ADRs das principais escolhas de design do agente |

**Localização:** `Agentes-Operacionais/agents/<nome>/`

**Aplica-se a:** todos os agentes OpenClaw.

---

## P10 — Toda alteração deve ser testável

Antes de aplicar uma mudança em agente, workflow ou schema, deve existir um teste ou critério de validação que confirme que a mudança funciona como esperado.

**Para agentes:** atualizar TESTS.md com o caso de teste coberto pela mudança antes de aplicar.
**Para workflows n8n:** executar manualmente com input de teste antes de ativar.
**Para schema Supabase:** testar a query/migration em ambiente de staging ou com dados sintéticos.

**Aplica-se a:** todo o ecossistema.

---

## Mapa de Cobertura

| Princípio | Arquivo de referência |
|-----------|----------------------|
| P01 | CHANGE_POLICY.md |
| P02 | WORKFLOWS.md |
| P03 | CLAUDE.md › Memory |
| P04 | DECISIONS.md (por agente) |
| P05 | CLAUDE.md › Security + SKILL.md de cada agente |
| P06 | ARCHITECTURE.md |
| P07 | CHANGE_POLICY.md |
| P08 | TESTS.md (por agente) |
| P09 | AGENTS.md |
| P10 | TESTS.md (por agente) + WORKFLOWS.md |
