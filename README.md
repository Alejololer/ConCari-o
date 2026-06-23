# Con Cariño 💝

Catálogo con identidad + panel de gestión para **Con Cariño**, negocio de detalles (fresas
con chocolate, desayunos sorpresa y boxes) para cada ocasión. Pedidos por WhatsApp, costo $0
(Vercel + Supabase free).

## Desarrollo
```bash
npm install
cp .env.example .env.local   # opcional: vacío = catálogo seed; con llaves = Supabase
npm run dev                  # http://localhost:3000
```

## Scripts
- `npm run dev` / `build` / `start`
- `npm run typecheck` — `tsc --noEmit`
- `npm run check` — self-check de la lógica de carrito/WhatsApp

## Documentación
- `CLAUDE.md` — arquitectura y reglas (léelo antes de contribuir).
- `DESIGN_SYSTEM.md` — tokens y capas de diseño.
- `handoff.md` — estado, pendientes y pasos de Supabase/Vercel.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase · Vercel.
