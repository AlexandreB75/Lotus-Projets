---
type: sistema
agente: Vault-Librarian
status: ativo
---

# Vault Librarian

Agente de manutenção semanal do vault. Detecta problemas estruturais antes que acumulem.

## O que faz

| Verificação | O que procura |
|-------------|---------------|
| Wikilinks quebrados | `[[links]]` que apontam para arquivos inexistentes |
| Notas órfãs em 08-Raw | Notas sem wikilinks de saída com mais de 7 dias |
| Contagem por pasta | Distribuição das notas no vault |

## Como rodar (manual)

No VPS:
```bash
cd ~/Lotus-Projets
python3 scripts/vault-librarian.py
```

O relatório é salvo em `01-Dashboard/Relatorio-Manutencao.md` e commitado automaticamente.

## Agendamento automático

N8N workflow: `vault-librarian-semanal.json`
- Roda toda segunda-feira às 08h
- Puxa `git pull` antes de analisar
- Envia resultado no Slack

## Análise do relatório com Claude Code

Após rodar o script, abra o relatório no Obsidian (`01-Dashboard/Relatorio-Manutencao.md`) e peça ao Claude Code para interpretar e sugerir ações:

```
Analise o Relatorio-Manutencao.md e sugira o que fazer com os links quebrados e as notas órfãs
```

## Arquivos do sistema

- Script: `scripts/vault-librarian.py`
- Workflow N8N: `n8n-workflows/vault-librarian-semanal.json`
- Relatório gerado: `01-Dashboard/Relatorio-Manutencao.md`
- Arquivo histórico (YAML Omnigent descontinuado): `_arquivo/omnigent-agents/vault-librarian.yaml`

## Regras de operação

- Nunca deleta arquivos — apenas reporta (P01)
- Não acessa nem menciona `05-Contexto/` (privado)
- Sugere mover para `09-Wiki-Compilado/` antes de descartar (P06)
- Registra decisões de arquitetura em DECISIONS.md se necessário (P04)
