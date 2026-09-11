# Requisitos do Produto - IA e Automacoes

## Objetivo

Converter o playbook MayBrokes em funcionalidades concretas para a imobiliaria online.

## Modulos prioritarios

### 1. Captura de leads

Entradas:

- landing pages;
- WhatsApp/Chatwoot;
- formulario de imovel;
- anuncio;
- indicacao;
- importacao manual.

Saida:

- lead criado no CRM;
- origem registrada;
- primeira classificacao de intencao;
- tarefa de primeiro contato.

### 2. Qualificacao por IA

A IA deve extrair da conversa:

- objetivo de compra;
- estagio do funil;
- temperatura;
- prazo;
- faixa de valor;
- financiamento;
- regiao desejada;
- criterio obrigatorio;
- dor principal;
- objecao;
- proxima acao.

### 3. Personal Broker

Ficha do cliente com:

- necessidades;
- problemas;
- medos;
- desejos;
- lista ponderada de preferencias;
- influenciadores da decisao;
- historico de recomendacoes;
- resumo interno para humano.

### 4. Recomendacao de imoveis

Matching entre cliente e imovel usando:

- objetivo;
- faixa de valor;
- localizacao;
- tipologia;
- pronto/obra;
- mobiliado;
- uso proprio/investimento;
- renda/financiamento;
- peso dos desejos.

### 5. Follow-up automatico

Regras:

- lead novo sem resposta: tentativa curta e util;
- lead morno: conteudo de valor;
- lead quente: acionar humano;
- visita realizada: pedir percepcao e objecoes;
- proposta enviada: acompanhamento objetivo;
- pos-venda: indicacao e relacionamento.

### 6. Alertas operacionais

Enviar alerta para Slack/operacao quando:

- lead pede visita;
- lead pede proposta;
- lead fala de negociacao;
- lead envia documentacao;
- lead quente fica sem resposta;
- proposta vence;
- lead importante critica preco, confianca ou financiamento.

### 7. Dashboard

Primeira versao deve mostrar:

- leads por origem;
- leads por temperatura;
- oportunidades abertas;
- visitas agendadas;
- propostas abertas;
- VGV potencial;
- comissao potencial;
- follow-ups vencidos.

## Campos de classificacao para schema IA

```json
{
  "objetivo_compra": "morar | investir | segunda_moradia | renda_locacao | indefinido",
  "estagio_funil": "topo | meio | fundo",
  "lead_temperatura": "frio | morno | quente",
  "lead_score": 0,
  "prazo_compra": "imediato | 30_dias | 90_dias | longo_prazo | indefinido",
  "financiamento": "sim | nao | talvez | indefinido",
  "faixa_valor": "texto",
  "dor_principal": "texto",
  "desejo_principal": "texto",
  "objecoes": [],
  "proxima_acao": "texto",
  "assumir_humano": false,
  "resumo_interno": "texto",
  "resposta_sugerida": "texto",
  "risco_compliance": "baixo | medio | alto"
}
```

## Backlog recomendado

1. Criar schema de lead imobiliario com campos acima.
2. Adaptar Alexandre AI CRM staging para armazenar ficha Personal Broker.
3. Criar template de prompt para classificacao de conversa.
4. Criar workflow n8n de alerta para lead quente.
5. Criar modulo de material comercial por imovel.
6. Criar gerador de proposta em rascunho.
7. Criar dashboard de VGV e oportunidades.

## Nao fazer na primeira versao

- Assinatura juridica automatica.
- Promessa automatica de rentabilidade.
- Envio de proposta sem revisao humana.
- Matching complexo antes de ter cadastro limpo de imoveis.
