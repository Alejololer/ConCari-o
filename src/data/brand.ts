// Single source of truth for business identity & contact data.
export const brand = {
  name: "Con cariño",
  tagline: "Detalles que abrazan",
  description:
    "Detalles personalizados en Latacunga, Cotopaxi: fresas con chocolate, desayunos sorpresa y boxes para cada ocasión especial.",
  owner: "Fanny",
  // ── Location (used for SEO & structured data) ─────────────────────────────
  city: "Latacunga",
  province: "Cotopaxi",
  country: "Ecuador",
  location: "Latacunga, Cotopaxi, Ecuador",
  /** Canonical production URL — update if the domain changes. */
  siteUrl: "https://con-carino.vercel.app",
  // ─────────────────────────────────────────────────────────────────────────
  whatsapp: {
    number: "593984800307", // E.164 without '+', for wa.me links
    display: "0984800307",
  },
  instagram: {
    handle: "con_carino_creations",
    creations: "@concarino.creations",
    url: "https://www.instagram.com/con_carino_creations/",
  },
  facebook: {
    handle: "con.cariniolatacunga",
    url: "https://www.facebook.com/con.cariniolatacunga",
  },
  payment: {
    bank: "Banco Pichincha",
    accountType: "Ahorros",
    accountNumber: "2207281322",
    holder: "Fanny Patricia Jácome",
  },
} as const;
