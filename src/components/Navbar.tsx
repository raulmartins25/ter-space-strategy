import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoEterSiteDefault from "@/assets/logo-eter-site.jpeg";

interface NavbarProps {
  logoSrc?: string;
}

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Método", href: "#metodo" },
  { label: "Contato", href: "#contato" },
];

const WHATSAPP_URL =
  "https://wa.me/556299542888?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

export default function Navbar({ logoSrc }: NavbarProps = {}) {
  const logoEterSite = logoSrc ?? logoEterSiteDefault;
  const isCustom = !!logoSrc;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
        <a href="#inicio" onClick={() => scrollTo("#inicio")} className="flex items-center">
          <img src={logoEterSite} alt="Éter Arquitetura e Design" className={`w-auto ${isCustom ? "h-10" : "h-9 rounded-sm"}`} />
        </a>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-foreground"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 w-[220px] bg-background border-r border-border flex-col justify-between py-10 px-8">
        <a href="#inicio" onClick={() => scrollTo("#inicio")} className="flex items-center">
          <img src={logoEterSite} alt="Éter Arquitetura e Design" className={`w-auto ${isCustom ? "h-14" : "h-12 rounded-sm"}`} />
        </a>

        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-body text-[11px] tracking-[0.32em] uppercase text-foreground/70 hover:text-accent transition-colors duration-300 text-left"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href="https://www.instagram.com/eter.arqdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] tracking-[0.32em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-nav-whatsapp"
            data-gtm-event="cta_nav_click"
            data-gtm-label="Nav WhatsApp"
            className="gtm-cta gtm-cta-nav font-body text-[10px] tracking-[0.32em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </aside>

      {/* Mobile off-canvas */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-background flex flex-col p-8 animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between mb-16">
            <img src={logoEterSite} alt="Éter Arquitetura e Design" className={`w-auto ${isCustom ? "h-11" : "h-10 rounded-sm"}`} />
            <button onClick={() => setOpen(false)} className="p-2" aria-label="Fechar menu">
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>
          <nav className="flex flex-col gap-7">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-display tracking-display text-2xl text-foreground text-left hover:text-accent transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href="https://www.instagram.com/eter.arqdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] tracking-[0.32em] uppercase text-muted-foreground"
            >
              Instagram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gtm-cta font-body text-[11px] tracking-[0.32em] uppercase text-muted-foreground"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
