import { useState, useEffect, useRef } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A96E;
    --gold-dim: #8B6E42;
    --bg: #080808;
    --surface: #0F0F0F;
    --surface2: #161616;
    --surface3: #1E1E1E;
    --border: #2A2A2A;
    --text: #E8E0D0;
    --text-dim: #6B6055;
    --green: #4ADE80;
    --red: #F87171;
    --blue: #60A5FA;
  }

  body { background: var(--bg); color: var(--text); font-family: 'Share Tech Mono', monospace; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* HEADER */
  .header {
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .header-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 2px;
  }
  .header-sep { color: var(--border); font-size: 18px; }
  .header-sub {
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .header-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 2px;
  }
  .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* TABS */
  .tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    padding: 0 32px;
    gap: 0;
  }
  .tab {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-dim);
    padding: 14px 20px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .tab:hover { color: var(--text); }
  .tab.active {
    color: var(--gold);
    border-bottom-color: var(--gold);
  }

  /* MAIN */
  .main { flex: 1; padding: 32px; max-width: 1200px; width: 100%; margin: 0 auto; }

  /* PANELS */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
  }
  .panel-header {
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .panel-title {
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
  }
  .panel-body { padding: 20px; }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* FORM */
  .form-group { margin-bottom: 16px; }
  .form-label {
    display: block;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 6px;
  }
  .form-input, .form-select, .form-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    padding: 10px 12px;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--gold-dim);
  }
  .form-select option { background: var(--surface2); }
  .form-textarea { resize: vertical; min-height: 80px; }

  /* BUTTON */
  .btn {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 12px 24px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-gold {
    background: var(--gold);
    color: #000;
  }
  .btn-gold:hover { background: #E0BB88; }
  .btn-gold:disabled {
    background: var(--gold-dim);
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
  }
  .btn-outline:hover { border-color: var(--gold-dim); color: var(--gold); }

  /* RESULT */
  .result-block {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 16px;
    margin-top: 8px;
  }
  .result-label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .result-text {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text);
    white-space: pre-wrap;
  }
  .tag {
    display: inline-block;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 2px;
    border: 1px solid;
  }
  .tag-green { color: var(--green); border-color: var(--green); }
  .tag-gold { color: var(--gold); border-color: var(--gold); }
  .tag-blue { color: var(--blue); border-color: var(--blue); }
  .tag-red { color: var(--red); border-color: var(--red); }

  /* LOADING */
  .loading-bar {
    height: 2px;
    background: var(--border);
    border-radius: 1px;
    overflow: hidden;
    margin: 16px 0;
  }
  .loading-fill {
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    animation: slide 1.5s infinite;
    width: 50%;
  }
  @keyframes slide {
    from { transform: translateX(-100%); }
    to { transform: translateX(300%); }
  }
  .loading-text {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-dim);
    text-align: center;
    padding: 8px 0;
  }

  /* PIPELINE */
  .pipeline { display: flex; flex-direction: column; gap: 12px; }
  .stage {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 2px;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .stage:hover { border-color: var(--gold-dim); }
  .stage-num {
    width: 28px; height: 28px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: var(--gold);
    flex-shrink: 0;
  }
  .stage-info { flex: 1; }
  .stage-name {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text);
    margin-bottom: 3px;
  }
  .stage-desc { font-size: 11px; color: var(--text-dim); }
  .stage-count {
    font-size: 18px;
    color: var(--gold);
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
  }
  .connector {
    width: 1px;
    height: 12px;
    background: var(--border);
    margin-left: 27px;
  }

  /* ARCH */
  .arch-node {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 14px 16px;
  }
  .arch-node.highlight { border-color: var(--gold-dim); }
  .arch-node-title {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
  }
  .arch-node-desc { font-size: 11px; color: var(--text-dim); }
  .arch-arrow {
    text-align: center;
    color: var(--text-dim);
    font-size: 16px;
    padding: 4px 0;
  }
  .arch-row { display: flex; gap: 12px; align-items: stretch; }
  .arch-row .arch-node { flex: 1; }

  /* METRICS */
  .metric {
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 16px;
    border-radius: 2px;
  }
  .metric-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 4px;
  }
  .metric-label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  /* MESSAGE PREVIEW */
  .msg-preview {
    background: var(--surface3);
    border-left: 2px solid var(--gold);
    padding: 12px 16px;
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.7;
    color: var(--text);
    font-style: italic;
  }

  /* SECTION TITLE */
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: var(--gold);
    margin-bottom: 4px;
    letter-spacing: 1px;
  }
  .section-sub {
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  /* DIVIDER */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 20px 0;
  }

  /* COPY BUTTON */
  .copy-btn {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
    padding: 4px 10px;
    border-radius: 2px;
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    transition: all 0.2s;
  }
  .copy-btn:hover { border-color: var(--gold-dim); color: var(--gold); }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold-dim); }

  /* FADE IN */
  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const PROFESSIONS = [
  "Médico / Cirurgião",
  "Dentista",
  "Advogado / Sócio",
  "Empresário / CEO",
  "Arquiteto / Designer",
  "Engenheiro",
  "Contador / CFO",
  "Consultor Financeiro",
  "Outro Profissional Liberal",
];

const SITUATIONS = [
  "Trabalha em clínica/escritório de terceiros",
  "Home office no apartamento",
  "Atende em outra cidade (Balneário/Floripa)",
  "Já tem sala mas quer upgrade",
  "Investidor puro de imóveis",
];

const ORIGINS = [
  "Comprou apartamento em Itapema",
  "Indicação de cliente/parceiro",
  "Redes sociais (Instagram/LinkedIn)",
  "Evento / networking local",
  "Pesquisa orgânica",
];

export default function App() {
  const [tab, setTab] = useState("inteligencia");
  const [form, setForm] = useState({
    nome: "",
    profissao: PROFESSIONS[0],
    situacao: SITUATIONS[0],
    origem: ORIGINS[0],
    tempo_itapema: "",
    valor_residencial: "",
    canal_preferido: "whatsapp",
    notas: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnalyze = async () => {
    if (!form.nome.trim()) {
      setError("Nome do prospect obrigatório.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    const prompt = `Você é o sistema de inteligência comercial do Lótus Business — o maior e mais moderno centro empresarial do litoral catarinense, localizado em Itapema (SC), 2º metro quadrado mais caro do Brasil. Salas comerciais de alto padrão de 60m² a 175m², entrega prevista para 2028, ticket médio de R$1 milhão.

Analise este prospect e gere um relatório estruturado em JSON com exatamente este formato:
{
  "categoria": "NECESSIDADE_IMEDIATA" | "NECESSIDADE_LATENTE" | "INVESTIDOR_PURO",
  "temperatura": "QUENTE" | "MORNO" | "FRIO",
  "score": número de 0 a 100,
  "dor_principal": "string de 1 frase descrevendo a dor central",
  "argumento_chave": "string com o argumento mais poderoso para este perfil",
  "objecao_provavel": "string com a objeção mais provável",
  "resposta_objecao": "string com como contornar essa objeção",
  "mensagem_${form.canal_preferido}": "mensagem personalizada para ${form.canal_preferido}, máximo 4 linhas, tom consultivo e sofisticado, nunca agressivo, nunca genérico. Deve soar como alguém que conhece a pessoa.",
  "proximos_passos": ["passo 1", "passo 2", "passo 3"]
}

DADOS DO PROSPECT:
- Nome: ${form.nome}
- Profissão: ${form.profissao}
- Situação atual de trabalho: ${form.situacao}
- Origem do lead: ${form.origem}
- Tempo em Itapema: ${form.tempo_itapema || "não informado"}
- Valor do imóvel residencial: ${form.valor_residencial ? "R$" + form.valor_residencial : "não informado"}
- Canal preferido de contato: ${form.canal_preferido}
- Notas adicionais: ${form.notas || "nenhuma"}

Responda APENAS com o JSON, sem texto adicional, sem markdown, sem backticks.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b) => b.text || "").join("");
      const parsed = JSON.parse(text.trim());
      setResult(parsed);
    } catch (err) {
      setError("Erro ao processar análise. Verifique a conexão com a API.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const getCategoryTag = (cat) => {
    if (!cat) return null;
    const map = {
      NECESSIDADE_IMEDIATA: { cls: "tag-green", label: "NECESSIDADE IMEDIATA" },
      NECESSIDADE_LATENTE: { cls: "tag-blue", label: "NECESSIDADE LATENTE" },
      INVESTIDOR_PURO: { cls: "tag-gold", label: "INVESTIDOR PURO" },
    };
    return map[cat] || { cls: "tag-gold", label: cat };
  };

  const getTempTag = (temp) => {
    const map = {
      QUENTE: { cls: "tag-red", label: "🔴 QUENTE" },
      MORNO: { cls: "tag-gold", label: "🟡 MORNO" },
      FRIO: { cls: "tag-blue", label: "🔵 FRIO" },
    };
    return map[temp] || { cls: "tag-gold", label: temp };
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        {/* HEADER */}
        <header className="header">
          <div className="header-brand">
            <span className="header-logo">LÓTUS</span>
            <span className="header-sep">|</span>
            <span className="header-sub">Prospecting Intelligence</span>
          </div>
          <div className="header-status">
            <div className="dot" />
            CLAUDE API · ATIVA
          </div>
        </header>

        {/* TABS */}
        <nav className="tabs">
          {[
            { id: "inteligencia", label: "Inteligência de Prospecto" },
            { id: "pipeline", label: "Pipeline" },
            { id: "arquitetura", label: "Arquitetura do Sistema" },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ── TAB 1: INTELIGÊNCIA ── */}
          {tab === "inteligencia" && (
            <div className="fade-in">
              <div className="section-title">Motor de Análise</div>
              <div className="section-sub">
                Perfil + Mensagem Personalizada via Claude API
              </div>

              <div className="grid-2" style={{ gap: 20 }}>
                {/* FORM */}
                <div className="panel">
                  <div className="panel-header">
                    <span className="panel-title">Dados do Prospect</span>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="form-label">Nome</label>
                      <input
                        className="form-input"
                        name="nome"
                        placeholder="Dr. João Oliveira"
                        value={form.nome}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Profissão</label>
                      <select
                        className="form-select"
                        name="profissao"
                        value={form.profissao}
                        onChange={handleChange}
                      >
                        {PROFESSIONS.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Situação Atual</label>
                      <select
                        className="form-select"
                        name="situacao"
                        value={form.situacao}
                        onChange={handleChange}
                      >
                        {SITUATIONS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Origem do Lead</label>
                      <select
                        className="form-select"
                        name="origem"
                        value={form.origem}
                        onChange={handleChange}
                      >
                        {ORIGINS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Tempo em Itapema</label>
                        <input
                          className="form-input"
                          name="tempo_itapema"
                          placeholder="ex: 2 anos"
                          value={form.tempo_itapema}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Valor Residencial</label>
                        <input
                          className="form-input"
                          name="valor_residencial"
                          placeholder="ex: 3.000.000"
                          value={form.valor_residencial}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Canal de Abordagem</label>
                      <select
                        className="form-select"
                        name="canal_preferido"
                        value={form.canal_preferido}
                        onChange={handleChange}
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="instagram">Instagram DM</option>
                        <option value="email">E-mail</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Notas (opcional)
                      </label>
                      <textarea
                        className="form-textarea"
                        name="notas"
                        placeholder="Ex: atende em clínica parceira em BC, mora no Condomínio Acqua..."
                        value={form.notas}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="btn btn-gold"
                      onClick={handleAnalyze}
                      disabled={loading}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      {loading ? "ANALISANDO..." : "▶ GERAR ANÁLISE DE PROSPECTO"}
                    </button>
                    {error && (
                      <div
                        style={{
                          marginTop: 12,
                          color: "var(--red)",
                          fontSize: 11,
                          letterSpacing: 1,
                        }}
                      >
                        ⚠ {error}
                      </div>
                    )}
                  </div>
                </div>

                {/* RESULT */}
                <div>
                  {loading && (
                    <div className="panel fade-in">
                      <div className="panel-body">
                        <div className="loading-text">
                          PROCESSANDO VIA CLAUDE API
                        </div>
                        <div className="loading-bar">
                          <div className="loading-fill" />
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--text-dim)",
                            textAlign: "center",
                            letterSpacing: 2,
                          }}
                        >
                          Analisando perfil · Calculando temperatura · Gerando
                          mensagem...
                        </div>
                      </div>
                    </div>
                  )}

                  {result && !loading && (
                    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {/* SCORE BAR */}
                      <div className="panel">
                        <div className="panel-header">
                          <span className="panel-title">
                            Score de Conversão
                          </span>
                          <div style={{ display: "flex", gap: 8 }}>
                            {getCategoryTag(result.categoria) && (
                              <span
                                className={`tag ${getCategoryTag(result.categoria).cls}`}
                              >
                                {getCategoryTag(result.categoria).label}
                              </span>
                            )}
                            {getTempTag(result.temperatura) && (
                              <span
                                className={`tag ${getTempTag(result.temperatura).cls}`}
                              >
                                {getTempTag(result.temperatura).label}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="panel-body">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 12,
                              marginBottom: 10,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 48,
                                fontWeight: 300,
                                color: "var(--gold)",
                                lineHeight: 1,
                              }}
                            >
                              {result.score}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                color: "var(--text-dim)",
                                letterSpacing: 2,
                              }}
                            >
                              / 100
                            </span>
                          </div>
                          <div
                            style={{
                              height: 4,
                              background: "var(--border)",
                              borderRadius: 2,
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${result.score}%`,
                                background: `linear-gradient(90deg, var(--gold-dim), var(--gold))`,
                                borderRadius: 2,
                                transition: "width 1s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* DOR + ARGUMENTO */}
                      <div className="panel">
                        <div className="panel-header">
                          <span className="panel-title">Diagnóstico</span>
                        </div>
                        <div className="panel-body">
                          <div className="result-block">
                            <div className="result-label">
                              ◆ Dor Principal
                            </div>
                            <div className="result-text">
                              {result.dor_principal}
                            </div>
                          </div>
                          <div className="result-block">
                            <div className="result-label">
                              ◆ Argumento-Chave
                            </div>
                            <div className="result-text">
                              {result.argumento_chave}
                            </div>
                          </div>
                          <div className="result-block">
                            <div className="result-label">
                              ⚠ Objeção Provável
                            </div>
                            <div className="result-text" style={{ color: "var(--red)" }}>
                              {result.objecao_provavel}
                            </div>
                          </div>
                          <div className="result-block">
                            <div className="result-label">
                              ✓ Como Contornar
                            </div>
                            <div className="result-text" style={{ color: "var(--green)" }}>
                              {result.resposta_objecao}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* MENSAGEM */}
                      <div className="panel">
                        <div className="panel-header">
                          <span className="panel-title">
                            Mensagem Personalizada ·{" "}
                            {form.canal_preferido.toUpperCase()}
                          </span>
                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyText(
                                result[`mensagem_${form.canal_preferido}`],
                                "msg"
                              )
                            }
                          >
                            {copied === "msg" ? "✓ COPIADO" : "COPIAR"}
                          </button>
                        </div>
                        <div className="panel-body">
                          <div className="msg-preview">
                            {result[`mensagem_${form.canal_preferido}`]}
                          </div>
                        </div>
                      </div>

                      {/* PRÓXIMOS PASSOS */}
                      {result.proximos_passos && (
                        <div className="panel">
                          <div className="panel-header">
                            <span className="panel-title">
                              Próximos Passos
                            </span>
                          </div>
                          <div className="panel-body">
                            {result.proximos_passos.map((p, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  gap: 12,
                                  padding: "10px 0",
                                  borderBottom:
                                    i < result.proximos_passos.length - 1
                                      ? "1px solid var(--border)"
                                      : "none",
                                  alignItems: "flex-start",
                                }}
                              >
                                <span
                                  style={{
                                    color: "var(--gold)",
                                    fontSize: 11,
                                    minWidth: 20,
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 16,
                                  }}
                                >
                                  {i + 1}.
                                </span>
                                <span
                                  style={{
                                    fontSize: 13,
                                    color: "var(--text)",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {p}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!result && !loading && (
                    <div
                      className="panel"
                      style={{ height: "100%", minHeight: 300 }}
                    >
                      <div
                        className="panel-body"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 280,
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 48,
                            color: "var(--border)",
                            fontWeight: 300,
                          }}
                        >
                          ◈
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: 4,
                            textTransform: "uppercase",
                            color: "var(--text-dim)",
                            textAlign: "center",
                          }}
                        >
                          Preencha os dados e execute
                          <br />a análise para ver os resultados
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: PIPELINE ── */}
          {tab === "pipeline" && (
            <div className="fade-in">
              <div className="section-title">Pipeline de Prospecção</div>
              <div className="section-sub">Funil Ativo · Lótus Business 2025-2028</div>

              <div className="grid-3" style={{ marginBottom: 24 }}>
                {[
                  { v: "0", l: "Prospects Mapeados" },
                  { v: "0", l: "Em Qualificação" },
                  { v: "R$0", l: "Pipeline Potencial" },
                ].map((m) => (
                  <div className="metric" key={m.l}>
                    <div className="metric-value">{m.v}</div>
                    <div className="metric-label">{m.l}</div>
                  </div>
                ))}
              </div>

              <div className="grid-2" style={{ gap: 20 }}>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: 3,
                      color: "var(--text-dim)",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Estágios do Funil
                  </div>
                  <div className="pipeline">
                    {[
                      { n: "01", name: "Identificação", desc: "LinkedIn · CRM SC · OAB · CNPJ", count: "—" },
                      { n: "02", name: "Enriquecimento", desc: "Claude API gera perfil + score", count: "—" },
                      { n: "03", name: "Abordagem", desc: "Mensagem personalizada por canal", count: "—" },
                      { n: "04", name: "Qualificação", desc: "Chatwoot · N8N · Agente 24/7", count: "—" },
                      { n: "05", name: "Visita Presencial", desc: "Tour no Lótus · Você fecha", count: "—" },
                      { n: "06", name: "Proposta", desc: "Documentação · Condições", count: "—" },
                      { n: "07", name: "Contrato Assinado", desc: "Venda confirmada R$1M+", count: "—" },
                    ].map((s, i, arr) => (
                      <div key={s.n}>
                        <div className="stage">
                          <div className="stage-num">{s.n}</div>
                          <div className="stage-info">
                            <div className="stage-name">{s.name}</div>
                            <div className="stage-desc">{s.desc}</div>
                          </div>
                          <div className="stage-count">{s.count}</div>
                        </div>
                        {i < arr.length - 1 && <div className="connector" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">Fontes de Prospecção</span>
                    </div>
                    <div className="panel-body">
                      {[
                        { src: "LinkedIn Itapema", type: "Empresários / Executivos", status: "ATIVO" },
                        { src: "CRM Santa Catarina", type: "Médicos / Cirurgiões", status: "ATIVO" },
                        { src: "OAB SC", type: "Advogados / Sócios", status: "ATIVO" },
                        { src: "CNPJ Receita Federal", type: "Empresas sediadas em Itapema", status: "ATIVO" },
                        { src: "Instagram Geolocalização", type: "Meia Praia / Condomínios Premium", status: "ATIVO" },
                        { src: "Indicações / Rede", type: "Compradores residenciais", status: "ATIVO" },
                      ].map((f) => (
                        <div
                          key={f.src}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 0",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <div>
                            <div style={{ fontSize: 12, color: "var(--text)", marginBottom: 2 }}>
                              {f.src}
                            </div>
                            <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1 }}>
                              {f.type}
                            </div>
                          </div>
                          <span className="tag tag-green" style={{ fontSize: 8 }}>
                            {f.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">Meta · Entrega 2028</span>
                    </div>
                    <div className="panel-body">
                      <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7 }}>
                        Com pipeline de{" "}
                        <span style={{ color: "var(--gold)" }}>200 prospects qualificados</span>{" "}
                        e taxa de conversão conservadora de{" "}
                        <span style={{ color: "var(--gold)" }}>3-5%</span>, a projeção é
                        de{" "}
                        <span style={{ color: "var(--gold)" }}>6 a 10 vendas</span> antes
                        da entrega — equivalente a{" "}
                        <span style={{ color: "var(--gold)" }}>R$6M a R$10M em VGV</span>
                        {" "}através do canal direto, sem comissão de corretor.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: ARQUITETURA ── */}
          {tab === "arquitetura" && (
            <div className="fade-in">
              <div className="section-title">Arquitetura do Sistema</div>
              <div className="section-sub">
                Seu Stack Atual + Claude API · Integração Recomendada
              </div>

              <div className="grid-2" style={{ gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: 3,
                      color: "var(--text-dim)",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    Fluxo de Prospecção
                  </div>

                  {/* LAYER 1 */}
                  <div className="arch-row">
                    <div className="arch-node">
                      <div className="arch-node-title">Fontes de Dados</div>
                      <div className="arch-node-desc">LinkedIn · CRM SC · OAB · CNPJ · Instagram</div>
                    </div>
                  </div>
                  <div className="arch-arrow">↓</div>

                  {/* LAYER 2 */}
                  <div className="arch-row">
                    <div className="arch-node highlight">
                      <div className="arch-node-title">N8N · Orquestrador</div>
                      <div className="arch-node-desc">Coleta, normaliza e aciona pipeline automático. Você já tem esse ativo.</div>
                    </div>
                  </div>
                  <div className="arch-arrow">↓</div>

                  {/* LAYER 3 */}
                  <div className="arch-row">
                    <div className="arch-node highlight" style={{ borderColor: "var(--gold)" }}>
                      <div className="arch-node-title">Claude API · Cérebro</div>
                      <div className="arch-node-desc">Enriquece perfil · Classifica temperatura · Gera mensagem personalizada por canal · Qualifica conversas 24/7</div>
                    </div>
                  </div>
                  <div className="arch-arrow">↓</div>

                  {/* LAYER 4 */}
                  <div className="arch-row">
                    <div className="arch-node highlight">
                      <div className="arch-node-title">Chatwoot · Central</div>
                      <div className="arch-node-desc">Gerencia todas as conversas (WhatsApp, Telegram, Instagram, Email) em uma interface. Você já tem esse ativo.</div>
                    </div>
                  </div>
                  <div className="arch-arrow">↓</div>

                  {/* LAYER 5 */}
                  <div className="arch-row">
                    <div className="arch-node highlight">
                      <div className="arch-node-title">Telegram Bot · Você</div>
                      <div className="arch-node-desc">Notificações em tempo real: lead quente detectado · visita agendada · objeção crítica. Você já tem esse ativo.</div>
                    </div>
                  </div>
                  <div className="arch-arrow">↓</div>

                  {/* LAYER 6 */}
                  <div className="arch-row">
                    <div className="arch-node" style={{ borderColor: "var(--gold-dim)" }}>
                      <div className="arch-node-title">Você · Fechamento</div>
                      <div className="arch-node-desc">Visita presencial com briefing completo. Prospect já chegou aquecido e qualificado.</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">Stack · O Que Você Já Tem</span>
                    </div>
                    <div className="panel-body">
                      {[
                        { tool: "VPS", role: "Infraestrutura", status: "✓ VOCÊ TEM", note: "Hospeda tudo localmente" },
                        { tool: "N8N", role: "Orquestrador de fluxos", status: "✓ VOCÊ TEM", note: "Conecta todas as camadas" },
                        { tool: "Chatwoot", role: "Central omnichannel", status: "✓ VOCÊ TEM", note: "Inbox unificado" },
                        { tool: "Bot Telegram", role: "Notificações em tempo real", status: "✓ VOCÊ TEM", note: "Alertas para você" },
                        { tool: "Claude API", role: "Inteligência central", status: "◆ INTEGRAR", note: "O diferencial de tudo" },
                      ].map((t) => (
                        <div
                          key={t.tool}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "12px 0",
                            borderBottom: "1px solid var(--border)",
                            gap: 12,
                          }}
                        >
                          <div>
                            <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 3 }}>
                              {t.tool}
                            </div>
                            <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1 }}>
                              {t.role}
                            </div>
                            <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>
                              {t.note}
                            </div>
                          </div>
                          <span
                            className={`tag ${t.status.includes("✓") ? "tag-green" : "tag-gold"}`}
                            style={{ fontSize: 8, whiteSpace: "nowrap", alignSelf: "flex-start" }}
                          >
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-header">
                      <span className="panel-title">Próxima Integração Crítica</span>
                    </div>
                    <div className="panel-body">
                      <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 14 }}>
                        Seu N8N já orquestra fluxos. Adicionar Claude API é uma chamada HTTP simples — você já sabe fazer isso.
                      </div>
                      <div
                        style={{
                          background: "var(--surface3)",
                          border: "1px solid var(--border)",
                          padding: 14,
                          borderRadius: 2,
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: 11,
                          color: "var(--green)",
                          lineHeight: 1.7,
                        }}
                      >
                        <div style={{ color: "var(--text-dim)" }}>// N8N → Nó de Requisição HTTP</div>
                        <div>POST api.anthropic.com/v1/messages</div>
                        <div style={{ color: "var(--text-dim)" }}>// Cabeçalhos:</div>
                        <div>x-api-key: {"{{$env.ANTHROPIC_KEY}}"}</div>
                        <div style={{ color: "var(--text-dim)" }}>// Corpo: dados do prospect → perfil + mensagem</div>
                      </div>
                      <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-dim)", lineHeight: 1.7 }}>
                        Resultado: N8N chama Claude, Claude devolve JSON estruturado com perfil + mensagem, N8N envia para Chatwoot e notifica seu Telegram. Sistema completo.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
