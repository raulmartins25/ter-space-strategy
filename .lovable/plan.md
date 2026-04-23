

# Portfolio `/`: imagens dessaturadas/transparentes que ganham cor no hover

Efeito aplicado **apenas na `/`** (a `/lp` permanece intacta), via prop opcional `dimmed` adicionada ao componente compartilhado `PortfolioGrid`.

## Mudanças

**1. `src/components/ui/portfolio-grid.tsx`**
- Adicionar prop opcional `dimmed?: boolean` (default `false`, preservando comportamento atual da `/lp`)
- Quando `dimmed=true`, aplicar na `<img>`:
  - Estado padrão: `opacity-60 saturate-50` → imagem apagada/dessaturada
  - Hover (via `group-hover`): `opacity-100 saturate-100` → cor e nitidez completas
  - Transição: `transition-all duration-500` para suavidade
- Zoom no hover (`group-hover:scale-105`) e overlay escuro com título já existentes são mantidos

**2. `src/pages/Index.tsx`**
- Passar a prop na seção Projects: `<PortfolioGrid items={items} dimmed />`

## Resultado

Igual à referência enviada: grid em estado "calmo" e suavemente apagado por padrão; cada card ganha vida (cor + nitidez + leve zoom) ao passar o mouse, com o título aparecendo sobre o overlay escuro. A `/lp` continua usando o grid em cor cheia.

