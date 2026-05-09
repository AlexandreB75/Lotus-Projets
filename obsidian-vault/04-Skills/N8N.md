---
tags: [skill, n8n, automacao, workflow, integracao]
data: 2025-05-09
nivel: intermediario
---

# Skill — N8N: Automação de Workflows

## O que é N8N

N8N é uma plataforma de automação de workflows open-source e self-hosted. Permite conectar diferentes sistemas e APIs sem código (low-code), criando fluxos automatizados entre ferramentas.

**Principais vantagens:**
- Self-hosted (controle total dos dados)
- 400+ integrações nativas
- Visual e intuitivo
- Suporte a código JavaScript/Python nos nodes
- Webhooks nativos

---

## Conceitos Fundamentais

### Workflow
Sequência de nodes conectados que executam uma automação. Cada workflow tem um trigger e um ou mais nodes de ação.

### Nodes
Blocos que executam uma ação específica. Tipos:
- **Trigger nodes**: Iniciam o workflow (Webhook, Schedule, Email, etc.)
- **Action nodes**: Executam ações (HTTP Request, Google Sheets, HubSpot, etc.)
- **Logic nodes**: Controlam o fluxo (IF, Switch, Merge, Loop)
- **Transform nodes**: Transformam dados (Set, Code, Function)

### Connections (Edges)
Linhas que conectam os nodes, passando dados de um para outro.

### Executions
Cada vez que o workflow roda é uma execução. Pode ser monitorado em tempo real.

---

## Expressões N8N

N8N usa expressões entre `{{ }}` para acessar dados dinâmicos:

```javascript
// Acessar campo do node anterior
{{ $json.nome }}

// Acessar campo de node específico pelo nome
{{ $node["Nome do Node"].json.campo }}

// Dados de todos os itens anteriores
{{ $items() }}

// Index do item atual
{{ $itemIndex }}

// Variáveis de ambiente
{{ $env.MINHA_VARIAVEL }}

// Data atual
{{ $now }}
{{ $today }}

// Funções nativas
{{ $json.nome.toUpperCase() }}
{{ $json.valor.toFixed(2) }}
```

---

## Nodes Mais Usados

### Webhook
Recebe requisições HTTP para iniciar o workflow.
```
Método: POST
Path: /meu-webhook
Autenticação: Header Auth ou Basic Auth
```

### HTTP Request
Faz chamadas para qualquer API REST.
```
Método: GET/POST/PUT/DELETE
URL: https://api.exemplo.com/endpoint
Headers: Authorization: Bearer {{$env.API_KEY}}
Body: { "campo": "{{ $json.valor }}" }
```

### IF (Condicional)
Ramifica o fluxo com base em condição.
```
Condição: {{ $json.status }} igual a "ativo"
True → continua para aprovação
False → envia email de rejeição
```

### Set
Define ou transforma campos dos dados.
```
nome_completo = {{ $json.primeiro_nome + " " + $json.ultimo_nome }}
data_formatada = {{ new Date($json.data).toLocaleDateString('pt-BR') }}
```

### Code (JavaScript)
Executa código JavaScript personalizado.
```javascript
const items = $input.all();
const resultado = items.map(item => ({
  json: {
    ...item.json,
    processado: true,
    timestamp: new Date().toISOString()
  }
}));
return resultado;
```

### Merge
Combina dados de múltiplos branches.
- **Append**: Junta todos os itens
- **Merge By Index**: Combina por posição
- **Merge By Key**: Combina por campo em comum

---

## Padrões Comuns de Uso

### 1. Webhook → Processamento → Notificação
```
Webhook (recebe lead) 
  → Set (formata dados)
  → HubSpot (cria contato)
  → Slack (notifica equipe)
```

### 2. Schedule → Busca → Relatório
```
Schedule Trigger (todo dia 8h)
  → Google Sheets (lê dados)
  → Code (processa métricas)
  → Email (envia relatório)
```

### 3. Webhook → IF → Múltiplas ações
```
Webhook
  → IF (status == "ganho"?)
    → Sim: HubSpot (atualiza deal) + Slack (celebra)
    → Não: HubSpot (atualiza etapa) + Email (follow-up)
```

### 4. Loop sobre itens
```
Google Sheets (lista de contatos)
  → SplitInBatches (processa em lotes de 10)
  → HTTP Request (API individual)
  → Set (formata resposta)
```

---

## Integrações Usadas no Lotus

| Ferramenta | Node N8N | Uso Principal |
|---|---|---|
| HubSpot | HubSpot (nativo) | CRM - leads, deals, contatos |
| Instagram | HTTP Request (Graph API) | Insights e automações |
| Google Sheets | Google Sheets (nativo) | Relatórios e dados |
| Slack/WhatsApp | HTTP Request | Notificações da equipe |
| OpenAI/Claude | HTTP Request | Geração de conteúdo |
| Webhooks | Webhook Trigger | Receber eventos externos |

---

## Boas Práticas

- **Nomear nodes** com nomes descritivos (não deixar "HTTP Request 1")
- **Tratar erros** com o node Error Trigger
- **Usar variáveis de ambiente** para API keys (nunca hardcode)
- **Testar com dados reais** antes de ativar
- **Documentar** o workflow com nodes Sticky Note
- **Versionar** workflows exportando o JSON
- **Usar subworkflows** para lógica reutilizável

---

## Referências

- Documentação oficial: n8n.io/docs
- Templates prontos: n8n.io/workflows
- Comunidade: community.n8n.io
