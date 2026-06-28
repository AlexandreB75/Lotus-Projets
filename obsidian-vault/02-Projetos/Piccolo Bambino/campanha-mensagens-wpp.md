# Campanha Meta Ads — Mensagens WhatsApp
**Marca:** Piccolo Bambino
**Período:** Junho/Julho 2026
**Objetivo:** Gerar conversas no WhatsApp → vendas consultivas
**Budget:** R$30/dia (~R$900/mês) → escala para R$50/dia se CPConv < R$15

---

## Estrutura no Ads Manager

```
CAMPANHA: PICCOLO | MENSAGENS WPP | QUARTO BEBÊ | JUN26
│   Objetivo: Engajamento → Mensagens
│   Budget: Definido no Ad Set (não na campanha)
│
└── AD SET: SC | GESTANTES 24-42 | ITAPEMA 17KM
        Orçamento diário: R$30,00
        Otimização: Conversas iniciadas (WhatsApp)
        │
        ├── AD 01 — Vídeo Tour | Ângulo Emocional
        ├── AD 02 — Foto Ambiente | Ângulo Produto
        └── AD 03 — Imagem Loja | Ângulo Confiança Local
```

---

## Configuração do Ad Set

| Campo | Valor |
|-------|-------|
| Nome | `SC \| GESTANTES 24-42 \| ITAPEMA 17KM` |
| Localização | Itapema, SC + raio 17km |
| Gênero | Feminino |
| Idade | 24 – 42 anos |
| Interesses | Gravidez, Maternidade, Enxoval de bebê, Chá de bebê, Decoração quarto infantil |
| Placements | Advantage+ (automático) |
| App de mensagens | WhatsApp |
| Orçamento diário | R$30,00 |
| Lance | Volume máximo (Highest volume) |

---

## AD 01 — Vídeo Tour | Ângulo Emocional

**Criativo:** Vídeo 18-22s do showroom (ver roteiro-video-showroom.md)

**Texto principal:**
> Ela ainda não chegou, mas o quartinho dela já pode estar pronto.
>
> Na Piccolo Bambino você encontra tudo para montar o quarto dos sonhos do seu bebê — berços, cômodas, poltronas de amamentação e enxoval completo, num único lugar, com atendimento pelo WhatsApp.
>
> 📍 Showroom em Meia Praia, Itapema
> 💳 Até 10x sem juros | PIX com 10% de desconto
>
> 👇 Clique e fale com a gente agora

**Título:** Quarto do bebê do jeito que você imaginou
**CTA:** Enviar mensagem

---

## AD 02 — Foto Ambiente | Ângulo Produto

**Criativo:** Foto do showroom — berço + cômoda + poltrona juntos, luz natural (ou imagem gerada — ver prompts-criativos-ia.md)

**Texto principal:**
> Kit Quarto Completo com entrega e montagem em Itapema e região 🛏️
>
> ✅ Berços transformáveis (crescem com o bebê — de berço a cama)
> ✅ Cômodas, guarda-roupas e poltronas de amamentação
> ✅ Enxoval, acessórios e tudo que você precisa num só lugar
> ✅ Atendimento pelo WhatsApp — você decide sem sair de casa
>
> Parcele em até 10x sem juros ou ganhe 10% no PIX.
>
> 👇 Manda mensagem e a gente te ajuda a montar o quartinho perfeito

**Título:** Berços, móveis e enxoval — tudo na Piccolo Bambino
**CTA:** Enviar mensagem

---

## AD 03 — Foto Loja | Ângulo Confiança Local

**Criativo:** Foto da fachada ou da equipe no showroom — algo que mostre que é uma loja real e local

**Texto principal:**
> A diferença de comprar numa loja aqui perto:
>
> ❌ Sem esperar 15 dias de frete
> ❌ Sem surpresa de tamanho errado
> ❌ Sem montar sozinha
>
> ✅ A gente conhece os apartamentos da região
> ✅ A gente entrega e monta
> ✅ Se precisar de ajuda, é só chamar no WhatsApp
>
> Piccolo Bambino — Showroom em Meia Praia, Itapema
> Atendemos toda a região de Balneário Camboriú, Porto Belo e Bombinhas
>
> 👇 Fale com a gente agora

**Título:** Entrega e montagem em Itapema e região
**CTA:** Enviar mensagem

---

## Passo a Passo — Subir no Ads Manager

1. **Criar campanha:** Ads Manager → Criar → Engajamento → Mensagens
2. **Nomear:** `PICCOLO | MENSAGENS WPP | QUARTO BEBÊ | JUN26`
3. **Budget:** Desatigar budget da campanha — definir no ad set
4. **Criar ad set** com as configurações da tabela acima
5. **Criar 3 anúncios** com os copies acima — um por criativo
6. **Verificar:** número do WhatsApp correto em todos os anúncios
7. **Publicar e aguardar 7 dias sem mexer**

---

## Métricas para Monitorar (dias 1–7)

| Métrica | Meta | Alarme |
|---------|------|--------|
| Custo por conversa | < R$15 | > R$20 |
| CTR | > 1,0% | < 0,5% |
| Frequência | < 2,5 | > 3,5 |
| CPM | < R$18 | > R$25 |

**Regras de decisão no dia 7:**
- CTR > 1% + CPConv < R$15 → aumenta budget para R$50/dia
- Anúncio com CTR 50% menor que os outros → pausa e substitui por novo criativo
- Frequência > 3,5 → adiciona 2 novos criativos urgente

---

## Referência — Performance Campanha Anterior

Campanha MENSAGENS | 08/01 (últimos 30 dias):
- Gasto: R$589,59
- Conversas: 54
- CPConv: R$10,92
- CTR: 1,66%
- Frequência: 3,81 (⚠️ saturando — audiência pequena de 11.196 pessoas)

Meta para nova campanha: CPConv < R$12, CTR > 1,2%, Frequência < 2,5

---

## Próximos Passos (após semana 1)

- [ ] Criar audiência personalizada de quem iniciou conversa mas não comprou
- [ ] Remarketing com AD 03 para essa audiência
- [ ] Campanha Dia dos Pais — iniciar 28/07 (ver campanha-dia-dos-pais.md)
- [ ] Instalar Pixel na Nuvemshop + conectar domínio piccolobambino.com.br
- [ ] Criar campanha de Conversão apontando para o site (após Pixel ativo)
- [ ] Criar Lookalike 1% a partir das conversas iniciadas (após 30+ conversas)
