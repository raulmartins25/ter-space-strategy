import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight, Target, Lightbulb, Ruler } from "lucide-react";
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction";
import { HeroSection } from "@/components/ui/hero-section-2";
import logoEter from "@/assets/logo-eter.png";
import clinica1 from "@/assets/clinica-1.jpg";
import clinica2 from "@/assets/clinica-2.jpg";
import clinica3 from "@/assets/clinica-3.jpg";
import clinica4 from "@/assets/clinica-4.jpg";
import loja1 from "@/assets/loja-1.jpg";
import loja2 from "@/assets/loja-2.jpg";
import loja3 from "@/assets/loja-3.jpg";
import loja4 from "@/assets/loja-4.jpg";

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
      { threshold: 0.1 }
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
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className={`${bg} ${className}`}>
      <div
        className={`transition-all ease-out duration-[900ms] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

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

/* ─── HERO — Split Layout ─── */
function Hero() {
  return (
    <HeroSection
      className="bg-[#b29b7b] text-[#f0e5db] [&_h1]:text-[#f0e5db] [&_p]:text-[#f0e5db]/70 [&_span]:text-[#f0e5db]/60"
      logo={{
        url: logoEter,
        alt: "Éter Arquitetura e Design",
      }}
      slogan=""
      title={
        <>
          Seu escritório está
          <br />
          <em className="font-detail">posicionando</em> ou
          <br />
          afastando clientes?
        </>
      }
      subtitle="Projetamos espaços corporativos que aumentam percepção de valor, confiança e fechamento de contratos."
      callToAction={{
        text: "Falar no WhatsApp",
        href: WHATSAPP_URL,
        icon: <MessageCircle className="w-5 h-5" />,
      }}
      backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      contactInfo={{
        website: "",
        phone: "",
        address: "",
      }}
    />
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
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-[900ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5 text-center">
            O problema
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-20 max-w-3xl mx-auto leading-[1.1]">
            Seu espaço pode estar custando clientes — e você nem percebe.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <StaggerChildren visible={visible} baseDelay={200} increment={120}>
            {problems.map((p) => (
              <div
                key={p.title}
                className="border border-border rounded-xl p-10 sm:p-12 hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div className="border-b-2 border-transparent group-hover:border-accent transition-colors duration-500 pb-8">
                  <h3 className="font-display tracking-display text-2xl text-foreground mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body font-light text-muted-foreground leading-[1.8] text-[15px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ─── IMAGE DIVIDER ─── */
function ImageDivider({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="img-hover-wrap">
      <img
        src={src}
        alt={alt}
        className="image-divider"
        loading="lazy"
      />
    </div>
  );
}

/* ─── QUEBRA DE CRENÇA ─── */
function BeliefBreak() {
  return (
    <RevealSection className="py-28 sm:py-36 px-8 sm:px-12" bg="bg-secondary">
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Decorative quote */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[160px] leading-none text-accent/[0.08] select-none pointer-events-none">"</span>
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-10 leading-[1.1] relative z-10">
          Não é sobre decoração.
        </h2>
        <p className="font-body font-light text-muted-foreground text-base sm:text-lg leading-[1.8] mb-6">
          Arquitetura estratégica não é escolher móveis bonitos. É projetar cada
          detalhe do seu espaço para influenciar como o cliente percebe, sente e
          decide.
        </p>
        <p className="font-body font-light text-muted-foreground text-base sm:text-lg leading-[1.8]">
          Iluminação, materiais, proporções, fluxo — tudo comunica. E quando
          comunica certo, <em className="font-detail text-foreground">vende</em>.
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
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Image — 60% (3 cols) */}
          <div
            className={`md:col-span-3 transition-all duration-[1000ms] ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="img-hover-wrap rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
                alt="Escritório corporativo sofisticado com iluminação indireta"
                className="w-full h-[400px] sm:h-[520px] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
          {/* Text — 40% (2 cols) */}
          <div
            className={`md:col-span-2 transition-all duration-[900ms] ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <div className="deco-line mb-8" />
            <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground mb-10 leading-[1.1]">
              Seu escritório pode vender antes mesmo de você falar.
            </h2>
            <ul className="space-y-5">
              {benefits.map((b, i) => (
                <li
                  key={b}
                  className={`flex items-start gap-3 transition-all duration-[600ms] ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: visible ? `${400 + i * 100}ms` : "0ms" }}
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-body font-light text-muted-foreground leading-[1.8]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PARA QUEM É ─── */
function ForWhom() {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState<number | null>(null);
  const items = [
    { text: "Atende clientes presencialmente no seu espaço", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
    { text: "Quer cobrar mais sem precisar justificar", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" },
    { text: "Deseja transmitir profissionalismo e sofisticação", img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80" },
    { text: "Sabe que a primeira impressão define o negócio", img: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=800&q=80" },
  ];
  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-[900ms] ease-out mb-16 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">
            Para quem é
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            Isso é para você se…
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — list */}
          <div className="flex flex-col gap-0">
            {items.map((item, i) => (
              <div
                key={item.text}
                className={`transition-all duration-[700ms] ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${300 + i * 150}ms` : "0ms" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`flex items-center gap-6 border-l-2 pl-8 py-6 transition-all duration-300 cursor-default ${
                    hovered === i
                      ? "border-foreground pl-10"
                      : "border-accent"
                  }`}
                >
                  <span
                    className={`font-display text-4xl font-light leading-none transition-colors duration-300 ${
                      hovered === i ? "text-accent" : "text-accent/30"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-body text-[15px] text-foreground leading-[1.7]">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Right — image */}
          <div className="hidden md:block relative h-[480px] rounded-2xl overflow-hidden">
            {items.map((item, i) => (
              <img
                key={i}
                src={item.img}
                alt=""
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hovered === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Default state — show first image faded */}
            <img
              src={items[0].img}
              alt=""
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hovered === null ? "opacity-40" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESSO — Timeline ─── */
function Process() {
  const { ref, visible } = useScrollReveal();
  const steps = [
    { icon: Target, num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos seu espaço, seu público e seus objetivos de negócio." },
    { icon: Lightbulb, num: "02", title: "Projeto com Intenção", desc: "Cada elemento projetado para comunicar valor e gerar resultado." },
    { icon: Ruler, num: "03", title: "Execução Orientada", desc: "Acompanhamento completo para garantir que o espaço entregue o que promete." },
  ];
  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-[900ms] ease-out text-center mb-20 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">
            Processo
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            Como funciona
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 timeline-line relative">
          <StaggerChildren visible={visible} baseDelay={200} increment={180}>
            {steps.map((s) => (
              <div key={s.num} className="text-center group relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border bg-background mb-8 group-hover:border-accent transition-all duration-500">
                  <s.icon className="w-6 h-6 text-foreground" />
                </div>
                {/* Large background number */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 font-display text-[120px] leading-none text-foreground/[0.03] select-none pointer-events-none">
                  {s.num}
                </div>
                <h3 className="font-display tracking-display text-2xl text-foreground mb-4 relative">
                  {s.title}
                </h3>
                <p className="font-body font-light text-[15px] text-muted-foreground leading-[1.8] relative max-w-[280px] mx-auto">
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

/* ─── PROJETOS — Stacked Cards ─── */
function Projects() {
  const { ref, visible } = useScrollReveal();
  const projectSets = [
    {
      label: "Clínicas",
      cards: [
        {
          image: clinica1,
          title: "Consultório Médico",
          description: "Projeto de interiores",
        },
        {
          image: clinica2,
          title: "Consultório Médico",
          description: "Projeto de interiores",
        },
        {
          image: clinica3,
          title: "Recepção Clínica",
          description: "Projeto de interiores",
        },
        {
          image: clinica4,
          title: "Sala de Atendimento",
          description: "Projeto de interiores",
        },
      ],
    },
    {
      label: "Lojas",
      cards: [
        {
          image: loja1,
          title: "Loja de Moda",
          description: "Projeto de interiores",
        },
        {
          image: loja2,
          title: "Loja Pétalla",
          description: "Projeto de interiores",
        },
        {
          image: loja3,
          title: "Loja Pétalla",
          description: "Projeto de interiores",
        },
        {
          image: loja4,
          title: "Loja Pétalla",
          description: "Projeto de interiores",
        },
      ],
    },
  ];

  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-[900ms] ease-out text-center mb-20 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">
            Portfólio
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            Projetos que comunicam valor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          <StaggerChildren visible={visible} baseDelay={200} increment={250}>
            {projectSets.map((set) => (
              <div key={set.label} className="flex flex-col items-center gap-8">
                <StackedCardsInteraction
                  cards={set.cards}
                  spreadDistance={45}
                  rotationAngle={6}
                />
                <p className="font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                  {set.label}
                </p>
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
    <RevealSection className="py-32 sm:py-40 px-8 sm:px-12" bg="bg-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <div className="deco-line mx-auto mb-10 bg-accent/40" />
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-secondary mb-8 leading-[1.1]">
          Se o seu escritório não impressiona, ele negocia seu preço por você.
        </h2>
        <p className="font-body font-light text-[hsl(var(--eter-bege))] text-base sm:text-lg mb-14 leading-[1.8]">
          Solicite sua Análise de Performance Espacial e descubra o que seu
          ambiente está comunicando.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent text-foreground font-body font-medium text-sm px-10 py-4 rounded-full hover:bg-secondary transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl"
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
  const sections = [
    { label: "O problema", href: "#problema" },
    { label: "Processo", href: "#processo" },
    { label: "Portfólio", href: "#portfolio" },
  ];
  return (
    <footer className="py-16 px-8 sm:px-12 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div>
          <img src={logoEter} alt="Éter Arquitetura e Design" className="h-14 w-auto opacity-80" />
        </div>
        <nav className="flex gap-8">
          {sections.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="link-underline font-body font-light text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-border">
        <p className="font-body font-light text-xs text-muted-foreground text-center tracking-wide">
          © {new Date().getFullYear()} Éter Arquitetura e Design. Todos os direitos reservados.
        </p>
      </div>
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
      <ImageDivider
        src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1920&q=80"
        alt="Interior de escritório com materiais nobres"
      />
      <BeliefBreak />
      <PromiseSection />
      <ImageDivider
        src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1920&q=80"
        alt="Espaço corporativo moderno"
      />
      <ForWhom />
      <Process />
      <Projects />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
