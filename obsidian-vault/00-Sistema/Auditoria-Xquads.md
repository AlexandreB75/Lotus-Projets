---
tags: [auditoria, xquads, squads, vault, organizacao]
status: concluido
data: 2026-06-09
---

# Auditoria — xquads

## Diagnóstico

A pasta `xquads` **não existe mais como estrutura ativa** no vault.

O conteúdo relacionado a squads já foi consolidado em:

- [[../03-Squads/00-INDEX-Agentes-e-Squads|03-Squads]]

---

## Evidência encontrada

Foram encontradas apenas referências históricas em:

- `reorganize-vault.ps1`
- `vault-estrutura.md`

O script antigo indicava a regra:

> unificar `squads` e `xquads` em `03-Squads`.

Essa consolidação já está refletida na estrutura atual.

---

## Estrutura atual de squads

- [[../03-Squads/00-INDEX-Agentes-e-Squads|00-INDEX-Agentes-e-Squads]]
- [[../03-Squads/Agentes-Operacionais/SDR-Hilton|SDR-Hilton]]
- [[../03-Squads/Agentes-Operacionais/SDR-Lotus-Business|SDR-Lotus Business]]
- [[../03-Squads/Agentes-Operacionais/Closer-Alexandre|Closer-Alexandre]]
- [[../03-Squads/Agentes-Operacionais/Follow-Up-Inteligente|Follow-Up Inteligente]]
- [[../03-Squads/Agentes-Operacionais/Gestor-Operacional|Gestor Operacional]]
- [[../03-Squads/Instagram-Imoveis/Index|Instagram Imóveis]]
- [[../03-Squads/Brand-Squad/Index|Brand Squad]]
- [[../03-Squads/Copy-Squad/Index|Copy Squad]]
- [[../03-Squads/Design-Squad/Index|Design Squad]]
- [[../03-Squads/Traffic-Masters/Index|Traffic Masters]]

---

## Decisão operacional

Não recriar `xquads`.

Manter tudo em `03-Squads`, separado por função:

- agentes operacionais;
- squads de marketing;
- squads de conteúdo;
- squads de tráfego;
- squads de design/brand.

---

## Regra futura

Se aparecer material antigo de `xquads`, não criar nova pasta.

Mover ou reinterpretar dentro de:

- `03-Squads/Agentes-Operacionais/` quando for agente;
- `03-Squads/<Nome-do-Squad>/` quando for squad funcional;
- `04-Skills/` quando for capacidade reutilizável;
- `08-Raw/` quando for apenas fonte bruta.

---

## Status

Auditoria concluída.

`xquads` é legado. A estrutura oficial agora é `03-Squads`.
