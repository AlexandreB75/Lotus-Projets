# Campanha Meta Ads — Quarto Pronto Antes do Parto
**Marca:** Piccolo Bambino
**Período:** Julho/Agosto 2026
**Conceito:** "Ela chega em poucas semanas. O quartinho ainda não está pronto."
**Objetivo:** Gerar conversas no WhatsApp → vendas consultivas com urgência real
**Budget:** R$30/dia → escala para R$50/dia se CPConv < R$15 no dia 7

---

## Por que esse ângulo funciona

A urgência aqui é real — o prazo é o parto, não uma promoção artificial. Gestantes no 7º/8º mês estão no pico de ansiedade com o quartinho. Já procrastinaram, já pesquisaram, já deixaram pra depois. Esse anúncio aparece na hora certa com a mensagem certa: **ainda dá tempo, mas precisa ser agora**.

---

## Estrutura no Ads Manager

```
CAMPANHA: PICCOLO | PARTO URGENTE | QUARTO BEBÊ | JUL26
│   Objetivo: Engajamento → Mensagens
│   Budget: Definido no Ad Set (não na campanha)
│
└── AD SET: SC | GESTANTES AVANÇADAS | ITAPEMA 17KM
        Orçamento diário: R$30,00
        Otimização: Conversas iniciadas (WhatsApp)
        │
        ├── AD 01 — Urgência Temporal
        ├── AD 02 — Risco da Procrastinação
        └── AD 03 — Solução Completa
```

---

## Configuração do Ad Set

| Campo | Valor |
|-------|-------|
| Nome | `SC \| GESTANTES AVANÇADAS \| ITAPEMA 17KM` |
| Localização | Itapema, SC + raio 17km |
| Gênero | Feminino |
| Idade | 24 – 42 anos |
| Interesses | Gravidez, Maternidade, Parto, Enxoval de bebê, Lista de nascimento |
| Placements | Advantage+ (automático) |
| App de mensagens | WhatsApp |
| Orçamento diário | R$30,00 |
| Lance | Volume máximo (Highest volume) |

> **Nota de segmentação:** Mesmos interesses da campanha anterior + "Parto" e "Lista de nascimento" para tentar alcançar gestantes mais avançadas. O criativo faz o trabalho de auto-seleção — quem está no 7º/8º mês vai se reconhecer na mensagem.

---

## AD 01 — Urgência Temporal

**Criativo:** Foto do showroom montado — berço + cômoda + poltrona, luz natural, sem pessoas

**Texto principal:**
> Ela chega em poucas semanas.
> O quartinho ainda não está pronto.
>
> Ainda dá tempo — mas precisa ser agora.
>
> Na Piccolo Bambino, a gente entrega e monta o quartinho completo antes do parto. Berços transformáveis, cômodas, poltronas de amamentação e enxoval — tudo num só lugar, com atendimento pelo WhatsApp.
>
> 📍 Showroom em Meia Praia, Itapema
> 🚚 Entrega e montagem em Itapema e região
> 💳 Até 10x sem juros | PIX com 10% de desconto
>
> 👇 Manda mensagem agora e a gente te ajuda a fechar o quartinho a tempo

**Título:** O quartinho pronto antes dela chegar
**CTA:** Enviar mensagem

---

## AD 02 — Risco da Procrastinação

**Criativo:** Close no berço com enxoval arrumado — detalhe de naninha, manta, almofada

**Texto principal:**
> Todo mundo deixa o quartinho pra última hora.
>
> Aí descobre que o berço tem 15 dias de frete.
> Que a cor veio diferente do site.
> Que não tem ninguém pra montar.
>
> Na Piccolo Bambino você vê o produto no showroom, escolhe com calma e a gente entrega e monta na data que você precisar.
>
> ✅ Sem esperar frete de SP
> ✅ Sem surpresa de cor ou tamanho
> ✅ Sem montar sozinha no 8º mês
>
> 📍 Showroom em Meia Praia, Itapema
>
> 👇 Chama a gente no WhatsApp

**Título:** Sem estresse no 8º mês
**CTA:** Enviar mensagem

---

## AD 03 — Solução Completa

**Criativo:** Foto do quarto montado completo — visão geral com berço + cômoda + poltrona

**Texto principal:**
> Kit Quarto Completo — entregue e montado antes do parto.
>
> ✅ Berço transformável (cresce com o bebê até virar cama júnior)
> ✅ Cômoda, guarda-roupa e poltrona de amamentação
> ✅ Enxoval completo — cueiros, mantas, almofadas
> ✅ Entrega combinada na data que você precisar
> ✅ Montagem inclusa — você não precisa fazer nada
>
> Atendimento pelo WhatsApp — a gente te ajuda a escolher sem sair de casa.
>
> 📍 Showroom em Meia Praia, Itapema
> Parcele em até 10x ou ganhe 10% no PIX
>
> 👇 Fala com a gente agora

**Título:** Entrega e montagem antes do parto
**CTA:** Enviar mensagem

---

## Passo a Passo — Subir no Ads Manager

1. **Criar campanha:** Ads Manager → Criar → Engajamento → Mensagens
2. **Nomear:** `PICCOLO | PARTO URGENTE | QUARTO BEBÊ | JUL26`
3. **Budget:** Desativar budget da campanha — definir no ad set
4. **Criar ad set** com as configurações da tabela acima
5. **Criar 3 anúncios** com os copies acima — um por criativo
6. **Verificar:** número do WhatsApp correto em todos os anúncios
7. **Não mexer nos primeiros 7 dias** — deixar o algoritmo aprender

> **Atenção:** Esta campanha pode rodar em paralelo com `PICCOLO | MENSAGENS WPP | QUARTO BEBÊ | JUN26`. São públicos e ganchos diferentes. Se o budget total ficar pesado, pausar o que tiver CTR mais baixo no dia 7.

---

## Métricas para Monitorar (dias 1–7)

| Métrica | Meta | Alarme |
|---------|------|--------|
| Custo por conversa | < R$15 | > R$20 |
| CTR | > 1,0% | < 0,5% |
| Frequência | < 2,5 | > 3,5 |
| CPM | < R$18 | > R$25 |

**Regras de decisão no dia 7:**
- CPConv < R$15 + CTR > 1% → escala para R$50/dia
- Anúncio com CTR 50% menor que os outros → pausa e substitui
- Frequência > 3,5 → adiciona 2 novos criativos urgente
- Se ambas as campanhas rodarem em paralelo: manter só a de melhor CPConv

---

## Criativos necessários

Ver [[prompts-criativos-ia]] para prompts de geração de imagem.

| Anúncio | Criativo | Formato |
|---------|----------|---------|
| AD 01 | Foto showroom completo (berço + cômoda + poltrona) | 1:1 + 9:16 |
| AD 02 | Close no berço com enxoval arrumado | 1:1 |
| AD 03 | Foto quarto montado — visão geral | 4:5 + 9:16 |

---

## Próximos Passos (após semana 1)

- [ ] Avaliar CPConv e CTR no dia 7 e decidir escala
- [ ] Criar audiência de remarketing com quem iniciou conversa mas não comprou
- [ ] Se CPConv < R$12 por 14 dias → criar Lookalike 1% a partir dessa audiência
