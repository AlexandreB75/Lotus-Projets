import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "5547988695350"; // WhatsApp comercial conectado ao Chatwoot/n8n

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #080806; color: #F4EFE6; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

  .lotus-page { min-height: 100vh; background: radial-gradient(circle at top left, rgba(201,169,110,.16), transparent 32%), #080806; }
  .container { width: min(1120px, calc(100% - 40px)); margin: 0 auto; }
  .nav { position: sticky; top: 0; z-index: 10; backdrop-filter: blur(18px); background: rgba(8,8,6,.82); border-bottom: 1px solid rgba(201,169,110,.16); }
  .nav-inner { height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .brand { font-family: 'Cormorant Garamond', serif; letter-spacing: 3px; font-size: 25px; font-weight: 700; color: #D4B978; }
  .nav-links { display: flex; align-items: center; gap: 22px; font-size: 13px; color: #B8AA92; }
  .nav-links a { color: inherit; text-decoration: none; }
  .nav-links a:hover { color: #F4EFE6; }

  .btn { border: 0; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 22px; border-radius: 999px; font-weight: 700; font-size: 14px; transition: transform .2s ease, border-color .2s ease, background .2s ease; }
  .btn:hover { transform: translateY(-1px); }
  .btn-primary { color: #17120A; background: linear-gradient(135deg, #E2C77E, #B99044); box-shadow: 0 18px 48px rgba(201,169,110,.22); }
  .btn-secondary { color: #F4EFE6; border: 1px solid rgba(244,239,230,.18); background: rgba(255,255,255,.04); }

  .hero { padding: 92px 0 72px; }
  .hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 54px; align-items: center; }
  .eyebrow { color: #D4B978; font-size: 12px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 18px; }
  h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(44px, 6vw, 78px); line-height: .95; letter-spacing: -.03em; color: #FFF8EA; margin-bottom: 24px; }
  .hero p { color: #C6BBA8; font-size: 18px; line-height: 1.7; max-width: 660px; }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin: 34px 0 28px; }
  .trust-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 34px; }
  .trust-card { border: 1px solid rgba(201,169,110,.16); background: rgba(255,255,255,.035); padding: 18px; border-radius: 18px; }
  .trust-card strong { display: block; color: #F4EFE6; font-size: 14px; margin-bottom: 6px; }
  .trust-card span { color: #9F927E; font-size: 12px; line-height: 1.5; }

  .hero-panel { border: 1px solid rgba(201,169,110,.22); background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)); border-radius: 30px; padding: 30px; position: relative; overflow: hidden; }
  .hero-panel:before { content: ''; position: absolute; inset: -80px -80px auto auto; width: 220px; height: 220px; background: rgba(201,169,110,.12); filter: blur(30px); border-radius: 50%; }
  .panel-label { color: #D4B978; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 18px; position: relative; }
  .profile-list { display: grid; gap: 12px; position: relative; }
  .profile-item { padding: 17px; border-radius: 18px; border: 1px solid rgba(244,239,230,.09); background: rgba(0,0,0,.18); }
  .profile-item strong { display: block; font-size: 15px; color: #FFF8EA; margin-bottom: 5px; }
  .profile-item span { color: #AFA28E; font-size: 13px; line-height: 1.5; }

  section { padding: 70px 0; }
  .section-head { max-width: 760px; margin-bottom: 34px; }
  .section-head h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(34px, 4vw, 52px); line-height: 1.05; color: #FFF8EA; margin-bottom: 15px; }
  .section-head p { color: #B8AA92; line-height: 1.75; font-size: 16px; }

  .cards-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .card { border: 1px solid rgba(201,169,110,.14); background: rgba(255,255,255,.035); border-radius: 24px; padding: 24px; }
  .card .num { color: #D4B978; font-size: 12px; letter-spacing: 2px; margin-bottom: 18px; }
  .card h3 { font-size: 18px; color: #FFF8EA; margin-bottom: 10px; }
  .card p { color: #AA9D89; line-height: 1.65; font-size: 14px; }

  .value-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 26px; align-items: start; }
  .quote-box { border-left: 3px solid #D4B978; padding: 6px 0 6px 24px; color: #E7DAC2; font-family: 'Cormorant Garamond', serif; font-size: 30px; line-height: 1.15; }
  .bullets { display: grid; gap: 12px; }
  .bullet { display: grid; grid-template-columns: 30px 1fr; gap: 12px; padding: 16px; border-radius: 16px; background: rgba(255,255,255,.035); border: 1px solid rgba(244,239,230,.08); }
  .bullet-icon { color: #D4B978; font-weight: 800; }
  .bullet strong { display: block; color: #FFF8EA; margin-bottom: 4px; }
  .bullet span { color: #AFA28E; font-size: 14px; line-height: 1.55; }

  .form-wrap { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; align-items: start; }
  .form-card { border: 1px solid rgba(201,169,110,.2); border-radius: 28px; padding: 26px; background: rgba(255,255,255,.045); }
  .field { display: grid; gap: 8px; margin-bottom: 14px; }
  label { color: #D4B978; font-size: 12px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; }
  input, select, textarea { width: 100%; min-height: 48px; border-radius: 14px; border: 1px solid rgba(244,239,230,.12); background: rgba(0,0,0,.25); color: #F4EFE6; padding: 0 14px; font: inherit; outline: none; }
  textarea { min-height: 92px; padding-top: 13px; resize: vertical; }
  input:focus, select:focus, textarea:focus { border-color: rgba(212,185,120,.55); }
  option { background: #14120F; }
  .form-note { color: #8F8371; font-size: 12px; line-height: 1.6; margin-top: 12px; }
  .status { color: #D4B978; font-size: 13px; margin-top: 12px; line-height: 1.6; }

  .faq { display: grid; gap: 12px; }
  .faq-item { border: 1px solid rgba(244,239,230,.09); background: rgba(255,255,255,.03); border-radius: 18px; padding: 20px; }
  .faq-item strong { display: block; color: #FFF8EA; margin-bottom: 8px; }
  .faq-item p { color: #AFA28E; line-height: 1.65; font-size: 14px; }

  .final-cta { border: 1px solid rgba(201,169,110,.2); background: linear-gradient(135deg, rgba(201,169,110,.13), rgba(255,255,255,.03)); border-radius: 32px; padding: 42px; display: flex; justify-content: space-between; gap: 28px; align-items: center; }
  .final-cta h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4vw, 52px); line-height: 1.02; color: #FFF8EA; }
  .final-cta p { color: #B8AA92; margin-top: 12px; line-height: 1.65; max-width: 680px; }
  .footer { padding: 36px 0; border-top: 1px solid rgba(201,169,110,.12); color: #8F8371; font-size: 12px; line-height: 1.7; }

  @media (max-width: 900px) {
    .nav-links { display: none; }
    .hero-grid, .value-grid, .form-wrap { grid-template-columns: 1fr; }
    .cards-4 { grid-template-columns: repeat(2, 1fr); }
    .trust-row { grid-template-columns: 1fr; }
    .final-cta { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 560px) {
    .container { width: min(100% - 28px, 1120px); }
    .hero { padding-top: 56px; }
    .cards-4 { grid-template-columns: 1fr; }
    .hero-actions { flex-direction: column; }
    .btn { width: 100%; }
  }
`;

const profiles = [
  {
    title: "Médicos e saúde",
    text: "Para quem quer presença profissional, consultório próprio ou estrutura para atendimento em Itapema.",
  },
  {
    title: "Advogados",
    text: "Para escritórios que precisam comunicar autoridade, confiança e presença antes da primeira reunião.",
  },
  {
    title: "Empresários",
    text: "Para empresas que enxergam uma base comercial como operação, imagem ou patrimônio empresarial.",
  },
  {
    title: "Investidores",
    text: "Para quem analisa imóvel comercial com critério: localização, demanda, uso e renda potencial.",
  },
];

const values = [
  ["Endereço", "Um ponto profissional em uma cidade que cresce além do turismo."],
  ["Imagem", "A estrutura onde você atende também comunica o nível do seu trabalho."],
  ["Patrimônio", "Uma sala comercial pode fazer parte de uma estratégia patrimonial de longo prazo."],
  ["Uso", "Pode servir para atendimento próprio, expansão, consultório, escritório ou locação futura."],
  ["Critério", "A decisão precisa considerar perfil, objetivo, momento e tese comercial."],
];

const faqs = [
  [
    "O Lótus Business é indicado só para investidores?",
    "Não. Ele pode fazer sentido para investidores, profissionais liberais, empresas, clínicas e escritórios que desejam presença comercial em Itapema.",
  ],
  [
    "Comprar uma sala é melhor do que alugar?",
    "Depende do uso, do momento profissional e da estratégia patrimonial. A análise correta compara custo, imagem, permanência, objetivo e potencial de valorização, sem promessa garantida.",
  ],
  [
    "Existe garantia de renda ou valorização?",
    "Não trabalhamos com promessa de renda, ocupação ou valorização garantida. A análise é feita com base em cenário, localização, perfil de uso e potencial de demanda.",
  ],
  [
    "Como saber se faz sentido para minha profissão?",
    "O primeiro passo é entender se você busca atendimento próprio, expansão, endereço de autoridade, patrimônio ou investimento. A partir disso, a recomendação fica mais precisa.",
  ],
];

export default function LotusLandingPublic() {
  const [form, setForm] = useState({
    nome: "",
    perfil: "Médico / saúde",
    objetivo: "Uso próprio / consultório / escritório",
    momento: "Quero entender melhor",
    contato: "",
    observacao: "",
  });
  const [status, setStatus] = useState("");

  const message = useMemo(() => {
    return [
      "Olá, quero entender se o Lótus Business faz sentido para meu perfil.",
      `Nome: ${form.nome || "não informado"}`,
      `Perfil: ${form.perfil}`,
      `Objetivo: ${form.objetivo}`,
      `Momento: ${form.momento}`,
      `Contato: ${form.contato || "não informado"}`,
      form.observacao ? `Observação: ${form.observacao}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }, [form]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome.trim()) {
      setStatus("Preencha seu nome para gerar a mensagem de atendimento.");
      return;
    }

    if (WHATSAPP_NUMBER) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      setStatus("Mensagem copiada. Configure o número de WhatsApp para envio automático.");
    } catch {
      setStatus("Mensagem pronta. Configure o número de WhatsApp no arquivo para envio automático.");
    }
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="lotus-page">
        <header className="nav">
          <div className="container nav-inner">
            <div className="brand">LÓTUS BUSINESS</div>
            <div className="nav-links">
              <a href="#perfis">Para quem</a>
              <a href="#valor">Valor</a>
              <a href="#diagnostico">Diagnóstico</a>
              <a href="#faq">FAQ</a>
            </div>
            <a className="btn btn-secondary" href="#diagnostico">Analisar perfil</a>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <div className="eyebrow">Torre comercial em Itapema/SC</div>
                <h1>Seu endereço profissional em uma Itapema que cresce além da praia.</h1>
                <p>
                  O Lótus Business é uma torre comercial de alto padrão para profissionais,
                  empresas e investidores que buscam presença, estrutura e patrimônio em uma
                  cidade em crescimento.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#diagnostico">Quero entender se faz sentido</a>
                  <a className="btn btn-secondary" href="#perfis">Ver perfis atendidos</a>
                </div>
                <div className="trust-row">
                  <div className="trust-card"><strong>Uso próprio</strong><span>Consultório, escritório ou base profissional.</span></div>
                  <div className="trust-card"><strong>Patrimônio</strong><span>Estratégia empresarial e patrimonial de longo prazo.</span></div>
                  <div className="trust-card"><strong>Renda potencial</strong><span>Análise de cenário para locação futura, sem promessa garantida.</span></div>
                </div>
              </div>

              <aside className="hero-panel">
                <div className="panel-label">Análise por perfil</div>
                <div className="profile-list">
                  {profiles.map((p) => (
                    <div className="profile-item" key={p.title}>
                      <strong>{p.title}</strong>
                      <span>{p.text}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section id="perfis">
            <div className="container">
              <div className="section-head">
                <h2>Para quem o Lótus pode fazer sentido?</h2>
                <p>
                  A análise correta começa pelo objetivo. Uma sala comercial pode ter papéis diferentes para cada perfil: atendimento, expansão, imagem, patrimônio ou investimento.
                </p>
              </div>
              <div className="cards-4">
                {profiles.map((p, i) => (
                  <article className="card" key={p.title}>
                    <div className="num">0{i + 1}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="valor">
            <div className="container value-grid">
              <div>
                <div className="eyebrow">Além da metragem</div>
                <div className="quote-box">
                  Você não analisa apenas uma sala. Analisa o papel que esse endereço pode ter na sua estratégia.
                </div>
              </div>
              <div className="bullets">
                {values.map(([title, text]) => (
                  <div className="bullet" key={title}>
                    <div className="bullet-icon">◆</div>
                    <div><strong>{title}</strong><span>{text}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="diagnostico">
            <div className="container form-wrap">
              <div className="section-head">
                <h2>Receba uma análise inicial para o seu perfil.</h2>
                <p>
                  Responda algumas perguntas rápidas para iniciar uma conversa mais objetiva. A ideia não é empurrar uma sala: é entender se o Lótus combina com seu momento e objetivo.
                </p>
              </div>
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="field">
                  <label>Nome</label>
                  <input name="nome" value={form.nome} onChange={update} placeholder="Seu nome" />
                </div>
                <div className="field">
                  <label>Perfil</label>
                  <select name="perfil" value={form.perfil} onChange={update}>
                    <option>Médico / saúde</option>
                    <option>Advogado</option>
                    <option>Empresário</option>
                    <option>Investidor</option>
                    <option>Profissional liberal</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="field">
                  <label>Objetivo principal</label>
                  <select name="objetivo" value={form.objetivo} onChange={update}>
                    <option>Uso próprio / consultório / escritório</option>
                    <option>Expansão ou presença em Itapema</option>
                    <option>Patrimônio empresarial</option>
                    <option>Investimento para renda potencial</option>
                    <option>Ainda estou avaliando</option>
                  </select>
                </div>
                <div className="field">
                  <label>Momento</label>
                  <select name="momento" value={form.momento} onChange={update}>
                    <option>Quero entender melhor</option>
                    <option>Estou comparando opções</option>
                    <option>Tenho interesse para os próximos meses</option>
                    <option>Quero falar com um especialista</option>
                  </select>
                </div>
                <div className="field">
                  <label>WhatsApp ou e-mail</label>
                  <input name="contato" value={form.contato} onChange={update} placeholder="Como prefere ser contatado?" />
                </div>
                <div className="field">
                  <label>Observação opcional</label>
                  <textarea name="observacao" value={form.observacao} onChange={update} placeholder="Ex: sou médico, penso em consultório próprio; ou quero avaliar como investimento." />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>Quero minha análise inicial</button>
                <div className="form-note">
                  Não há promessa de renda, ocupação, liquidez ou valorização garantida. A análise considera cenário, perfil e objetivo.
                </div>
                {status && <div className="status">{status}</div>}
              </form>
            </div>
          </section>

          <section id="faq">
            <div className="container">
              <div className="section-head">
                <h2>Perguntas frequentes</h2>
                <p>Respostas diretas para quem está avaliando sala comercial com critério.</p>
              </div>
              <div className="faq">
                {faqs.map(([q, a]) => (
                  <div className="faq-item" key={q}>
                    <strong>{q}</strong>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="container final-cta">
              <div>
                <h2>Quer avaliar se o Lótus faz sentido para seu momento?</h2>
                <p>Comece por uma análise simples: perfil, objetivo, uso e potencial estratégico.</p>
              </div>
              <a className="btn btn-primary" href="#diagnostico">Analisar meu perfil</a>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container">
            Lótus Business · Itapema/SC. Material de apresentação comercial. Informações sujeitas a validação documental e disponibilidade. Não constitui promessa de rentabilidade, locação ou valorização garantida.
          </div>
        </footer>
      </div>
    </>
  );
}
