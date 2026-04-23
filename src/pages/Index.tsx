import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Instagram, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PortfolioGrid } from "@/components/ui/portfolio-grid";

import logoEterFooter from "@/assets/logo-eter-footer.png";
import heroBg from "@/assets/hero-bg-site.jpg";
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
          Estúdio · Goiânia, Brasil
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
          <p className="mt-8 font-body font-light text-muted-foreground text-base sm:text-lg max-w-md leading-[1.8]">
            Projetamos espaços comerciais e corporativos que comunicam valor,
            geram conexão e potencializam resultados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col gap-4"
        >
          <a
            href="#projetos"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="link-underline font-body text-[11px] tracking-[0.4em] uppercase text-foreground inline-flex items-center gap-3 w-fit"
          >
            Ver projetos <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Right — full image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="relative w-full h-[55vh] md:h-screen overflow-hidden order-1 md:order-2"
      >
        <img src={heroBg} alt="Espaço projetado pela Éter" className="w-full h-full object-cover" />
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
        <PortfolioGrid items={items} />
      </div>

      <div className="mt-16 sm:mt-20 flex justify-center">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-body text-[11px] tracking-[0.4em] uppercase text-foreground inline-flex items-center gap-3"
        >
          Ver todos <ArrowRight className="w-4 h-4" />
        </a>
      </div>
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
      num: "01",
      title: "Diagnóstico estratégico",
      desc: "Analisamos seu espaço, seu público e seus objetivos para entender o que precisa mudar.",
    },
    {
      num: "02",
      title: "Projeto com intenção",
      desc: "Cada elemento é projetado para comunicar valor, reforçar sua marca e gerar resultado mensurável.",
    },
    {
      num: "03",
      title: "Execução orientada",
      desc: "Acompanhamento completo da obra para garantir que o espaço entregue o que foi prometido.",
    },
  ];
  return (
    <section id="metodo" ref={ref} className="bg-secondary py-28 sm:py-40 px-6 sm:px-12">
      <div className="mb-16">
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6">
          Método
        </p>
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] max-w-2xl">
          Como <em className="font-detail">projetamos</em>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`border-t border-border pt-8 transition-opacity duration-[900ms] ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: visible ? `${i * 200}ms` : "0ms" }}
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
              {s.num}
            </p>
            <h3 className="font-display tracking-display text-2xl text-foreground mb-4 leading-tight">
              {s.title}
            </h3>
            <p className="font-body font-light text-[14px] text-muted-foreground leading-[1.8]">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DEPOIMENTO — Citação única, editorial
   ═══════════════════════════════════════════ */
function Quote() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="bg-background py-32 sm:py-48 px-6 sm:px-12">
      <div
        className={`max-w-4xl mx-auto text-center transition-opacity duration-[1200ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-10">
          Depoimento
        </p>
        <blockquote className="font-display tracking-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-[1.3]">
          "O novo espaço mudou completamente a percepção dos nossos clientes.
          Fechamos <em className="font-detail">40% mais contratos</em> no primeiro
          trimestre após a entrega."
        </blockquote>
        <p className="mt-12 font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
          Dr. Lucas Mendonça · Diretor de Clínica Médica
        </p>
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
      <Navbar />
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
