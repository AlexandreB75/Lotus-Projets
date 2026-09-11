---
tags: [piccolo-bambino, itapema, loja, bebê, enxoval, marketing, master, index]
status: operacional
data: 2026-07-06
projeto: Piccolo Bambino
---

## Business OS — Sistema de Agentes

A Piccolo Bambino opera com um sistema de agentes especializados coordenados pelo **CEO Piccolo**.

| Agente | Missão |
|--------|--------|
| [[02-Projetos/Piccolo Bambino/agents/CEO-Piccolo]] | Orquestrador principal — recebe pedidos, delega, consolida |
| [[02-Projetos/Piccolo Bambino/agents/Agente-Bling]] | Cadastro de produtos, estoque, preços e integrações no Bling |
| [[02-Projetos/Piccolo Bambino/agents/Agente-Nuvemshop]] | SEO, páginas, coleções, banners e experiência da loja virtual |
| [[02-Projetos/Piccolo Bambino/agents/Agente-Marketplaces]] | Mercado Livre, Shopee e futuros marketplaces |
| [[02-Projetos/Piccolo Bambino/agents/Agente-Marketing]] | Instagram, TikTok, Pinterest, Meta Ads, Google Ads e campanhas |
| [[02-Projetos/Piccolo Bambino/agents/Agente-Dados]] | Métricas, relatórios, desempenho e oportunidades |

**Ver [[agents/README]] para o mapa completo e ciclo de aprendizado.**

---

# MASTER — Piccolo Bambino

> Painel central do projeto Piccolo Bambino no vault.

---

## Status operacional

**Fase atual:** campanha WhatsApp no ar + estruturação de marca
**Campanha ativa:** `PICCOLO | MENSAGENS WPP | QUARTO BEBÊ | JUN26` — no ar desde semana de 23/06/2026
**Prioridade:** acompanhar métricas da campanha no dia 7, instalar Pixel na Nuvemshop, preparar campanha Dia dos Pais (28/07)
**Diretriz:** converter antes de expandir — consolidar CPConv < R$12 antes de escalar budget

---

## O que é

A **Piccolo Bambino** é uma loja física especializada em enxoval e móveis para quarto de bebê, com showroom em Meia Praia, Itapema, SC. Atende gestantes e mães da região via showroom presencial e WhatsApp. Faz entrega e montagem em Itapema, Balneário Camboriú, Porto Belo e Bombinhas.

---

## Tese comercial

A Piccolo Bambino não deve ser vendida como "mais uma loja de bebê online".

A tese correta é:

> Atendimento humano + showroom local + entrega e montagem = a decisão certa, sem o risco da compra pela internet.

A cliente não compra só produto.
Ela compra:

- segurança de ver e tocar antes de decidir
- atendimento personalizado por WhatsApp (sem robô, sem fila)
- entrega no prazo combinado
- montagem profissional sem estresse
- uma loja que conhece os apartamentos da região

---

## Inteligência operacional atual

**Performance de referência (Jan–Jun 2026):**
- CPConv: R$10,92 | CTR: 1,66% | Frequência: 3,81 (⚠️ saturando)
- Audiência estimada: ~11.196 pessoas no raio atual

**O que está funcionando:** ângulo emocional ("ela ainda não chegou...") + vídeo tour do showroom
**Ponto de atenção:** frequência alta indica audiência pequena — ampliar raio ou criar lookalike antes de setembro

---

## Arquivos principais

### Business OS — Agentes
- [[agents/README|Business OS — índice e mapa de agentes]]
- [[agents/CEO-Piccolo|CEO Piccolo — orquestrador]]
- [[agents/Agente-Bling|Agente Bling — produtos e estoque]]
- [[agents/Agente-Nuvemshop|Agente Nuvemshop — loja virtual]]
- [[agents/Agente-Marketplaces|Agente Marketplaces — canais de venda]]
- [[agents/Agente-Marketing|Agente Marketing — mídia e campanhas]]
- [[agents/Agente-Dados|Agente Dados — métricas e relatórios]]

### Operações (SOPs e procedimentos)
- [[operacoes/README|Operações — índice de procedimentos]]
- Procedimentos de Bling: a construir (ver [[agents/Agente-Bling]])
- Procedimentos de Nuvemshop: a construir (ver [[agents/Agente-Nuvemshop]])
- Procedimentos de Marketplaces: a construir (ver [[agents/Agente-Marketplaces]])

### Dados
- [[data/README|Data — catálogo, relatórios e indicadores]]

### Brand OS
- [[brand-os/README|Brand OS — índice e instruções de uso]]
- [[brand-os/foundation|Foundation — público, proposta de valor, dados]]
- [[brand-os/voice|Voice — tom, atributos, antipadrões]]
- [[brand-os/positioning|Positioning — diferencial vs. concorrentes]]

### Craft por canal
- [[brand-os/craft/meta-ads|Meta Ads — copy, ângulos, configuração, métricas]]
- [[brand-os/craft/instagram|Instagram — conteúdo, captions, frequência]]
- [[brand-os/craft/whatsapp|WhatsApp — fluxo, templates, indicadores]]

### Campanhas ativas
- [[campanha-mensagens-wpp|Campanha Meta Ads WhatsApp — Jun/Jul 2026]] ✅ no ar desde 23/06/2026
- [[campanha-quarto-antes-do-parto|Campanha Quarto Pronto Antes do Parto — Jul/Ago 2026]] — estrutura pronta, aguardando subir

### Produção de criativos
- [[prompts-criativos-ia|Prompts de geração de imagem (IA)]]
- [[roteiro-video-showroom|Roteiro de vídeo tour do showroom]]

---

## Roadmap de próximas ações

### Concluído
- [x] Campanha `PICCOLO | MENSAGENS WPP | QUARTO BEBÊ | JUN26` criada e publicada (semana de 23/06)
- [x] Brand OS estruturado no vault (foundation, voice, positioning, craft por canal)

### Imediato (até 15/07)
- [ ] Avaliar métricas no dia 7 da campanha (CPConv, CTR, frequência) e decidir escala ou troca de criativo
- [ ] Instalar Pixel na Nuvemshop e conectar domínio `piccolobambino.com.br`
- [ ] Criar audiência personalizada de quem iniciou conversa mas não comprou
- [ ] Subir 2 novos criativos para reduzir frequência (referência anterior: 3,81)

### Curto prazo (até 28/07)
- [ ] Lançar campanha Dia dos Pais — ver [[campanha-dia-dos-pais]] (a criar)
- [ ] Criar Lookalike 1% a partir das conversas iniciadas (mínimo 30 conversas)

### Médio prazo (ago/set)
- [ ] Campanha de Conversão apontando para o site (após Pixel ativo + 50 eventos)
- [ ] Remarketing para quem visitou o site mas não conversou no WhatsApp
- [ ] Ampliar raio geográfico ou testar público de Florianópolis

### Rodada de execução — 23/08/2026 (CEO Piccolo → delegação multi-agente)

| Prioridade | Responsável | Ação | Status |
|---|---|---|---|
| Alta | Agente Bling | ~~Corrigir GTIN inválido em 9 poltronas~~ | ✅ Falso alarme — era artefato do export estático. Ao vivo, GTIN aparece corretamente como "SEM GTIN" (estado normal) |
| Alta | Agente Bling | Atribuir categoria às poltronas "ZARA BOTÃO" e "NATU PÉS MADEIRA" | ⏳ Ainda não reverificado ao vivo — export original indicava sem categoria |
| Média | Agente Nuvemshop | Confirmar status do Pixel Meta na Nuvemshop | ✅ Confirmado — Pixel Facebook `980296486349317` ativo, conta vinculada |
| Baixa | Agente Nuvemshop | Auditoria página a página dos ~234 produtos | ⏳ Pendente (fora do escopo) |
| Bloqueado | Agente Dados | Análise de Search Console | ✅ Resolvido — propriedade existe na conta dalvaniradelfina@gmail.com |
| Média | Agente Marketing | Estratégia de campanha Ago/Set | ⏳ Estratégia pronta, aguardando decisão sobre GA4 recém-corrigido |

### Auditoria completa de aplicativos — 23-25/08/2026 (login real, navegador automatizado)

Auditoria aplicativo por aplicativo com login real (não Windsor.ai, não export estático). Contas confirmadas: Bling (conta "Dalvanira"), Nuvemshop admin (piccolobambino2.lojavirtualnuvem.com.br), e todo o ecossistema Google sob **dalvaniradelfina@gmail.com** (esposa do Alexandre, que administra a loja).

| Aplicativo | Achado principal | Status |
|---|---|---|
| **Bling** | Integração Nuvemshop ativa: "Piccolo Bambino NuvemShop", Store ID 7312303. Antonella/Aurora Gatilho/Aurora Elétrica/Ravena — todos ativos, categoria e preço corretos, SKUs batem com a Nuvemshop | ✅ Confirmado |
| **Nuvemshop** | Loja "PICCOLO BAMBINO". Divergência real: peso da Aurora Elétrica é 54kg no Bling vs. 45kg na Nuvemshop (afeta frete) | ⚠️ Divergência a corrigir |
| **Google Search Console** | Propriedade `https://www.piccolobambino.com.br/` válida, 355 páginas indexadas, **3,69 mil não indexadas** — 2.878 delas por "cópia sem canônica" (maior problema técnico de SEO do site) | ⚠️ Achado crítico, correção pendente |
| **Google Ads** | Conta "piccolo bambino" CID 423-944-1466. 3 campanhas, orçamento R$20/dia, histórico R$6.479,33 gastos, 25,4 mil cliques (2022-2026) | ✅ Confirmado |
| **Google Merchant Center** | Conta 490320902. 259 produtos, 54 com problema (23 limitado + 31 reprovado). **Causa raiz identificada**: produtos "Encontrado pelo Google" (rastreados direto do site) não têm schema.org Product/Offer na página principal — só nos relacionados. Preço/disponibilidade "invisíveis" pro Google nesses casos | 🔧 Diagnosticado, correção **adiada por decisão do Alexandre** — ver ação abaixo |
| **Google Analytics 4** | 3 propriedades existentes apontavam todas para `sites.google.com` (site protótipo), nunca para o domínio real — por isso zero dados. **Corrigido**: fluxo de dados da propriedade "Piccolo Bambino" reapontado para `piccolobambino.com.br` (G-VJ6BMDHYR5), tag criada e publicada no GTM-PV837LX (Versão 4, publicada por dalvaniradelfina@gmail.com) | ✅ Corrigido e publicado em 23/08/2026 |
| **Google Tag Manager** | Container correto: GTM-PV837LX → piccolobambino.com.br (existe um 2º container, GTM-THJT7HM, órfão do site antigo). Tags ativas: Microsoft Clarity, Google Ads (AW-10850065787), Vinculador de conversões, e agora GA4 | ✅ Confirmado |
| **Meta / Facebook** | Business Manager "Piccolo Bambino" (ID 209589424281107), conta de anúncios 365853568158684, Pixel `980296486349317`. 3 campanhas: WhatsApp (ativa, R$41,41 gastos, R$8,28/conversa), Mensagens 08/01 e Alcance (desativadas). Confirma dado real da campanha que só era autorrelatada nas notas antigas | ✅ Confirmado |
| Google Perfil da Empresa | Não verificado nesta rodada | ⏳ Pendente |

**Ação registrada, correção adiada ("arrumar depois", 25/08/2026):**
- [x] ~~Merchant Center: corrigir os 4 produtos Poltrona Aurora (Gatilho e Elétrica, Bouclé e Neutro)~~ — **Alexandre corrigiu em 25/08/2026.** Reverificado ao vivo: os 4 estão "Aprovado", Em estoque, preço correto. Reprovados no total da conta caíram de 49 para 31 (Limitado seguiu em 23)
- [ ] Merchant Center: ainda restam 31 reprovados + 23 limitados no total da conta — mesma causa raiz (schema.org Product/Offer ausente na página principal para produtos "Encontrado pelo Google"). Pedir ao suporte da Nuvemshop/dev de tema, ou verificar sincronização completa via app "Google & YouTube" (Content API)
- [ ] Corrigir divergência de peso da Aurora Elétrica — **ainda não corrigida** (reverificado 25/08/2026: Bling 54kg, Nuvemshop 45kg, sem mudança)
- [ ] Investigar "cópia sem canônica" (2.878 páginas) no Search Console — provável causa: variações de produto ou parâmetros de URL sem `rel=canonical`

---

## Regras do projeto

1. Nenhuma campanha nova sem os 3 criativos testados (emocional, produto, confiança local)
2. Escala de budget só quando CPConv < R$15 por 7 dias consecutivos
3. Frequência > 3,5 = parar e renovar criativos antes de qualquer outra ação
4. WhatsApp respondido em < 30 minutos — tempo de resposta afeta conversão diretamente



## Squads de apoio

| Squad | Uso no projeto | Link |
|---|---|---|
| Copy Squad | Scripts de WhatsApp, copy de Meta Ads, roteiro de vídeo do showroom | [[../../03-Squads/Copy-Squad/00-INDEX-Copy-Squad\|Copy Squad]] |
| Traffic Masters | Campanhas Meta Ads segmentadas por perfil (gestante, mãe recente), gestão de CPConv/CTR/frequência | [[../../03-Squads/Traffic-Masters/00-INDEX-Traffic-Masters\|Traffic Masters]] |
| Brand Squad | Posicionamento "atendimento humano + showroom local", consistência de tom entre canais | [[../../03-Squads/Brand-Squad/00-INDEX-Brand-Squad\|Brand Squad]] |
| Design Squad | Prompts e criativos de imagem/vídeo para anúncios e showroom | [[../../03-Squads/Design-Squad/00-INDEX-Design-Squad\|Design Squad]] |
