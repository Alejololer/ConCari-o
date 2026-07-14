# Reporte de Ciberseguridad — Con Cariño

**Fecha:** 2026-06-26 · **Alcance:** sitio web (tienda + panel CMS) en Next.js 16 / Supabase /
Vercel · **Tipo:** auditoría estática de código + hardening aplicado · **Restricción:** costo $0
(Vercel Hobby + Supabase free).

---

## 1. Resumen ejecutivo

El modelo de negocio **publica a propósito** datos de contacto y pago: el celular de WhatsApp
(cierre del pedido) y los datos de transferencia bancaria. Antes de esta intervención, esos datos
viajaban en **HTML plano y en JSON-LD** en home, footer, carrito y ficha de producto, lo que permitía
a cualquier scraper automatizado cosecharlos sin esfuerzo (riesgo de spam, fraude, suplantación e
ingeniería social contra la dueña).

No es posible "ocultar" estos datos de un humano —son el mecanismo de conversión— así que la
estrategia fue **servir a humanos y frustrar bots automáticos**:

- **Número de cuenta y titular:** retirados por completo del sitio público. Se comparten solo dentro
  del chat de WhatsApp.
- **Celular:** retirado del HTML y del JSON-LD. Se entrega **solo tras un click humano verificado por
  Vercel BotID**, a través de un endpoint protegido. Los enlaces a WhatsApp siguen funcionando.
- **Defensas adicionales:** BotID en el login, verificación de identidad por acción en el CMS,
  validación de tipo de archivo en subidas, y cabeceras HTTP HSTS + CSP (Report-Only).

**Resultado verificado:** los bundles que se envían al navegador (`.next/static`) ya **no contienen**
el celular, el número de cuenta, el banco ni el titular. Los datos viven únicamente en el servidor.

---

## 2. Alcance y metodología

- Auditoría **estática** del repositorio (sin pentest activo ni explotación).
- Foco: exposición de datos sensibles y superficie de bots/scraping.
- Se revisó: render de datos (componentes), flujo carrito → WhatsApp, autenticación del CMS,
  configuración de Supabase/RLS, Server Actions, cabeceras HTTP, `robots`/`sitemap` y dependencias.

---

## 3. Inventario de activos sensibles

| Dato | Valor (enmascarado) | Dónde se exponía (antes) | Estado ahora |
|------|--------------------|--------------------------|--------------|
| Celular WhatsApp | `59398…0307` | `href` SSR, contexto cliente, JSON-LD `telephone`, FAQ | Solo server; se libera por `/api/wa` (BotID) |
| Nº de cuenta | `…1322` | Footer, Carrito, Ficha de producto (texto plano) | Retirado del sitio; server-only |
| Titular | `Fanny P. J…` | Footer (texto plano) | Retirado del sitio; server-only |
| Banco / tipo | Banco / Ahorros | Footer, Carrito, Ficha | Retirado del sitio |
| Anon key Supabase | `sb_publishable_…` | `NEXT_PUBLIC_` (browser) | **No es hallazgo**: pública por diseño, protegida por RLS |

> `.env.local` **sí** está en `.gitignore` — las llaves no se commitean. Sin acción.

---

## 4. Hallazgos (estado previo) y severidad

| # | Severidad | Hallazgo | Estado |
|---|-----------|----------|--------|
| H1 | **Crítica** | Nº de cuenta + titular en HTML plano (Footer, Carrito, Ficha) | ✅ Corregido |
| H2 | **Crítica** | Celular en `href` SSR, contexto cliente, JSON-LD y FAQ | ✅ Corregido |
| H3 | **Alta** | Sin BotID/CAPTCHA/honeypot: scraping y bots sin barreras | ✅ Corregido (BotID) |
| H4 | **Alta** | Sin cabeceras CSP ni HSTS | ✅ HSTS aplicado; CSP en Report-Only |
| H5 | **Media** | Server Actions sin verificación de identidad propia (solo proxy+layout) | ✅ `requireUser()` por acción |
| H6 | **Media** | Subida de imágenes sin validación de tipo MIME | ✅ Validación `image/*` |
| H7 | **Baja/Info** | Rate-limit de login best-effort en memoria (no persistente) | Aceptado (ver §8) |

Controles ya existentes (sin cambio): `robots.txt` bloquea `/cms` y `/login`; `sitemap` solo
incluye productos activos; cabeceras `X-Frame-Options`, `nosniff`, `Referrer-Policy`,
`Permissions-Policy`; doble gate de auth (proxy `src/proxy.ts` + `cms/layout.tsx`); solo anon key en
el cliente (nunca service_role).

---

## 5. Arquitectura anti-botting (cómo quedó)

**Principio:** nada sensible en el HTML estático; el dato se libera tras interacción humana
verificada.

1. **`src/lib/contact.server.ts`** (`import "server-only"`): celular + datos de pago. Nunca entra al
   bundle del browser. Se retiraron de `src/data/brand.ts` (que sí se importa en el cliente).
2. **`src/app/api/wa/route.ts`** (POST): llama `checkBotId()`; si es bot → `403`; si es humano →
   devuelve el celular. El número nunca está en el HTML.
3. **`src/lib/whatsappContext.tsx`**: el provider ya **no recibe el teléfono**, solo las plantillas de
   mensaje. Expone `openCart/openProduct/openGeneric`, que arman el mensaje en el cliente y piden el
   número a `/api/wa` al hacer click, luego abren `wa.me`.
4. **Triggers**: Hero/QuoteBand usan `WhatsappButton`; Header/Footer/Carrito/Ficha usan `onClick`.
   Ningún `<a href="wa.me/NÚMERO">` se renderiza en el servidor.
5. **Vercel BotID** (modo **Basic**, gratis en Hobby): `withBotId` en `next.config.ts`,
   `initBotId` en `src/instrumentation-client.ts` protegiendo `/api/wa` (POST) y `/login` (POST).
   *Deep Analysis* (de pago) no se activa.
6. **Defensa en profundidad CMS**: `requireUser()` re-verifica la sesión Supabase dentro de cada
   Server Action mutante (`src/app/cms/actions.ts`).
7. **Cabeceras** (`vercel.json`): `Strict-Transport-Security` + `Content-Security-Policy-Report-Only`
   (arranca en modo reporte para no romper el render; promover a CSP estricta tras validar en prod).

---

## 6. Verificación / evidencia

- `npm run typecheck` → limpio.
- `npm run build` → exitoso (rutas dinámicas correctas; `/api/wa` server-rendered on demand).
- `npm run check` → `whatsapp.check.ts OK`.
- **Exposición cero (cliente):** `grep` sobre `.next/static/**/*.js` de `2207281322 | 984800307 |
  Pichincha | Jácome` → **sin coincidencias**. Solo aparecen en `.next/server` (server-only).
- Pendiente en preview/prod: `curl -X POST /api/wa` → `403`; click humano desde la página → `200`
  con el número; login y guardado del CMS funcionan para la dueña.

---

## 7. Riesgo residual

- BotID Basic es **heurístico**: un bot que pase el reto y ejecute JS, o un humano, igual obtendrá el
  número al hacer click (es inevitable: `wa.me` se lo entregamos al cliente). Esto **sube el listón**
  contra cosecha masiva; no lo hace imposible. Es la postura apropiada para el modelo $0.
- El celular sale del JSON-LD `telephone` → se pierde ese dato en rich results de Google (decisión
  consciente: máxima protección sobre SEO del teléfono).

---

## 8. Recomendaciones operativas (pendientes, sin código)

1. **Rotar el celular** si ya hubo cosecha previa (el número estuvo público e indexable).
2. **Promover CSP** de Report-Only a `Content-Security-Policy` tras observar el reporte en prod.
3. **Rate-limit persistente**: el actual (en memoria, `src/proxy.ts`) no sobrevive entre instancias
   de Vercel. BotID en `/login` ya complementa; suficiente para el volumen actual.
4. **Revisar políticas RLS** en el dashboard de Supabase (lectura pública solo de `active`, escritura
   solo `authenticated`).
