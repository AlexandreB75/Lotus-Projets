# Node: Chatwoot fazer.ai — Kanban ⚡

> Resources: `kanbanTask`, `kanbanBoard`, `kanbanStep`, `kanbanProduct`
> Requer fazer.ai Pro (fork do Chatwoot)

## kanbanTask — Operações (6)

| Operação | O que faz |
|----------|-----------|
| `get` | Busca task por ID — retorna steps, atributos, contato vinculado |
| `create` | Cria nova task no Kanban |
| `update` | Atualiza campos da task (título, step, atributos, prioridade) |
| `move` | Move task para outro step |
| `delete` | Remove task |
| `list` | Lista tasks com filtros |

---

## Parâmetros — kanbanTask.get ⭐

```typescript
{
  accountId: number,
  taskId: number,       // ID da task (vem do payload do trigger como kanban_task.id)
  boardId: number       // ex: 5 (board HK Nove)
}
```

**O que retorna:**
```json
{
  "id": 123,
  "title": "João Silva",
  "board_step_id": 31,
  "board": {
    "id": 5,
    "steps": [
      { "id": 30, "title": "Novo Lead" },
      { "id": 31, "title": "Em Contato" },
      { "id": 32, "title": "Visita Agendada" },
      { "id": 33, "title": "Proposta Enviada" },
      { "id": 34, "title": "Em Negociação" },
      { "id": 35, "title": "Fechado" },
      { "id": 37, "title": "Perdido" }
    ]
  },
  "custom_attributes": { ... }
}
```

Usado nos sub-workflows para: encontrar o step_id por nome (sem hardcode), obter nome do contato.

---

## Parâmetros — kanbanTask.update ⭐

```typescript
{
  accountId: number,
  taskId: number,
  boardId: number,

  // Campos atualizáveis:
  updateFields: {
    board_step_id?: number,        // move para este step
    title?: string,
    description?: string,
    priority?: "none" | "low" | "medium" | "high" | "urgent",
    due_date?: string,             // ISO 8601

    // Atributos customizados:
    custom_attributes?: object,
    specifyCustomAttributes?: "definition" | "keypair" | "json",
    customAttributesKeypair?: [
      { name: string, value: any }
    ]
  }
}
```

**Exemplo — move step + salva atributos:**
```json
{
  "accountId": 1,
  "taskId": "{{ $json.task_id }}",
  "boardId": 5,
  "updateFields": {
    "board_step_id": 33,
    "customAttributesKeypair": [
      { "name": "numero_proposta", "value": "P-2026-001" },
      { "name": "valor_venda", "value": 450000 }
    ]
  }
}
```

---

## Parâmetros — kanbanTask.list

```typescript
{
  accountId: number,
  boardId: number,
  filters: {
    board_step_id?: number,        // filtrar por step
    assignee_id?: number,          // filtrar por responsável
    status?: "open" | "closed",
    // ...outros filtros
  }
}
```

---

## Mapeamento Steps HK Nove (board_id=5)

| step_id | Nome | Uso |
|---------|------|-----|
| 30 | Novo Lead | Lead acabou de entrar |
| 31 | Em Contato | Hermes iniciou conversa |
| 32 | Visita Agendada | 05-Agendar-Visita |
| 33 | Proposta Enviada | 03-Enviar-Proposta |
| 34 | Em Negociação | 07-Escalar-Alexandre, 09-Gerar-Reserva |
| 35 | Fechado (ganho) | — |
| 36 | Fechado | — |
| 37 | Perdido | 06-Cancelar-Interesse |
| 38 | (volta) Novo Lead | reentrada |

**Dica:** nos sub-workflows, preferir buscar o step por **nome** via `kanbanTask.get` e iterar `board.steps`, em vez de hardcodar o step_id. Mais robusto se o board for reordenado.

---

## kanbanBoard — Operações

| Operação | O que faz |
|----------|-----------|
| `get` | Busca board por ID |
| `list` | Lista todos os boards da conta |
| `create` | Cria novo board ⚡ |
| `update` | Atualiza board ⚡ |
| `delete` | Remove board ⚡ |

---

## kanbanStep — Operações

| Operação | O que faz |
|----------|-----------|
| `get` | Busca step por ID |
| `list` | Lista steps de um board |
| `create` | Cria novo step ⚡ |
| `update` | Atualiza step ⚡ |
| `delete` | Remove step ⚡ |

---

## kanbanProduct e kanbanTaskProduct ⚡

Permite vincular produtos/empreendimentos a tasks do Kanban. Útil para registrar qual produto o lead tem interesse.

| Resource | Operações |
|----------|-----------|
| `kanbanProduct` | get, list, create, update, delete |
| `kanbanTaskProduct` | get, list, create, update, delete (vincula produto à task) |

**Aplicação futura:** vincular empreendimento (Hilton Residencial, The Spot One etc.) à task do lead direto no Kanban via sub-workflow.
