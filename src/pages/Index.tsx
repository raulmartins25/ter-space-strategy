import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { MessageCircle, Store, Building2, Palette, BarChart3, Target, Lightbulb, Ruler, Quote, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/ui/image-comparison";
import { PortfolioCarousel } from "@/components/ui/portfolio-carousel";
import Navbar from "@/components/Navbar";

import logoEterFooter from "@/assets/logo-eter-footer.png";
import heroBg from "@/assets/hero-bg.jpg";
import sociasImg from "@/assets/socias.png";
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

const WHATSAPP_URL =
  "https://wa.me/556299542888?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

/* ─── Helpers ─── */
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

function StaggerChildren({ children, visible, baseDelay = 0, increment = 120 }: {
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
          className={`transition-all duration-[700ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: visible ? `${baseDelay + i * increment}ms` : "0ms" }}
        >
          {child}
        </div>
      ))}
    </>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-[11px] tracking-[0.5em] uppercase text-secondary/60 mb-6"
        >
          Éter Arquitetura e Design
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display tracking-display text-4xl sm:text-5xl md:text-7xl text-secondary leading-[1.05] mb-8"
        >
          Arquitetura é{" "}
          <em className="font-detail">estratégia</em>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body font-light text-secondary/70 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-[1.8]"
        >
          Transformamos espaços comerciais em ativos de marca e vendas. Cada metro quadrado projetado para gerar resultado.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-hero-inst-whatsapp"
            data-gtm-event="cta_hero_inst_click"
            data-gtm-label="Hero Institucional WhatsApp"
            className="gtm-cta inline-flex items-center gap-3 bg-secondary text-foreground font-body font-medium text-sm px-10 py-4 rounded-full hover:bg-accent hover:text-secondary transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar Consultoria
          </a>
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-body text-sm text-secondary/60 hover:text-secondary transition-colors duration-300"
          >
            Ver projetos
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-secondary/40 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SOBRE (About)
   ═══════════════════════════════════════════════════════════════════ */
function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="sobre" ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className={`transition-all duration-[1000ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative">
              <img
                src={sociasImg}
                alt="Sócias — Éter Arquitetura e Design"
                className="w-full max-w-[420px] mx-auto h-auto"
                style={{
                  maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">
              Sobre nós
            </p>
            <div className="deco-line mb-8" />
            <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground mb-8 leading-[1.1]">
              Duas arquitetas. Uma visão de negócio.
            </h2>
            <p className="font-body font-light text-muted-foreground text-[15px] leading-[1.8] mb-6">
              Há mais de 7 anos no mercado, a Éter nasceu da convicção de que arquitetura não é decoração — é estratégia. 
              Unimos sensibilidade estética e visão empresarial para criar espaços que comunicam valor antes de qualquer palavra.
            </p>
            <p className="font-body font-light text-muted-foreground text-[15px] leading-[1.8] mb-10">
              Especializadas em arquitetura comercial e corporativa, entendemos que cada metro quadrado 
              é uma oportunidade de posicionar sua marca e potencializar seus resultados.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: 7, suffix: "+", label: "Anos" },
                { num: 150, suffix: "+", label: "Projetos" },
                { num: 12000, suffix: "", label: "m² projetados" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display tracking-display text-3xl sm:text-4xl text-foreground">
                    <AnimatedCounter target={s.num} suffix={s.suffix} />
                  </p>
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SERVIÇOS (Services)
   ═══════════════════════════════════════════════════════════════════ */
function Services() {
  const { ref, visible } = useScrollReveal();
  const services = [
    {
      icon: Store,
      title: "Arquitetura Comercial",
      desc: "Lojas e pontos de venda projetados para maximizar experiência de compra e conversão.",
    },
    {
      icon: Building2,
      title: "Arquitetura Corporativa",
      desc: "Escritórios e espaços de trabalho que refletem autoridade e impulsionam produtividade.",
    },
    {
      icon: Palette,
      title: "Retail Design",
      desc: "Design sensorial que transforma o ambiente em parte da estratégia de vendas.",
    },
    {
      icon: BarChart3,
      title: "Consultoria de Performance",
      desc: "Análise do seu espaço atual com diagnóstico e plano de ação para resultados.",
    },
  ];

  return (
    <section id="servicos" ref={ref} className="py-28 sm:py-36 px-8 sm:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Serviços</p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            O que fazemos
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerChildren visible={visible} baseDelay={200} increment={120}>
            {services.map((s) => (
              <motion.div
                key={s.title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group bg-background rounded-2xl p-8 border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-500 cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-500">
                  <s.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors duration-500" />
                </div>
                <h3 className="font-display tracking-display text-lg text-foreground mb-3">{s.title}</h3>
                <p className="font-body font-light text-[13px] text-muted-foreground leading-[1.7]">{s.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MÉTODO (Method)
   ═══════════════════════════════════════════════════════════════════ */
function Method() {
  const { ref, visible } = useScrollReveal();
  const steps = [
    { icon: Target, num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos seu espaço, seu público e seus objetivos de negócio para entender o que precisa mudar." },
    { icon: Lightbulb, num: "02", title: "Projeto com Intenção", desc: "Cada elemento é projetado para comunicar valor, reforçar sua marca e gerar resultado mensurável." },
    { icon: Ruler, num: "03", title: "Execução Orientada", desc: "Acompanhamento completo da obra para garantir que o espaço entregue exatamente o que foi prometido." },
  ];

  return (
    <section id="metodo" ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Processo</p>
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
                <div className="absolute top-12 left-1/2 -translate-x-1/2 font-display text-[120px] leading-none text-foreground/[0.03] select-none pointer-events-none">
                  {s.num}
                </div>
                <h3 className="font-display tracking-display text-2xl text-foreground mb-4 relative">{s.title}</h3>
                <p className="font-body font-light text-[15px] text-muted-foreground leading-[1.8] relative max-w-[280px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PORTFÓLIO (Portfolio)
   ═══════════════════════════════════════════════════════════════════ */
function Portfolio() {
  const { ref, visible } = useScrollReveal();
  const portfolioItems = [
    { title: "Consultório Médico", category: "Clínicas", description: "Marcenaria sob medida com iluminação indireta, criando um ambiente acolhedor e profissional.", src: clinica1 },
    { title: "Consultório Médico", category: "Clínicas", description: "Design funcional e elegante com materiais nobres, transmitindo confiança e sofisticação.", src: clinica2 },
    { title: "Recepção Clínica", category: "Clínicas", description: "Espaço de espera projetado para conforto e bem-estar, com mobiliário contemporâneo.", src: clinica3 },
    { title: "Sala de Atendimento", category: "Clínicas", description: "Ambiente de trabalho com mesa em mármore verde e estante em madeira.", src: clinica4 },
    { title: "Numer+Pétalla", category: "Lojas", description: "Exposição inteligente com araras metálicas e layout aberto.", src: loja1 },
    { title: "Numer+Pétalla", category: "Lojas", description: "Identidade visual integrada ao espaço com parede destaque em terracota.", src: loja2 },
    { title: "Numer+Pétalla", category: "Lojas", description: "Layout com arcos e iluminação direcional, criando experiência sensorial.", src: loja3 },
    { title: "Numer+Pétalla", category: "Lojas", description: "Mesa central de produtos integrando os ambientes de forma fluida.", src: loja4 },
  ];

  return (
    <section id="portfolio" ref={ref} className="py-28 sm:py-36 px-8 sm:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Portfólio</p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            Projetos que comunicam valor
          </h2>
        </div>
        <div
          className={`transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: visible ? "300ms" : "0ms" }}
        >
          <PortfolioCarousel items={portfolioItems} autoplay={false} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DIFERENCIAIS (Why Éter) — Before/After + Stats
   ═══════════════════════════════════════════════════════════════════ */
function Differentials() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Image comparison */}
          <div className={`md:col-span-3 transition-all duration-[1000ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <ImageComparison className="w-full h-[400px] sm:h-[520px] rounded-2xl" enableHover>
              <ImageComparisonImage src={depoisObra} alt="Resultado final" position="left" />
              <ImageComparisonImage src={antesObra} alt="Obra em andamento" position="right" className="grayscale" />
              <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-sm">
                <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
              </ImageComparisonSlider>
            </ImageComparison>
          </div>

          {/* Text */}
          <div
            className={`md:col-span-2 transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <div className="deco-line mb-8" />
            <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground mb-8 leading-[1.1]">
              Do canteiro de obras ao resultado que impressiona.
            </h2>
            <p className="font-body font-light text-muted-foreground text-[15px] leading-[1.8] mb-6">
              Acompanhamos cada etapa da transformação. Nosso compromisso é entregar 
              um espaço que não apenas encanta visualmente, mas que funciona como ferramenta de negócio.
            </p>
            <p className="font-body font-light text-muted-foreground text-[15px] leading-[1.8]">
              Arraste para ver a diferença entre o processo e o resultado final.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DEPOIMENTOS (Testimonials)
   ═══════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const { ref, visible } = useScrollReveal();
  const testimonials = [
    {
      quote: "O novo escritório mudou completamente a percepção dos nossos clientes. Fechamos 40% mais contratos no primeiro trimestre após a reforma.",
      name: "Dr. Lucas Mendonça",
      role: "Diretor de Clínica Médica",
    },
    {
      quote: "A Éter entendeu que nosso espaço precisava vender antes de qualquer atendente. O resultado superou todas as expectativas.",
      name: "Camila Rezende",
      role: "Proprietária, Numer+Pétalla",
    },
    {
      quote: "Profissionalismo impecável. Cada detalhe foi pensado para o nosso público. O ROI do projeto se pagou em 6 meses.",
      name: "Rodrigo Alves",
      role: "CEO, Grupo RA Empreendimentos",
    },
  ];

  return (
    <section ref={ref} className="py-28 sm:py-36 px-8 sm:px-12 bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Depoimentos</p>
          <h2 className="font-display tracking-display text-3xl sm:text-4xl text-foreground leading-[1.1]">
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StaggerChildren visible={visible} baseDelay={200} increment={150}>
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background rounded-2xl p-8 border border-border relative">
                <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
                <p className="font-body font-light text-foreground text-[15px] leading-[1.8] mb-8 relative z-10">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-display text-sm text-foreground">{t.name}</p>
                  <p className="font-body text-[12px] text-muted-foreground mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA + CONTATO
   ═══════════════════════════════════════════════════════════════════ */
function ContactCTA() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="contato" ref={ref} className="relative overflow-hidden pt-0 pb-32 sm:pb-40 px-8 sm:px-12 bg-[#f0e5db]">
      {/* Partner photo behind text */}
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

      {/* CTA text */}
      <div
        className={`max-w-3xl mx-auto text-center relative z-10 -mt-24 sm:-mt-32 transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="deco-line mx-auto mb-10 bg-[#5c4336]/30" />
        <h2 className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl text-[#5c4336] mb-8 leading-[1.1]">
          Pronto para transformar seu espaço em estratégia?
        </h2>
        <p className="font-body font-light text-[#5c4336] text-base sm:text-lg mb-14 leading-[1.8]">
          Agende sua Análise de Performance Espacial e descubra o potencial do seu ambiente.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-contato-whatsapp"
          data-gtm-event="cta_contato_click"
          data-gtm-label="Contato WhatsApp"
          className="gtm-cta gtm-cta-contato inline-flex items-center gap-3 bg-[#5c4939] text-[#e5eaed] font-body font-medium text-sm px-10 py-4 rounded-full hover:opacity-90 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl"
        >
          <MessageCircle className="w-5 h-5" />
          Agendar Consultoria no WhatsApp
        </a>
      </div>

      {/* Contact info */}
      <div
        className={`max-w-2xl mx-auto mt-20 grid sm:grid-cols-3 gap-8 text-center transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        style={{ transitionDelay: visible ? "300ms" : "0ms" }}
      >
        <div className="flex flex-col items-center gap-2">
          <Phone className="w-5 h-5 text-[#5c4336]/60" />
          <p className="font-body text-[13px] text-[#5c4336]/80">(62) 99954-2888</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MapPin className="w-5 h-5 text-[#5c4336]/60" />
          <p className="font-body text-[13px] text-[#5c4336]/80">Goiânia, GO</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Instagram className="w-5 h-5 text-[#5c4336]/60" />
          <a href="https://instagram.com/eter.arq" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-[#5c4336]/80 hover:text-[#5c4336] transition-colors link-underline">
            @eter.arq
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-8 sm:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-12 items-start mb-12">
          {/* Logo */}
          <div>
            <img src={logoEterFooter} alt="Éter Arquitetura e Design" className="h-14 w-auto opacity-80 mb-4" />
            <p className="font-body font-light text-[13px] text-muted-foreground leading-[1.7] max-w-[260px]">
              Arquitetura estratégica para espaços que vendem, posicionam e encantam.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-display text-sm text-foreground mb-4">Navegação</p>
            <div className="flex flex-col gap-3">
              {["inicio", "sobre", "servicos", "metodo", "portfolio", "contato"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors text-left capitalize"
                >
                  {id === "servicos" ? "Serviços" : id === "metodo" ? "Método" : id === "portfolio" ? "Portfólio" : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-display text-sm text-foreground mb-4">Conecte-se</p>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/eter.arq" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="mailto:contato@eterarquitetura.com.br" className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> E-mail
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="font-body font-light text-xs text-muted-foreground text-center tracking-wide">
            © {new Date().getFullYear()} Éter Arquitetura e Design. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING WHATSAPP
   ═══════════════════════════════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="cta-float-inst-whatsapp"
      data-gtm-event="cta_float_inst_click"
      data-gtm-label="Float Institucional WhatsApp"
      className="gtm-cta gtm-cta-float fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-secondary shadow-xl animate-gentle-pulse hover:bg-accent hover:text-foreground transition-colors duration-300"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function Index() {
  return (
    <div className="font-body bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Method />
      <Portfolio />
      <Differentials />
      <Testimonials />
      <ContactCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
