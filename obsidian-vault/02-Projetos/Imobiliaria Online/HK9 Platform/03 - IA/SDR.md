# SDR IA

Agente de qualificação via WhatsApp. Especificação completa: [[ARCHITECTURE]] §4.2 e [[DEVELOPMENT_PHASES]] Fase 5.

## Regras invioláveis do SDR

- Não responde quando conversa está em status humano (R7)
- Qualifica antes de informar (R4)
- Nunca cita amenidades não confirmadas (R5) — lista por empreendimento em [[Agentes]]
- Sempre empurra para visita presencial (R2)
- Sempre inclui cônjuge/decisor antes de agendar (R3)
- Toda mensagem rastreável: prompt_version, modelo, origem_contexto (R9)

## Scoring BANT

Escala 0–100. Score 80+ = lead quente → evento score_quente → alerta e atribuição de corretor.

Critérios de pontuação: definir na Fase 5 (Budget, Authority, Need, Timeline — pesos a calibrar).

## Modos de operação

1. **Assistido** (inicial): IA sugere, humano aprova o envio
2. **Autônomo** (após validação): flag de configuração

## Contexto injetado por conversa

- Dados do lead
- Resumo da conversa (embeddings_conversas)
- Unidades relevantes (embeddings_unidades)
- Restrições do empreendimento
