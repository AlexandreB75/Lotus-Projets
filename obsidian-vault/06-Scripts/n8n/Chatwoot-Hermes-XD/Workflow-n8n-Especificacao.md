---
tags: [n8n, workflow, chatwoot, api, especificacao]
status: em-desenho
data: 2026-06-10
---

# Workflow n8n — Especificação

## Nome sugerido

`HK Nove — Chatwoot Hermes XD Lead Router`

---

## Objetivo

Receber eventos do Chatwoot, qualificar leads via Hermes XD/OpenBotXD e atualizar o Chatwoot com tags, score, etapa, produto e atribuição.

---

## Modo inicial recomendado

**Modo silencioso**.

No início o workflow deve:

- receber eventos;
- classificar lead;
- aplicar tags;
- atualizar atributos;
- criar nota interna;
- não enviar mensagem automática para o cliente.

Depois de validado, ativar mensagens automáticas em etapas 1–3.

---

## Gatilho

### Node 01 — Webhook

Tipo: `Webhook`

Função:

- receber eventos do Chatwoot.

Evento esperado:

- `message_created`;
- opcionalmente `conversation_created`.

URL:

`https://SEU_N8N/webhook/chatwoot-hermes-xd`

Método:

`POST`

---

## Filtro inicial

### Node 02 — IF: Evento válido

Condições:

- evento é mensagem criada;
- mensagem é de entrada do cliente, não do bot/agente;
- conversa pertence ao inbox WhatsApp correto;
- mensagem tem conteúdo textual ou mídia analisável;
- conversa não está marcada como `bot_pausado`.

Se não passar: encerrar.

---

## Deduplicação

### Node 03 — Data Store / Redis / Banco simples

Chave:

`chatwoot_message_{{message_id}}`

Se a chave já existir:

- encerrar.

Se não existir:

- salvar chave com TTL de 7 dias.

Objetivo:

Evitar processamento duplicado caso o Chatwoot reenvie webhook.

---

## Normalização do payload

### Node 04 — Code: Normalizar evento

Gerar objeto padrão:

```json
{
  "account_id": "",
  "conversation_id": "",
  "message_id": "",
  "inbox_id": "",
  "contact_id": "",
  "contact_name": "",
  "contact_phone": "",
  "message_text": "",
  "current_labels": [],
  "assignee_id": null,
  "conversation_status": "open",
  "created_at": ""
}
```

---

## Buscar contexto da conversa

### Node 05 — HTTP Request: Get Conversation

Objetivo:

- buscar dados atualizados da conversa;
- obter labels existentes;
- obter atributos personalizados;
- identificar responsável atual;
- evitar sobrescrever informação importante.

---

## Buscar mensagens recentes

### Node 06 — HTTP Request: Get Messages

Objetivo:

- coletar as últimas 10–20 mensagens;
- enviar contexto para Hermes XD;
- evitar decisão baseada em uma única mensagem.

---

## Preparar prompt para Hermes XD

### Node 07 — Code: Montar contexto

Enviar para Hermes:

- mensagem atual;
- últimas mensagens;
- produto já detectado;
- score anterior;
- etapa anterior;
- tags atuais;
- regras de compliance;
- funil oficial.

---

## Classificação Hermes XD

### Node 08 — HTTP Request / OpenAI / OpenClaw

Entrada:

- JSON do contexto.

Saída esperada:

```json
{
  "produto_interesse": "multipropriedade_hilton",
  "perfil_lead": "perfil-temporada",
  "funil_etapa": "qualificacao",
  "lead_score": 72,
  "lead_temperatura": "morno",
  "gatilhos": ["pediu_tabela"],
  "assumir_alexandre": true,
  "proxima_acao": "enviar_tabela_e_oferecer_reuniao",
  "resumo_interno": "Lead perguntou por tabela da multipropriedade Hilton. Interesse em férias familiares.",
  "resposta_sugerida": "Posso te mandar a tabela..."
}
```

---

## Validar saída do Hermes

### Node 09 — IF / Code: Validação

Se JSON inválido:

- criar nota interna `Erro na classificação Hermes`;
- não responder cliente;
- opcionalmente alertar Alexandre.

Se válido:

- seguir.

---

## Calcular tags finais

### Node 10 — Code: Merge labels

Importante:

- preservar labels já existentes;
- remover apenas labels antigas de etapa/temperatura/produto quando houver nova classificação;
- adicionar novas labels.

Categorias removíveis:

- `etapa_*`
- `lead-frio`, `lead-morno`, `lead-quente`
- `produto_*`
- `perfil_*`, se nova classificação for mais confiável

Preservar:

- labels manuais;
- tags de campanha;
- tags de origem;
- tags de atendimento humano.

---

## Atualizar custom attributes

### Node 11 — HTTP Request: Update Custom Attributes

Atualizar:

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

---

## Atualizar labels

### Node 12 — HTTP Request: Update Labels

Aplicar labels finais calculadas.

Atenção:

- confirmar comportamento da API no ambiente antes de produção;
- preferir enviar lista completa final para não apagar labels úteis.

---

## Criar nota interna

### Node 13 — HTTP Request: Create Private Note

Exemplo:

```text
🤖 Hermes XD
Produto: Multipropriedade Hilton
Perfil: Férias/família
Score: 82 — lead quente
Gatilho: pediu tabela
Próxima ação: Alexandre assumir e enviar condição atualizada.
Resumo: lead quer entender cotas com datas fixas e uso vitalício.
```

---

## Decidir handoff

### Node 14 — IF: Assumir Alexandre?

Verdadeiro se:

- `lead_score >= 80`;
- `assumir_alexandre = true`;
- etapa >= `reuniao_visita`;
- gatilho comercial forte presente.

---

## Atribuir para Alexandre

### Node 15 — HTTP Request: Assign Conversation

Atribuir conversa para Alexandre ou equipe comercial.

Adicionar label:

- `lead-prioridade-alexandre`

Criar nota:

`Lead quente atribuído automaticamente para Alexandre.`

---

## Opcional — Enviar resposta automática

### Node 16 — IF: Pode responder automático?

Responder automático somente se:

- modo automático ativado;
- conversa não atribuída a humano;
- etapa 1–3;
- mensagem não envolve negociação sensível;
- resposta sugerida passou por compliance.

Caso contrário:

- apenas nota interna.

---

## Follow-up e nutrição

Criar workflows separados, não misturar tudo no roteador principal.

### Workflow A — Follow-up 24h

- buscar conversas com `followup_24h`;
- verificar se cliente respondeu;
- se não, enviar mensagem curta.

### Workflow B — Nutrição 7 dias

- leads frios/mornos sem resposta;
- enviar conteúdo educativo conforme produto.

### Workflow C — Conteúdo 30 dias

- reativação leve;
- novidades, materiais, oportunidade, sem pressão.

---

## Variáveis necessárias no n8n

- `CHATWOOT_BASE_URL`
- `CHATWOOT_ACCOUNT_ID`
- `CHATWOOT_API_TOKEN`
- `ALEXANDRE_AGENT_ID`
- `HERMES_ENDPOINT`
- `HERMES_API_KEY` se existir
- `N8N_WEBHOOK_SECRET` opcional

---

## Segurança

- Não deixar token em node visível; usar credenciais/env do n8n.
- Não registrar token em logs.
- Começar em modo silencioso.
- Ter workflow separado para rollback/desativação.
- Não responder cliente automaticamente até validação real.
