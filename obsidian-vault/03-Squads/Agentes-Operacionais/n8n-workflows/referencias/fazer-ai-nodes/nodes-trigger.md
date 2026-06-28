# Node: Chatwoot fazer.ai Trigger

> Tipo: Webhook listener | Fonte: ChatwootTrigger.node.ts

## Configuração

| Campo | Valor no Hermes XD |
|-------|-------------------|
| Conta | account_id = 1 |
| Inbox | inbox_id = 2 (Fone Escritório HK9) |
| Evento | `message_incoming` |
| Verificação HMAC | SHA-256 via header `x-chatwoot-signature` |

## Eventos Disponíveis (17)

### Eventos Padrão Chatwoot

| Evento | Quando dispara |
|--------|---------------|
| `message_created` | Qualquer mensagem criada (entrada ou saída) |
| `message_incoming` | ✅ **Hermes usa este** — mensagem recebida do lead |
| `message_outgoing` | Mensagem enviada para o lead |
| `message_updated` | Mensagem editada |
| `conversation_created` | Nova conversa aberta |
| `conversation_updated` | Status, assignee, labels alterados |
| `conversation_resolved` | Conversa marcada como resolvida |
| `contact_created` | Novo contato criado |
| `contact_updated` | Dados do contato alterados |
| `provider_event_received` | Evento do provedor WhatsApp |

### Eventos Exclusivos fazer.ai ⚡

| Evento | Quando dispara |
|--------|---------------|
| `kanban_task_created` | Nova task criada no Kanban |
| `kanban_task_updated` | Task atualizada (step, atributos) |
| `kanban_task_deleted` | Task removida |
| `kanban_task_overdue` | Task vencida (data limite ultrapassada) |
| `internal_chat_message_created` | Mensagem no chat interno |
| `internal_chat_message_updated` | Mensagem interna editada |
| `internal_chat_message_deleted` | Mensagem interna removida |
| `internal_chat_channel_updated` | Canal interno atualizado |

## Payload do Evento message_incoming

O que o Hermes XD extrai no node `Info`:

```json
{
  "id": 12345,                     // id_mensagem
  "content": "Olá, tenho interesse no Hilton",
  "created_at": 1718700000,
  "conversation": {
    "id": 456,                     // id_conversa
    "inbox_id": 2,                 // id_inbox
    "contact": {
      "id": 789,                   // id_contato
      "phone_number": "+5547999999999",  // telefone
      "name": "João Silva"         // nome
    },
    "meta": {
      "labels": ["hilton-landing"], // etiquetas
      "custom_attributes": { ... } // atributos_conversa
    }
  },
  "attachments": [
    {
      "id": 111,
      "file_type": "audio",
      "data_url": "https://...",   // url_arquivo
      "message_type": "incoming"
    }
  ],
  "kanban_task": {
    "id": 222,                     // task_id (para sub-workflows)
    "board": {
      "id": 5,                     // board_id
      "steps": [...]               // lista de steps com ids e nomes
    }
  }
}
```

## Configuração do Webhook

- **Método HTTP:** POST
- **Path:** `={{ $nodeId }}` (gerado automaticamente pelo n8n)
- **URL registrada no Chatwoot:** `https://n8n.alexandreborges.site/webhook/<nodeId>`
- Webhooks antigos são removidos automaticamente na ativação/desativação

## Filtro por Inbox

O trigger suporta filtrar por inbox específica ou receber de todas:
- `inbox_id = 2` → apenas WhatsApp HK9
- `All Inboxes` → todos os canais

No Hermes XD: filtrado para inbox_id = 2 (+5547988695350)
