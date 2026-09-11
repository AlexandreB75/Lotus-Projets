# Data — Piccolo Bambino

Dados estruturados, relatórios e indicadores da Piccolo Bambino.

---

## Estrutura

```
data/
├── README.md              ← Este arquivo
├── catalogo-produtos.md  ← Sumário do catálogo (a criar)
├── indicadores.md         ← Dashboard de KPIs (a criar)
└── relatorios/            ← Relatórios por período (a criar)
    ├── relatorio-semana-XX.md
    └── relatorio-mes-YYYY-MM.md
```

---

## Dados disponíveis

| Dado | Fonte | Status |
|------|-------|--------|
| Catálogo de produtos (1.077 itens) | `produtos_2026-06-30-19-15-56.xls` | ✅ Disponível (formato XLS) |
| Performance Meta Ads (Jan-Jun 2026) | [[campanha-mensagens-wpp]] | ✅ Disponível |
| Estratégia e KPIs | [[01-Estrategia-Geral]] | ✅ Disponível |

## Dados pendentes

| Dado | Precisa de |
|------|-----------|
| Vendas por produto | Exportação do Bling/Nuvemshop |
| Estoque atual | Exportação do Bling |
| Receita mensal | Relatório financeiro |
| Clientes e fase do bebê | CRM (a construir) |
| Performance Instagram | Insights ou dados manuais |
| Tráfego do site | Google Analytics / Nuvemshop |

---

## Observações

- O XLS de catálogo (`produtos_2026-06-30-19-15-56.xls`) contém 1.077 produtos com 59 colunas exportado do Bling
- Distribuição de preço: 49% entre R$100-300, 23% abaixo de R$100, 4% acima de R$1.000
- Quando o [[agents/Agente-Dados]] precisar de dados que não existem aqui, ele solicita ao usuário
