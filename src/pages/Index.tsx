import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Instagram, Phone, Target, Lightbulb, Ruler } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PortfolioGrid } from "@/components/ui/portfolio-grid";

import logoEterFooter from "@/assets/logo-eter-footer.png";
import logoEterNovo from "@/assets/logo-eter-novo.png";
import heroBg from "@/assets/hero-consultorio.jpg";
import anaImg from "@/assets/ana-emilia.png";
import fernandaImg from "@/assets/fernanda.png";
import clinica1 from "@/assets/clinica-1.jpg";
import clinica2 from "@/assets/clinica-2.jpg";
import clinica4 from "@/assets/clinica-4.jpg";
import loja2 from "@/assets/loja-2.jpg";
import loja4 from "@/assets/loja-4.jpg";
import salus1 from "@/assets/salus-1.jpg";
import salus2 from "@/assets/salus-2.jpg";

const WHATSAPP_URL =
  "https://wa.me/556299542888?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

/* ─── Helpers ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

/* ═══════════════════════════════════════════
   HERO — Split editorial
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left — text */}
      <div className="relative flex flex-col justify-between bg-background px-8 sm:px-16 py-16 md:py-20 order-2 md:order-1 min-h-[60vh] md:min-h-screen">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground"
        >
          Goiânia · Brasil
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="my-12 md:my-0"
        >
          <h1 className="font-display tracking-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05]">
            Arquitetura<br />
            é <em className="font-detail">estratégia</em>.
          </h1>
          <p className="mt-8 font-body font-light text-muted-foreground text-base sm:text-lg max-w-lg leading-[1.8]">
            Na Éter Arquitetura e Design, desenvolvemos projetos de arquitetura e
            design que traduzem a <em className="font-detail">essência</em> de
            cada marca em espaços sofisticados e funcionais.
            <br />
            <br />
            Cada ambiente é concebido para proporcionar{" "}
            <em className="font-detail">experiências</em> marcantes, fortalecendo
            a identidade do negócio e favorecendo sua operação de forma fluida e
            eficiente. Unimos sensibilidade estética, técnica e atenção aos{" "}
            <em className="font-detail">detalhes</em> para criar espaços que
            conectam e comunicam, aumentando a percepção de{" "}
            <em className="font-detail">valor</em>.
            <br />
            <br />
            Do conceito à especificação de mobiliário e iluminação, entregamos
            projetos completos: o interstício entre beleza e estratégia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col gap-4"
        >
          {/* Botões removidos conforme solicitação */}
        </motion.div>
      </div>

      {/* Right — full image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="relative w-full h-[55vh] md:h-screen overflow-hidden order-1 md:order-2"
      >
        <img src={heroBg} alt="Espaço projetado pela Éter" className="w-full h-full object-cover opacity-40" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROJETOS — Grid editorial (modelo /lp)
   ═══════════════════════════════════════════ */
function Projects() {
  const items = [
    { title: "Consultório Endocrinologia", image: clinica1 },
    { title: "Consultório Angiologia", image: clinica2 },
    { title: "Consultório Cardiologia", image: clinica4 },
    { title: "Laboratório Salus", image: salus1 },
    { title: "Numer + Pétalla", image: loja2 },
    { title: "Loja Numer + Pétalla", image: loja4 },
  ];

  const { ref, visible } = useReveal();

  return (
    <section
      id="projetos"
      ref={ref}
      className="bg-background py-28 sm:py-40 px-6 sm:px-12"
    >
      <div
        className={`max-w-3xl mb-16 sm:mb-20 transition-opacity duration-[1100ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6">
          Portfólio
        </p>
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
          Projetos que comunicam <em className="font-detail">valor</em>.
        </h2>
      </div>

      <div
        className={`transition-opacity duration-[1200ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: visible ? "200ms" : "0ms" }}
      >
        <PortfolioGrid items={items} dimmed />
      </div>

      {/* Botão "Ver todos" removido conforme solicitação */}
    </section>
  );
}

/* ═══════════════════════════════════════════
   SOBRE — Editorial
   ═══════════════════════════════════════════ */
function About() {
  const { ref, visible } = useReveal();
  const socias = [
    {
      img: anaImg,
      name: "Ana Emília Faleiro",
      role: "Arquiteta",
      bio: [
        "Formada pela Universidade Estadual de Goiás e especialista em Design de Interiores, Decoração e Ambientação pela PUC-RS.",
        "Responsável pela parte técnica dos projetos, compatibilização e soluções construtivas, assegurando eficiência, viabilidade e segurança na execução.",
      ],
    },
    {
      img: fernandaImg,
      name: "Fernanda Castro",
      role: "Designer de Interiores e Experiências",
      bio: [
        "Especialista em Produção de Ambientes por CASA VOGUE, Design de Experiências e Retail Design pelo Instituto Europeo di Design — IED São Paulo / Milão. Pós-graduada em Marketing e Comunicação ECA-USP (2008).",
        "Atua no desenvolvimento e criação do conceito e identidade visual, garantindo que cada espaço seja singular e traduza a essência da sua marca.",
      ],
    },
  ];

  return (
    <section id="sobre" ref={ref} className="bg-background py-28 sm:py-40 px-6 sm:px-12">
      {/* Intro */}
      <div
        className={`max-w-4xl mx-auto text-center mb-20 sm:mb-28 transition-opacity duration-[1100ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-8">
          Quem somos
        </p>
        <h2 className="font-display tracking-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-[1.3] mb-10">
          Éter, o elemento invisível que transforma espaço em{" "}
          <em className="font-detail">atmosfera</em>, presença em{" "}
          <em className="font-detail">conexão</em>, forma em{" "}
          <em className="font-detail">essência</em>.
        </h2>
        <p className="font-body font-light text-muted-foreground text-[15px] leading-[1.9] max-w-2xl mx-auto">
          Éter nasce da união de olhares complementares e de uma abordagem
          criativa, sensível e técnica sobre o espaço.
        </p>
      </div>

      {/* Sócias — empilhadas, alternando lado da foto */}
      <div className="flex flex-col gap-20 sm:gap-28 max-w-5xl mx-auto">
        {socias.map((s, i) => {
          const imageFirst = i % 2 === 0;
          return (
            <div
              key={s.name}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center transition-opacity duration-[1100ms] ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${i * 200}ms` : "0ms" }}
            >
              <div
                className={`md:col-span-5 ${
                  imageFirst ? "md:order-1" : "md:order-2"
                }`}
              >
                <img
                  src={s.img}
                  alt={`${s.name} — ${s.role}`}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              <div
                className={`md:col-span-7 flex flex-col justify-center ${
                  imageFirst ? "md:order-2" : "md:order-1"
                }`}
              >
                <h3 className="font-display tracking-display text-2xl sm:text-3xl text-foreground leading-tight mb-3">
                  {s.name}
                </h3>
                <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-8">
                  {s.role}
                </p>
                {s.bio.map((p, j) => (
                  <p
                    key={j}
                    className="font-body font-light text-[15px] text-muted-foreground leading-[1.9] mb-4 last:mb-0 max-w-xl"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MÉTODO — Tipográfico, sem ícones
   ═══════════════════════════════════════════ */
function Method() {
  const { ref, visible } = useReveal();
  const steps = [
    {
      icon: Target,
      num: "01",
      title: "Diagnóstico Estratégico",
      desc: "Analisamos seu espaço, seu público e as diretrizes centrais do seu negócio.",
    },
    {
      icon: Lightbulb,
      num: "02",
      title: "Projetamos atmosferas",
      desc: "Transformamos estética em estratégia e experiências que conectam, envolvem e convertem.",
    },
    {
      icon: Ruler,
      num: "03",
      title: "Execução Orientada",
      desc: "Acompanhamento próximo para garantir que o espaço entregue o que promete.",
    },
  ];
  return (
    <section id="metodo" ref={ref} className="bg-secondary py-28 sm:py-40 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-[900ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6">
            Método
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
            Como <em className="font-detail">projetamos</em>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 timeline-line relative">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`text-center group relative z-10 transition-opacity duration-[900ms] ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${200 + i * 180}ms` : "0ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border bg-background mb-8 group-hover:border-accent transition-all duration-500">
                <s.icon className="w-6 h-6 text-foreground" />
              </div>
              <div className="absolute top-12 left-1/2 -translate-x-1/2 font-display text-[120px] leading-none text-foreground/[0.04] select-none pointer-events-none">
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
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DEPOIMENTOS — Cards estilo Google Reviews
   ═══════════════════════════════════════════ */
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/UgH16PQWy2yUkneb9";

const googleReviews = [
  {
    text: "A empresa Cardio Diagnósticos gostaria de expressar seu sincero agradecimento à designer Fernanda e a toda a equipe de arquitetura pelo excelente trabalho realizado. O resultado final ficou realmente muito bom e atendeu às nossas expectativas! Destacamos especialmente a postura da empresa, que sempre esteve aberta a nos ouvir e respeitou muito nossas ideias e necessidades. Houve um cuidado constante em adequar o projeto aos custos da obra, sem perder qualidade e bom gosto.",
    author: "Fernanda Vaz",
    when: "há 1 dia",
    initial: "F",
    color: "#1a73e8",
  },
  {
    text: "A Éter fez o projeto do quarto da minha filha de 10 anos — e o resultado simplesmente superou todas as expectativas. A Fernanda conseguiu captar com sensibilidade o gosto, os sonhos e a personalidade da minha filha, transformando tudo isso em um espaço lindo, acolhedor, funcional e cheio de identidade. Eu e minha filha amamos o projeto!",
    author: "Maisa Bueno Machado",
    when: "há 8 horas",
    initial: "M",
    color: "#e8710a",
  },
  {
    text: "Incrível! Entregou mais do que o esperado e em um curto espaço de tempo. Recomendo! Fizeram a recepção do Lab Salus. Podem conferir as fotos do antes e depois na galeria de fotos.",
    author: "Rosana Pereira Morais",
    when: "há 1 dia",
    initial: "R",
    color: "#34a853",
  },
];

/* Logo G do Google em SVG (4 cores oficiais) */
const GoogleLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

function Quote() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-secondary py-28 sm:py-40 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 sm:mb-20 transition-opacity duration-[1100ms] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6">
            Avaliações
          </p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-8">
            O que dizem no <em className="font-detail">Google</em>.
          </h2>
          <div className="inline-flex items-center gap-3 text-foreground">
            <GoogleLogo className="w-5 h-5" />
            <div className="flex items-center gap-2">
              <span className="font-display text-xl">5,0</span>
              <div className="flex gap-0.5" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#fbbc04">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {googleReviews.map((r, i) => (
            <article
              key={r.author}
              className={`bg-background border border-border p-7 flex flex-col transition-all duration-[1100ms] hover:shadow-md ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <header className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-background font-body font-medium text-sm shrink-0"
                  style={{ backgroundColor: r.color }}
                  aria-hidden="true"
                >
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-foreground leading-tight truncate">
                    {r.author}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} className="w-3 h-3" viewBox="0 0 24 24" fill="#fbbc04">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="font-body text-[11px] text-muted-foreground">
                      {r.when}
                    </span>
                  </div>
                </div>
                <GoogleLogo className="w-4 h-4 shrink-0 mt-1" />
              </header>
              <p className="font-body font-light text-[14px] text-muted-foreground leading-[1.7] flex-1">
                {r.text}
              </p>
            </article>
          ))}
        </div>

        <div
          className={`mt-12 flex justify-center transition-opacity duration-[1100ms] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: visible ? "600ms" : "0ms" }}
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-body text-[11px] tracking-[0.4em] uppercase text-foreground inline-flex items-center gap-3"
          >
            Ver todas no Google <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTATO — Editorial minimal
   ═══════════════════════════════════════════ */
function Contact() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="contato"
      ref={ref}
      className="bg-secondary py-32 sm:py-44 px-6 sm:px-12"
    >
      <div
        className={`max-w-4xl transition-opacity duration-[1100ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-10">
          Contato
        </p>
        <h2 className="font-display tracking-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05] mb-16">
          Vamos projetar seu próximo <em className="font-detail">espaço</em>.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 max-w-3xl">
          <a
            href="tel:+556299542888"
            className="group border-t border-border pt-6"
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
              <Phone className="w-3 h-3" /> Telefone
            </p>
            <p className="font-display tracking-display text-lg text-foreground group-hover:text-accent transition-colors">
              (62) 99954-2888
            </p>
          </a>
          <a
            href="https://www.instagram.com/eter.arqdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-t border-border pt-6"
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
              <Instagram className="w-3 h-3" /> Instagram
            </p>
            <p className="font-display tracking-display text-lg text-foreground group-hover:text-accent transition-colors">
              @eter.arqdesign
            </p>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-contato-whatsapp"
            data-gtm-event="cta_contato_click"
            data-gtm-label="Contato WhatsApp"
            className="gtm-cta gtm-cta-contato group border-t border-border pt-6"
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </p>
            <p className="font-display tracking-display text-lg text-foreground group-hover:text-accent transition-colors">
              Agendar consultoria
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-background py-12 px-6 sm:px-12 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <img
          src={logoEterFooter}
          alt="Éter Arquitetura e Design"
          className="h-10 w-auto opacity-70"
        />
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground text-center">
          © {new Date().getFullYear()} Éter Arquitetura e Design
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FLOATING WHATSAPP — Discreto
   ═══════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="cta-float-inst-whatsapp"
      data-gtm-event="cta_float_inst_click"
      data-gtm-label="Float Institucional WhatsApp"
      className="gtm-cta gtm-cta-float fixed bottom-6 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background shadow-lg hover:bg-accent transition-colors duration-300"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Index() {
  return (
    <div className="font-body bg-background text-foreground overflow-x-hidden">
      <Navbar logoSrc={logoEterNovo} />
      <main className="md:ml-[220px] pt-16 md:pt-0">
        <Hero />
        <Projects />
        <About />
        <Method />
        <Quote />
        <Contact />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}
