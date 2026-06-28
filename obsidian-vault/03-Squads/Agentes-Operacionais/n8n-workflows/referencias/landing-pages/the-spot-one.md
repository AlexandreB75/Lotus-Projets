# LP — The Spot One Residence

> URL: https://alexandreborgescorretor.com.br/the-spot-one
> Status: ✅ Online | Atualizado em: 2026-06-18

## Dados do Empreendimento

- **Nome:** The Spot One Residence
- **Tipo:** Apartamento / Investimento / Locação de temporada
- **Localização:** Anexo ao Balneário Shopping, Balneário Camboriú / Itapema
- **Página title:** "The Spot One Residence | Apartamento anexo ao Balneário Shopping"

## Formulário de Captura

| Campo | Tipo | Mapeamento webhook |
|-------|------|-------------------|
| Nome | text | `nome` |
| WhatsApp | tel | `whatsapp` |
| E-mail | email | `email` |
| Cidade | text | `cidade` |

**Nota:** O campo `email` é específico desta LP. A LP Lótus usa `perfil` no lugar.

## Integração n8n

| Config | Valor |
|--------|-------|
| Webhook | `n8n.alexandreborges.site/webhook/the-spot-one-lead` |
| Label Chatwoot | `the-spot-one-landing` |
| Workflow receptor | `01-Captura-Landing-The-Spot-One.json` |

**Fluxo após submissão:**
1. n8n recebe POST com `{nome, whatsapp, email, cidade}`
2. Cria contato no Chatwoot (account_id=1, inbox_id=2)
3. Abre conversa com label `the-spot-one-landing`
4. Chama `01-CRM-XD-PRO-Lead-Intake` → POST Supabase → GPT-4o-mini `resumo_ia`
5. Hermes XD recebe mensagem de boas-vindas automática

## Observações

- Página pode ser longa (truncou no WebFetch) — provavelmente tem múltiplas seções/CTAs
- Verificar se há mais de um formulário na página (múltiplas CTAs é comum)
- Analytics/pixel: não detectados na extração — verificar manualmente se Meta Pixel ou GTM está presente
