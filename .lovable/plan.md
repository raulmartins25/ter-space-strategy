

## Plan: Add blur gradient between hero columns

Add a pseudo-element/overlay at the right edge of the left panel (or left edge of the right panel) that creates a soft blur transition between the texture and the photo.

### Change

**`src/components/ui/hero-section-2.tsx`**

After the right-side `motion.div` opening (line ~152), add an absolutely-positioned gradient overlay on the left edge of the right panel. This div will have a gradient from semi-transparent black/gray to transparent, combined with `backdrop-filter: blur()` to create a soft blurred transition.

Specifically, add a `div` inside the right-side `motion.div` positioned at `left-0, top-0, bottom-0` with ~40-60px width, using:
- `backdrop-blur-md` (or `backdrop-blur-sm`) for the blur effect
- A gradient mask (`mask-image: linear-gradient(to right, black, transparent)`) so the blur fades naturally from left to right

This keeps the effect purely visual and doesn't affect layout.

