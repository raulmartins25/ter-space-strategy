import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight, Target, Lightbulb, Ruler } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/55XXXXXXXXXXX?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ children, className = "", bg = "" }: { children: React.ReactNode; className?: string; bg?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${bg} ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-[hsl(var(--eter-bege-claro)/0.82)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Éter Arquitetura e Design
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-foreground mb-8">
          Seu escritório está posicionando ou afastando clientes?
        </h1>
        <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Projetamos espaços corporativos que aumentam percepção de valor, confiança e fechamento de contratos.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-foreground text-secondary font-body font-medium px-8 py-4 rounded-xl hover:bg-accent hover:text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Falar no WhatsApp
        </a>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
      </div>
    </section>
  );
}

/* ─── PROBLEMA ─── */
function ProblemBlock() {
  const problems = [
    { title: "Falta de autoridade", desc: "Seu espaço não transmite a experiência que você tem." },
    { title: "Ambiente genérico", desc: "Parece qualquer outro escritório — sem identidade, sem memória." },
    { title: "Não transmite valor", desc: "O cliente entra e já começa a negociar seu preço." },
    { title: "Não converte", desc: "O ambiente trabalha contra você, não a seu favor." },
  ];
  return (
    <Section className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4 text-center">O problema</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-16 max-w-3xl mx-auto leading-tight">
          Seu espaço pode estar custando clientes — e você nem percebe.
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="border border-border rounded-xl p-8 hover:border-accent transition-colors duration-300"
            >
              <h3 className="font-display text-xl text-foreground mb-2">{p.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── QUEBRA DE CRENÇA ─── */
function BeliefBreak() {
  return (
    <Section className="py-24 sm:py-32 px-6" bg="bg-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
          Não é sobre decoração.
        </h2>
        <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
          Arquitetura estratégica não é escolher móveis bonitos. É projetar cada detalhe do seu espaço para influenciar como o cliente percebe, sente e decide.
        </p>
        <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
          Iluminação, materiais, proporções, fluxo — tudo comunica. E quando comunica certo, vende.
        </p>
      </div>
    </Section>
  );
}

/* ─── PROMESSA ─── */
function Promise() {
  const benefits = [
    "Aumenta a percepção de valor do seu serviço",
    "Transmite autoridade antes de você dizer uma palavra",
    "Eleva o ticket médio naturalmente",
    "Fortalece sua marca no ambiente físico",
  ];
  return (
    <Section className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-8 leading-tight">
              Seu escritório pode vender antes mesmo de você falar.
            </h2>
            <ul className="space-y-5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-body text-muted-foreground leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
              alt="Escritório corporativo sofisticado com iluminação indireta"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── PARA QUEM É ─── */
function ForWhom() {
  const items = [
    "Atende clientes presencialmente no seu espaço",
    "Quer cobrar mais sem precisar justificar",
    "Deseja transmitir profissionalismo e sofisticação",
    "Sabe que a primeira impressão define o negócio",
  ];
  return (
    <Section className="py-24 sm:py-32 px-6" bg="bg-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-body text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">Para quem é</p>
        <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-12 leading-tight">
          Isso é para você se…
        </h2>
        <div className="space-y-4 text-left max-w-xl mx-auto">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-4 font-body text-foreground">
              <span className="mt-1 text-accent text-lg">✓</span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── PROCESSO ─── */
function Process() {
  const steps = [
    { icon: Target, num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos seu espaço, seu público e seus objetivos de negócio." },
    { icon: Lightbulb, num: "02", title: "Projeto com Intenção", desc: "Cada elemento projetado para comunicar valor e gerar resultado." },
    { icon: Ruler, num: "03", title: "Execução Orientada a Resultado", desc: "Acompanhamento completo para garantir que o espaço entregue o que promete." },
  ];
  return (
    <Section className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4 text-center">Processo</p>
        <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-16 text-center leading-tight">
          Como funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border mb-6">
                <s.icon className="w-6 h-6 text-foreground" />
              </div>
              <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mb-2">{s.num}</p>
              <h3 className="font-display text-xl text-foreground mb-3">{s.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CTA FINAL ─── */
function FinalCTA() {
  return (
    <Section className="py-24 sm:py-32 px-6" bg="bg-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary mb-6 leading-tight">
          Se o seu escritório não impressiona, ele negocia seu preço por você.
        </h2>
        <p className="font-body text-[hsl(var(--eter-bege))] text-base sm:text-lg mb-10 leading-relaxed">
          Solicite sua Análise de Performance Espacial e descubra o que seu ambiente está comunicando.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-foreground font-body font-medium px-8 py-4 rounded-xl hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Quero minha análise no WhatsApp
        </a>
      </div>
    </Section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <p className="font-body text-xs text-muted-foreground text-center tracking-wide">
        © {new Date().getFullYear()} Éter Arquitetura e Design. Todos os direitos reservados.
      </p>
    </footer>
  );
}

/* ─── FLOATING WHATSAPP ─── */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-secondary shadow-xl hover:bg-accent hover:text-foreground transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

/* ─── PAGE ─── */
export default function LandingPage() {
  return (
    <div className="font-body bg-background text-foreground overflow-x-hidden">
      <Hero />
      <ProblemBlock />
      <BeliefBreak />
      <Promise />
      <ForWhom />
      <Process />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
