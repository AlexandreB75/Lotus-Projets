# Supabase

Fonte única de dados (decisão D1). Schema completo: [[DATABASE]].

## Componentes usados

- PostgreSQL (estado)
- Auth (painel, papéis admin/gestor/corretor)
- Storage (fotos, plantas, documentos)
- pgvector (ver [[Embeddings]])

## Regras

- Service role só no Backend (nunca no cliente)
- RLS em todas as tabelas
- View pública sem preco_interno é a única leitura anon
- Migrations versionadas, nada manual em produção
