import { useEffect, useRef, useState } from "react";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/ui/image-comparison";
import { MessageCircle, ArrowRight, Target, Lightbulb, Ruler } from "lucide-react";
import { PortfolioCarousel } from "@/components/ui/portfolio-carousel";
import { HeroSection } from "@/components/ui/hero-section-2";
import logoEter from "@/assets/logo-eter.png";
import heroBg from "@/assets/hero-bg.jpg";
import logoEterFooter from "@/assets/logo-eter-footer.png";
import antesImg from "@/assets/antes.jpg";
import depoisImg from "@/assets/depois.jpg";
import antesObra from "@/assets/antes-obra.jpg";
import depoisObra from "@/assets/depois-obra.jpg";
import clinica1 from "@/assets/clinica-1.jpg";
import clinica2 from "@/assets/clinica-2.jpg";
import clinica3 from "@/assets/clinica-3.jpg";
import clinica4 from "@/assets/clinica-4.jpg";
import loja1 from "@/assets/loja-1.jpg";
import loja2 from "@/assets/loja-2.jpg";
import loja3 from "@/assets/loja-3.jpg";
import loja4 from "@/assets/loja-4.jpg";
import sociasImg from "@/assets/socias.png";

const WHATSAPP_URL =
  "https://wa.me/556299542888?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

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

/* ─── PROBLEMA — Pain Points ─── */
function ProblemBlock() {
  const { ref, visible } = useScrollReveal();
  const pains = [
    { title: "Falta de autoridade", desc: "O cliente não sente confiança ao entrar. O espaço não reflete sua competência." },
    { title: "Ambiente genérico", desc: "Sem identidade, sem diferencial. Igual a qualquer outro escritório da região." },
    { title: "Não transmite valor", desc: "O ambiente desvaloriza seu serviço e o cliente já entra negociando preço." },
    { title: "Não converte clientes", desc: "Você perde negócios sem entender por quê. O espaço sabota a decisão." },
  ];

  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-[900ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-20 max-w-3xl mx-auto leading-[1.1]">
            Seu espaço pode estar custando clientes — e você nem percebe.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-0">
          <StaggerChildren visible={visible} baseDelay={200} increment={120}>
            {pains.map((p) => (
              <div
                key={p.title}
                className="group py-6 border-b border-border/60 last:border-b-0"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0 group-hover:bg-accent transition-colors duration-500" />
                  <h3 className="font-display tracking-display text-lg sm:text-xl text-foreground group-hover:text-accent transition-colors duration-500">
                    {p.title}
                  </h3>
                </div>
                <p className="font-body font-light text-[13px] text-muted-foreground leading-[1.7] pl-[1.375rem]">
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
          Iluminação, materiais, proporções, fluxo — tudo comunica.
          <br />E quando comunica certo, <em className="font-detail text-foreground">vende</em>.
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
            <ImageComparison className="w-full h-[400px] sm:h-[520px] rounded-2xl" enableHover>
              <ImageComparisonImage
                src={depoisObra}
                alt="Resultado final"
                position="left"
              />
              <ImageComparisonImage
                src={antesObra}
                alt="Obra em andamento"
                position="right"
                className="grayscale"
              />
              <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-sm">
                <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
              </ImageComparisonSlider>
            </ImageComparison>
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

/* ─── PROJETOS — Portfolio Carousel ─── */
function Projects() {
  const { ref, visible } = useScrollReveal();
  const portfolioItems = [
    {
      title: "Consultório Médico",
      category: "Clínicas",
      description: "Marcenaria sob medida com iluminação indireta, criando um ambiente acolhedor e profissional para atendimento médico.",
      src: clinica1,
    },
    {
      title: "Consultório Médico",
      category: "Clínicas",
      description: "Design funcional e elegante com materiais nobres, transmitindo confiança e sofisticação aos pacientes.",
      src: clinica2,
    },
    {
      title: "Recepção Clínica",
      category: "Clínicas",
      description: "Espaço de espera projetado para conforto e bem-estar, com mobiliário contemporâneo e arte decorativa.",
      src: clinica3,
    },
    {
      title: "Sala de Atendimento",
      category: "Clínicas",
      description: "Ambiente de trabalho com mesa em mármore verde e estante em madeira, unindo funcionalidade e estética.",
      src: clinica4,
    },
    {
      title: "Loja Pétalla",
      category: "Lojas",
      description: "Exposição inteligente com araras metálicas e layout aberto, maximizando a experiência de compra.",
      src: loja1,
    },
    {
      title: "Loja Pétalla",
      category: "Lojas",
      description: "Identidade visual integrada ao espaço com parede destaque em terracota e prateleiras de exposição.",
      src: loja2,
    },
    {
      title: "Loja Pétalla",
      category: "Lojas",
      description: "Layout com arcos e iluminação direcional, criando uma experiência sensorial para os clientes.",
      src: loja3,
    },
    {
      title: "Loja Pétalla",
      category: "Lojas",
      description: "Mesa central de produtos com vista para o interior da loja, integrando os ambientes de forma fluida.",
      src: loja4,
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
        <div
          className={`transition-all duration-[900ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: visible ? "300ms" : "0ms" }}
        >
          <PortfolioCarousel items={portfolioItems} autoplay={false} />
        </div>
      </div>
    </section>
  );
}

/* ─── CTA FINAL (com foto das sócias atrás) ─── */
function FinalCTA() {
  return (
    <RevealSection className="relative overflow-hidden pt-0 pb-32 sm:pb-40 px-8 sm:px-12" bg="bg-[#f0e5db]">
      {/* Foto das sócias — atrás do texto */}
      <div className="flex justify-center mb-0 relative z-0">
        <div className="max-w-[320px] sm:max-w-[360px] w-full">
          <img
            src={sociasImg}
            alt="Sócias — Éter Arquitetura e Design"
            className="w-full h-auto"
            style={{
              maskImage: "linear-gradient(to bottom, black 30%, transparent 95%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in",
            }}
          />
        </div>
      </div>
      {/* Texto sobreposto — na frente */}
      <div className="max-w-3xl mx-auto text-center relative z-10 -mt-24 sm:-mt-32">
        <div className="deco-line mx-auto mb-10 bg-[#5c4336]/30" />
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-[#5c4336] mb-8 leading-[1.1]">
          Se o seu escritório não impressiona, ele negocia seu preço por você.
        </h2>
        <p className="font-body font-light text-[#5c4336] text-base sm:text-lg mb-14 leading-[1.8]">
          Solicite sua Análise de Performance Espacial e descubra o que seu
          ambiente está comunicando.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#5c4939] text-[#e5eaed] font-body font-medium text-sm px-10 py-4 rounded-full hover:opacity-90 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl"
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
    <footer className="py-16 px-8 sm:px-12 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        <div>
          <img src={logoEterFooter} alt="Éter Arquitetura e Design" className="h-14 w-auto opacity-80" />
        </div>
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
      <BeliefBreak />
      <PromiseSection />
      
      <Process />
      <Projects />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
