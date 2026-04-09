

## Plan: Remove "Recepção Clínica" photo from portfolio

### Changes

**`src/pages/LandingPage.tsx`**:
- Remove the `import clinica3` line
- Remove the portfolio item with `title: "Recepção Clínica"` and `src: clinica3`

**`src/pages/Index.tsx`**:
- Remove the `import clinica3` line
- Remove the portfolio item with `title: "Recepção Clínica"` and `src: clinica3`

Both files already have the item — removing from both keeps the portfolio consistent across `/` and `/lp`.

