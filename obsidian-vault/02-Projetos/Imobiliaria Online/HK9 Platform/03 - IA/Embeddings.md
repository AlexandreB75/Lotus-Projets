# Embeddings

Três tabelas pgvector (ver [[DATABASE]] §4):

| Tabela | Conteúdo | Uso |
|---|---|---|
| embeddings_unidades | descrição + destaques + tipologia | Busca semântica e recomendação |
| embeddings_conversas | Resumos por conversa | Memória de longo prazo do SDR |
| embeddings_documentos | Chunks do texto extraído | Análise e consulta |

Decisão de custo: resumo por conversa, nunca embedding por mensagem.

Modelo de embedding: pendente (IMPLEMENTATION_ORDER §4).
