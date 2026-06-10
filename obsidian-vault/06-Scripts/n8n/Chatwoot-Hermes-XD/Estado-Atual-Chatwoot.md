---
tags: [chatwoot, estado-atual, api, hk-nove]
status: operacional
data: 2026-06-10
---

# Estado atual do Chatwoot — HK Nove

> Levantamento feito via API. Não salvar token real neste arquivo.

---

## Instância

- URL: `https://chatwoot.alexandreborges.site`
- Account ID: `1`
- Versão informada por Alexandre: `v4.14.0-fazer-ai-pro.96`
- Serviço/Coolify UUID informado: `ef02fdcd-2cce-4ee7-ac89-3e012240c391`

---

## Usuário / agente

- Agent ID: `1`
- Nome: Alexandre Souza
- Email: `alexandreborgescorretor75@gmail.com`
- Role: administrator
- Status: online

Usar como:

```text
ALEXANDRE_AGENT_ID=1
```

---

## Inbox WhatsApp

- Inbox ID: `2`
- Nome: Fone Escritorio HK9
- Channel type: `Channel::Whatsapp`
- Provider: `baileys`
- Telefone: `+5547988695350`

Usar como:

```text
WHATSAPP_INBOX_ID=2
```

---

## Labels existentes

### Controle agente

- `testando-agente` — Habilita agente IA em modo teste
- `agente-off` — Desabilita agente IA

### Perfis

- `perfil-investidor`
- `perfil-uso-proprio`
- `perfil-empresa`
- `perfil-saude`
- `perfil-temporada`
- `perfil-geral`

### Produtos

- `produto-hilton-hotel`
- `produto-hilton-residencial`
- `produto-shopping-hilton`
- `produto-medcenter`
- `produto-lotus`
- `produto-the-spot`

### Prioridade

- `prioridade-baixa`
- `prioridade-media`
- `prioridade-alta`
- `prioridade-maxima`

---

## Leitura operacional

O Chatwoot já tem uma estrutura inicial compatível com o Fazer.ai Pro/Kanban.

Para nosso modelo por API, a recomendação é:

1. **Aproveitar labels existentes** para produto, perfil e prioridade.
2. **Não duplicar labels** com nomes diferentes sem necessidade.
3. Criar apenas labels faltantes se forem realmente úteis.
4. Manter `testando-agente` como label de ativação em modo teste.
5. Respeitar `agente-off` como bloqueio absoluto do Hermes XD.

---

## Labels faltantes recomendadas

Criar apenas se aprovado:

### Etapas do funil

- `etapa-novo-lead`
- `etapa-atendimento-inicial`
- `etapa-qualificacao`
- `etapa-produto-direcionado`
- `etapa-material-enviado`
- `etapa-reuniao-visita`
- `etapa-proposta-negociacao`
- `etapa-fechado`
- `etapa-perdido-nutricao`

### Lead quente / handoff

- `lead-quente`
- `lead-morno`
- `lead-frio`
- `lead-prioridade-alexandre`

### Gatilhos

- `gatilho-pediu-tabela`
- `gatilho-pediu-disponibilidade`
- `gatilho-perguntou-preco`
- `gatilho-pediu-proposta`
- `gatilho-agendou-reuniao`
- `gatilho-orcamento-compativel`
- `gatilho-urgencia`

### Produtos faltantes

- `produto-multipropriedade-hilton`
- `produto-centro-medico-hilton` caso queira separar de `produto-medcenter`

### Perfis faltantes

- `perfil-corretor-parceiro`
- `perfil-advogado`
- `perfil-profissional-liberal`
- `perfil-curioso`

---

## Atributos personalizados existentes

Foram encontrados atributos de contato e de task/Kanban, incluindo campos imobiliários úteis:

- `profissao`
- `cidade`
- `uf`
- `cnpj`
- `razao_social`
- `cargo_contato`
- `segmento`
- `tipo_imovel`
- `area_minima`
- `area_maxima`
- `regiao`
- `valor_maximo`
- `prazo_decisao`
- `codigo_imovel`
- `endereco_imovel`
- `valor_venda`
- `numero_proposta`
- `valor_comissao`
- `status_documentacao`

---

## Atributos faltantes recomendados para Hermes XD

Criar apenas se aprovado:

- `funil_etapa`
- `lead_score`
- `lead_temperatura`
- `produto_interesse`
- `perfil_lead`
- `gatilho_quente`
- `responsavel_sugerido`
- `proxima_acao`
- `ultimo_resumo_hermes`
- `ultima_classificacao_em`

---

## Segurança

Token API recebido e usado apenas para consulta.

Não registrar token em arquivo.

No n8n, usar credencial segura ou variável de ambiente.
