# Guía de diseño — Con Cariño

Identidad cálida, artesanal y femenina. Tipografía manuscrita para títulos, mucho aire,
bordes redondeados y sombras suaves rosadas. Esta guía es **normativa**: si un componente no
la cumple, está mal.

## Fuente única de verdad
Todos los tokens viven en `src/app/globals.css` dentro de `@theme`. Editar ahí, **nunca**
hardcodear valores en componentes. Tailwind v4 genera utilidades a partir de cada token.

## Tokens

### Color (`--color-*` → `bg-*` / `text-* `/ `border-*`)
| Token | Hex | Uso |
|-------|-----|-----|
| `cream` | `#FBF6F2` | fondo de página |
| `surface` | `#FFFFFF` | tarjetas, paneles |
| `primary` | `#BC7A88` | botones principales, toggles |
| `rose` | `#C0617A` | títulos de acento, precio |
| `terracotta` | `#D08259` | eyebrows / acentos |
| `ink` | `#3E2A30` | texto fuerte |
| `ink-soft` | `#6F555B` | cuerpo |
| `ink-mute` | `#857078` | secundario |
| `mute` | `#A98C90` | terciario |
| `line` / `line-strong` | `#EFE2DD` / `#E3D0CA` | bordes |
| `blush` | `#FBEDE9` | chips / rellenos suaves |
| `berry` | `#A8546A` | texto de chip / enlaces |
| `label` | `#B98E96` | labels en mayúscula |
| `whatsapp` | `#3FB36B` | verde de WhatsApp |

### Radios (`rounded-*`)
`pill` 999px (botones, chips) · `card` 20px (tarjetas) · `panel` 26px (paneles grandes, hero).

### Tipografía
- `font-display` → **Dancing Script** (títulos, números decorativos, precios grandes).
- `font-sans` → **Hanken Grotesk** (todo el cuerpo). Es la fuente por defecto del `body`.
- Eyebrow/label: 12px, `uppercase`, `tracking` amplio, color `label`/`terracotta`.

### Sombra y movimiento
`shadow-card` (sutil) y `shadow-soft` (elevación hover/flotantes). Animaciones `floaty`,
`floaty2`, `fadeup` definidas en `globals.css` — usar con moderación.

## Capas atómicas
| Capa | Carpeta | Qué es | Puede importar |
|------|---------|--------|----------------|
| Atoms | `components/atoms` | piezas sin lógica de negocio | nada del proyecto (solo `lib/cn`, `lib/format`) |
| Molecules | `components/molecules` | combinan atoms | atoms |
| Organisms | `components/organisms` | secciones completas | molecules, atoms |
| Templates | `app/**/layout.tsx` | estructura de página | organisms |
| Pages | `app/**/page.tsx` | fetch + componen organisms | todo lo anterior |

Regla: nunca importar hacia arriba (un atom no usa un organism). Si necesitas lógica de
negocio en un atom, probablemente sea una molecule.

## Reglas de uso
1. Color, radio y fuente **solo** por token/utilidad. Cero hex en `.tsx` (excepto gradientes
   de placeholder en `data/types.ts`, que son datos de marca, no estilo de componente).
2. Botones: usa `<Button>` (variantes `primary` / `secondary` / `ghost`, tamaños `sm` / `md`).
   No crees botones sueltos con clases repetidas.
3. Reutiliza `ProductCard` en home, catálogo y relacionados (prop `compact` para listas chicas).
4. Texto de marca y contacto: siempre desde `data/brand.ts`. No repitas el número de WhatsApp.
5. Server Component por defecto; `"use client"` solo con estado/eventos.

## Añadir un componente nuevo
1. Decide la capa por su responsabilidad.
2. Reusa atoms existentes antes de crear estilos.
3. Solo tokens. Si te falta un color/radio, **agrégalo a `@theme`**, no lo inventes inline.
4. Mantén el diff corto; borra antes de duplicar.
