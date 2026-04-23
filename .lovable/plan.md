
# Hero `/`: trocar imagem e aplicar 40% de opacidade (60% transparência)

## O que muda

1. **Asset novo**: copiar `user-uploads://IMG_2197_1.jpg` → `src/assets/hero-consultorio.jpg`
2. **`src/pages/Index.tsx`**:
   - Trocar import: `heroBg from "@/assets/hero-bg-site.jpg"` → `heroBg from "@/assets/hero-consultorio.jpg"`
   - Aplicar `opacity-40` na `<img>` da hero (60% de transparência conforme pedido)

```diff
- <img src={heroBg} ... className="w-full h-full object-cover" />
+ <img src={heroBg} ... className="w-full h-full object-cover opacity-40" />
```

Nada mais é tocado. `/lp` permanece intacta.
