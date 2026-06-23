# Handoff — Con Cariño

> Documento vivo. Edítalo al cerrar cada iteración: marca lo hecho, ajusta pendientes.

## Estado actual (iteración 1 — fundación + despliegue)
- ✅ Scaffold Next.js 16 + TypeScript + Tailwind v4.
- ✅ Design system atómico + tokens (`DESIGN_SYSTEM.md`).
- ✅ Tienda completa: home, catálogo con filtros (ocasión/tipo/búsqueda), detalle, carrito →
  pedido por WhatsApp.
- ✅ Panel CMS: lista con stats, alta/edición/eliminación, toggle activo (Server Actions).
- ✅ Auth de la dueña con Supabase Auth + protección de `/cms` (`src/proxy.ts` + gate en layout).
- ✅ 19 productos seed (`src/data/products.seed.ts`) + `supabase/seed.sql` + esquema
  (`supabase/migrations/0001_init.sql`).
- ✅ **Supabase cloud creado y conectado** — proyecto `con-carino` (ref `qmdxmvswtqpvushfogjn`,
  org Alejololer, us-east-1). Esquema aplicado (`db push`), 19 productos sembrados vía REST,
  RLS de lectura pública verificada. Llaves en `.env.local` (local) y en Vercel.
- ✅ **Desplegado en Vercel** (Hobby, $0): producción pública en **https://con-carino.vercel.app**,
  SSR leyendo de Supabase. Env vars en Production/Preview/Development.
- ✅ CI gratis (`.github/workflows/ci.yml`): check + typecheck + build.
- ✅ `npm run build` y `npm run typecheck` en verde.

## Pendiente de TU acción
1. **Crear el usuario de la dueña** (para entrar a `/cms`): Supabase → proyecto `con-carino` →
   **Authentication → Users → Add user** → email + contraseña + "Auto Confirm User". Con eso
   `https://con-carino.vercel.app/login` da acceso al panel.
2. **Guardar la contraseña de la base de datos** (no se persiste en el repo; se puede regenerar en
   Settings → Database). La que se generó al crear el proyecto: `CC-8G5x6dHrDOOjYJvFyOgX`.
3. (Opcional) Conectar el repo de GitHub al proyecto Vercel para deploys automáticos por push
   (hoy el deploy fue por CLI; el repo remoto aún no existe).

### Comandos útiles a futuro
```bash
# Cambios de esquema:
npx supabase db push
# Re-sembrar / actualizar catálogo (service key solo en memoria, no en disco):
#   SB_URL=... SB_SERVICE=... node --experimental-strip-types scripts/seed-remote.ts
# Nuevo deploy de producción:
npx vercel --prod --scope alejololer-s-projects
```

## Próximas iteraciones (backlog)
- [ ] **Fotos reales**: subir a Supabase Storage y reemplazar `PhotoPlaceholder` (hoy gradiente
      por tipo). Agregar columna `image_url` a `products` + input de archivo en `CmsForm`.
- [ ] Gestión de pedidos / categorías desde el panel (hoy solo productos).
- [ ] Dominio propio en Vercel.
- [ ] Mejorar SEO/OG images por producto.
- [ ] Tests e2e (Playwright) de los flujos carrito→WhatsApp y CRUD del CMS.

## Notas / decisiones
- Sin pasarela de pago por diseño: el carrito arma un mensaje de WhatsApp; el pago se coordina
  por transferencia (Banco Pichincha, datos en `src/data/brand.ts`).
- El logo es un SVG (`public/logo-concarino.svg`) recreado del prototipo; el PNG original
  excedía el límite de descarga. Reemplázalo si tienes el archivo de marca definitivo.
- Reglas de arquitectura y diseño en `CLAUDE.md` y `DESIGN_SYSTEM.md` — respétalas.
