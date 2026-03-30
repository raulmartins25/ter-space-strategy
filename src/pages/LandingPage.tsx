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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({
  children,
  className = "",
  bg = "",
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  stagger?: boolean;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className={`${bg} ${className}`}
      style={{ willChange: "opacity, transform" }}
    >
      <div
        className={`transition-all ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${stagger ? "" : "duration-[800ms]"}`}
        style={stagger ? { transitionDuration: "800ms" } : undefined}
      >
        {children}
      </div>
    </section>
  );
}

/* Stagger children wrapper */
function StaggerChildren({
  children,
  visible,
  baseDelay = 0,
  increment = 120,
}: {
  children: React.ReactNode[];
  visible: boolean;
  baseDelay?: number;
  increment?: number;
}) {
  return (
    <>
      {children.map((child, i) => (
        <div
          key={i}
          className={`transition-all duration-[700ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionDelay: visible ? `${baseDelay + i * increment}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[hsl(var(--eter-bege-claro)/0.84)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="hero-enter hero-enter-1 font-body text-xs tracking-[0.35em] uppercase text-muted-foreground mb-8">
          Éter Arquitetura e Design
        </p>
        <h1 className="hero-enter hero-enter-2 font-display tracking-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] text-foreground mb-8">
          Seu escritório está posicionando ou afastando clientes?
        </h1>
        <p className="hero-enter hero-enter-3 font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-[1.7]">
          Projetamos espaços corporativos que aumentam percepção de valor,
          confiança e fechamento de contratos.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-enter hero-enter-4 inline-flex items-center gap-3 bg-foreground text-secondary font-body font-medium px-10 py-4 rounded-full hover:bg-accent hover:text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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
  const { ref, visible } = useScrollReveal();
  const problems = [
    { title: "Falta de autoridade", desc: "Seu espaço não transmite a experiência que você tem." },
    { title: "Ambiente genérico", desc: "Parece qualquer outro escritório — sem identidade, sem memória." },
    { title: "Não transmite valor", desc: "O cliente entra e já começa a negociar seu preço." },
    { title: "Não converte", desc: "O ambiente trabalha contra você, não a seu favor." },
  ];
  return (
    <section ref={ref} className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-[800ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
            O problema
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-16 max-w-3xl mx-auto leading-tight">
            Seu espaço pode estar custando clientes — e você nem percebe.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <StaggerChildren visible={visible} baseDelay={200} increment={120}>
            {problems.map((p) => (
              <div
                key={p.title}
                className="border border-border rounded-xl p-10 hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <h3 className="font-display tracking-display text-xl text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-muted-foreground leading-[1.7] text-sm">
                  {p.desc}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ─── QUEBRA DE CRENÇA ─── */
function BeliefBreak() {
  return (
    <RevealSection className="py-24 sm:py-32 px-6" bg="bg-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
          Não é sobre decoração.
        </h2>
        <p className="font-body text-muted-foreground text-base sm:text-lg leading-[1.7] mb-6">
          Arquitetura estratégica não é escolher móveis bonitos. É projetar cada
          detalhe do seu espaço para influenciar como o cliente percebe, sente e
          decide.
        </p>
        <p className="font-body text-muted-foreground text-base sm:text-lg leading-[1.7]">
          Iluminação, materiais, proporções, fluxo — tudo comunica. E quando
          comunica certo, vende.
        </p>
      </div>
    </RevealSection>
  );
}

/* ─── PROMESSA ─── */
function PromiseSection() {
  const { ref, visible } = useScrollReveal();
  const benefits = [
    "Aumenta a percepção de valor do seu serviço",
    "Transmite autoridade antes de você dizer uma palavra",
    "Eleva o ticket médio naturalmente",
    "Fortalece sua marca no ambiente físico",
  ];
  return (
    <section ref={ref} className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-[800ms] ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground mb-10 leading-tight">
              Seu escritório pode vender antes mesmo de você falar.
            </h2>
            <ul className="space-y-5">
              {benefits.map((b, i) => (
                <li
                  key={b}
                  className={`flex items-start gap-3 transition-all duration-[600ms] ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: visible ? `${300 + i * 100}ms` : "0ms" }}
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-body text-muted-foreground leading-[1.7]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`img-hover-wrap rounded-xl transition-all duration-[900ms] ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
              alt="Escritório corporativo sofisticado com iluminação indireta"
              className="w-full h-[420px] object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PARA QUEM É ─── */
function ForWhom() {
  const { ref, visible } = useScrollReveal();
  const items = [
    "Atende clientes presencialmente no seu espaço",
    "Quer cobrar mais sem precisar justificar",
    "Deseja transmitir profissionalismo e sofisticação",
    "Sabe que a primeira impressão define o negócio",
  ];
  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className={`transition-all duration-[800ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Para quem é
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground mb-12 leading-tight">
            Isso é para você se…
          </h2>
        </div>
        <div className="space-y-5 text-left max-w-xl mx-auto">
          <StaggerChildren visible={visible} baseDelay={200} increment={100}>
            {items.map((item) => (
              <div key={item} className="flex items-start gap-4 font-body text-foreground">
                <span className="mt-0.5 text-accent text-lg">✓</span>
                <span className="leading-[1.7]">{item}</span>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESSO ─── */
function Process() {
  const { ref, visible } = useScrollReveal();
  const steps = [
    { icon: Target, num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos seu espaço, seu público e seus objetivos de negócio." },
    { icon: Lightbulb, num: "02", title: "Projeto com Intenção", desc: "Cada elemento projetado para comunicar valor e gerar resultado." },
    { icon: Ruler, num: "03", title: "Execução Orientada a Resultado", desc: "Acompanhamento completo para garantir que o espaço entregue o que promete." },
  ];
  return (
    <section ref={ref} className="py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-[800ms] ease-out text-center mb-16 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Processo
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-tight">
            Como funciona
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <StaggerChildren visible={visible} baseDelay={200} increment={150}>
            {steps.map((s) => (
              <div
                key={s.num}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border mb-6 group-hover:border-accent transition-colors duration-300">
                  <s.icon className="w-6 h-6 text-foreground" />
                </div>
                <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mb-2">
                  {s.num}
                </p>
                <h3 className="font-display tracking-display text-xl text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-[1.7]">
                  {s.desc}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJETOS ─── */
function Projects() {
  const { ref, visible } = useScrollReveal();
  const projects = [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      title: "Escritório Jurídico",
      subtitle: "São Paulo, SP",
    },
    {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      title: "Clínica Premium",
      subtitle: "Curitiba, PR",
    },
    {
      src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80",
      title: "Consultoria Financeira",
      subtitle: "Rio de Janeiro, RJ",
    },
    {
      src: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=800&q=80",
      title: "Sede Corporativa",
      subtitle: "Belo Horizonte, MG",
    },
  ];
  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-[800ms] ease-out text-center mb-16 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Portfólio
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-tight">
            Projetos que comunicam valor
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <StaggerChildren visible={visible} baseDelay={200} increment={150}>
            {projects.map((p) => (
              <div key={p.title} className="group">
                <div className="img-hover-wrap rounded-xl">
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-[300px] sm:h-[340px] object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 mb-2">
                  <h3 className="font-display tracking-display text-lg text-foreground">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{p.subtitle}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA FINAL ─── */
function FinalCTA() {
  return (
    <RevealSection className="py-28 sm:py-36 px-6" bg="bg-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-secondary mb-6 leading-tight">
          Se o seu escritório não impressiona, ele negocia seu preço por você.
        </h2>
        <p className="font-body text-[hsl(var(--eter-bege))] text-base sm:text-lg mb-12 leading-[1.7]">
          Solicite sua Análise de Performance Espacial e descubra o que seu
          ambiente está comunicando.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-foreground font-body font-medium px-10 py-4 rounded-full hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Quero minha análise no WhatsApp
        </a>
      </div>
    </RevealSection>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-secondary shadow-xl animate-gentle-pulse hover:bg-accent hover:text-foreground transition-colors duration-300"
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
      <PromiseSection />
      <ForWhom />
      <Process />
      <Projects />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
