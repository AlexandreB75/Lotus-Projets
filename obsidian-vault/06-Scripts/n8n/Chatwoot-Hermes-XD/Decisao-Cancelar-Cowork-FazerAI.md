---
tags: [decisao, fazer-ai, cowork, chatwoot, n8n, hermes-xd]
status: registrado
data: 2026-06-10
---

# Decisão — Cancelar Claude Cowork / não depender do Fazer.ai para o funil

## Contexto

Alexandre informou em 2026-06-10 que pretende cancelar o Claude Cowork.

O Fazer.ai sugeriu continuar com o `/desenhar-funil`, usando credencial da API do Chatwoot para criar tudo no board.

## Decisão operacional

Não seguir com a criação do funil pelo `/desenhar-funil` neste momento.

Motivo:

- o modelo próprio por API já foi desenhado;
- labels e atributos necessários já foram criados no Chatwoot via API;
- a operação fica independente de plugin/marketplace externo;
- o próximo passo agora é n8n + Chatwoot API + Hermes XD/OpenBotXD;
- evita duplicidade de tags, etapas e automações.

## Estado atual

Setup estrutural já criado no Chatwoot:

- etapas do funil;
- labels de temperatura;
- gatilhos comerciais;
- produtos/perfis faltantes;
- atributos de conversa para Hermes XD.

Referência:

- [[Setup-Criado-Chatwoot-2026-06-10]]
- [[Workflow-n8n-Especificacao]]
- [[Payloads-Chatwoot-API]]

## Próximo passo correto

Criar o webhook Chatwoot → n8n e montar o workflow em modo silencioso.

## Cuidado antes de cancelar

Antes de cancelar definitivamente, confirmar se o cancelamento não remove:

- imagem atual do Chatwoot;
- licença Kanban em uso;
- labels/atributos já criados;
- acesso ao board atual;
- integrações existentes.

Se o cancelamento afetar apenas o acesso ao Claude Cowork/marketplace, seguir com cancelamento é coerente.

Se afetar a licença Kanban ou imagem Fazer.ai Pro atualmente instalada, avaliar antes para não quebrar operação.
