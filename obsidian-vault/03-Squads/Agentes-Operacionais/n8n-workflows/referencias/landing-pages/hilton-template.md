# LP — Hilton Itapema (A Criar)

> Status: ❌ Não existe | Planejado em: 2026-06-18
> Fase de implementação: Phase 3 do ROADMAP.md

## Empreendimentos do Complexo Hilton

| Produto | Tipo | Público |
|---------|------|---------|
| Hilton Garden Inn Itapema | Hotelaria / Multipropriedade | Investidor hotelaria |
| Hilton Residencial | Residencial + pool locação | Morador / investidor |
| Hilton Hotel | Investimento hotelaria | Investidor puro |
| Shopping Center Hilton | Salas comerciais | Lojista / investidor |
| MedCenter Hilton | Salas clínicas/saúde | Médicos / investidores saúde |

## Campos do Formulário (proposto)

Seguindo o padrão das outras LPs, com campo de segmentação:

| Campo | Tipo | Opções | Mapeamento webhook |
|-------|------|--------|-------------------|
| Nome | text | — | `nome` |
| WhatsApp | tel | — | `whatsapp` |
| Cidade | text | — | `cidade` |
| Produto de Interesse | select | ver abaixo | `produto_interesse` |

### Opções "Produto de Interesse"

| Valor | Segmento |
|-------|---------|
| Hilton Garden Inn — Multipropriedade | hotel |
| Hilton Residencial — Morar ou alugar | residencial |
| Hilton Hotel — Investimento hoteleiro | hotel_investimento |
| Shopping Center Hilton — Sala comercial | comercial |
| MedCenter Hilton — Sala clínica/saúde | medcenter |
| Quero conhecer todas as opções | geral |

## Integração n8n (a criar)

| Config | Valor |
|--------|-------|
| Webhook | `n8n.alexandreborges.site/webhook/hilton-lead` |
| Label Chatwoot | `hilton-landing` |
| Workflow a criar | `01-Captura-Landing-Hilton.json` |
| Labels por produto | `hilton-hotel`, `hilton-residencial`, `hilton-comercial`, `hilton-medcenter` |

## URL sugerida

`alexandreborgescorretor.com.br/hilton-itapema` ou `/complexo-hilton`

## Padrão de Consistência com LPs Existentes

Ao criar, seguir o mesmo padrão:
1. Mesmo domínio (`alexandreborgescorretor.com.br`)
2. CTA similar — "Quero mais informações →" ou "Analisar meu perfil →"
3. POST para webhook n8n em vez de formulário tradicional
4. Sem redirect após submit — trocar por mensagem de confirmação inline
5. Chamar `01-CRM-XD-PRO-Lead-Intake` para gerar resumo IA e salvar no Supabase
