

# Visual Polish -- Éter Landing Page Premium

## Overview
Complete aesthetic overhaul of `LandingPage.tsx` and `index.css` to achieve Apple-grade visual refinement with sophisticated animations, micro-interactions, and premium feel.

## Changes

### 1. Global CSS Enhancements (`src/index.css`)
- Add `scroll-behavior: smooth` to `html`
- Add negative letter-spacing utility for display headings (`-0.03em`)
- Add glass-effect utility class (`backdrop-filter: blur(10px)`)
- Add custom `@keyframes` for: staggered fade-in, gentle pulse (for floating button), underline grow animation
- Add hover utilities: `.hover-lift` (translateY -5px), image zoom/darken on hover
- Increase `translateY` on scroll reveal from `8px` to `40px` as requested

### 2. Hero Section -- Staggered Entry Animation
- Each element (brand label, headline, subheadline, button) enters with incremental delay (0, 0.2s, 0.4s, 0.6s) using CSS animation classes
- Add parallax via `background-attachment: fixed` on hero background image
- Button: pill shape (`rounded-full` / 50px), premium hover with `-translate-y-0.5` and color shift

### 3. Cards & Problem Block
- Hover: `translateY(-5px)` + border transitions to bege
- Generous padding, thin border (`border-[#eee]`)
- Staggered reveal with incremental delay per card

### 4. Buttons -- Premium Style
- `rounded-full` (pill shape, ~50px radius)
- Solid black-to-bege hover transition
- Subtle elevation on hover (`-translate-y-0.5`)
- 0.3s transition

### 5. Images
- Hover: subtle zoom (`scale-1.03`) + slight darken overlay
- `loading="lazy"` already present

### 6. Floating WhatsApp Button
- Gentle pulse animation: `scale(1) -> scale(1.05) -> scale(1)` on a slow loop (~3s)
- Not aggressive

### 7. Section Backgrounds -- Alternating
- White / Bege-light / Dark sections for elegant contrast
- BeliefBreak and ForWhom on `bg-secondary` (bege-light) -- already done
- FinalCTA on dark (`bg-foreground`) -- already done
- Process section: keep white

### 8. Scroll Reveal -- Progressive Cascade
- `translateY(40px)` start (increased from 8px)
- Duration `0.7s` to `0.9s`
- Children within each section get incremental delay (stagger effect) using a new `useStaggerReveal` pattern or CSS `transition-delay` on nth-child

### 9. Typography Refinements
- Headings: `tracking-[-0.03em]` for tighter, premium feel
- Body: comfortable `leading-[1.7]`
- Strong visual hierarchy maintained

### 10. Mobile Responsiveness
- Single column layout on mobile (already handled by grid breakpoints)
- Ensure buttons are large and accessible
- Maintain generous spacing on mobile

## Files Modified
- `src/index.css` -- new utilities, keyframes, scroll-behavior
- `src/pages/LandingPage.tsx` -- all visual/animation upgrades
- `tailwind.config.ts` -- add custom animation keyframes if needed

