# LP — Lótus Business Centro Empresarial

> URL: https://alexandreborgescorretor.com.br/lotus-business/
> Status: ✅ Online | Atualizado em: 2026-06-18

## Dados do Empreendimento

- **Nome:** Lótus Business Centro Empresarial Premium
- **Tipo:** Salas comerciais / Sede própria / Laje corporativa / Investimento com locação
- **Localização:** Itapema, SC
- **Entrega prevista:** 2028
- **Torre:** 31 andares
- **Laje:** 904 m² por andar
- **Vagas:** 450+ estacionamentos
- **Headline principal:** "O mercado residencial cresceu. Agora o corporativo começa a ocupar seu espaço."

## Formulário de Captura

Dois formulários na página (mesmos campos, diferentes CTAs):

| Campo | Tipo | Opções / Placeholder | Mapeamento webhook |
|-------|------|---------------------|-------------------|
| Seu Nome | text | "Seu Nome" | `nome` |
| WhatsApp | tel | "WhatsApp" | `whatsapp` |
| Objetivo Principal | select (dropdown) | ver abaixo | `perfil` |

### Opções do Campo "Objetivo Principal" → `perfil`

| Valor exibido | Significado |
|---------------|-------------|
| "Quero renda com locação — sou investidor" | investidor |
| "Quero sede própria — sou empresário" | empresario |
| "Quero andar completo — laje corporativa" | corporativo |
| "Ainda estou entendendo a oportunidade" | descoberta |

**Nota:** Não há campo `cidade` nem `email` nesta LP — diferente da The Spot One.

## Integração n8n

| Config | Valor |
|--------|-------|
| Webhook | `n8n.alexandreborges.site/webhook/lotus-lead` |
| Label Chatwoot | `lotus-landing` |
| Workflow receptor | `01-Captura-Landing-Lotus-Business.json` |

**Fluxo após submissão:**
1. n8n recebe POST com `{nome, whatsapp, perfil}`
2. Cria contato no Chatwoot (account_id=1, inbox_id=2)
3. Abre conversa com label `lotus-landing`
4. Chama `01-CRM-XD-PRO-Lead-Intake` → POST Supabase → GPT-4o-mini `resumo_ia`
5. Hermes XD inicia conversa sobre Lótus Business

## Divergência Detectada com CRM XD PRO

O CRM XD PRO espera o campo `email` para todos os leads. A Lótus Business LP não captura email.
Verificar se o `01-CRM-XD-PRO-Lead-Intake` trata `email` como opcional.

## Observações

- CTA: "Quero a Análise do Meu Perfil →"
- Dois formulários na página (topo e meio) — mesmos campos
- Analytics/pixel: não detectados na extração automática
- O campo `perfil` é estratégico: o Hermes pode usar esse valor para personalizar a abordagem inicial
