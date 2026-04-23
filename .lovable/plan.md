

# Ajuste visual — seção Avaliações

Mudanças mínimas em `src/pages/Index.tsx` na função `Quote`:

1. **Fundo da seção**: trocar `bg-secondary` por `bg-background` (branco/off-white do tema).
2. **Cards**: como o fundo agora é igual ao do card, adicionar contraste com:
   - Borda mais sutil: `border border-border/70`
   - Sombra leve em estado padrão: `shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)]`
   - Sombra mais pronunciada no hover: `shadow-[0_8px_24px_-8px_hsl(var(--foreground)/0.15)]`

Resto da seção (cabeçalho, logo Google, estrelas, conteúdo dos cards, botão "Ver todas") permanece inalterado.

