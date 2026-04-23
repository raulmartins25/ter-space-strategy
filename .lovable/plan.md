
# Trocar logo do menu apenas na página `/`

Hoje, `Navbar` é compartilhado entre `/` e `/lp`. Para trocar a logo **só na `/`** sem afetar a `/lp`, adiciono uma prop opcional no `Navbar`.

## Implementação

1. **Copiar asset**: `user-uploads://logoo-removebg-preview.png` → `src/assets/logo-eter-novo.png`

2. **`src/components/Navbar.tsx`**:
   - Aceitar prop opcional `logoSrc?: string` (default = `logo-eter-site.jpeg` atual, mantendo `/lp` intacta)
   - Usar `logoSrc` nas 3 `<img>` (sidebar desktop, top bar mobile, off-canvas mobile)
   - Remover `rounded-sm` quando a logo nova for usada (PNG transparente não precisa)

3. **`src/pages/Index.tsx`**: passar `<Navbar logoSrc={logoEterNovo} />` importando o novo asset.

4. **`src/pages/LandingPage.tsx`**: **não é tocada** — segue usando a logo padrão.

## Ajustes de tamanho

Como a logo nova é horizontal (mais larga que alta), aumento ligeiramente a altura para manter legibilidade: sidebar `h-14`, top mobile `h-10`, off-canvas `h-11` — apenas quando `logoSrc` customizada é passada.
