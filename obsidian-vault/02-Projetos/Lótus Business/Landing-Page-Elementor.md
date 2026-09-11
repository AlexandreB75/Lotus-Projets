---
tags: [lotus, landing-page, elementor, copy, campanha]
status: pronto-para-implementar
data: 2026-06-14
projeto: Lótus Business
---

# Landing Page Lótus Business — Elementor

> Copy completa, bloco por bloco. Cole cada texto diretamente no widget do Elementor.
> Ângulo principal: Empresário Local (maior volume). Converte os 3 perfis.

---

## CONFIGURAÇÃO TÉCNICA ANTES DE COMEÇAR

| Item | Valor |
|---|---|
| Página | `/lotus-business` ou `/salas-comerciais-itapema` |
| Formulário → webhook | `https://n8n.alexandreborges.site/webhook/lotus-landing` (criar no n8n) |
| Campos do formulário | Nome, WhatsApp, Cidade |
| Redirect pós-envio | Página de obrigado com link WhatsApp |
| Meta Pixel | Instalar via Elementor → Integrações antes de lançar |

---

## BLOCO 1 — HERO (acima da dobra)

> Elementor: Section full-height + Heading + Text Editor + Form
> Fundo: foto do Lótus ou fundo escuro `#1a1a1a` com overlay

**Headline principal:**
```
Você ainda está pagando aluguel de escritório?
```

**Subheadline:**
```
O Lótus Business é o único centro corporativo premium entre Itajaí e Balneário Camboriú.
31 pavimentos. Infraestrutura moderna. Endereço que posiciona.
```

**Título do formulário:**
```
Receba as informações do Lótus Business
```
Campos: `Nome completo` | `WhatsApp` | `Cidade`

**Botão CTA:**
```
Quero conhecer →
```

**Texto pequeno abaixo do botão:**
```
Alexandre Borges — CRECI-SC 45148 | Atendimento via WhatsApp
```

---

## BLOCO 2 — ÂNCORA DE CONTEXTO

> Elementor: Section fundo claro + Heading + Text Editor
> Objetivo: plantar contexto antes da venda

**Título:**
```
Itapema não é mais a mesma cidade.
```

**Texto:**
```
Nos últimos anos, Itapema se consolidou como um dos destinos mais valorizados do litoral catarinense — com crescimento em turismo, moradia premium e agora em infraestrutura corporativa.

Empresas, clínicas, escritórios e investidores estão chegando.
O Lótus Business foi construído para ser a estrutura que faltava.
```

---

## BLOCO 3 — O PROBLEMA (dor)

> Elementor: Section fundo escuro + 3 colunas com Icon + Heading + Text

**Título da seção:**
```
O aluguel custa mais do que parece.
```

**Coluna 1** — Ícone: saída de dinheiro
```
Todo mês você paga aluguel
— e não constrói nada.
```

**Coluna 2** — Ícone: contrato
```
Você depende do dono do imóvel
para renovar, reformar ou ficar.
```

**Coluna 3** — Ícone: seta descendo
```
O aluguel valoriza o patrimônio
de outro, não o seu.
```

**Texto de fechamento:**
```
Para médicos, advogados, empresários e investidores com operação rodando, isso é capital que poderia estar construindo patrimônio próprio.
```

---

## BLOCO 4 — O PRODUTO

> Elementor: Section 2 colunas — imagem + texto

**Título:**
```
O Lótus Business.
O endereço corporativo que Itapema não tinha.
```

**Texto:**
```
Torre comercial de 31 pavimentos na entrada de Itapema — ao lado do Angeloni, acesso direto à BR-101.

Salas a partir de 61 m² até lajes corporativas de 904 m².
Infraestrutura completa: fibra dedicada, ar-condicionado central, geradores, recepção e controle de acesso.

Não é mais uma sala em prédio comum.
É o endereço que faz seus clientes perceber que você chegou onde deveria estar.
```

---

## BLOCO 5 — DIFERENCIAIS (4 cards)

> Elementor: Section + 4 colunas com Icon Box

**Título da seção:**
```
Por que o Lótus é diferente.
```

**Card 1** — Ícone: pin
Título: `Localização estratégica`
```
Entrada de Itapema. Ao lado do Angeloni. Acesso direto à BR-101. Fácil para clientes, pacientes e parceiros.
```

**Card 2** — Ícone: prédio
Título: `Infraestrutura corporativa`
```
Fibra dedicada, AC central, geradores, estacionamento rotativo, recepção e controle de acesso.
```

**Card 3** — Ícone: rede de pessoas
Título: `Ambiente de negócios`
```
Único centro corporativo premium entre Itajaí e Balneário Camboriú. Seus vizinhos são empresas e profissionais de alto nível.
```

**Card 4** — Ícone: patrimônio
Título: `Ativo, não despesa`
```
Em vez de pagar aluguel para sempre, você constrói patrimônio próprio — com potencial de renda por locação PJ.
```

---

## BLOCO 6 — PARA QUEM É (3 perfis)

> Elementor: Section + Toggle ou 3 colunas destacadas

**Título:**
```
Para quem faz sentido.
```

**Perfil 1 — Empresário**
Subtítulo: `Você tem empresa e ainda paga aluguel.`
```
Transforme o custo fixo do aluguel em investimento no seu próprio patrimônio.
Pare de engrossar o patrimônio de outro. Comece a construir o seu.
```

**Perfil 2 — Investidor**
Subtítulo: `Você quer renda real, não volatilidade.`
```
Locação corporativa rende de 0,6% a 1% ao mês — até 3x mais que locação residencial.
Inquilino PJ paga melhor, fica mais tempo e cuida melhor do imóvel.
```

**Perfil 3 — Profissional Liberal**
Subtítulo: `Médico, dentista, advogado — use metade e alugue o resto.`
```
Compre uma sala maior, use o que precisa e sublocar o restante.
Você zera o custo do espaço e ainda gera renda. Com PJ, parte da aquisição é dedutível.
```

---

## BLOCO 7 — NÚMEROS

> Elementor: Counter widget ou números grandes em destaque

**Título:**
```
Em números.
```

| Número | Label |
|---|---|
| 31 | Pavimentos |
| 61 m² | Menor unidade |
| 904 m² | Maior laje corporativa |
| 0,6–1% a.m. | Rentabilidade estimada por locação PJ* |
| 1 | Único centro corporativo premium entre Itajaí e BC |

**Nota de rodapé (obrigatória):**
```
*Rentabilidade potencial estimada. Não garantida. Sujeita a condições de mercado e ocupação.
```

---

## BLOCO 8 — CTA INTERMEDIÁRIO

> Elementor: Section fundo cor destaque + Heading + Text + Button (WhatsApp)

**Título:**
```
Quer entender se o Lótus faz sentido para o seu caso?
```

**Texto:**
```
Sem pressão. Sem script de venda.
Alexandre Borges faz uma análise rápida do seu perfil e te diz com clareza se essa é a decisão certa para você agora.
```

**Botão WhatsApp:**
```
Falar com Alexandre →
```
Link: `https://wa.me/55[SEU NÚMERO]?text=Olá%2C+vi+o+Lótus+Business+e+quero+entender+melhor`

---

## BLOCO 9 — DÚVIDAS FREQUENTES

> Elementor: Accordion widget
> Regra operacional: NÃO mencionar data de entrega proativamente. Se o lead perguntar → Alexandre responde direto.

**Título:**
```
Dúvidas que todo mundo tem.
```

**P: "Ainda está em obra — é seguro comprar?"**
```
Sim. Quem compra antes da entrega garante posição, metragem e melhores condições de negociação. As melhores unidades saem durante a obra — nunca depois que fica pronto. A 14ª laje concluída é prova concreta do avanço da construção.
```

**P: "Qual é o valor e como funciona o pagamento?"**
```
As unidades variam de 61 m² a 904 m². O pagamento é direto com a construtora — sem banco, sem análise de crédito. Alexandre apresenta as condições de acordo com o seu perfil e objetivo.
```

**P: "Posso comprar e alugar enquanto não uso?"**
```
Sim. Locação corporativa em Itapema tem demanda crescente — empresas, clínicas e escritórios que precisam de estrutura premium na região. Um endereço no Lótus tem apelo real para esse perfil de inquilino.
```

**P: "Serve para pessoa física ou só para PJ?"**
```
Serve para os dois. Mas dependendo do seu regime tributário, a aquisição via PJ pode ter vantagens significativas — parte dos custos pode ser dedutível. Vale consultar seu contador antes de decidir o formato.
```

**P: "Qual é a previsão de entrega?"**
```
Alexandre passa o cronograma atualizado diretamente — os detalhes da obra dependem de fatores que ele acompanha de perto. O importante: você pode reservar sua unidade agora e garantir as condições atuais de negociação.
```

---

## BLOCO 10 — CTA FINAL

> Elementor: Section fundo escuro + Heading + Form

**Título:**
```
Dê o primeiro passo.
```

**Subtítulo:**
```
Preencha abaixo e Alexandre entra em contato para entender seu perfil e apresentar as opções disponíveis.
```

**Campos do formulário:**
- Nome completo
- WhatsApp
- Cidade
- `Como você se define?` → Dropdown: Empresário / Médico ou profissional de saúde / Advogado ou profissional jurídico / Investidor / Outro

**Botão:**
```
Quero conhecer o Lótus Business →
```

**Texto abaixo do botão:**
```
Atendimento direto com Alexandre Borges — CRECI-SC 45148
Sem custo. Sem compromisso.
```

---

## BLOCO 11 — FOOTER

```
Lótus Business — Itapema/SC
Comercialização: Alexandre Borges | CRECI-SC 45148
```

---

## NOTAS DE IMPLEMENTAÇÃO

**Paleta sugerida:**
- Hero e seções escuras: `#1a1a1a`
- Texto claro: `#FFFFFF`
- Destaque / CTA: dourado `#C9A84C` ou verde corporativo (confirmar com Brand Squad)
- Seções claras: `#F5F5F5`

**Tipografia:**
- Títulos: Montserrat Bold ou Playfair Display
- Corpo: Inter ou Open Sans Regular

**Checklist antes de publicar:**
- [x] Meta Pixel instalado (Pixel ID 1012723743216174 — fbq Lead já disparando)
- [x] Formulário testado → webhook n8n funcionando (testado 2026-06-14, status 200 OK)
- [x] Webhook `lotus-lead` ativo — WF NdyImJFEz8NNuGxx (Captação de Leads — Imobiliária)
- [ ] Kanban task automática — verificar se inbox 2 gera task no board (atualmente só inbox 1 auto-cria)
- [ ] Página de obrigado com link WhatsApp criada
- [ ] URL do WhatsApp com número real preenchida nos botões CTA
- [ ] Revisão mobile completa
- [ ] Nota de rodapé de rentabilidade presente
- [ ] FAQ accordion adicionado no Elementor (BLOCO 9 — copy pronto acima)

**Status técnico (2026-06-14):**
Webhook `lotus-lead` ativado via API. Fluxo completo: lead preenche → Chatwoot contact criado → conversa aberta (inbox_id=2) → label `testando-agente` aplicada → mensagem de boas-vindas enviada → agente IA assume quando lead responder.
