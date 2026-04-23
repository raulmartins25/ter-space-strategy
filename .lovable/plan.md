
## Correção: aplicar redesign Arthur Casas na rota `/` (Index.tsx)

### Problema identificado

O redesign editorial estilo Studio Arthur Casas foi aplicado em `src/pages/LandingPage.tsx` (rota `/lp`), mas deveria ter sido aplicado em `src/pages/Index.tsx` (rota `/`, a home).

```text
/      → Index.tsx        ← deveria ter sido aqui (ainda no design antigo)
/lp    → LandingPage.tsx  ← redesign Arthur Casas foi aplicado aqui (errado)
```

### Plano de correção

**1. Reverter `src/pages/LandingPage.tsx`**
- Restaurar o conteúdo anterior da `/lp` para que volte a ser a landing page institucional/comercial original (como estava antes do redesign).

**2. Aplicar o redesign Arthur Casas em `src/pages/Index.tsx`**
- Reescrever `Index.tsx` com a mesma estrutura editorial já desenhada:
  - `SiteHeader` fixo minimalista (componente já existe em `src/components/ui/site-header.tsx`, será reutilizado)
  - Hero editorial fullscreen com tipografia Lora
  - Manifesto centralizado serif
  - Grid assimétrico de projetos (large/medium, left/right) usando as imagens já existentes (clinica1, clinica2, clinica4, loja2, loja3, loja4, salus1, salus2)
  - Seção Estúdio com sócias
  - Processo em 3 colunas tipográficas
  - CTA final editorial
  - Footer denso
  - Botão flutuante WhatsApp mantido
- Manter classes utilitárias `.label-caps`, `.editorial-link`, `.font-serif-display` já adicionadas em `src/index.css` (não precisa alterar CSS).

**3. Manter intacto**
- `src/App.tsx` (rotas continuam iguais)
- `src/index.css` (utilitários editoriais permanecem)
- `src/components/ui/site-header.tsx` (componente reutilizado)
- Todas as imagens em `src/assets/`
- Link do WhatsApp e IDs de tracking GTM (`cta-hero-inst-whatsapp`, `data-gtm-event`, etc.) — preservados na nova `/`

### Como vai ficar após a correção

```text
/      → Index.tsx        ← redesign editorial Arthur Casas (correto)
/lp    → LandingPage.tsx  ← landing institucional original restaurada
```

### Detalhes técnicos

- A reversão de `LandingPage.tsx` será feita restaurando a versão anterior ao redesign (pré-mensagem "quero que a home page seja no estilo arthurcasas").
- A nova `Index.tsx` usará exatamente a mesma arquitetura de componentes/seções já validada, apenas movida de arquivo.
- Tracking GTM/IDs do CTA WhatsApp serão reaplicados nos botões da nova home para não quebrar analytics.
