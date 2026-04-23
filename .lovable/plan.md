

# Redesign da `/` no estilo Studio Arthur Casas — mantendo identidade Éter

Vamos transformar a página `/` em um site **editorial minimalista** inspirado na estrutura/diagramação do arthurcasas.com, mas **preservando 100% da identidade visual da Éter**: paleta de cores atual, tipografia (font-display, font-body, font-detail Lora itálico), logo, e tom de voz.

## O que muda (estrutura/layout — Arthur Casas)

- **Sidebar fixa à esquerda** (estilo arthurcasas.com): logo Éter no topo, menu vertical discreto embaixo (PROJETOS · SOBRE · CONTATO). Em mobile vira hamburger.
- **Hero split**: metade esquerda off-white com tipografia Éter ("ÉTER ARQUITETURA E DESIGN" em font-display tracking amplo), metade direita uma foto grande full-height.
- **Grid editorial de projetos em destaque**: 3 imagens grandes alternadas (esquerda/direita), cada uma com label de categoria pequena + título do projeto + cidade — sem cards, sem sombras, sem bordas arredondadas.
- **Teasers narrativos**: cada bloco (Projetos, Sobre, Contato) segue o padrão Arthur Casas — uma frase curta + link "Ver mais →".
- **Remoção de elementos pesados**: cards de Serviços/Método com ícones, cards de Depoimentos com aspas, image-comparison antes/depois, botões pílula grandes espalhados, gradientes, hovers de scale/translate agressivos.

## O que se mantém (identidade Éter)

- **Cores**: paleta atual (`bg-background`, `text-foreground`, `bg-secondary`, `accent`, `#5c4336`, `#f0e5db`) — nada vira off-white Arthur Casas
- **Tipografia**: `font-display` (títulos), `font-body` (corpo), `font-detail` (Lora itálico para palavras de ênfase) — mantidas exatamente como hoje
- **Logo Éter** (header e footer)
- **Tom de voz**: "arquitetura é estratégia", textos sobre Éter, depoimentos
- **CTAs WhatsApp** com link e tracking GTM, mas em estilo mais discreto (link com underline + ícone pequeno, em vez de botão pílula gigante)
- **WhatsApp flutuante** — mantido
- **Animações de fade-in** ao scroll (apenas opacity, sem translate agressivo)

## Nova estrutura da página

```text
┌─ Sidebar fixa esquerda (220px) ────────────────────────┐
│ [logo Éter]                                            │
│                                                        │
│ PROJETOS                                               │
│ SOBRE                                                  │
│ MÉTODO                                                 │
│ CONTATO                                                │
│ — — —                                                  │
│ INSTAGRAM                                              │
│ WHATSAPP                                               │
└────────────────────────────────────────────────────────┘
   │ Conteúdo (margin-left: 220px desktop)
   │
   1. HERO SPLIT          → texto Éter à esquerda + foto full-height à direita
   2. PROJETOS DESTAQUE   → 3 projetos em grid editorial alternado
                            (Clínica · Loja · Laboratório)
   3. VER TODOS           → frase curta + link "Ver todos os projetos →"
   4. SOBRE TEASER        → foto sócias grande + parágrafo curto + "Leia mais →"
   5. MÉTODO              → 3 passos em texto puro tipográfico (sem ícones, sem círculos)
   6. DEPOIMENTO ÚNICO    → uma citação grande, tipográfica, centralizada
   7. CONTATO MINIMAL     → telefone, instagram, whatsapp em linha tipográfica
   8. FOOTER ENXUTO       → logo + copyright em linha única
```

## Mudanças por arquivo

**`src/components/Navbar.tsx`** → reescrever como **sidebar fixa lateral** usando shadcn `Sidebar` (`collapsible="offcanvas"` mobile, sempre visível desktop):
- Logo Éter no topo
- Menu vertical: links âncora para `#projetos`, `#sobre`, `#metodo`, `#contato`
- Tipografia: `font-body` text-[11px] tracking-[0.4em] uppercase (já usada no projeto)
- Cores: `bg-background`, `text-foreground`, hover `text-accent`
- Mobile: SidebarTrigger no canto superior esquerdo

**`src/pages/Index.tsx`** → reescrever as seções:
- `Hero` → split layout (50/50 desktop, stack mobile), texto à esquerda em `font-display`
- `FeaturedProjects` (nova) → 3 blocos editoriais alternados, full-bleed à direita do conteúdo
- `AllProjectsTeaser` (nova) → substitui o `PortfolioCarousel`
- `About` → simplificar para foto grande + 1 parágrafo + link "Leia mais →" (remover stats card)
- `Method` → texto tipográfico puro: número grande discreto + título + descrição em coluna, sem círculos, sem ícones
- `Testimonials` → uma única citação grande em vez de 3 cards
- Remover: `Services`, `Differentials` (image comparison), `Portfolio` (carousel)
- `ContactCTA` → minimalismo tipográfico: H2 grande + linha com Phone · Instagram · WhatsApp em texto + link
- `Footer` → uma linha só

**Layout wrapper** → envelopar tudo em `SidebarProvider` + `<main className="md:ml-[220px]">`

## Detalhes técnicos

- Apenas `Index.tsx` e `Navbar.tsx` editados
- `LandingPage.tsx` (`/lp`) **não é tocada**
- Reaproveita todos os assets já importados (clinica1, loja2, salus1, sociasAboutImg, heroBg)
- Nenhuma dependência nova; usa shadcn `Sidebar` que já existe em `components/ui/sidebar.tsx`
- Mantém `framer-motion` apenas para fade `opacity 0→1`
- Mantém IDs `data-gtm-*` nos CTAs WhatsApp restantes
- Acessibilidade preservada (alt, aria-label, semantic headings)
- Mobile: sidebar vira off-canvas com hamburger; hero empilha texto+imagem

