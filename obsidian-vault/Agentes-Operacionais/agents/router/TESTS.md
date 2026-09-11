# Router Agent — TESTS.md
# v1.1 — 2026-06-25
# Changelog v1.1: RT-05 spam→SLACK_OVERFLOW | RT-10 confidence < 0.80 | RT-13 nota api | RT-15 histórico 5 msgs | métrica 0.80

---

## Formato dos Testes

Cada teste define:
- **Input:** o que o n8n envia ao Router
- **Expected output:** campos mínimos que devem estar corretos
- **Critério de pass:** todos os campos de `Assert` conferem exatamente

---

## Grupo 1 — Happy Path (intenção clara)

### RT-01 — Lead novo pelo WhatsApp

**Input:**
```json
{
  "message": "Oi, vi o anúncio do apartamento no Instagram e quero saber mais",
  "channel": "whatsapp",
  "phone": "+5511999990001",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T09:00:00Z"
}
```

**Assert:**
```json
{
  "intent": "sdr",
  "route_to": "WF-02",
  "priority": "normal",
  "escalate_to_human": false
}
```

**Confidence esperada:** >= 0.85

---

### RT-02 — Lead respondendo a follow-up

**Input:**
```json
{
  "message": "Olá, sim ainda tenho interesse sim",
  "channel": "whatsapp",
  "phone": "+5511999990002",
  "contact_exists": true,
  "contact_id": "uuid-001",
  "contact_stage": "em_qualificacao",
  "conversation_history": [
    { "role": "assistant", "content": "Olá João! Passando para saber se ainda tem interesse no imóvel." }
  ],
  "timestamp": "2026-06-25T09:05:00Z"
}
```

**Assert:**
```json
{
  "intent": "follow_up",
  "route_to": "WF-03",
  "priority": "normal",
  "escalate_to_human": false
}
```

**Confidence esperada:** >= 0.85

---

### RT-03 — Lead com reclamação de suporte

**Input:**
```json
{
  "message": "Estou com um problema, o contrato que me enviaram está com o nome errado",
  "channel": "whatsapp",
  "phone": "+5511999990003",
  "contact_exists": true,
  "contact_id": "uuid-002",
  "contact_stage": "cliente",
  "conversation_history": [],
  "timestamp": "2026-06-25T09:10:00Z"
}
```

**Assert:**
```json
{
  "intent": "support",
  "route_to": "WF-05",
  "escalate_to_human": false
}
```

**Confidence esperada:** >= 0.85

---

### RT-04 — Briefing de campanha via Slack

**Input:**
```json
{
  "message": "Preciso de copy para uma campanha de lançamento de empreendimento no Facebook",
  "channel": "slack",
  "phone": null,
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T09:15:00Z"
}
```

**Assert:**
```json
{
  "intent": "marketing",
  "route_to": "WF-08",
  "priority": "normal",
  "escalate_to_human": false
}
```

---

### RT-05 — Spam detectado

**Input:**
```json
{
  "message": "PARABÉNS! Você ganhou R$ 50.000! Clique aqui para resgatar: http://bit.ly/premio",
  "channel": "whatsapp",
  "phone": "+5511999990005",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T09:20:00Z"
}
```

**Assert:**
```json
{
  "intent": "spam",
  "route_to": "SLACK_OVERFLOW",
  "escalation_reason": "spam_review",
  "escalate_to_human": true
}
```

**Nota:** Spam não é descartado — vai para SLACK_OVERFLOW com label `spam_review` para auditoria e calibração.

---

## Grupo 2 — Priority e Escalação

### RT-06 — Lead VIP com sinal de budget alto

**Input:**
```json
{
  "message": "Quero ver opções acima de 3 milhões na Faria Lima, preciso fechar até o fim do mês",
  "channel": "whatsapp",
  "phone": "+5511999990006",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "contact_metadata": {},
  "conversation_history": [],
  "timestamp": "2026-06-25T09:25:00Z"
}
```

**Assert:**
```json
{
  "intent": "sdr",
  "route_to": "WF-02",
  "priority": "vip",
  "escalate_to_human": true
}
```

**Nota:** Budget > threshold explícito + urgência → vip + escalação humana.

---

### RT-07 — Lead em proposta com mensagem urgente

**Input:**
```json
{
  "message": "Preciso de uma resposta hoje, tenho outra proposta na mão",
  "channel": "whatsapp",
  "phone": "+5511999990007",
  "contact_exists": true,
  "contact_id": "uuid-003",
  "contact_stage": "proposta",
  "conversation_history": [],
  "timestamp": "2026-06-25T09:30:00Z"
}
```

**Assert:**
```json
{
  "intent": "follow_up",
  "route_to": "WF-03",
  "priority": "high",
  "escalate_to_human": true
}
```

---

### RT-08 — Suporte urgente de cliente ativo

**Input:**
```json
{
  "message": "Meu boleto venceu ontem e não consigo acessar o sistema para pagar, é urgente",
  "channel": "whatsapp",
  "phone": "+5511999990008",
  "contact_exists": true,
  "contact_id": "uuid-004",
  "contact_stage": "cliente",
  "conversation_history": [],
  "timestamp": "2026-06-25T09:35:00Z"
}
```

**Assert:**
```json
{
  "intent": "support",
  "route_to": "WF-05",
  "priority": "high",
  "escalate_to_human": true
}
```

---

## Grupo 3 — Edge Cases

### RT-09 — Mensagem vazia

**Input:**
```json
{
  "message": "",
  "channel": "whatsapp",
  "phone": "+5511999990009",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T09:40:00Z"
}
```

**Assert:**
```json
{
  "intent": "unknown",
  "route_to": "SLACK_OVERFLOW",
  "confidence": 0.0,
  "escalate_to_human": true,
  "escalation_reason": "empty_message"
}
```

---

### RT-10 — Mensagem ambígua sem contexto

**Input:**
```json
{
  "message": "Oi",
  "channel": "whatsapp",
  "phone": "+5511999990010",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T09:45:00Z"
}
```

**Assert:**
```json
{
  "intent": "unknown",
  "route_to": "SLACK_OVERFLOW",
  "escalate_to_human": true
}
```

**Confidence esperada:** < 0.80

---

### RT-11 — Idioma diferente (inglês)

**Input:**
```json
{
  "message": "Hello, I'm interested in buying an apartment in São Paulo",
  "channel": "whatsapp",
  "phone": "+15551990011",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T09:50:00Z"
}
```

**Assert:**
```json
{
  "intent": "sdr",
  "route_to": "WF-02",
  "entities": {
    "language": "en"
  }
}
```

**Nota:** Roteamento não muda por idioma — o agente de destino lida com a língua.

---

### RT-12 — contact_stage com valor inválido

**Input:**
```json
{
  "message": "Quero saber sobre o apartamento",
  "channel": "whatsapp",
  "phone": "+5511999990012",
  "contact_exists": true,
  "contact_id": "uuid-005",
  "contact_stage": "VALOR_INVALIDO",
  "conversation_history": [],
  "timestamp": "2026-06-25T09:55:00Z"
}
```

**Assert:**
```json
{
  "intent": "sdr",
  "route_to": "WF-02"
}
```

**Nota:** contact_stage inválido tratado como null — não deve causar erro ou unknown.

---

### RT-13 — Mensagem de marketing no WhatsApp (canal bloqueado)

**Input:**
```json
{
  "message": "Preciso de copy para uma campanha de lançamento no Facebook",
  "channel": "whatsapp",
  "phone": "+5511999990013",
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T10:00:00Z"
}
```

**Assert:**
```json
{
  "intent": "unknown",
  "route_to": "SLACK_OVERFLOW",
  "escalate_to_human": true
}
```

**Nota:** Intent `marketing` é válido apenas quando channel = "slack" ou "api". WhatsApp, telegram e web são bloqueados — o contexto é ambíguo e escalado para humano.

---

### RT-13b — Marketing via API (canal permitido)

**Input:**
```json
{
  "message": "Criar campanha: lançamento Piccolo Bambino, público mães 25-40, Meta + Google",
  "channel": "api",
  "phone": null,
  "contact_exists": false,
  "contact_id": null,
  "contact_stage": null,
  "conversation_history": [],
  "timestamp": "2026-06-25T10:01:00Z"
}
```

**Assert:**
```json
{
  "intent": "marketing",
  "route_to": "WF-08",
  "priority": "normal",
  "escalate_to_human": false
}
```

---

### RT-14 — CRM update (lead informa novo telefone)

**Input:**
```json
{
  "message": "Oi, mudei de número. Meu novo contato é 11988880099",
  "channel": "whatsapp",
  "phone": "+5511999990014",
  "contact_exists": true,
  "contact_id": "uuid-006",
  "contact_stage": "qualificado",
  "conversation_history": [],
  "timestamp": "2026-06-25T10:05:00Z"
}
```

**Assert:**
```json
{
  "intent": "crm_update",
  "route_to": "WF-04",
  "priority": "normal",
  "escalate_to_human": false
}
```

---

## Grupo 4 — Falhas Conhecidas

### RT-15 — Ambiguidade follow_up vs sdr (sem histórico claro)

**Cenário:** Lead existente mas sem conversation_history — pode ser follow_up ou novo interesse.

**Input:**
```json
{
  "message": "Olá, tudo bem? Queria retomar a conversa sobre o apartamento",
  "channel": "whatsapp",
  "phone": "+5511999990015",
  "contact_exists": true,
  "contact_id": "uuid-007",
  "contact_stage": "em_qualificacao",
  "conversation_history": [],
  "timestamp": "2026-06-25T10:10:00Z"
}
```

**Comportamento esperado:** intent = "follow_up", confidence entre 0.80–0.88.

**Falha conhecida:** Sem conversation_history, o Router pode classificar como "sdr" em vez de "follow_up", pois "retomar a conversa" pode não ser sinal suficiente. Monitorar via métricas de acerto.

**Mitigação atual:** O n8n deve sempre injetar as últimas **5 mensagens** quando contact_exists = true, mesmo que a sessão anterior seja antiga. Com 5 mensagens de contexto, a distinção follow_up vs sdr melhora significativamente.

---

## Métricas de Sucesso

| Métrica | Target |
|---------|--------|
| Accuracy geral (intent correto) | >= 92% |
| False positive spam | <= 0.5% (lead real enviado para spam_review) |
| False negative unknown (deveria escalar, não escalou) | <= 1% |
| Latência de resposta | <= 3 segundos |
| JSON parse error (saída malformada) | 0% |
| Confidence < 0.80 em mensagens claras | <= 3% |

---

## Como Executar os Testes

1. No n8n, criar um workflow de teste com os inputs acima como JSON estático.
2. Chamar o Router Agent via HTTP node com cada input.
3. Comparar o output com os campos de `Assert`.
4. Registrar resultados em `Agentes-Operacionais/agents/router/test-results/YYYY-MM-DD.json`.
5. Qualquer falha em RT-01 a RT-08 é bloqueante para deploy em produção.
6. Falhas em RT-09 a RT-15 são registradas e avaliadas caso a caso.
