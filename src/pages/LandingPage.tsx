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

import clinica4 from "@/assets/clinica-4.jpg";

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
          Seu espaço está fortalecendo
          <br />
          <em className="font-detail">conexões</em> ou criando
          <br />
          barreiras silenciosas com seus clientes?
        </>
      }
      subtitle="Projetamos espaços corporativos que aumentam percepção de valor, confiança e fechamento de contratos."
      callToAction={{
        text: "Falar no WhatsApp",
        href: WHATSAPP_URL,
        icon: <MessageCircle className="w-5 h-5" />,
      }}
      backgroundImage={heroBg}
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
    { title: "Não comunica autoridade", desc: "O ambiente falha em comunicar a solidez e a competência que você realmente possui." },
    { title: "Espaço genérico", desc: "Sem personalidade, a falta de identidade torna seu ambiente  indistinguível de qualquer outro do mesmo segmento." },
    { title: "A percepção de valor", desc: "O próprio ambiente reduz a relevância do seu serviço, conduzindo o cliente a uma postura imediata de desvalorização." },
    { title: "A conversão não acontece", desc: "Negócios se perdem de forma silenciosa, enquanto o espaço inviabiliza a tomada de decisão." },
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
            A falta de coerência e conexão no seu espaço pode existir — e você nem percebe.
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
          Iluminação, materialidade, proporção, fluxo e harmonia – tudo comunica.
          <br />E quando comunica de forma assertiva, gera <em className="font-detail text-foreground">conexão</em> e <em className="font-detail text-foreground">valor</em>.
        </p>
      </div>
    </RevealSection>
  );
}

/* ─── PROMESSA ─── */
function PromiseSection() {
  const { ref, visible } = useScrollReveal();
  const benefits = [
    "Aumento do tempo de permanência no ambiente",
    "Criar elementos agradáveis ao cliente, gerando conexão entre consumidor e marca",
    "Aumento de ticket médio",
    "Fidelização – percepção positiva, vontade de retornar",
    "Direcionamento para reter seu cliente no espaço",
    "Mudar a percepção de tempo",
    "Bem estar e harmonia",
    "Diferenciar marca",
    "Marketing sensorial",
    "Potencializar ponto de venda",
    "Influenciar comportamento do consumidor",
    "Melhorar performance da equipe",
  ];
  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Image centered */}
        <div
          className={`max-w-[800px] mx-auto mb-16 transition-all duration-[1000ms] ease-out ${
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
        {/* Title centered */}
        <div
          className={`text-center mb-14 transition-all duration-[900ms] ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
        >
          <div className="deco-line mx-auto mb-8" />
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            Por que investir em uma projeto com a Éter?
          </h2>
        </div>
        {/* Bullet points in 2 columns */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 max-w-4xl mx-auto">
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
    </section>
  );
}

function Process() {
  const { ref, visible } = useScrollReveal();
  const steps = [
    { icon: Target, num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos seu espaço, seu público e as diretrizes centrais do seu negócio." },
    { icon: Lightbulb, num: "02", title: "Projetamos atmosferas", desc: "Transformamos estética em estratégia e experiências que conectam , envolvem e convertem." },
    { icon: Ruler, num: "03", title: "Execução Orientada", desc: "Acompanhamento dedicado para garantir que o espaço entregue o que promete." },
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
  const gridItems = [
    { title: "Consultório Médico", image: clinica1 },
    { title: "Consultório Médico", image: clinica2 },
    { title: "Sala de Atendimento", image: clinica4 },
    { title: "Numer+Pétalla", image: loja2 },
    { title: "Numer+Pétalla", image: loja3 },
    { title: "Numer+Pétalla", image: loja4 },
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
          <PortfolioGrid items={gridItems} />
        </div>
      </div>
    </section>
  );
}

/* ─── CTA FINAL (com foto das sócias atrás) ─── */
function FinalCTA() {
  return (
    <RevealSection className="relative overflow-hidden pt-0 pb-32 sm:pb-40 px-8 sm:px-12" bg="bg-white">
      {/* Foto das sócias — atrás do texto */}
      <div className="flex justify-center mb-0 relative z-0">
        <div className="max-w-[320px] sm:max-w-[360px] w-full">
          <img
            src={sociasImg}
            alt="Sócias — Éter Arquitetura e Design"
            className="w-full h-auto"
            style={{
              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
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
          Seu ambiente te reduz ou te traduz?
        </h2>
        <p className="font-body font-light text-[#5c4336] text-base sm:text-lg mb-14 leading-[1.8]">
          Solicite a Análise de Expressão Espacial e descubra o que seu
          ambiente está comunicando.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-final-whatsapp"
          data-gtm-event="cta_final_click"
          data-gtm-label="Final CTA WhatsApp"
          className="gtm-cta gtm-cta-final inline-flex items-center gap-3 bg-[#5c4939] text-[#e5eaed] font-body font-medium text-sm px-10 py-4 rounded-full hover:opacity-90 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl"
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
      id="cta-float-whatsapp"
      data-gtm-event="cta_float_click"
      data-gtm-label="Float WhatsApp"
      className="gtm-cta gtm-cta-float fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-secondary shadow-xl animate-gentle-pulse hover:bg-accent hover:text-foreground transition-colors duration-300"
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
