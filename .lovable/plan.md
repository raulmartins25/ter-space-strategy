

# Trocar seção de Projetos da `/` pelo grid da `/lp`

## O que muda

Na página `/`, vou substituir as duas seções atuais (`FeaturedProjects` editorial alternado + `PortfolioMosaic` em 2 colunas) por **uma única seção `Projects`** usando o mesmo componente `PortfolioGrid` que está em `/lp` — grid de 3 colunas, cantos arredondados, hover com overlay escuro mostrando o título, e lightbox com navegação ao clicar.

## Layout final da seção

```text
                    PORTFÓLIO  (label pequena tracking amplo)

           Projetos que comunicam valor   (título font-display)


   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │ clinica1 │  │ clinica2 │  │ clinica4 │
   └──────────┘  └──────────┘  └──────────┘
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  salus1  │  │  loja2   │  │  loja4   │
   └──────────┘  └──────────┘  └──────────┘

                   Ver todos →   (link discreto)
```

## Itens do grid

Reaproveita os assets já importados em `Index.tsx`:
- Consultório Endocrinologista (`clinica1`)
- Consultório Angiologista (`clinica2`)
- Consultório Cardiologista (`clinica4`)
- Laboratório Salus (`salus1`)
- Numer + Pétalla (`loja2`)
- Loja Numer+Pétalla (`loja4`)

## Estilo (mantém minimalismo Éter)

- Fundo `bg-background` (off-white da paleta Éter)
- Label "Portfólio" em `font-body text-[10px] tracking-[0.5em] uppercase`
- Título "Projetos que comunicam valor" em `font-display tracking-display text-3xl/4xl/5xl`
- Grid `PortfolioGrid` com aspect 4:3, cantos arredondados, hover overlay com título
- Link "Ver todos →" no final em `link-underline` discreto
- Padding generoso: `py-28 sm:py-40 px-6 sm:px-12`

## Mudanças técnicas

**Único arquivo editado: `src/pages/Index.tsx`**
- Adicionar import do `PortfolioGrid`
- Remover funções `FeaturedProjects` e `PortfolioMosaic`
- Criar nova função `Projects` (id=`projetos`) com label + título + `<PortfolioGrid items={...} />` + link
- Substituir no JSX final: `<FeaturedProjects />` e `<PortfolioMosaic />` por `<Projects />`
- Remover imports não usados (`heroBg` continua, mas `loja2/loja4/salus1/salus2/clinica1/clinica2/clinica4` consolidam para os 6 do grid)

Nada mais é tocado — sidebar, hero, sobre, método, depoimento, contato e footer permanecem como estão.

