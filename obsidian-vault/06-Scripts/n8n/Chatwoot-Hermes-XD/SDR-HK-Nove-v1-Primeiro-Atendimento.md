---
tags: [sdr-hk-nove, chatwoot, n8n, workflow, primeiro-atendimento, whatsapp]
status: pronto-para-teste-controlado
data: 2026-06-11
---

# SDR HK Nove v1 — Primeiro Atendimento

## Decisão operacional

Criar **um agente único de primeiro atendimento**, chamado **SDR HK Nove**, em vez de criar um subagente para cada produto neste momento.

Motivo:

- reduz bagunça operacional;
- simplifica o n8n;
- facilita debug;
- reduz custo;
- evita respostas conflitantes entre agentes;
- permite validar o atendimento automático com segurança antes de escalar.

---

## Papel do SDR HK Nove

O agente faz o primeiro atendimento no Chatwoot/WhatsApp quando o lead entra pelo Meta ou outro canal.

Funções:

1. Responder rápido.
2. Identificar produto de interesse.
3. Fazer uma pergunta curta de qualificação.
4. Aplicar tags.
5. Atualizar atributos personalizados.
6. Criar/atualizar card no Kanban.
7. Direcionar para Alexandre quando houver gatilho comercial forte.

O agente **não fecha venda** e **não negocia**.

---

## Arquitetura

Fluxo:

```text
Meta Ads / WhatsApp
→ Chatwoot
→ n8n webhook
→ SDR HK Nove v1
→ classifica produto/perfil
→ consulta memória lógica do produto
→ responde ou sugere resposta
→ atualiza Chatwoot + Kanban
→ handoff para Alexandre quando necessário
```

---

## Memórias lógicas por produto

O agente usa um único cérebro com memórias separadas por produto:

| Produto detectado | Memória lógica |
|---|---|
| Lótus Business | `memoria_lotus_business` |
| Hilton geral/hotel | `memoria_hilton_geral` |
| Hilton Residencial | `memoria_hilton_residencial` |
| Multipropriedade Hilton | `memoria_multipropriedade_hilton` |
| Centro Médico Hilton | `memoria_centro_medico_hilton` |
| The Spot One | `memoria_the_spot_one` |
| Indefinido | `memoria_geral_hk_nove` |

Nesta v1, as memórias são aplicadas como roteamento/script fixo dentro do workflow.
Na próxima evolução, podem virar busca real em base de conhecimento/RAG.

---

## Modo de teste seguro

O workflow só processa conversa se tiver a label:

- `testando-agente`

A resposta pública só é enviada se a conversa também tiver a label:

- `sdr-auto-responder`

Portanto existem 2 modos:

### 1. Modo sugestão

Label necessária:

- `testando-agente`

Comportamento:

- classifica;
- atualiza tags/atributos;
- cria nota interna com sugestão de resposta;
- atualiza Kanban;
- **não responde o cliente**.

### 2. Modo auto-resposta controlada

Labels necessárias:

- `testando-agente`
- `sdr-auto-responder`

Comportamento:

- faz tudo do modo sugestão;
- envia a resposta pública para o cliente.

Para pausar o agente em uma conversa:

- adicionar label `agente-off`.

---

## Exemplos de resposta

### Lótus Business

Entrada:

> Quero informação do Lótus Business

Resposta:

> Olá, tudo bem? Claro. O Lótus Business é um empreendimento comercial em Itapema, voltado para salas corporativas, profissionais liberais e investidores.
>
> Você está buscando uma sala para uso próprio/empresa ou pensando mais como investimento?

---

### Hilton geral

Entrada:

> Quero informação do Hotel Hilton

Resposta:

> Olá, tudo bem? Claro, te ajudo com as informações do Hilton Garden Inn Itapema.
>
> Você quer saber mais sobre unidade residencial, multipropriedade, investimento ou uso em temporada?

---

### Multipropriedade Hilton

Entrada:

> Quero informação da multipropriedade

Resposta:

> Olá, tudo bem? Claro. A multipropriedade do Hilton é uma opção para quem quer usar o empreendimento em períodos definidos do ano, com uma proposta voltada a férias e uso planejado.
>
> Você quer entender mais sobre como funcionam as semanas de uso ou sobre valores e disponibilidade?

---

## Gatilhos de handoff para Alexandre

O lead deve ser direcionado para Alexandre quando pedir:

- tabela;
- preço;
- valor;
- entrada;
- parcela;
- disponibilidade;
- proposta;
- simulação;
- reunião;
- visita;
- urgência de fechamento.

Nestes casos o SDR pode responder:

> Já vou deixar seu atendimento direcionado para o comercial confirmar os detalhes com a tabela vigente.

---

## Compliance

O SDR HK Nove não pode prometer:

- rentabilidade garantida;
- valorização garantida;
- ocupação garantida;
- revenda garantida;
- intercâmbio garantido;
- disponibilidade sem confirmar;
- condição comercial sem tabela vigente.

Usar linguagem segura:

- potencial;
- possibilidade;
- conforme disponibilidade;
- conforme regras do empreendimento;
- conforme tabela vigente;
- o comercial confirma os detalhes.

---

## Arquivo do workflow

Workflow v1 exportável/importável:

- [[workflow-chatwoot-sdr-hk-nove-assistido-v1.json]]

Workflow anterior preservado:

- [[workflow-chatwoot-hermes-silent-v0.json]]

---

## Próximo teste recomendado

1. Escolher uma conversa de teste.
2. Aplicar label `testando-agente`.
3. Enviar mensagem simulando lead: “Quero informação do Lótus Business”.
4. Verificar nota interna, tags, atributos e Kanban.
5. Se estiver correto, adicionar `sdr-auto-responder` e testar resposta pública.
6. Repetir com: “Quero informação do Hotel Hilton”.
