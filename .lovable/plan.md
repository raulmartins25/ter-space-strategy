

## Plan: Restructure "Por que investir" section layout

Change the current side-by-side (image left, text right) layout to a stacked, centered layout:

### Changes in `src/pages/LandingPage.tsx` — `PromiseSection` component

**1. Image centered on top**
- Remove the `grid md:grid-cols-5` wrapper
- Place the `ImageComparison` block full-width centered at the top (max-width ~800px)

**2. Title centered below image**
- Move the `deco-line` + `h2` below the image, centered with `text-center`

**3. Bullet points in 2 columns**
- Change `<ul className="space-y-5">` to a `grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5` layout
- Keep the same bullet style (dot + text)

The overall structure becomes:
```text
┌──────────────────────────────────┐
│     [Before/After Image]         │
│         (centered)               │
├──────────────────────────────────┤
│          ── deco line ──         │
│   Por que investir em uma        │
│     projeto com a Éter?          │
├──────────────────────────────────┤
│  • Bullet 1       • Bullet 7    │
│  • Bullet 2       • Bullet 8    │
│  • ...             • ...        │
└──────────────────────────────────┘
```

