---
tags: [openclaw, agentes, skills, memoria, seguranca, ecc, referencia]
status: referencia-avaliada
data: 2026-06-11
---

# Referência — ECC / Agent Harness

Repositório analisado:

- https://github.com/affaan-m/ECC

## O que é

ECC é um sistema operacional/estrutura para trabalho com agentes de IA em múltiplos ambientes, como Claude Code, Codex, Cursor, OpenCode, Gemini, Zed e GitHub Copilot.

A proposta central é organizar:

- agentes;
- skills;
- regras;
- memória;
- hooks;
- segurança;
- MCP configs;
- comandos;
- padrões reutilizáveis;
- otimização de contexto/token.

## Avaliação para o OpenBotXD

Faz sentido como **referência forte de arquitetura operacional**.

Diferente do LLM Council, que é mais uma ideia de deliberação multi-modelo, o ECC é mais próximo do que estamos construindo:

- um sistema de agentes;
- com skills;
- com memória;
- com workflows;
- com regras operacionais;
- com documentação viva;
- com padrões reutilizáveis.

## Onde pode ajudar nosso projeto

### 1. Organização do vault Obsidian

Pode inspirar uma estrutura mais madura para:

- `04-Skills`;
- `03-Squads`;
- `00-Sistema`;
- `06-Scripts`;
- documentação de agentes;
- registros operacionais;
- padrões de prompt.

### 2. Skills reutilizáveis

Pode ajudar a padronizar skills como:

- SDR HK Nove;
- Follow-up Inteligente;
- Qualificação Lótus;
- Objeções imobiliárias;
- Revisão de compliance comercial;
- Criação de campanhas;
- Auditoria de workflow n8n.

### 3. Memória e contexto

Pode servir de referência para separar:

- memória de projeto;
- memória de agente;
- memória comercial;
- regras permanentes;
- contexto temporário;
- histórico operacional.

### 4. Segurança

Útil para pensar em:

- proteção contra prompt injection;
- não vazar tokens;
- não executar comandos perigosos;
- separar ambiente de teste e produção;
- revisar workflows antes de ativar.

### 5. Otimização de custo/token

Pode inspirar regras para:

- reduzir prompts grandes;
- usar modelos menores quando possível;
- manter versões otimizadas para n8n;
- evitar contexto desnecessário no atendimento.

## Onde não devemos copiar cegamente

Não instalar ou copiar tudo agora.

Riscos:

- complexidade excessiva;
- estrutura grande demais para nossa fase atual;
- possível conflito com OpenClaw;
- manutenção pesada;
- excesso de agentes/skills sem uso prático.

## Decisão operacional

Não instalar agora.

Usar como referência para melhorar gradualmente o OpenBotXD.

Prioridade atual continua:

1. SDR HK Nove v1 funcionando no Chatwoot.
2. Testar auto-resposta controlada.
3. Organizar skills reais por função comercial.
4. Melhorar memória do vault por produto.
5. Só depois criar padrões mais avançados inspirados no ECC.

## Aplicação prática recomendada

Criar futuramente um padrão interno chamado:

**OpenBotXD Agent Harness**

Com estrutura:

```text
/agentes
  SDR-HK-Nove
  Follow-Up-Inteligente
  Closer-Support

/skills
  qualificar-lead-imobiliario
  responder-objecao
  criar-campanha-meta
  revisar-compliance-comercial

/memorias
  lotus-business
  hilton
  multipropriedade
  the-spot-one

/regras
  compliance-comercial
  atendimento-whatsapp
  handoff-alexandre
  seguranca-workflow
```

## Conclusão

ECC é uma boa referência para maturidade operacional do OpenBotXD.

Não é prioridade instalar, mas vale estudar para:

- organização do vault;
- padronização de skills;
- segurança;
- memória;
- operação multiagente futura.
