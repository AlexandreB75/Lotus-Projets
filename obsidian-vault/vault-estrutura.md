# Estrutura do Vault - CLAUDE CODE

## Estrutura Proposta

```
CLAUDE CODE/
├── .obsidianignore          ← exclui node_modules do index
├── .gitignore
│
├── 00-Sistema/              ← antigo _opensquad
│   ├── _config/
│   ├── _core/
│   ├── _investigations/
│   ├── _memory/
│   └── _logs/
│
├── 01-Dashboard/            ← antigo dashboard
│
├── 02-Projetos/             ← projetos ativos
│   ├── Lotus-Projets/
│   └── Hubspot/
│       ├── lotus-business/
│       └── lotus-landing/
│
├── 03-Squads/               ← unificação de squads + xquads
│   ├── instagram-imoveis/
│   ├── advisory-board/
│   ├── brand-squad/
│   ├── c-level-squad/
│   ├── claude-code-mastery/
│   ├── copy-squad/
│   ├── cybersecurity/
│   ├── data-squad/
│   ├── design-squad/
│   ├── hormozi-squad/
│   ├── movement/
│   ├── storytelling/
│   └── traffic-masters/
│
├── 04-Skills/               ← antigo skills
│   ├── apify/
│   ├── blotato/
│   ├── canva/
│   ├── image-creator/
│   ├── image-fetcher/
│   ├── image-generator/
│   ├── instagram-publisher/
│   ├── opensquad-agent-creator/
│   └── Skill-Builder-Operacional/
│
├── 05-Contexto/             ← arquivos de contexto permanente
│   ├── Contexto_Permanente.txt
│   ├── CLAUDE
│   └── Claude Memory
│
├── Templates/               ← templates reutilizáveis
│
├── node_modules/            ← IGNORADO pelo Obsidian
└── README
```

## Problemas Resolvidos

| Problema | Solução |
|---|---|
| `node_modules` indexado | `.obsidianignore` exclui a pasta |
| `squads` duplicado em `xquads` | Unificados em `03-Squads` |
| Sem ordem visual | Prefixos `00-` a `05-` ordenam automaticamente |
| Contexto espalhado | Centralizado em `05-Contexto` |

## Como Aplicar

1. Copie `reorganize-vault.ps1` para a raiz do vault
2. Clique com o botão direito → **Executar com PowerShell**
3. Reinicie o Obsidian
