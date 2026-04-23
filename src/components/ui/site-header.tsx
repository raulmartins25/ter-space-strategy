import { useEffect, useState } from "react";
import logoEter from "@/assets/logo-eter.png";

const NAV_ITEMS = [
  { label: "Projetos", href: "#projetos" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md py-4 border-b border-border/40"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <img
            src={logoEter}
            alt="Éter"
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-7" : "h-9"
            }`}
          />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-[10px] tracking-[0.32em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="md:hidden font-body text-[10px] tracking-[0.32em] uppercase text-foreground/80"
        >
          Menu
        </a>
      </div>
    </header>
  );
}
