---
tags: [hermes, auditoria, landing-pages, captura, hilton, lotus, the-spot-one]
status: auditoria-inicial
data: 2026-06-18
---

# Auditoria Landing Pages

## Fonte local

Pasta analisada:

`03-Squads/Agentes-Operacionais/n8n-workflows/referencias/landing-pages/`

Arquivos:

- `README.md`
- `the-spot-one.md`
- `lotus-business.md`
- `hilton-template.md`

## Resumo

| Landing Page | Status | Webhook | Workflow | Observacao |
|---|---|---|---|---|
| The Spot One | Online | `/webhook/the-spot-one-lead` | `01-Captura-Landing-The-Spot-One.json` | Captura nome, WhatsApp, email e cidade |
| Lotus Business | Online | `/webhook/lotus-lead` | `01-Captura-Landing-Lotus-Business.json` | Captura nome, WhatsApp e perfil; nao captura email |
| Hilton Itapema | Nao existe | `/webhook/hilton-lead` planejado | `01-Captura-Landing-Hilton.json` a criar | Template ja define campos e segmentacao |

## Contratos de formulario

### The Spot One

```json
{
  "nome": "string",
  "whatsapp": "string",
  "email": "string",
  "cidade": "string"
}
```

### Lotus Business

```json
{
  "nome": "string",
  "whatsapp": "string",
  "perfil": "investidor | empresario | corporativo | descoberta"
}
```

Ponto de atencao: o CRM XD PRO espera `email`, mas a LP Lotus nao captura esse campo. O intake precisa aceitar email opcional ou gerar valor nulo controlado.

### Hilton Itapema proposto

```json
{
  "nome": "string",
  "whatsapp": "string",
  "cidade": "string",
  "produto_interesse": "hotel | residencial | hotel_investimento | comercial | medcenter | geral"
}
```

## Labels Chatwoot

| Origem/produto | Label recomendada |
|---|---|
| The Spot One | `the-spot-one-landing` |
| Lotus Business | `lotus-landing` |
| Hilton landing geral | `hilton-landing` |
| Hilton hotel | `hilton-hotel` |
| Hilton residencial | `hilton-residencial` |
| Hilton comercial | `hilton-comercial` |
| Hilton MedCenter | `hilton-medcenter` |

## Decisoes de arquitetura

1. Toda LP deve postar para webhook n8n.
2. Todo lead deve ser normalizado antes de ir para Supabase, Chatwoot e CRM XD PRO.
3. O campo `origem` deve ser preenchido automaticamente pelo workflow receptor.
4. O campo `projeto` deve ser padronizado: `the_spot_one`, `lotus_business`, `hilton_itapema`.
5. O Hermes deve usar `produto_interesse` e/ou `perfil` para roteamento da primeira resposta.

## Lacunas

| Lacuna | Prioridade | Acao |
|---|---|---|
| LP Hilton ainda nao existe | P1 | Criar pagina e formulario baseado no template |
| Workflow `01-Captura-Landing-Hilton.json` ainda nao existe | P1 | Criar apos fechar contrato do formulario |
| Email ausente no Lotus | P1 | Confirmar se CRM XD PRO aceita email opcional |
| Analytics/pixel nao confirmados | P2 | Verificar Meta Pixel/GTM manualmente |
| Multiplos CTAs/formularios | P2 | Garantir que todos postam para o mesmo contrato |

## Teste minimo por LP

Para cada landing page:

```text
1. Enviar formulario teste
2. Confirmar execucao n8n
3. Confirmar lead no Supabase
4. Confirmar contato no Chatwoot
5. Confirmar conversa com label correta
6. Confirmar entrada no CRM XD PRO
7. Confirmar Hermes usando contexto correto
```
