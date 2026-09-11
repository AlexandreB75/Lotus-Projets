---
tags: [n8n, incidente, jsonbody, correcao, chatwoot]
status: corrigido
data: 2026-06-10
---

# Incidente — jsonBody inválido no n8n

## Problema

Em `2026-06-10 16:53 UTC`, Alexandre informou erro no n8n:

> Problema no nó `Chatwoot — Atualizar atributos`: o valor no campo `Corpo JSON` não é um JSON válido.

## Causa

Os nodes HTTP do workflow importado estavam com `jsonBody` em formato de pseudo-JSON com expressões JS internas:

```js
={
  "custom_attributes": {
    "funil_etapa": $json.classification.funil_etapa
  }
}
```

O n8n validou o campo como JSON bruto e rejeitou.

## Correção aplicada

Os 4 nodes HTTP foram corrigidos para usar expressão nativa retornando objeto:

```js
={{ { custom_attributes: { funil_etapa: $json.classification.funil_etapa } } }}
```

Nodes corrigidos:

- `Chatwoot — Atualizar atributos`
- `Chatwoot — Atualizar labels`
- `Chatwoot — Nota interna`
- `Chatwoot — Atribuir Alexandre`

## Workflow atualizado

- Nome: `HK Nove — Chatwoot Hermes XD Silent v0`
- ID: `A0NVoqTkb8R7JmJY`
- Atualizado em: `2026-06-10T16:54:38Z`
- Status no n8n: ativo

## Validação

Foi feito POST direto sem assinatura após a correção.

Resultado:

- execução criada: `1022`
- workflow iniciou;
- classificou o texto;
- parou em `shouldSkip: true` por falta de assinatura/timestamp do Chatwoot;
- não chegou aos nodes HTTP, como esperado em teste direto sem assinatura.

## Próximo teste necessário

Testar por uma conversa real no Chatwoot:

1. adicionar label `testando-agente`;
2. enviar mensagem real via WhatsApp;
3. verificar execução no n8n;
4. confirmar se os nodes HTTP agora passam sem erro.
