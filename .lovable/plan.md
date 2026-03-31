

## Plan: Add partner photo above FinalCTA with bottom-to-top gradient fade

### What
Place the uploaded photo of the two partners (`IMG_7914-removebg-preview.png`) above the FinalCTA section, with a gradient that goes from transparent at the bottom to opaque at the top — creating a blend effect where the image fades into the dark brown CTA background below.

### Steps

1. **Copy image** to `src/assets/socias.png`

2. **Add a new section between Projects and FinalCTA** in `LandingPage.tsx`:
   - Container with `bg-foreground` (same brown as FinalCTA) and `relative overflow-hidden`
   - The partner image centered, with a CSS gradient overlay (`mask-image` or a `div` with `bg-gradient-to-t from-foreground to-transparent`) covering the bottom portion
   - This creates the effect of the image emerging from transparent at the bottom and becoming fully visible at the top
   - Remove padding-top from FinalCTA to make the sections feel seamless

3. **Implementation detail**:
   - Use `mask-image: linear-gradient(to top, transparent, black 60%)` on the image for a clean fade effect
   - Or overlay a `div` with `bg-gradient-to-t from-[hsl(var(--foreground))] to-transparent` on top of the image
   - Image should be centered, reasonable max-width (~400-500px)

### Files changed
- `src/assets/socias.png` (new)
- `src/pages/LandingPage.tsx` (add partner image section before FinalCTA)

