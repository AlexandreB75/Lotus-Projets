# CRM

O CRM da plataforma é o funil de leads no Supabase (tabelas leads, follow_ups, conversas), gerido pelo Painel Admin.

## Estágios

novo → em_qualificação → quente → visita_agendada → proposta → ganho | perdido

## Regras de operação

- Todo lead tem responsável
- Nenhum follow-up vencido sem ação (evento follow_up_vencido cobra o corretor)
- Score BANT 80+ escala automaticamente
- Decisor conjunto obrigatório antes de agendar (R3)

## Migração

Leads existentes (planilhas, campanhas Meta anteriores) devem ser importados na Fase 3 via Backend, nunca por insert direto.
