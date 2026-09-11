# Ordem de implementação

Guia de execução para o agente implementador (Codex / GPT). Leia este documento por completo antes de escrever qualquer código.

## 1. Grafo de dependências

```
Supabase (schema + RLS)
   ↓
Backend/API ──→ integrações OpenAI
   ↓
Portal Público    Painel Admin
   ↓
Chatwoot webhook → SDR
   ↓
n8n (eventos e automações)
```

- Supabase não depende de nada. Sempre primeiro.
- Backend depende do schema pronto.
- Portal e Painel dependem do Backend.
- SDR depende de Backend + Chatwoot + pgvector populado. **Não comece pelo SDR: é o módulo com mais dependências.**
- n8n depende dos eventos existirem, e os eventos dependem do Backend gravar estado corretamente.

## 2. Sequência dentro de cada fase

### Fase 1 — Fundação
1. Tabela `organizacoes` e registro da HK Nove.
2. Tabelas centrais na ordem de dependência: empreendimentos → unidades → unidade_status_historico → leads → follow_ups → conversas → mensagens → agendamentos → propostas → documentos → usuarios_internos → eventos_automacao.
3. RLS por tabela, testada com papel anon e autenticado.
4. View pública (empreendimentos + unidades publicadas, sem preco_interno). Testar que preco_interno é inacessível ao anon antes de prosseguir.
5. Trigger de eventos (lead_criado).
6. Backend: `GET /api/imoveis`, `GET /api/imoveis/[slug]`, `POST /api/leads` com deduplicação por telefone, rate limit, logs e auditoria.
7. Teste de ponta a ponta: formulário → lead no banco → evento na fila.

### Fase 2 — Portal Público
1. Layout e catálogo lendo da view pública.
2. Página de empreendimento.
3. Landing page de campanha (template reutilizável).
4. Integração dos formulários ao `POST /api/leads`.

### Fase 3 — Painel Admin
1. Auth com papéis e proteção de rotas.
2. CRUD de empreendimentos.
3. CRUD de unidades + endpoint de status com histórico transacional.
4. Funil de leads (leitura, filtro por responsável via RLS, mudança de estágio).
5. Follow-ups.

### Fase 4 — Automações (n8n)
1. Fluxo de consumo da fila: `GET /api/eventos/pendentes` → processa → `POST /api/eventos/[id]/confirmar`. Testar reprocessamento com erro forçado.
2. Boas-vindas (lead_criado).
3. Alertas Telegram (score_quente, handoff_humano, follow_up_vencido).
4. Agendamentos: confirmação, lembretes, Google Calendar.
5. Webhook Meta Ads → `POST /api/webhooks/meta`.

### Fase 5 — SDR IA
1. Estrutura de prompts versionados: `prompts/sdr/v1/...` (pasta por agente, versão explícita).
2. Webhook Chatwoot → Backend, com validação de token.
3. Montagem de contexto (lead + resumo pgvector + unidades + restrições do empreendimento).
4. Chamada OpenAI + gravação rastreável (bloquear envio sem prompt_version, modelo, origem_contexto).
5. Scoring BANT e evento score_quente.
6. Bloqueio de IA quando conversa está em status humano (testar explicitamente).
7. Modo assistido: resposta vai como sugestão, humano aprova no Chatwoot/Painel.
8. Só depois: modo autônomo, com flag de configuração.

### Fase 6 — Inteligência avançada
1. Embeddings de unidades + `POST /api/busca`.
2. Recomendações por perfil.
3. Pipeline de documentos (upload → extração → chunks → análise).
4. Reengajamento: job diário, três travas implementadas antes do primeiro envio real.

## 3. Regras de execução para o agente

1. **Consulte [BUSINESS_RULES.md](BUSINESS_RULES.md) antes de cada módulo.** As 15 regras têm precedência sobre qualquer conveniência de implementação.
2. **Não avance de fase sem o critério de pronto** definido em [DEVELOPMENT_PHASES.md](DEVELOPMENT_PHASES.md).
3. **Não introduza tecnologias novas.** A stack é a que está no README. Exceções exigem justificativa técnica forte e aprovação explícita.
4. **Não crie integração direta com WhatsApp.** O único caminho é o Chatwoot.
5. **Não coloque chave da OpenAI, service role ou tokens fora das variáveis de ambiente do Backend.**
6. **Migrations versionadas** para todo o schema. Nenhuma alteração manual em produção.
7. **Cada entrega deve ser pequena e testável.** Prefira PRs por item da sequência acima, não por fase inteira.
8. **Atualize a documentação no mesmo PR** quando uma decisão estrutural mudar.

## 4. Definições pendentes (resolver com o responsável antes de implementar)

- Valor de X dias para lead_abandono.
- Teto diário de reengajamento.
- Texto padrão aprovado da objeção de prazo de entrega (R6).
- Lista de restrições por empreendimento (R5) — conteúdo comercial, não técnico.
- Modelo(s) OpenAI a utilizar por função (chat SDR, análise, embeddings).
