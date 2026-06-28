"use client";

import { motion } from "motion/react";

const categories = [
  { icon: "👶", label: "Roupinhas", desc: "Do RN ao 3 anos" },
  { icon: "🛏️", label: "Berços & Móveis", desc: "Conforto para dormir" },
  { icon: "🧸", label: "Brinquedos", desc: "Diversão segura" },
  { icon: "🎒", label: "Acessórios", desc: "Para passeios" },
];

const testimonials = [
  { name: "Ana Paula", text: "Qualidade incrível! Minha filha usa as roupinhas da Piccolo Bambino desde recém-nascida.", stars: 5 },
  { name: "Mariana Silva", text: "Atendimento maravilhoso e entrega super rápida. Recomendo muito!", stars: 5 },
  { name: "Fernanda Costa", text: "Os produtos são lindos e duráveis. Já comprei mais de 10 vezes!", stars: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: "rgba(253,242,248,0.85)", borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}>
            Piccolo Bambino
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
            <a href="#produtos" className="hover:opacity-70 transition-opacity cursor-pointer">Produtos</a>
            <a href="#sobre" className="hover:opacity-70 transition-opacity cursor-pointer">Sobre</a>
            <a href="#depoimentos" className="hover:opacity-70 transition-opacity cursor-pointer">Depoimentos</a>
          </div>
          <a
            href="https://wa.me/5547988695350"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: "#25D366" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(236,72,153,0.15) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(236,72,153,0.1)", color: "var(--color-primary)" }}>
              Moda Infantil com Amor
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>
              Tudo para o seu
              <span style={{ color: "var(--color-primary)" }}> bebê</span>
              <br />com carinho
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(15,23,42,0.65)" }}>
              Roupas, acessórios e produtos de qualidade para os primeiros anos da vida do seu pequeno. Encontre tudo que você precisa na Piccolo Bambino.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://piccolobambino.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ background: "var(--color-primary)" }}
            >
              Ver Produtos
            </a>
            <a
              href="https://www.instagram.com/piccolobambino.sc/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold transition-all hover:opacity-80 cursor-pointer border"
              style={{ color: "var(--color-primary)", borderColor: "var(--color-secondary)", background: "white" }}
            >
              Seguir no Instagram
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-12 pt-8"
          >
            {[{ value: "500+", label: "Produtos" }, { value: "2k+", label: "Mamães felizes" }, { value: "5★", label: "Avaliação" }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(15,23,42,0.55)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categorias */}
      <section id="produtos" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>
              Nossas Categorias
            </h2>
            <p className="text-lg" style={{ color: "rgba(15,23,42,0.6)" }}>
              Encontre tudo que o seu bebê precisa
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex flex-col items-center gap-3 p-8 rounded-3xl border cursor-pointer transition-shadow hover:shadow-lg"
                style={{ background: "white", borderColor: "var(--color-border)" }}
              >
                <span className="text-4xl" role="img" aria-label={cat.label}>{cat.icon}</span>
                <div className="text-center">
                  <div className="font-bold text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>{cat.label}</div>
                  <div className="text-sm mt-1" style={{ color: "rgba(15,23,42,0.55)" }}>{cat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center gap-12" style={{ background: "rgba(236,72,153,0.06)", border: "1px solid var(--color-border)" }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>
                Feito com amor<br />para o seu pequeno
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(15,23,42,0.65)" }}>
                A Piccolo Bambino nasceu do amor de mãe. Cada produto é cuidadosamente selecionado pensando no conforto, segurança e bem-estar dos bebês e crianças.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(15,23,42,0.65)" }}>
                Atendemos famílias com carinho e atenção, oferecendo produtos de qualidade a preços justos. Porque cada pequeno momento merece ser especial.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col gap-4"
            >
              {[
                { icon: "💝", title: "Curadoria com carinho", desc: "Cada produto selecionado com atenção e amor" },
                { icon: "🚚", title: "Entrega rápida", desc: "Receba em casa com agilidade e segurança" },
                { icon: "✨", title: "Qualidade garantida", desc: "Materiais seguros e certificados para bebês" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: "white", border: "1px solid var(--color-border)" }}>
                  <span className="text-2xl" role="img" aria-label={item.title}>{item.icon}</span>
                  <div>
                    <div className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>{item.title}</div>
                    <div className="text-sm mt-0.5" style={{ color: "rgba(15,23,42,0.55)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>
              O que as mamães dizem
            </h2>
            <p className="text-lg" style={{ color: "rgba(15,23,42,0.6)" }}>
              Mais de 2.000 famílias satisfeitas
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-3xl border"
                style={{ background: "white", borderColor: "var(--color-border)" }}
              >
                <div className="flex gap-1 mb-4" aria-label={`${t.stars} estrelas`}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(15,23,42,0.7)" }}>&ldquo;{t.text}&rdquo;</p>
                <div className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-12 md:p-16"
            style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(244,114,182,0.08) 100%)", border: "1px solid var(--color-border)" }}
          >
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)" }}>
              Pronta para comprar?
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(15,23,42,0.65)" }}>
              Entre em contato pelo WhatsApp ou visite nossa loja online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5547988695350"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                style={{ background: "#25D366" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Falar no WhatsApp
              </a>
              <a
                href="https://piccolobambino.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold border transition-all hover:opacity-80 cursor-pointer"
                style={{ color: "var(--color-primary)", borderColor: "var(--color-secondary)", background: "white" }}
              >
                Acessar a Loja
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)" }}>
            Piccolo Bambino
          </span>
          <div className="flex gap-6 text-sm" style={{ color: "rgba(15,23,42,0.55)" }}>
            <a href="https://www.instagram.com/piccolobambino.sc/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity cursor-pointer">Instagram</a>
            <a href="https://wa.me/5547988695350" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity cursor-pointer">WhatsApp</a>
            <a href="https://piccolobambino.com.br" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity cursor-pointer">Loja Online</a>
          </div>
          <span className="text-sm" style={{ color: "rgba(15,23,42,0.4)" }}>
            © 2026 Piccolo Bambino. Feito com amor.
          </span>
        </div>
      </footer>
    </div>
  );
}
