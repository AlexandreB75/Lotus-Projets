---
tags: [chatwoot, api, payloads, n8n]
status: em-desenho
data: 2026-06-10
---

# Payloads — Chatwoot API

> Referência operacional de payloads para o workflow n8n.

---

## Variáveis base

```text
CHATWOOT_BASE_URL=https://chatwoot.alexandreborges.site
CHATWOOT_ACCOUNT_ID=1
CHATWOOT_API_TOKEN=token_privado # usar credencial/env do n8n; não salvar token real em arquivo
CONVERSATION_ID={{conversation_id}}
ALEXANDRE_AGENT_ID=1
WHATSAPP_INBOX_ID=2
```

Headers:

```json
{
  "api_access_token": "{{CHATWOOT_API_TOKEN}}",
  "Content-Type": "application/json"
}
```

---

## 1. Buscar conversa

```http
GET /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}
```

Uso:

- obter status;
- labels atuais;
- custom attributes;
- assignee atual;
- contato/inbox.

---

## 2. Buscar mensagens da conversa

```http
GET /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/messages
```

Uso:

- pegar últimas mensagens;
- montar contexto para Hermes XD.

---

## 3. Atualizar custom attributes da conversa

```http
POST /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/custom_attributes
```

Payload:

```json
{
  "custom_attributes": {
    "funil_etapa": "qualificacao",
    "lead_score": 82,
    "lead_temperatura": "quente",
    "produto_interesse": "multipropriedade_hilton",
    "perfil_lead": "perfil-temporada",
    "gatilho_quente": "pediu_tabela",
    "responsavel_sugerido": "alexandre",
    "proxima_acao": "enviar_tabela_e_agendar_reuniao",
    "ultimo_resumo_hermes": "Lead pediu tabela da multipropriedade Hilton e demonstrou interesse em férias familiares.",
    "ultima_classificacao_em": "2026-06-10T14:42:00Z"
  }
}
```

---

## 4. Atualizar labels/tags da conversa

```http
POST /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/labels
```

Payload:

```json
{
  "labels": [
    "etapa-qualificacao",
    "lead-quente",
    "lead-prioridade-alexandre",
    "produto-multipropriedade-hilton",
    "perfil-temporada",
    "gatilho-pediu-tabela"
  ]
}
```

Atenção:

> Antes de aplicar em produção, testar se esse endpoint substitui a lista completa ou apenas adiciona labels. Estratégia segura: buscar labels atuais, mesclar no n8n e reenviar a lista final.

---

## 5. Criar nota interna

```http
POST /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/messages
```

Payload sugerido:

```json
{
  "content": "🤖 Hermes XD\nProduto: Multipropriedade Hilton\nPerfil: Férias/família\nScore: 82 — lead quente\nGatilho: pediu tabela\nPróxima ação: Alexandre assumir e enviar condição atualizada.",
  "message_type": "outgoing",
  "private": true
}
```

Uso:

- registrar resumo comercial;
- orientar atendimento humano;
- evitar que Alexandre precise ler conversa inteira.

---

## 6. Enviar mensagem ao cliente

Usar somente após fase de testes.

```http
POST /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/messages
```

Payload:

```json
{
  "content": "Perfeito. Para te direcionar melhor: você está olhando mais para uso familiar, férias programadas ou investimento?",
  "message_type": "outgoing",
  "private": false
}
```

Regra:

- não enviar automaticamente se conversa já estiver atribuída a humano;
- não enviar se lead está em proposta/negociação;
- não enviar se houver dúvida jurídica, financeira ou condição sensível.

---

## 7. Atribuir conversa para Alexandre

```http
POST /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/assignments
```

Payload:

```json
{
  "assignee_id": "{{ALEXANDRE_AGENT_ID}}"
}
```

Alternativa:

```json
{
  "team_id": "{{TIME_COMERCIAL_ID}}"
}
```

---

## 8. Marcar status da conversa

Exemplo — manter aberta:

```http
POST /api/v1/accounts/{{CHATWOOT_ACCOUNT_ID}}/conversations/{{CONVERSATION_ID}}/toggle_status
```

Payload:

```json
{
  "status": "open"
}
```

Usar com cuidado.

---

## 9. Estrutura interna normalizada do lead

Objeto que o n8n deve montar:

```json
{
  "lead": {
    "contact_id": "123",
    "conversation_id": "456",
    "name": "João",
    "phone": "+5547999999999",
    "source": "whatsapp",
    "inbox_id": "10"
  },
  "context": {
    "last_message": "Quero tabela da multipropriedade",
    "recent_messages": [],
    "current_labels": [],
    "current_attributes": {},
    "assignee_id": null
  },
  "classification": {
    "produto_interesse": "multipropriedade_hilton",
    "perfil_lead": "perfil-temporada",
    "funil_etapa": "qualificacao",
    "lead_score": 82,
    "lead_temperatura": "quente",
    "gatilhos": ["pediu_tabela"],
    "assumir_alexandre": true,
    "proxima_acao": "enviar_tabela_e_agendar_reuniao"
  }
}
```

---

## 10. Payload para Hermes XD

```json
{
  "business": "HK Nove Empreendimentos",
  "agent": "Hermes XD",
  "task": "classificar_lead_imobiliario",
  "conversation": {
    "conversation_id": "456",
    "contact_name": "João",
    "phone": "+5547999999999",
    "last_message": "Quero tabela da multipropriedade",
    "recent_messages": [
      {"role": "lead", "content": "Quero tabela da multipropriedade"}
    ]
  },
  "current_state": {
    "funil_etapa": "atendimento_inicial",
    "lead_score": 30,
    "produto_interesse": null,
    "perfil_lead": null,
    "labels": []
  },
  "rules": {
    "handoff_score": 80,
    "human_owner": "Alexandre",
    "no_guarantees": true
  }
}
```

---

## 11. Resposta esperada do Hermes XD

```json
{
  "produto_interesse": "multipropriedade_hilton",
  "perfil_lead": "perfil-temporada",
  "funil_etapa": "qualificacao",
  "lead_score": 82,
  "lead_temperatura": "quente",
  "gatilhos": ["pediu_tabela"],
  "labels_add": [
    "produto-multipropriedade-hilton",
    "perfil-temporada",
    "lead-quente",
    "gatilho-pediu-tabela",
    "lead-prioridade-alexandre"
  ],
  "assumir_alexandre": true,
  "proxima_acao": "enviar_tabela_e_agendar_reuniao",
  "resumo_interno": "Lead pediu tabela da multipropriedade Hilton. Deve ser assumido por Alexandre.",
  "resposta_sugerida": "Claro. A multipropriedade Hilton funciona por cotas com 4 semanas por ano, uma em cada estação..."
}
```
