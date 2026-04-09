

## Plan: Update LP Hero — new image + straight vertical division

### Changes (only affects `/lp`)

**1. Replace hero background image**
- Copy `user-uploads://IMG_7927.jpg` → `src/assets/hero-bg.jpg` (overwrite)

**2. Remove diagonal clip-path in `src/components/ui/hero-section-2.tsx`**
- Change line 147-148 clipPath from diagonal polygon to straight rectangle:
  - `polygon(30% 0, 100% 0, 100% 100%, 0% 100%)` → `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
  - `polygon(20% 0, 100% 0, 100% 100%, 0% 100%)` → `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
- This makes the image section a clean rectangle with a straight vertical edge

**No impact on `/`** — the Index page has its own inline hero and does not use this component.

