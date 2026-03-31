# Pasta de Credenciais — Lótus Business

Esta pasta contém arquivos de senhas e tokens. **Nunca vai para o git.**

## Arquivos desta pasta

| Arquivo | Serviço | Status |
|---|---|---|
| `telegram.env` | Bot Telegram (Lara) | Preencher |
| `anthropic.env` | Claude API (IA) | Preencher |
| `n8n.env` | N8N (automações) | Configurar amanhã |
| `chatwoot.env` | Chatwoot (inbox omnichannel) | Configurar amanhã |

---

## Como usar

Cada serviço tem seu próprio arquivo `.env`.  
Copie o arquivo `.exemplo` correspondente, renomeie removendo `.exemplo` e preencha os valores.

---

## Serviços do Stack Lótus Business

```
Telegram Bot (Lara) ──→ Claude API (IA)
        ↓
      N8N (automações) ──→ Chatwoot (WhatsApp / Instagram / Email)
        ↓
    Notificações no Telegram
```
