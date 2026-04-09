

## Plan: Improve benefits list symmetry and reduce whitespace

The current list uses `gap-y-5` (20px) and `leading-[1.8]` which creates excessive vertical spacing, especially visible on the reference screenshot. Two adjustments:

### Changes to `src/pages/LandingPage.tsx` (lines 271-281)

1. **Reduce vertical gap**: Change `gap-y-5` → `gap-y-2` (8px between items)
2. **Tighten line-height**: Change `leading-[1.8]` → `leading-[1.5]` on the text spans
3. **Reduce horizontal gap**: Change `gap-x-12` → `gap-x-10` for slightly tighter columns
4. **Align bullet dot**: Change `mt-2` → `mt-1.5` to match the tighter line-height

This keeps the 2-column grid but makes items more compact and evenly spaced, matching the reference image where items are close together with minimal breathing room.

