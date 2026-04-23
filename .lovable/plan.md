

# Hero `/` — espaçamento e título em linha única

Ajustes em `src/pages/Index.tsx`, na função `Hero`:

1. **Título "Arquitetura é estratégia." em uma única linha**
   - Remover o `<br />` entre "Arquitetura" e "é estratégia."
   - Adicionar `whitespace-nowrap` no `<h1>` para garantir que não quebre em telas médias/grandes
   - Reduzir o tamanho responsivo nos breakpoints menores caso necessário (manter `text-3xl sm:text-5xl md:text-6xl lg:text-7xl` — cabe sem quebrar pois "Arquitetura é estratégia." é curto)

2. **Espaço maior entre "GOIÂNIA · BRASIL" e o título**
   - Adicionar `mt-12` (≈48px) ao bloco do título no desktop (`md:mt-12`), preservando o `my-12` mobile já existente
   - Resultado: respiro generoso entre o pequeno label superior e o título principal, alinhado ao estilo editorial do site

## Resultado visual

```text
GOIÂNIA · BRASIL

[respiro generoso]

Arquitetura é estratégia.
```

Título numa linha só, com a mesma formatação tipográfica (display + itálico Lora em "estratégia"), e espaçamento consistente com o restante do layout editorial.

