---
tags: [n8n, chatwoot, webhook, instalacao, silent-mode]
status: pronto-para-teste
data: 2026-06-10
---

# Guia — Instalar workflow n8n Silent v0

## Objetivo

Instalar o primeiro workflow Chatwoot → n8n → Chatwoot em **modo silencioso**.

Ele faz:

- recebe webhook do Chatwoot;
- analisa mensagem recebida por regras simples;
- identifica produto/perfil/gatilhos;
- atualiza labels;
- atualiza custom attributes;
- cria nota interna;
- atribui para Alexandre quando lead for quente ou tiver gatilho forte.

Ele **não responde o cliente**.

---

## Arquivo de importação

Importar no n8n:

`workflow-chatwoot-hermes-silent-v0.json`

Caminho no vault:

`06-Scripts/n8n/Chatwoot-Hermes-XD/workflow-chatwoot-hermes-silent-v0.json`

---

## Pré-requisitos já confirmados

- Chatwoot URL: `https://chatwoot.alexandreborges.site`
- Account ID: `1`
- Alexandre Agent ID: `1`
- WhatsApp Inbox ID: `2`
- Inbox: Fone Escritorio HK9
- Canal: WhatsApp / Baileys
- Número: `+5547988695350`

---

## Variável obrigatória no n8n

Configurar no ambiente do n8n:

```text
CHATWOOT_API_TOKEN=token_real_do_chatwoot
```

Importante:

- não colar token dentro do workflow;
- não salvar token no vault;
- usar variável de ambiente ou credencial segura do n8n.

---

## Passo 1 — Importar workflow

No n8n:

1. Ir em **Workflows**.
2. Clicar em **Import from File** ou **Import from Clipboard**.
3. Importar `workflow-chatwoot-hermes-silent-v0.json`.
4. Manter workflow **inativo** inicialmente.

---

## Passo 2 — Conferir Webhook

Node:

`Webhook Chatwoot`

Path:

```text
chatwoot-hermes-xd
```

URL de produção:

```text
https://n8n.alexandreborges.site/webhook/chatwoot-hermes-xd
```

URL de teste:

```text
https://n8n.alexandreborges.site/webhook-test/chatwoot-hermes-xd
```

---

## Passo 3 — Criar webhook no Chatwoot

No Chatwoot:

1. Settings / Configurações.
2. Integrations / Webhooks.
3. Add webhook.
4. URL de produção:

```text
https://n8n.alexandreborges.site/webhook/chatwoot-hermes-xd
```

Para teste manual no n8n, usar temporariamente:

```text
https://n8n.alexandreborges.site/webhook-test/chatwoot-hermes-xd
```

5. Eventos iniciais:

- `message_created`

Opcional depois:

- `conversation_created`

---

## Passo 4 — Teste seguro

Antes de ativar para todos:

1. Deixar workflow em modo teste no n8n.
2. Enviar mensagem para o WhatsApp do Chatwoot.
3. Conferir execução no n8n.
4. Conferir no Chatwoot se criou:
   - nota interna;
   - labels;
   - custom attributes;
   - atribuição para Alexandre se aplicável.

---

## Mensagens para teste

### Teste 1 — Multipropriedade

```text
Quero a tabela da multipropriedade do Hilton
```

Resultado esperado:

- produto: `multipropriedade_hilton`
- perfil: `ferias_multipropriedade`
- labels:
  - `produto-multipropriedade-hilton`
  - `perfil-temporada`
  - `gatilho-pediu-tabela`
  - `lead-quente` ou `lead-prioridade-alexandre`

---

### Teste 2 — Lótus

```text
Quero saber valores das salas comerciais do Lótus
```

Resultado esperado:

- produto: `lotus_business`
- label: `produto-lotus`
- gatilho: `gatilho-perguntou-preco`
- Alexandre assume.

---

### Teste 3 — Médico

```text
Sou médico e procuro uma sala para consultório
```

Resultado esperado:

- produto provável: `centro_medico_hilton` ou `lotus_business`
- perfil: `medico_clinica`
- label: `perfil-saude`

---

### Teste 4 — Curioso

```text
Só queria saber o que é esse empreendimento
```

Resultado esperado:

- produto: `indefinido`
- temperatura: frio ou morno baixo
- não atribuir automaticamente para Alexandre se não houver gatilho.

---

## O que o workflow faz hoje

### Node 1 — Webhook Chatwoot

Recebe evento do Chatwoot.

### Node 2 — Normalizar + Classificar v0

Classifica por palavras-chave.

Ainda não usa IA externa.

### Node 3 — Evento válido?

Ignora:

- mensagem vazia;
- mensagem enviada por agente/bot;
- mensagem privada;
- inbox diferente do WhatsApp `2`;
- conversa com label `agente-off`.

### Node 4 — Atualizar atributos

Atualiza:

- `funil_etapa`
- `lead_score`
- `lead_temperatura`
- `produto_interesse`
- `perfil_lead`
- `gatilho_quente`
- `responsavel_sugerido`
- `proxima_acao`
- `ultimo_resumo_hermes`
- `ultima_classificacao_em`

### Node 5 — Atualizar labels

Mescla labels existentes e remove antigas labels de etapa/temperatura/produto/perfil/gatilho.

### Node 6 — Nota interna

Cria nota privada no Chatwoot.

### Node 7 — Assumir Alexandre?

Se score alto ou gatilho forte, atribui conversa para Alexandre.

---

## Limitações da v0

- Classificação por regras, não por IA.
- Não busca histórico completo da conversa.
- Não deduplica message_id ainda.
- Não responde cliente.
- Não chama Hermes XD/OpenBotXD externo.

Essas limitações são intencionais para teste seguro.

---

## Próxima versão — v1

Adicionar:

1. deduplicação por message_id;
2. busca das últimas mensagens da conversa;
3. chamada para Hermes XD/OpenBotXD;
4. validação por JSON schema;
5. recomendação de resposta, ainda sem envio automático;
6. dashboard de métricas.

---

## Regra de segurança

Se algo der errado:

1. Desativar workflow no n8n.
2. Remover/desativar webhook no Chatwoot.
3. O Chatwoot continua funcionando normalmente.

Nada neste workflow altera Docker, Coolify ou imagem do Chatwoot.
