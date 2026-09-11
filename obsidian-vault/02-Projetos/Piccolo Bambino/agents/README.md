# Agents — Piccolo Bambino

Sistema de agentes especializados que operam a Piccolo Bambino.

---

## Como funciona

Cada agente é um especialista com missão, responsabilidades, limites e conhecimento próprio. O **CEO Piccolo** orquestra todos — recebe pedidos, classifica, delega e consolida resultados.

**Regra fundamental:** antes de criar qualquer documento novo, verifique se já existe um com o mesmo propósito. Se existir, atualize. Só crie quando realmente necessário.

---

## Mapa dos agentes

```
                        ┌──────────────────┐
                        │    CEO PICCOLO    │
                        └────────┬─────────┘
                                 │
       ┌───────────┬──────────┬───┴───┬──────────┐
       ▼           ▼          ▼       ▼          ▼
  ┌──────────┐ ┌──────────┐ ┌──────┐ ┌──────────┐ ┌──────────┐
  │  BLING   │ │NUVEMSHOP │ │MARKET │ │MARKETING │ │  DADOS   │
  │          │ │          │ │PLACES │ │          │ │          │
  └──────────┘ └──────────┘ └──────┘ └──────────┘ └──────────┘
```

## Agentes

| Agente | Arquivo | Missão |
|--------|---------|--------|
| CEO Piccolo | [[agents/CEO-Piccolo]] | Orquestrar todos os agentes e consolidar resultados |
| Agente Bling | [[agents/Agente-Bling]] | Cadastro de produtos, estoque, preços e integrações |
| Agente Nuvemshop | [[agents/Agente-Nuvemshop]] | SEO, páginas, coleções e experiência da loja virtual |
| Agente Marketplaces | [[agents/Agente-Marketplaces]] | Mercado Livre, Shopee e futuros marketplaces |
| Agente Marketing | [[agents/Agente-Marketing]] | Instagram, TikTok, Pinterest, Meta Ads e Google Ads |
| Agente Dados | [[agents/Agente-Dados]] | Métricas, relatórios, desempenho e oportunidades |

## Ciclo de aprendizado

Quando o usuário ensina um processo novo:
1. Criar SOP (procedimento padrão)
2. Criar checklist
3. Registrar erros comuns
4. Registrar boas práticas
5. Atualizar a memória do agente envolvido

Tudo fica documentado em `operacoes/` e referenciado pelo agente.
