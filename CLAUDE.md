@AGENTS.md

# Con Cariño

Web de catálogo con identidad para **Con Cariño**, un negocio ecuatoriano de detalles
(fresas con chocolate, desayunos sorpresa y boxes) para cumpleaños, San Valentín, Día de
la madre/padre y demás fechas. Dos caras:

- **Tienda** (`/`, `/catalogo`, `/producto/[id]`): catálogo filtrable + carrito que termina
  en un pedido por **WhatsApp** (no hay pasarela de pago).
- **Panel** (`/cms`, `/login`): la dueña gestiona productos, protegido con Supabase Auth.

Objetivo permanente: **costo $0** (Vercel Hobby + Supabase free).

## Stack
Next.js 16 (App Router, RSC) · TypeScript · Tailwind v4 (tokens CSS-first) · Supabase
(Postgres + Auth) · deploy en Vercel. Sin headless CMS externo: el panel propio + Supabase
cubren la gestión de contenido.

## Comandos
```bash
npm run dev         # desarrollo
npm run build       # build de producción
npm run typecheck   # tsc --noEmit
npm run check       # self-check de lógica (carrito/WhatsApp)
```

## Supabase — esquema y seed (estrategia oficial)
El **CLI global `supabase`** ya está **logueado y linkeado** al proyecto `con-carino`
(`qmdxmvswtqpvushfogjn`). Úsalo directamente (NO `npx`, NO Docker/local — todo va al remoto):

```bash
supabase db push --dry-run          # ver qué migraciones faltan en remoto
supabase db push --include-seed     # aplica migraciones nuevas + corre supabase/seed.sql
supabase migration list --linked    # estado local vs remoto
```
- **Migraciones**: SQL en `supabase/migrations/NNNN_*.sql`. Para cambios de esquema, crea una
  migración nueva y actualiza también `src/lib/types.ts` y el mapeo en `src/lib/products.ts`
  (regla 8). **Storage**: no hagas `alter table storage.objects enable row level security`
  (no somos owner → error 42501); RLS ya está activo, solo crea `policy` sobre el bucket.
- **Seed**: `supabase/seed.sql` contiene el catálogo completo (idempotente: `delete` + `insert
  … on conflict do update`). Se genera de los productos reales; `--include-seed` lo aplica al
  remoto. El `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable key) **no** puede escribir (RLS
  authenticated) — sembrar siempre por el CLI, nunca con la anon key.

## Arquitectura — léelo antes de tocar código

**Atomic Design** (regla, no sugerencia). Cada componente vive en su capa y solo importa de
capas iguales o inferiores. Detalle completo en `DESIGN_SYSTEM.md`.
```
atoms      → src/components/atoms       (Button, Badge, Price, Chip, Field…)  sin lógica de negocio
molecules  → src/components/molecules   (ProductCard, CartLineRow, CmsRow…)   componen atoms
organisms  → src/components/organisms   (Header, CartDrawer, ProductDetail…)  secciones completas
templates  → layouts en src/app/**/layout.tsx
pages      → src/app/**/page.tsx        (solo orquestan: fetch + componer organisms)
```

**Flujo de datos**
- Lectura: `src/lib/products.ts` (`getProducts`, `getProduct`) es la **única** puerta a los
  productos. Las páginas son Server Components que la llaman. No consultes Supabase desde una
  página/componente directamente.
- Escritura (CMS): Server Actions en `src/app/cms/actions.ts`. Nada de rutas API para esto.
- Carrito: `src/lib/cart.tsx` (Context + localStorage), solo cliente.
- Identidad/contacto: `src/data/brand.ts`. Ocasiones y tipos: `src/data/{occasions,types}.ts`.

**Modo seed vs Supabase**
`src/lib/supabase/env.ts` expone `hasSupabase`. Sin las env vars, la app corre con el
catálogo seed (`src/data/products.seed.ts`) y el panel queda en modo demo (sin guardar). Con
las env vars, lee/escribe en Supabase. **Mantén ambos caminos vivos** — el build de CI corre
sin secretos.

## Reglas duras (evitar errores garrafales)
1. **Colores/espaciado/fuentes solo vía tokens** de `globals.css` (`bg-cream`, `text-rose`,
   `rounded-card`, `font-display`…). Prohibido hex suelto o estilos inline de color en componentes.
2. **No** agregar dependencias para lo que resuelven el stdlib, la plataforma o unas pocas
   líneas (ej. no clsx → usa `src/lib/cn.ts`; no librería de UI). Justifica cualquier dep nueva.
3. **No** romper el límite de capas atómicas (un atom no importa un organism, etc.).
4. **No** consultar Supabase fuera de `lib/products.ts` (lectura) o `cms/actions.ts` (escritura).
5. **No** poner secretos en el cliente. Solo `NEXT_PUBLIC_*` (la anon key) va al browser; RLS
   protege la base. El service_role key **nunca** se usa aquí.
6. **No** introducir pago/checkout: el flujo termina en WhatsApp por diseño.
7. **Server Components por defecto.** `"use client"` solo si hay estado/eventos (cart, filtros,
   toggles). Mantén los componentes de datos en el servidor.
8. RLS: lectura pública solo de productos `active`; escritura solo `authenticated`. Si cambias
   el esquema, actualiza `supabase/migrations/` Y `src/lib/types.ts` Y el mapeo en `products.ts`.

## Next.js 16 — ojo (difiere de versiones viejas)
- `params` y `searchParams` son **Promises**: `const { id } = await params`.
- El antiguo `middleware.ts` ahora es **`src/proxy.ts`** (export `proxy`, no `middleware`).
- Lee `node_modules/next/dist/docs/` ante cualquier duda de convención (ver AGENTS.md).

## Más
- `DESIGN_SYSTEM.md` — tokens, capas y reglas visuales.
- `handoff.md` — estado, pendientes y pasos de Supabase/Vercel (edítalo cada iteración).
