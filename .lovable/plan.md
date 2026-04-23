
# Trocar 3 passos da seção "Método" da `/` pelo modelo da `/lp`

Replico o componente `Process` da `/lp` (com ícones, círculos, número translúcido grande de fundo e linha do tempo) dentro da função `Method()` da `/`, mantendo `id="metodo"` e o fundo `bg-secondary`.

## Conteúdo dos 3 passos (igual à `/lp`)

1. **01 — Diagnóstico Estratégico** (ícone `Target`)  
   "Analisamos seu espaço, seu público e as diretrizes centrais do seu negócio."
2. **02 — Projetamos atmosferas** (ícone `Lightbulb`)  
   "Transformamos estética em estratégia e experiências que conectam, envolvem e convertem."
3. **03 — Execução Orientada** (ícone `Ruler`)  
   "Acompanhamento próximo para garantir que o espaço entregue o que promete."

## Implementação

Único arquivo alterado: `src/pages/Index.tsx`

- **Imports**: adicionar `Target, Lightbulb, Ruler` ao import de `lucide-react`
- **Função `Method()`**: reescrever apenas o conteúdo:
  - Header centralizado mantendo eyebrow "Método" + título "Como *projetamos*."
  - Grid `md:grid-cols-3` com classe `timeline-line` (já usada em `/lp` — linha horizontal sutil entre os círculos)
  - Cada passo: círculo `w-16 h-16` com borda + ícone, número grande (120px) translúcido como marca-d'água atrás do título, título em `font-display`, descrição centralizada com `max-w-[280px]`
  - Animação `useReveal` mantida com stagger de 180ms

Sidebar, hero, sobre, projetos, depoimento, contato e footer permanecem intactos. `/lp` não é tocada.
