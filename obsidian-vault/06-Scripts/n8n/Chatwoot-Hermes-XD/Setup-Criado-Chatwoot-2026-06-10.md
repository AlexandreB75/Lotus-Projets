---
tags: [chatwoot, setup, api, labels, atributos]
status: concluido
data: 2026-06-10
---

# Setup criado no Chatwoot — 2026-06-10

Criação aprovada por Alexandre em `2026-06-10 15:07 UTC`.

Execução via API do Chatwoot, sem mexer em Docker/Coolify.

Token usado apenas em runtime; não salvar token real em arquivo.

---

## Labels criadas

- `etapa-novo-lead` — id 19
- `etapa-atendimento-inicial` — id 20
- `etapa-qualificacao` — id 21
- `etapa-produto-direcionado` — id 22
- `etapa-material-enviado` — id 23
- `etapa-reuniao-visita` — id 24
- `etapa-proposta-negociacao` — id 25
- `etapa-fechado` — id 26
- `etapa-perdido-nutricao` — id 27
- `lead-frio` — id 28
- `lead-morno` — id 29
- `lead-quente` — id 30
- `lead-prioridade-alexandre` — id 31
- `gatilho-pediu-tabela` — id 32
- `gatilho-pediu-disponibilidade` — id 33
- `gatilho-perguntou-preco` — id 34
- `gatilho-pediu-proposta` — id 35
- `gatilho-agendou-reuniao` — id 36
- `gatilho-orcamento-compativel` — id 37
- `gatilho-urgencia` — id 38
- `produto-multipropriedade-hilton` — id 39
- `produto-centro-medico-hilton` — id 40
- `perfil-corretor-parceiro` — id 41
- `perfil-advogado` — id 42
- `perfil-profissional-liberal` — id 43
- `perfil-curioso` — id 44

---

## Atributos de conversa criados

- `funil_etapa` — id 48 — text — conversation_attribute
- `lead_score` — id 49 — number — conversation_attribute
- `lead_temperatura` — id 50 — text — conversation_attribute
- `produto_interesse` — id 51 — text — conversation_attribute
- `perfil_lead` — id 52 — text — conversation_attribute
- `gatilho_quente` — id 53 — text — conversation_attribute
- `responsavel_sugerido` — id 54 — text — conversation_attribute
- `proxima_acao` — id 55 — text — conversation_attribute
- `ultimo_resumo_hermes` — id 56 — text — conversation_attribute
- `ultima_classificacao_em` — id 57 — date — conversation_attribute

---

## Verificação

Verificado via API após criação.

Resultado:

- labels criadas sem erro;
- atributos criados sem erro;
- `lead_score` aceito como tipo `number`;
- `ultima_classificacao_em` aceito como tipo `date`.

---

## Próxima etapa

Criar webhook Chatwoot → n8n e montar workflow em modo silencioso.
