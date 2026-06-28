# Uso dos Nodes Fazer.ai no Sistema Hermes XD

> Mapa de onde cada operação do pacote é (ou deveria ser) usada

---

## Nodes Ativos no Workflow Principal

| Node/Operação | Workflow | Função atual |
|---------------|----------|-------------|
| `chatwootTrigger` (message_incoming, inbox=2) | 02-Hermes principal | Dispara ao receber mensagem WhatsApp |
| `conversation.downloadAttachment` | Pipeline de áudio | Baixa áudio para transcrição Whisper |
| `conversation.updatePresence` (recording) | Pipeline de áudio | Mostra "gravando..." enquanto gera áudio |
| `conversation.sendFile` (isRecordedAudio=true) | Envio áudio | Envia resposta em áudio ElevenLabs |
| `conversation.sendMessage` (split_message, wait=dynamic) | Envio texto | Envia resposta em texto com timing humano |
| `kanbanTask.get` | 05-Agendar-Visita, 09-Gerar-Reserva | Busca steps do board para mover por nome |
| `kanbanTask.update` (board_step_id) | 05-Agendar-Visita | Move task para "Visita Agendada" |
| `kanbanTask.update` (board_step_id) | 09-Gerar-Reserva | Move task para "Em Negociação" |

---

## Nodes Usados como Tools Nativas do Agente GPT-5.2

O agente LangChain tem 3 tools nativas do fazer.ai (não são sub-workflows):

| Tool | Node fazer.ai | O que o agente pode fazer |
|------|---------------|--------------------------|
| `Refletir` | `toolThink` (LangChain) | Raciocinar internamente antes de agir |
| `Reagir mensagem` | `chatwoot.reactMessage` | Colocar emoji de reação na mensagem do lead |
| `Atualizar tarefa` | `chatwoot.kanbanTask.update` | Atualizar Title, Description, End_Date da task |

---

## Nodes que DEVERIAM ser Migrados (atualmente httpRequest)

Os sub-workflows 07 e 08 usam HTTP Request manual. A migração para nodes nativos elimina tokens hardcoded e adiciona recursos.

### 07-Escalar-Alexandre (atual vs proposto)

| Passo | Atual | Proposto |
|-------|-------|---------|
| Aplicar label lead-quente | `httpRequest POST /labels` + token | `conversation.addLabels` (credential) |
| Atribuir Alexandre | `httpRequest POST /assignments` + token | `conversation.assignAgent` (credential) |
| Mover step 34 | `httpRequest PATCH /kanban/tasks` + token | `kanbanTask.update (board_step_id: 34)` |
| Enviar mensagem cliente | `httpRequest POST /messages` + token | `conversation.sendMessage (split_message: true, wait: dynamic)` |
| Criar nota privada | `httpRequest POST /messages (private)` + token | `conversation.sendMessage (isPrivate: true)` |

**Ganho:** 5 tokens hardcoded → 0. Mensagem com split automático.

### 08-Follow-Up (atual vs proposto)

| Passo | Atual | Proposto |
|-------|-------|---------|
| Enviar mensagem follow-up | `httpRequest POST /messages` + token | `conversation.sendMessage (split_message: true, wait: dynamic)` |

**Ganho:** mensagem enviada em blocos com timing humano — mais natural.

---

## Operações Disponíveis Ainda Não Usadas (oportunidades)

| Operação | Quando usar |
|----------|------------|
| `conversation.list` | Cron follow-up: buscar conversas abertas sem resposta >24h |
| `conversation.addLabels` | Sub-workflow 07 refatorado |
| `conversation.assignAgent` | Sub-workflow 07 refatorado |
| `conversation.setCustomAttributes` | Salvar `followup_count` + `ultimo_followup` para controle de follow-up |
| `kanbanTask.list` | Listar tasks por step (ex: todas em "Proposta Enviada" para follow-up) |
| `kanbanTaskProduct` | Vincular empreendimento à task do lead (feature futura) |
| `scheduledMessage.create` | Agendar mensagem para horário específico (alternativa ao cron) |
| `conversation.toggleStatus` | Fechar conversa automaticamente após 06-Cancelar-Interesse |

---

## Padrão de Contexto para Sub-workflows

Todo sub-workflow recebe estes inputs do Hermes XD (extraídos pelo node `Info`):

```javascript
// Sempre disponível em qualquer sub-workflow:
{
  account_id: 1,
  inbox_id: 2,
  conversation_id: Number,    // ID da conversa Chatwoot
  task_id: Number,            // ID da task Kanban
  board_id: 5                 // Board HK Nove
}
```

Com esses 5 campos, qualquer node fazer.ai pode operar sem precisar de parâmetros extras de contexto.

---

## Credential ID de Referência

| Serviço | Credential ID no n8n | Quando usar |
|---------|---------------------|-------------|
| Chatwoot fazer.ai | `Oganm2I5WSEBasX4` | Todos os nodes fazer.ai |

Ao migrar httpRequest → node nativo, selecionar esta credential — o token nunca fica exposto no código.
