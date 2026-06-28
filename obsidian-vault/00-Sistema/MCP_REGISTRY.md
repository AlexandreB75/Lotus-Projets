# MCP_REGISTRY.md — Registro de MCP Servers
# v1.0 — 2026-06-25
# Todo MCP instalado deve ter uma entrada aqui antes de entrar em uso.
# Processo de aprovação: seguir CHANGE_POLICY.md.

---

## MCPs Ativos

### vault (Obsidian)

| Campo | Valor |
|-------|-------|
| **Nome** | mcp__vault__* |
| **Finalidade** | Leitura e escrita no vault Obsidian — notas, SKILL.md, arquivos de sistema |
| **Permissões** | Leitura e escrita nos diretórios permitidos do vault |
| **Riscos** | Sobrescrever arquivos de sistema (CLAUDE.md, AGENTS.md) sem aprovação |
| **Mitigação** | CHANGE_POLICY.md e GateGuard hook proíbem escrita em arquivos protegidos sem proposta |
| **Responsável** | Alexa (operador) |
| **Versão** | Ativa |

---

### chrome-devtools

| Campo | Valor |
|-------|-------|
| **Nome** | mcp__plugin_ecc_chrome-devtools__* |
| **Finalidade** | Automação de browser — navegar, clicar, capturar screenshots, preencher formulários |
| **Permissões** | Controle total do browser Chrome aberto na sessão |
| **Riscos** | Ações irreversíveis em plataformas (publicar campanha, enviar mensagem, deletar item) |
| **Mitigação** | Usar apenas para leitura e inspeção salvo quando ação explicitamente solicitada |
| **Responsável** | Alexa (operador) |
| **Versão** | Ativa |

---

### context7

| Campo | Valor |
|-------|-------|
| **Nome** | mcp__context7__* |
| **Finalidade** | Busca de documentação atualizada de bibliotecas, frameworks e APIs |
| **Permissões** | Somente leitura — fetch de docs externos |
| **Riscos** | Baixo — apenas leitura de documentação pública |
| **Mitigação** | N/A |
| **Responsável** | ECC (plugin marketplace) |
| **Versão** | Ativa |

---

### claude_ai_facebook (Meta Ads)

| Campo | Valor |
|-------|-------|
| **Nome** | mcp__claude_ai_facebook__* |
| **Finalidade** | Consulta de campanhas, ad sets e anúncios no Meta Ads Manager |
| **Permissões** | Leitura de dados de campanha; escrita requer aprovação humana |
| **Riscos** | Modificar ou pausar campanhas ativas sem intenção |
| **Mitigação** | Regra no CLAUDE.md: nunca alterar campanhas automaticamente — propor mudanças para aprovação |
| **Responsável** | Alexa (operador) |
| **Versão** | Ativa |

---

### vercel

| Campo | Valor |
|-------|-------|
| **Nome** | mcp__plugin_vercel_vercel__* |
| **Finalidade** | Deploy e gerenciamento de projetos na Vercel |
| **Permissões** | Deploy, env vars, status de builds |
| **Riscos** | Deploy acidental em produção |
| **Mitigação** | Confirmar com usuário antes de qualquer deploy em ambiente de produção |
| **Responsável** | Alexa (operador) |
| **Versão** | Ativa |

---

## Template para Novo MCP

```markdown
### [Nome do MCP]

| Campo | Valor |
|-------|-------|
| **Nome** | identificador técnico (ex: mcp__nome__*) |
| **Finalidade** | O que resolve — problema concreto que justifica a instalação |
| **Permissões** | O que o MCP pode fazer no sistema (leitura, escrita, execução) |
| **Riscos** | Ações irreversíveis ou de alto impacto que ele pode executar |
| **Mitigação** | Como os riscos são controlados (regras, confirmações, permissões restritas) |
| **Responsável** | Quem aprovou e mantém |
| **Versão** | Versão instalada ou "A instalar" |
```

**Antes de preencher este template**, passar pelo processo da CHANGE_POLICY.md:
1. Análise de valor — resolve um problema real e presente?
2. Conflito com CLAUDE.md — contradiz alguma regra existente?
3. Arquivo correto — vai para MCP_REGISTRY.md (aqui) + possivelmente TOOLS.md
4. Proposta aprovada — benefício, risco, impacto, arquivos afetados, recomendação

---

## MCPs Avaliados e Rejeitados

| MCP | Motivo da Rejeição | Data |
|-----|--------------------|------|
| *(nenhum ainda)* | | |

> Registrar aqui MCPs avaliados e não aprovados evita reavaliações repetidas.

---

## Atualizacao 2026-06-25 — MCPs de Operacao

### Slack

| Campo | Valor |
|-------|-------|
| **Nome** | `claude.ai Slack` |
| **Finalidade** | Ler/usar Slack como canal operacional interno via Claude Code quando necessario |
| **Permissões** | Conforme autorizacao do conector Slack no Claude.ai |
| **Riscos** | Envio de mensagens em canais errados ou mistura de alertas operacionais com conversa humana |
| **Mitigação** | Slack e saida/notificacao; n8n continua sendo orquestrador e Supabase fonte de verdade |
| **Responsável** | Alexa (operador) |
| **Versão** | Conectado em 2026-06-25 |

### n8n MCP

| Campo | Valor |
|-------|-------|
| **Nome** | `n8n` |
| **Endpoint** | `https://n8n.alexandreborges.site/mcp-server/http` |
| **Finalidade** | Expor workflows selecionados do n8n como ferramentas MCP para Claude Code |
| **Status** | Configurado, mas `Failed to connect` em 2026-06-25 |
| **Diagnóstico** | Endpoint online; sem auth retorna HTTP 401. Problema atual parece autenticacao/configuracao do MCP no Claude Code, nao proxy/VPS. |
| **Ação tomada** | Entrada duplicada `n8n-mcp` removida; entrada canonica mantida como `n8n`. |
| **Pendência** | Reautenticar/corrigir token MCP do n8n antes de depender dele em producao. |
