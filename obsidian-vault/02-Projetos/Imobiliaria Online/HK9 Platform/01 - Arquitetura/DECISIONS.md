# Registro de Decisões (ADRs)

Decisões estruturais tomadas na fase de arquitetura (julho de 2026). Este arquivo existe para que nenhum humano ou agente de IA reinvente, questione sem contexto ou reverta silenciosamente uma decisão já tomada. Novas decisões estruturais devem ser adicionadas aqui no formato: contexto, decisão, justificativa, consequências.

---

## D1 — Supabase como fonte única de dados

**Contexto:** o projeto precisa de banco relacional, autenticação, armazenamento de arquivos e busca vetorial.

**Decisão:** Supabase concentra PostgreSQL, Auth, Storage e pgvector.

**Justificativa:** a infraestrutura já existe e está operacional na stack do Alexandre. Um único serviço cobre quatro necessidades, com RLS nativa para as regras de acesso (incluindo a proteção do preço interno no nível do banco). Evita a fragmentação de manter banco, auth e storage em serviços separados.

**Consequências:** RLS vira parte do contrato de segurança, não opcional. A view pública sem preco_interno é a única superfície de leitura anônima.

---

## D2 — Chatwoot como único canal de WhatsApp

**Contexto:** WhatsApp é o canal comercial principal. Havia risco de integrações paralelas (envio direto por API, bibliotecas não oficiais, n8n falando direto com o WhatsApp).

**Decisão:** todo WhatsApp entra e sai pelo Chatwoot. Sem exceção (regra R11).

**Justificativa:** um único ponto de entrada/saída dá visibilidade humana total das conversas, handoff natural IA→corretor na mesma interface, histórico unificado e um único ponto de conformidade com as políticas do WhatsApp. Integrações paralelas criam conversas invisíveis para a equipe e risco de banimento do número.

**Consequências:** o Backend e o n8n enviam mensagens pela API do Chatwoot, nunca por integração direta. Qualquer limitação do Chatwoot é resolvida dentro dele, não contornada por fora.

---

## D3 — API OpenAI em vez de OpenClaw para o SDR

**Contexto:** a primeira versão da arquitetura previa OpenClaw como módulo de SDR conversacional.

**Decisão:** toda a inteligência (SDR, busca semântica, recomendações, análise de documentos) usa a API OpenAI, chamada exclusivamente pelo Backend.

**Justificativa:** decisão do Alexandre na revisão da arquitetura. A chamada direta à API elimina uma camada de framework entre a plataforma e o modelo: menos superfície de manutenção, controle total sobre prompts, contexto e custos, e rastreabilidade nativa (prompt_version, modelo, origem_contexto gravados por mensagem). O contexto do agente vive no Supabase (pgvector), não em um framework externo com estado próprio.

**Consequências:** o Backend é o único cliente da OpenAI. Frameworks de agente não fazem parte da arquitetura desta plataforma. Novos agentes seguem o molde do SDR: prompts versionados + contexto do Supabase + endpoint no Backend.

---

## D4 — organizacao_id desde a Fase 1, com uma única empresa

**Contexto:** o produto é single-tenant (HK Nove), mas a arquitetura evolutiva prevê um possível portal multi-imobiliária no futuro.

**Decisão:** todas as tabelas centrais têm organizacao_id desde a primeira migration, preenchido com um único valor. O produto não expõe multi-tenant.

**Justificativa:** adicionar a coluna agora custa quase zero. Adicionar depois exige refatorar schema, RLS, queries e todos os índices com dados em produção. É a única antecipação de futuro que entra na Fase 1 (junto com D5), justamente porque é a única cara de corrigir depois.

**Consequências:** RLS já filtra por organização. Ativar multi-tenant no futuro é decisão de produto, não reforma técnica.

---

## D5 — n8n apenas reativo, guiado por eventos

**Contexto:** n8n poderia iniciar automações por conta própria (polling, agendamentos arbitrários, disparos diretos), criando comunicação comercial sem controle.

**Decisão:** n8n só age a partir de eventos registrados na tabela eventos_automacao: lead_criado, score_quente, agendamento, lead_abandono, follow_up_vencido, handoff_humano, unidade_status_alterado (regra R12).

**Justificativa:** eventos no banco dão trilha de auditoria completa (quem disparou o quê e quando), reprocessamento seguro (tentativas, ultimo_erro) e impedem que automação inicie conversa comercial sem gatilho legítimo. O único job proativo do n8n (detecção de abandono) também materializa um evento antes de agir.

**Consequências:** toda automação nova exige primeiro definir seu evento. Se não há evento, não há automação.

---

## D6 — Prompts versionados por agente, no repositório

**Contexto:** mensagens de IA em produção precisam ser auditáveis e reproduzíveis.

**Decisão:** prompts vivem no repositório em estrutura por agente (prompts/sdr/v1/...), nunca editados direto em produção. Toda mensagem de IA grava prompt_version, modelo e origem_contexto; sem esses campos, não envia (regras R9 e R10).

**Justificativa:** permite responder "por que a IA disse isso?" para qualquer mensagem histórica, fazer rollback de prompt como rollback de código, e dá o molde para os agentes especializados futuros.

**Consequências:** mudar o comportamento do SDR é um PR, não um ajuste em painel.

---

## D7 — Backend nas API routes da Vercel, com rota de saída para a VPS

**Contexto:** a camada de regras precisa morar em algum lugar; a VPS com Docker já existe.

**Decisão:** começar com API routes do Next.js na Vercel (mesmo repositório do frontend). Se o volume do SDR gerar timeouts, migrar o Backend para serviço Docker na VPS com o mesmo código Node.

**Justificativa:** menor atrito inicial (um deploy, um repositório) sem trancar a decisão: a migração futura não muda contratos nem arquitetura.

**Consequências:** o código do Backend deve ser escrito sem dependências exclusivas da Vercel que dificultem a portabilidade.

---

## D8 — IA em modo assistido antes de autônomo

**Contexto:** SDR autônomo errando em produção custa leads reais e reputação.

**Decisão:** a Fase 5 inicia com a IA sugerindo respostas que um humano aprova antes do envio. Autonomia só após validação, atrás de flag de configuração. O reengajamento segue a mesma lógica: aprovação humana nas primeiras semanas, teto diário e janela de horário (regra R8).

**Justificativa:** o modo assistido gera dados de qualidade sobre onde a IA erra, sem expor clientes aos erros. A transição para autônomo vira decisão baseada em evidência, não em otimismo.

**Consequências:** o fluxo do SDR precisa suportar os dois modos desde o início.
