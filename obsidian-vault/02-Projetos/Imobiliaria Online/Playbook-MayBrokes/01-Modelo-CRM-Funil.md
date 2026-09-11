# Modelo de CRM e Funil

## Origem

Extraido principalmente de `Planilha-de-CRM.xlsx`, `APOSTILA-FASE-04.pdf` e `GPS-Primeira-Venda.xlsx`.

## Funil comercial

### Topo de funil

Pessoas que ainda nao reconhecem claramente o problema ou a oportunidade. Exemplos:

- mora de aluguel e ainda nao percebe que pode comprar;
- acompanha conteudos, mas nao pediu atendimento;
- tem curiosidade sobre Itapema, praia, investimento ou imovel pronto;
- precisa de informacao antes de conversar com corretor.

Conduta: educar, gerar valor, mostrar oportunidades, nao bombardear com PDF de imovel.

### Meio de funil

Pessoas considerando uma solucao, mas ainda comparando opcoes. Exemplos:

- perguntou preco, condominio, localizacao ou financiamento;
- quer entender rentabilidade, liquidez ou uso pessoal;
- demonstrou regiao, faixa de valor ou tipologia;
- ainda tem objecoes.

Conduta: sondar criterio de decisao, dores, desejos, medos, condicao financeira e contexto familiar.

### Fundo de funil

Pessoas em decisao de compra. Exemplos:

- pediu visita;
- quer proposta;
- perguntou negociacao;
- enviou documentacao;
- comparou com outro imovel;
- depende de financiamento ou aprovacao familiar.

Conduta: ser objetivo, apresentar melhor opcao, tangibilizar valor, reduzir risco percebido, conduzir para visita/proposta.

## Entidades principais do CRM

### Lead

Campos recomendados:

- nome;
- telefone/WhatsApp;
- e-mail;
- origem;
- campanha;
- produto/imovel de interesse;
- cidade atual;
- objetivo: morar, investir, segunda moradia, renda de aluguel, troca de imovel;
- estagio do funil;
- temperatura: frio, morno, quente;
- prioridade: alta, media, baixa;
- proxima acao;
- responsavel;
- ultimo contato;
- status do contato.

### Cliente

Campos adicionais:

- data de aniversario;
- profissao;
- empresa;
- renda mensal estimada/declarada;
- estado civil;
- familia/filhos/pets;
- financiamento: sim, nao, talvez;
- entrada disponivel;
- prazo de compra;
- criterios de decisao;
- objecoes principais;
- historico de visitas;
- propostas enviadas.

### Imovel

Campos recomendados:

- empreendimento/imovel;
- cidade/bairro;
- endereco;
- tipologia;
- quartos/suites;
- vagas;
- metragem;
- pronto/em obra;
- mobiliado: sim/nao;
- preco;
- valor por m2;
- condominio;
- IPTU;
- status: ativo, negociacao, proposta, vendido, indisponivel;
- anunciado: sim/nao;
- dias no mercado;
- diferencial principal;
- perfil de comprador ideal.

### Oportunidade

Campos recomendados:

- lead vinculado;
- imovel vinculado;
- motivo do interesse;
- valor percebido pelo cliente;
- risco/objecao;
- etapa: qualificar, enviar opcoes, visita, proposta, negociacao, ganho, perdido;
- valor potencial/VGV;
- comissao estimada;
- probabilidade;
- data da proxima acao.

## Status sugeridos

- Novo lead
- Tentando contato
- Em qualificacao
- Oportunidade identificada
- Enviar opcoes
- Visita agendada
- Visitou
- Proposta solicitada
- Proposta enviada
- Negociacao
- Documentacao
- Fechado ganho
- Fechado perdido
- Pos-venda
- Indicacao futura

## Labels uteis para IA/automacao

- `lead_frio`
- `lead_morno`
- `lead_quente`
- `comprador_moradia`
- `comprador_investidor`
- `segunda_moradia`
- `financiamento`
- `visita_intencao`
- `proposta_intencao`
- `objecao_preco`
- `objecao_financiamento`
- `objecao_localizacao`
- `objecao_tempo`
- `followup_pendente`
- `assumir_humano`

## Regra de escalacao para humano

Escalar para Alexandre/corretor humano quando houver:

- pedido de visita;
- pedido de proposta;
- pergunta de negociacao;
- discussao de documentacao;
- duvida juridica/contratual;
- lead quente com urgencia;
- comparacao direta com outro imovel;
- objeção sensivel de preco, risco, financiamento ou confianca.
