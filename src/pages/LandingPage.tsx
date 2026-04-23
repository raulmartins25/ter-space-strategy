import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import logoEterFooter from "@/assets/logo-eter-footer.png";
import heroBg from "@/assets/hero-bg.jpg";
import clinica1 from "@/assets/clinica-1.jpg";
import clinica2 from "@/assets/clinica-2.jpg";
import clinica4 from "@/assets/clinica-4.jpg";
import salus3 from "@/assets/salus-3.jpg";
import salus4 from "@/assets/salus-4.jpg";
import loja4 from "@/assets/loja-4.jpg";
import clinicaVinuz from "@/assets/clinica-vinuz.jpg";
import sociasImg from "@/assets/socias.jpg";
import depoisObra from "@/assets/depois-obra.jpg";

const WHATSAPP_URL =
  "https://wa.me/556299542888?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[1100ms] ease-out`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

/* ─── HERO EDITORIAL ─── */
function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-foreground">
      <img
        src={heroBg}
        alt="Projeto em destaque — Éter Arquitetura e Design"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/60" />

      {/* Center title */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <Reveal delay={300} className="max-w-5xl text-center">
          <h1 className="font-serif-display text-secondary text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light">
            Espaços que <em className="italic">comunicam</em>
            <br />
            antes da primeira palavra.
          </h1>
        </Reveal>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-10 left-0 right-0 px-6 sm:px-10 flex items-end justify-between gap-6">
        <Reveal delay={700}>
          <p className="label-caps text-secondary/90">
            Éter Arquitetura · Goiânia / BR
          </p>
        </Reveal>
        <Reveal delay={900}>
          <span className="label-caps text-secondary/90 hidden sm:inline">
            Role para descobrir ↓
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── MANIFESTO ─── */
function Manifesto() {
  return (
    <section className="py-32 sm:py-48 px-6 sm:px-10 bg-background">
      <Reveal className="max-w-4xl mx-auto text-center">
        <p className="label-caps text-muted-foreground mb-10">— Manifesto</p>
        <p className="font-serif-display text-foreground text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.45] font-light">
          <em className="italic">Design estratégico</em> vai além de um ambiente bonito.
          É projetar e cuidar para que cada detalhe possa influenciar
          a <em className="italic">percepção</em> e a <em className="italic">decisão</em> do seu cliente.
        </p>
        <div className="mt-16 mx-auto h-px w-12 bg-foreground/30" />
        <p className="mt-16 font-body font-light text-muted-foreground text-base sm:text-lg leading-[1.9] max-w-2xl mx-auto">
          Iluminação, materialidade, proporção, fluxo e harmonia — tudo comunica.
          E quando comunica de forma assertiva, gera conexão e valor.
        </p>
      </Reveal>
    </section>
  );
}

/* ─── PROJECTS — Editorial Asymmetric Grid ─── */
type Project = {
  title: string;
  category: string;
  location: string;
  image: string;
  size: "large" | "medium" | "small";
  align: "left" | "right" | "center";
};

const PROJECTS: Project[] = [
  { title: "Consultório Endocrinologista", category: "Saúde", location: "Goiânia", image: clinica1, size: "large", align: "left" },
  { title: "Laboratório Salus", category: "Saúde", location: "Goiânia", image: salus3, size: "medium", align: "right" },
  { title: "Consultório Cardiologista", category: "Saúde", location: "Goiânia", image: clinica4, size: "large", align: "center" },
  { title: "Numer + Pétalla", category: "Varejo", location: "Goiânia", image: loja4, size: "medium", align: "left" },
  { title: "Clínica Vinuz", category: "Saúde", location: "Goiânia", image: clinicaVinuz, size: "large", align: "right" },
  { title: "Consultório Angiologista", category: "Saúde", location: "Goiânia", image: clinica2, size: "medium", align: "center" },
];

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useScrollReveal();
  const sizeClasses = {
    large: "w-full md:w-[78%]",
    medium: "w-full md:w-[58%]",
    small: "w-full md:w-[44%]",
  }[project.size];
  const alignClasses = {
    left: "md:mr-auto",
    right: "md:ml-auto",
    center: "md:mx-auto",
  }[project.align];
  const aspect = project.size === "large" ? "aspect-[4/3]" : "aspect-[3/4]";

  return (
    <article
      ref={ref}
      className={`${sizeClasses} ${alignClasses} transition-all duration-[1100ms] ease-out`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <div className="img-hover-wrap overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`w-full ${aspect} object-cover`}
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <p className="label-caps text-muted-foreground mb-2">
            {String(index + 1).padStart(2, "0")} · {project.category}
          </p>
          <h3 className="font-serif-display text-foreground text-xl sm:text-2xl font-light">
            {project.title}
          </h3>
        </div>
        <p className="label-caps text-muted-foreground whitespace-nowrap">
          {project.location}
        </p>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projetos" className="py-28 sm:py-40 px-6 sm:px-10 bg-background">
      <div className="max-w-[1500px] mx-auto">
        <Reveal className="mb-20 sm:mb-28 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="label-caps text-muted-foreground mb-5">— Selecionados</p>
            <h2 className="font-serif-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.1] max-w-2xl">
              Projetos que <em className="italic">comunicam valor</em>.
            </h2>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="editorial-link text-foreground self-start sm:self-end">
            Solicitar análise <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </Reveal>

        <div className="space-y-24 sm:space-y-36">
          {PROJECTS.map((p, i) => (
            <ProjectItem key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STUDIO / SOBRE ─── */
function Studio() {
  return (
    <section id="estudio" className="py-28 sm:py-40 px-6 sm:px-10 bg-background">
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <Reveal>
          <div className="img-hover-wrap overflow-hidden">
            <img
              src={sociasImg}
              alt="Sócias — Éter Arquitetura e Design"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={150} className="max-w-md">
          <p className="label-caps text-muted-foreground mb-8">— O Estúdio</p>
          <h2 className="font-serif-display text-foreground text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.15] mb-10">
            Arquitetura como <em className="italic">linguagem silenciosa</em> do seu negócio.
          </h2>
          <p className="font-body font-light text-muted-foreground text-base leading-[1.9] mb-6">
            Atuamos no encontro entre estética e estratégia. Cada projeto é desenhado
            para conduzir percepção, fortalecer marca e amplificar conversão — através
            de iluminação, materialidade, proporção e fluxo.
          </p>
          <p className="font-body font-light text-muted-foreground text-base leading-[1.9] mb-12">
            Acreditamos que ambientes não decoram negócios — eles os traduzem.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="editorial-link text-foreground">
            Conheça o estúdio <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PROCESSO ─── */
function Processo() {
  const steps = [
    {
      num: "01",
      title: "Diagnóstico Estratégico",
      desc: "Analisamos seu espaço, seu público e as diretrizes centrais do seu negócio.",
    },
    {
      num: "02",
      title: "Projetamos atmosferas",
      desc: "Transformamos estética em estratégia e experiências que conectam, envolvem e convertem.",
    },
    {
      num: "03",
      title: "Execução Orientada",
      desc: "Acompanhamento próximo para garantir que o espaço entregue o que promete.",
    },
  ];

  return (
    <section id="processo" className="py-28 sm:py-40 px-6 sm:px-10 bg-background border-t border-border/40">
      <div className="max-w-[1300px] mx-auto">
        <Reveal className="mb-20 sm:mb-28 max-w-3xl">
          <p className="label-caps text-muted-foreground mb-5">— Processo</p>
          <h2 className="font-serif-display text-foreground text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1]">
            Um método feito para <em className="italic">traduzir</em> intenção em espaço.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 150}>
              <div className="border-t border-foreground/20 pt-8">
                <p className="font-serif-display text-foreground/70 text-5xl font-light mb-8">
                  {s.num}
                </p>
                <h3 className="font-serif-display text-foreground text-xl sm:text-2xl font-light mb-5">
                  {s.title}
                </h3>
                <p className="font-body font-light text-muted-foreground text-sm leading-[1.9]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA EDITORIAL ─── */
function FinalCTA() {
  return (
    <section
      id="contato"
      className="relative py-32 sm:py-48 px-6 sm:px-10 bg-background overflow-hidden border-t border-border/40"
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <img src={depoisObra} alt="" className="w-full h-full object-cover" />
      </div>
      <Reveal className="relative max-w-4xl mx-auto text-center">
        <p className="label-caps text-muted-foreground mb-10">— Convite</p>
        <h2 className="font-serif-display text-foreground text-[clamp(2.2rem,5.5vw,4.8rem)] font-light leading-[1.05] mb-14">
          Seu ambiente te <em className="italic">reduz</em>
          <br />
          ou te <em className="italic">traduz</em>?
        </h2>
        <p className="font-body font-light text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-[1.9] mb-14">
          Solicite a Análise de Expressão Espacial e descubra o que seu ambiente está comunicando.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-final-whatsapp"
          data-gtm-event="cta_final_click"
          data-gtm-label="Final CTA WhatsApp"
          className="gtm-cta gtm-cta-final editorial-link text-foreground"
        >
          Solicitar análise no WhatsApp <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </Reveal>
    </section>
  );
}

/* ─── FOOTER EDITORIAL ─── */
function Footer() {
  return (
    <footer className="bg-foreground text-secondary px-6 sm:px-10 pt-24 pb-10">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-3 gap-14 md:gap-10 pb-16 border-b border-secondary/15">
          <div>
            <img
              src={logoEterFooter}
              alt="Éter Arquitetura e Design"
              className="h-12 w-auto opacity-90 mb-8"
            />
            <p className="font-serif-display text-secondary/90 text-lg font-light leading-[1.5] italic max-w-xs">
              Arquitetura como linguagem silenciosa do seu negócio.
            </p>
          </div>
          <div>
            <p className="label-caps text-secondary/60 mb-6">Contato</p>
            <ul className="space-y-3 font-body font-light text-secondary/90 text-sm">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
                  WhatsApp · +55 62 9954-2888
                </a>
              </li>
              <li>Goiânia · Brasil</li>
            </ul>
          </div>
          <div>
            <p className="label-caps text-secondary/60 mb-6">Navegação</p>
            <ul className="space-y-3 font-body font-light text-secondary/90 text-sm">
              <li><a href="#projetos" className="link-underline">Projetos</a></li>
              <li><a href="#estudio" className="link-underline">Estúdio</a></li>
              <li><a href="#processo" className="link-underline">Processo</a></li>
              <li><a href="#contato" className="link-underline">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4 label-caps text-secondary/50">
          <p>© {new Date().getFullYear()} Éter Arquitetura e Design</p>
          <p>Todos os direitos reservados</p>
        </div>
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
      <SiteHeader />
      <Hero />
      <Manifesto />
      <Projects />
      <Studio />
      <Processo />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
