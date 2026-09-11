---
tags: [funil, tags, score, lead-qualification, hk-nove]
status: em-desenho
data: 2026-06-10
---

# Funil, Tags e Score — HK Nove

## Etapas oficiais do funil

| Ordem | Etapa | Responsável padrão | Critério de entrada | Critério de saída |
|---:|---|---|---|---|
| 1 | Novo Lead | Hermes XD | Conversa nova recebida | Primeira resposta enviada ou lead identificado |
| 2 | Atendimento Inicial | Hermes XD | Lead respondeu/abriu conversa | Intenção mínima identificada |
| 3 | Qualificação | Hermes XD | Lead demonstra interesse | Produto, perfil ou capacidade mapeada |
| 4 | Produto Direcionado | Hermes XD | Produto provável identificado | Material correto enviado |
| 5 | Material Enviado | Hermes XD | Tabela, planta, folder ou resumo enviado | Lead pede reunião/proposta ou entra em follow-up |
| 6 | Reunião/Visita Agendada | Alexandre | Lead aceita reunião/visita | Reunião realizada ou reagendada |
| 7 | Proposta/Negociação | Alexandre | Lead pede condição/proposta | Fechado ou perdido |
| 8 | Fechado | Alexandre | Venda/compromisso fechado | Pós-venda |
| 9 | Perdido/Nutrição | Hermes XD | Sem fit, sem resposta ou timing futuro | Reativação futura |

---

## Responsabilidade operacional

### Hermes XD

Opera etapas:

- Novo Lead;
- Atendimento Inicial;
- Qualificação;
- Produto Direcionado;
- Material Enviado;
- Perdido/Nutrição.

### Alexandre

Assume obrigatoriamente:

- Reunião/Visita Agendada;
- Proposta/Negociação;
- Fechado;
- qualquer lead com score ≥ 80;
- qualquer gatilho comercial forte.

---

## Gatilhos de lead quente

Lead deve ser atribuído para Alexandre se ocorrer qualquer um:

- pediu tabela;
- pediu disponibilidade;
- perguntou entrada/parcela;
- pediu proposta;
- pediu reunião;
- pediu visita;
- informou orçamento compatível;
- disse que quer comprar/investir agora;
- pediu unidade específica;
- pediu simulação;
- enviou documentação/dados pessoais;
- demonstrou urgência real.

---

## Faixas de score

| Score | Classificação | Ação |
|---:|---|---|
| 0–39 | Frio | Nutrição/educação automática |
| 40–59 | Morno baixo | Continuar qualificação |
| 60–79 | Morno alto | Enviar material e tentar reunião |
| 80–100 | Quente | Atribuir para Alexandre |

---

## Score por sinal comercial

### Intenção

| Sinal | Pontos |
|---|---:|
| Respondeu primeira pergunta | +10 |
| Informou objetivo | +15 |
| Pediu tabela | +30 |
| Pediu disponibilidade | +35 |
| Perguntou preço/entrada/parcela | +35 |
| Pediu proposta/simulação | +40 |
| Aceitou reunião/visita | +50 |

### Capacidade

| Sinal | Pontos |
|---|---:|
| Informou orçamento | +20 |
| Orçamento compatível com produto | +35 |
| Tem imóvel/investimento anterior | +15 |
| Fala em CNPJ/clínica/empresa | +20 |
| Demonstra urgência de decisão | +25 |

### Produto/perfil

| Sinal | Pontos |
|---|---:|
| Investidor | +15 |
| Médico/clínica | +20 |
| Empresário/profissional liberal | +15 |
| Interesse em multipropriedade com uso familiar | +10 |
| Interesse em unidade integral Hilton | +20 |
| Interesse em Lótus/consultório/sala | +20 |
| Interesse em The Spot/Airbnb | +15 |

### Penalizações

| Sinal | Pontos |
|---|---:|
| Só curiosidade declarada | -20 |
| Sem orçamento compatível | -30 |
| Não responde 24h | -10 |
| Não responde 7 dias | -25 |
| Quer produto muito fora do ticket | -30 |
| Corretor/parceiro, não comprador final | não pontuar como comprador |

---

## Tags oficiais sugeridas

### Etapas

- `etapa-novo-lead`
- `etapa-atendimento-inicial`
- `etapa-qualificacao`
- `etapa-produto-direcionado`
- `etapa-material-enviado`
- `etapa-reuniao-visita`
- `etapa-proposta-negociacao`
- `etapa-fechado`
- `etapa-perdido-nutricao`

### Temperatura

- `lead-frio`
- `lead-morno`
- `lead-quente`
- `lead-prioridade-alexandre`

### Produtos

- `produto-hilton-residencial`
- `produto-multipropriedade-hilton`
- `produto-centro-medico-hilton`
- `produto-lotus`
- `produto-the-spot`
- `produto-indefinido`

### Perfil

- `perfil-investidor`
- `perfil-uso-proprio`
- `perfil-temporada`
- `perfil-saude`
- `perfil-advogado`
- `perfil-empresa`
- `perfil-profissional-liberal`
- `perfil-corretor-parceiro`
- `perfil-curioso`

### Gatilhos

- `gatilho-pediu-tabela`
- `gatilho-pediu-disponibilidade`
- `gatilho-perguntou-preco`
- `gatilho-pediu-proposta`
- `gatilho-agendou-reuniao`
- `gatilho-orcamento-compativel`
- `gatilho-urgencia`

### Nutrição/follow-up

- `followup-24h`
- `nutricao-7d`
- `conteudo-30d`
- `sem-resposta`
- `reativar-futuro`

---

## Custom attributes sugeridos

| Atributo | Tipo | Exemplo |
|---|---|---|
| `funil_etapa` | texto | `qualificacao` |
| `lead_score` | número | `85` |
| `lead_temperatura` | texto | `quente` |
| `produto_interesse` | texto | `multipropriedade_hilton` |
| `perfil_lead` | texto | `investidor` |
| `gatilho_quente` | texto | `pediu_tabela` |
| `responsavel_sugerido` | texto | `alexandre` |
| `proxima_acao` | texto | `agendar_reuniao` |
| `ultimo_resumo_hermes` | texto | `Lead quer tabela da multipropriedade...` |
| `ultima_classificacao_em` | data | `2026-06-10T14:42:00Z` |

---

## Mapeamento rápido de produto

### Multipropriedade Hilton

Indicadores:

- férias;
- menor ticket;
- cota;
- semanas;
- Interval International;
- uso familiar;
- datas fixas;
- vitalício.

### Hilton Residencial

Indicadores:

- unidade inteira;
- apartamento;
- pool;
- uso próprio;
- investimento patrimonial;
- locação administrada.

### Centro Médico Hilton

Indicadores:

- médico;
- clínica;
- saúde;
- consultório;
- autoridade médica;
- fluxo qualificado.

### Lótus Business

Indicadores:

- sala comercial;
- consultório;
- escritório;
- profissional liberal;
- advogado;
- empresário;
- torre corporativa.

### The Spot One

Indicadores:

- Airbnb;
- locação temporada;
- alto padrão;
- investimento residencial;
- rentabilidade potencial, sem promessa.

---

## Compliance comercial

Hermes XD nunca deve prometer:

- rentabilidade garantida;
- valorização garantida;
- revenda garantida;
- ocupação garantida;
- intercâmbio garantido;
- aprovação de crédito garantida;
- disponibilidade sem confirmar.

Linguagem segura:

- “possibilidade”;
- “conforme disponibilidade”;
- “conforme regras do empreendimento”;
- “conforme tabela vigente”;
- “preciso confirmar com o comercial”.
