import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logoEterSite from "@/assets/logo-eter-site.jpeg";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Método", href: "#metodo" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
];

const WHATSAPP_URL =
  "https://wa.me/556299542888?text=Quero%20uma%20an%C3%A1lise%20do%20meu%20escrit%C3%B3rio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 h-20">
        {/* Logo */}
        <a href="#inicio" onClick={() => scrollTo("#inicio")} className="flex items-center">
          <img
            src={logoEterSite}
            alt="Éter Arquitetura e Design"
            className="h-10 w-auto rounded-sm"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="link-underline font-body text-[13px] tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-nav-whatsapp"
            data-gtm-event="cta_nav_click"
            data-gtm-label="Nav WhatsApp"
            className="gtm-cta gtm-cta-nav inline-flex items-center gap-2 bg-foreground text-background font-body text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-accent transition-colors duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground" aria-label="Menu">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background pt-16 w-72">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    className="font-display tracking-display text-xl text-foreground text-left hover:text-accent transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gtm-cta inline-flex items-center gap-2 bg-foreground text-background font-body text-sm font-medium px-6 py-3 rounded-full mt-4 w-fit"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
