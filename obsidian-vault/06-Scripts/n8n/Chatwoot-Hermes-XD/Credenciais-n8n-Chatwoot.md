---
tags: [n8n, credenciais, chatwoot, fazer-ai]
status: operacional
data: 2026-06-10
---

# Credenciais n8n — Chatwoot

## Credencial nativa existente

Existe no n8n a credencial:

- Nome: `Chatwoot`
- ID: `Oganm2I5WSEBasX4`
- Tipo: `fazerAiChatwootApi`
- Criada em: `2026-05-19`

Schema do tipo `fazerAiChatwootApi`:

- `url`
- `accessToken`
- `allowedHttpRequestDomains`
- `allowedDomains`

Essa credencial é usada pelos nodes nativos Fazer.ai/Chatwoot, como:

- `@fazer-ai/n8n-nodes-chatwoot.chatwoot`
- `@fazer-ai/n8n-nodes-chatwoot.chatwootTool`
- `@fazer-ai/n8n-nodes-chatwoot.chatwootTrigger`

Foi encontrada no workflow ativo:

- `01. Agente Imobiliário` — ID `BTG2mhh3I90a8kQQ`

---

## Credencial criada para o workflow v0

Foi criada uma credencial HTTP Header Auth para o workflow próprio:

- Nome: `Chatwoot API Token`
- ID: `WVX2kNzb8Wt35w1o`
- Tipo: `httpHeaderAuth`
- Header: `api_access_token`

Motivo:

- o workflow `HK Nove — Chatwoot Hermes XD Silent v0` usa nodes HTTP Request genéricos;
- nodes HTTP Request não consomem diretamente a credencial nativa `fazerAiChatwootApi` sem adaptação;
- usar HTTP Header Auth mantém o workflow simples e portável.

---

## Decisão operacional

Por enquanto, manter as duas credenciais:

1. `Chatwoot` / `fazerAiChatwootApi` para fluxos nativos Fazer.ai existentes.
2. `Chatwoot API Token` / `httpHeaderAuth` para o novo workflow próprio por API.

Não apagar nenhuma credencial agora.

---

## Caminho futuro

Se o workflow próprio evoluir para usar nodes Fazer.ai nativos, pode reaproveitar a credencial `Chatwoot`.

Se continuar por API pura, manter `Chatwoot API Token` é mais simples e previsível.
