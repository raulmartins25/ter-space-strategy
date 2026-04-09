

## Plan: Replace hero background color with uploaded texture image

The hero section currently uses a solid beige (`bg-[#b29b7b]`) background on the left side. Replace it with the uploaded gray concrete/marble texture image (`FUNDO.png`).

### Changes

**1. Copy uploaded image to project assets**
- Copy `user-uploads://FUNDO.png` to `src/assets/FUNDO.png`

**2. Update `src/components/ui/hero-section-2.tsx`**
- Add a `backgroundTexture` prop to `HeroSectionProps`
- On the left content side (`motion.div`), render the texture as an absolute-positioned background image with `object-cover` when provided

**3. Update `src/pages/LandingPage.tsx`**
- Import `FUNDO.png` from assets
- Pass it as `backgroundTexture` prop to `HeroSection`
- Remove `bg-[#b29b7b]` from the className (the texture replaces it)
- Keep text colors as-is or adjust if contrast changes with the new gray background

### Technical detail
The left panel gets a `<img>` or `background-image` covering the area behind the text content, similar to how the right panel already handles `backgroundImage`. The text sits on top via `z-10`.

