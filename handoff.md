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

## Estado actual (iteración 2 — catálogo real + fotos + paridad)
- ✅ **Catálogo real importado de los PDFs de campaña** (San Valentín, Madres, Padre, Mujer,
  Navidad, Niño): **109 productos** reales con nombre/precio/incluye, reemplazan los 19 seed.
  Fuente parseada con `pdftotext`; validado (todos los precios existen en el PDF).
- ✅ Nuevas ocasiones: **Día de la mujer, Navidad, Día del niño** (`occasions.ts` + `types.ts`).
- ✅ **Migración `0002_product_images.sql`**: columna `image_url` + bucket público
  `product-images` con RLS (lectura pública, escritura authenticated). Aplicada al remoto vía
  `supabase db push --include-seed` (ver estrategia en `CLAUDE.md`).
- ✅ **Subida de fotos en el CMS** (dropzone) → Storage; render real en tarjetas/detalle/carrito
  vía `PhotoPlaceholder src=` (fallback al gradiente por tipo).
- ✅ **Logo real** `public/logo-concarino.png` (reemplaza el SVG recreado).
- ✅ **Sort en catálogo** (Destacados/precio/nombre, param `?orden=`) + refinos de detalle
  (tira de miniaturas + total de línea en el botón).
- ✅ Redes reales enlazadas: IG `con_carino_creations` + **Facebook** `con.cariniolatacunga`.
- ✅ Seed remoto verificado (109 productos activos) y build/typecheck/check en verde.

## Pendiente de TU acción
1. ✅ **Usuario de la dueña creado** — `/login` ya da acceso al panel.
2. ✅ **Subir fotos reales de producto**: Extraídas automáticamente desde los PDFs de campaña con `pdfimages` y subidas a Supabase Storage (`products/{id}.png`) vinculadas en base de datos.
3. **(Vercel)** si usas la nueva publishable key, actualiza `NEXT_PUBLIC_SUPABASE_ANON_KEY` in
   Vercel (la anon key vieja sigue funcionando). Local ya usa la publishable en `.env.local`.
4. **Guardar la contraseña de la base de datos** fuera del repo (gestor de contraseñas). Se
   regenera en Supabase → Settings → Database. **No** se guarda aquí (es un secreto).
   ⚠️ La contraseña original quedó en el historial de git de iteración 1 — conviene **rotarla**.
5. (Opcional) Conectar el repo de GitHub al proyecto Vercel para deploys automáticos por push
   (hoy el deploy fue por CLI; el repo remoto aún no existe).

### Comandos útiles a futuro
```bash
# Cambios de esquema:
npx supabase db push
# Re-sembrar / actualizar catálogo (service key solo en memoria, no en disco):
#   SB_URL=... SB_SERVICE=... node --experimental-strip-types scripts/seed-remote.ts
# Nuevo deploy de producción:
#   npx vercel --prod --scope alejololer-s-projects
# Subir imágenes del catálogo y re-sembrar:
#   node --experimental-strip-types scripts/upload-and-update.ts
#   supabase db query --linked -f supabase/seed.sql
```

## Próximas iteraciones (backlog)
- [x] **Fotos reales**: subir a Supabase Storage y reemplazar `PhotoPlaceholder` (hoy con URL real). Agregar columna `image_url` a `products` + input de archivo en `CmsForm`.
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
