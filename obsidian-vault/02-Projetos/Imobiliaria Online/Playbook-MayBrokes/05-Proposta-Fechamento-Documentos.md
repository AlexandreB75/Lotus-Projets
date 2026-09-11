# Proposta, Fechamento e Documentos

## Origem

Extraido de `Proposta-de-Fechamento.xlsx` e da aba `PROPOSTA DE FECHAMENTO` de `GPS-Primeira-Venda.xlsx`.

## Objetivo do modulo

Gerar propostas comerciais e organizar dados para fechamento sem redigitar informacoes espalhadas pelo atendimento.

## Dados do corretor/intermediador

- corretor;
- CRECI;
- gerente;
- imobiliaria/intermediadora;
- responsaveis por venda;
- percentual de comissao;
- comissao estimada.

## Dados do proponente

- nome completo;
- nacionalidade;
- naturalidade;
- data de nascimento;
- RG/orgao emissor;
- CPF;
- estado civil;
- regime de comunhao;
- filiacao;
- endereco;
- CEP;
- cidade/estado;
- telefone;
- e-mail;
- profissao;
- empresa;
- renda mensal.

## Dados do imovel

- empreendimento;
- unidade;
- torre/quadra/lote;
- endereco;
- valor total;
- preco de proposta;
- condominio;
- status do imovel;
- disponibilidade;
- data prevista ou pronto.

## Condicoes comerciais

- valor da proposta/preco do imovel;
- entrada/sinal;
- financiamento;
- total do financiamento na data;
- parcelas;
- forma de pagamento;
- vencimentos;
- comissao/intermediacao;
- premios/repasse se existirem.

## Fluxo de pagamento

O material traz uma logica de parcelamento de intermediacao, por exemplo:

- ato + 2x;
- ato + 3x;
- ato + 4x;
- ato + 5x ou mais;
- limites que exigem aprovacao.

Para o nosso sistema, isso deve virar tabela configuravel, nao regra fixa.

## Clausulas e alertas

Pontos que precisam de revisao juridica antes de automatizar:

- proposta sujeita a analise do vendedor/construtora;
- financiamento sujeito a analise de credito;
- correcao por indice como INCC quando aplicavel;
- regras sobre sinal, devolucao e validade da proposta;
- reconhecimento de servicos de intermediacao;
- foro e condicoes especificas.

## Requisitos do produto

- Botao `Gerar proposta` a partir da oportunidade.
- Preenchimento automatico com dados do lead e do imovel.
- Checklist de campos obrigatorios antes de gerar PDF.
- Historico de propostas por oportunidade.
- Status: rascunho, enviada, aceita, recusada, vencida.
- Escalacao humana obrigatoria antes de envio final.
- Exportacao em PDF.
- Registro de versao e data.

## Regra de seguranca

IA pode preparar rascunho e organizar dados, mas proposta juridicamente sensivel deve passar por revisao humana antes do envio.
