import type { Occasion } from "@/lib/types";

// UI constants (not stored in DB). Order = display order in filters/home.
export const occasions: Occasion[] = [
  { id: "amor", label: "Para el amor de tu vida", sub: "Romance y aniversarios" },
  { id: "mama", label: "Para mamá consentida", sub: "Mimos para ella" },
  { id: "papa", label: "Para papá valiente", sub: "Su día, su detalle" },
  { id: "especial", label: "Para esa persona especial", sub: "Amistad y cariño" },
  { id: "porquesi", label: "Solo porque sí", sub: "Sorpresas sin motivo" },
  { id: "cumple", label: "Para celebrar la vida", sub: "Cumpleaños y logros" },
  { id: "mujer", label: "Día de la mujer", sub: "Celebra tu fuerza y belleza" },
  { id: "navidad", label: "Navidad", sub: "Magia y alegría en cada detalle" },
  { id: "nino", label: "Día del niño", sub: "Sorpresas dulces para los más pequeños" },
];

export const occasionById = Object.fromEntries(
  occasions.map((o) => [o.id, o]),
) as Record<Occasion["id"], Occasion>;
