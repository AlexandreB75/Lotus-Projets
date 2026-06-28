# Node: Chatwoot fazer.ai — Conversation

> Resource: `conversation` | Fonte: actions/conversation/operations.ts

## Operações Disponíveis (25)

| Operação | O que faz | Uso no Hermes XD |
|----------|-----------|-----------------|
| `create` | Cria nova conversa | 01-Captura LPs, 03-SDR Outbound |
| `get` | Busca conversa por ID | diagnóstico |
| `list` | Lista conversas com filtros | 05-Follow-Up cron |
| `sendMessage` | Envia mensagem de texto | ✅ Hermes principal, sub-workflows |
| `sendTemplate` | Envia template WhatsApp | — |
| `sendFile` | Envia arquivo/mídia/áudio | ✅ Hermes (ElevenLabs audio) |
| `listMessages` | Lista mensagens da conversa | — |
| `listAttachments` | Lista anexos | — |
| `downloadAttachment` | Baixa arquivo anexado | ✅ Pipeline áudio (Whisper) |
| `assignAgent` | Atribui agente | 07-Escalar (actualmente httpRequest) |
| `assignTeam` | Atribui equipe | — |
| `addLabels` | Adiciona labels | 07-Escalar (atualmente httpRequest) |
| `removeLabels` | Remove labels | /reset |
| `updateLabels` | Substitui todos os labels | — |
| `listLabels` | Lista labels da conversa | — |
| `toggleStatus` | Abre/fecha conversa | — |
| `setPriority` | Define prioridade | — |
| `addCustomAttributes` | Adiciona atributos customizados | — |
| `removeCustomAttributes` | Remove atributos específicos | /reset |
| `setCustomAttributes` | Substitui todos atributos | /reset |
| `updateLastSeen` | Atualiza último visto | — |
| `updatePresence` | Mostra "digitando..." | ✅ Hermes (gravando...) |
| `markUnread` | Marca como não lida | — |
| `updateAttachmentMeta` | Altera metadados de anexo | — |
| `deleteMessage` | Remove mensagem | — |

---

## Parâmetros — sendMessage ⭐

```typescript
{
  accountId: number,        // account_id da instância
  conversationId: number,   // id da conversa

  // Conteúdo
  content: string,          // texto da mensagem

  // Tipo
  isPrivate: boolean,       // false = público, true = nota privada

  // Features exclusivas fazer.ai ⚡
  wait_before_sending: "none" | "fixed" | "dynamic",
  // "dynamic" = calcula tempo de digitação proporcional ao texto
  wait_time_seconds: number,    // segundos (quando fixed)
  typing_while_waiting: boolean, // mostra "digitando..." enquanto espera

  // Referência
  replyToMessageId?: number,    // responde mensagem específica
  contentAttributes?: object    // metadados JSON extras
}
```

### split_message ⚡
Quando `split_message: true`, o node divide o texto em múltiplas mensagens usando `\n\n` como separador. Cada bloco é enviado como mensagem independente.

**Exemplo:**
```
"Olá João!\n\nPosso te ajudar com informações sobre o Hilton Residencial.\n\nQual seria o melhor horário para conversar?"
→ 3 mensagens separadas com timing dinâmico
```

---

## Parâmetros — sendFile ⭐

```typescript
{
  accountId: number,
  conversationId: number,
  binaryPropertyName: string,   // nome da propriedade binária no n8n
  fileCaption?: string,          // legenda
  isPrivate?: boolean,
  isRecordedAudio?: boolean,     // true = marca como áudio gravado no WhatsApp
  contentAttributes?: object     // ex: { transcribed_text: "..." }
}
```

---

## Parâmetros — downloadAttachment

```typescript
{
  accountId: number,
  conversationId: number,
  attachmentUrl: string,   // URL do anexo (vem do payload do trigger)
  // retorna: dado binário (buffer) pronto para Whisper
}
```

---

## Parâmetros — assignAgent

```typescript
{
  accountId: number,
  conversationId: number,
  agentId: number           // ex: 1 = Alexandre Borges
}
```

---

## Parâmetros — addLabels / updateLabels

```typescript
{
  accountId: number,
  conversationId: number,
  labels: string[]          // ex: ["lead-quente", "hermes-hk-nove"]
}
```

---

## Parâmetros — updatePresence

```typescript
{
  accountId: number,
  conversationId: number,
  type: "typing" | "recording" | "online" | "offline"
}
```

---

## Parâmetros — list (para cron de follow-up)

```typescript
{
  accountId: number,
  filters: {
    status: "open" | "resolved" | "pending" | "snoozed",
    assignee_type: "assigned" | "unassigned" | "all",
    team_id?: number,
    labels?: string[],
    page?: number,
    q?: string       // busca por texto
  },
  fetchAtLeast: number  // mínimo de mensagens a retornar (padrão: 20)
}
```

---

## Parâmetros — setCustomAttributes

```typescript
{
  accountId: number,
  conversationId: number,
  specifyCustomAttributes: "definition" | "keypair" | "json",

  // modo "keypair" (mais simples):
  customAttributesKeypair: [
    { name: "followup_count", value: 1 },
    { name: "ultimo_followup", value: "2026-06-18" }
  ]
}
```
