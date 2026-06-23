import type { ProductTypeMeta } from "@/lib/types";

// Product types + the gradient stops used for photo placeholders (no real photos yet).
export const productTypes: ProductTypeMeta[] = [
  { id: "fresas", label: "Fresas con chocolate", tone: ["#FBEAE6", "#F2D0C9"] },
  { id: "desayunos", label: "Desayunos sorpresa", tone: ["#F5ECDD", "#E8D5BC"] },
  { id: "boxes", label: "Boxes y cajas", tone: ["#F6E4EB", "#E8CCDB"] },
];

export const typeById = Object.fromEntries(
  productTypes.map((t) => [t.id, t]),
) as Record<ProductTypeMeta["id"], ProductTypeMeta>;

// CSS gradient for a product's placeholder image, by type.
export function placeholderBg(type: ProductTypeMeta["id"]): string {
  const [a, b] = (typeById[type] ?? productTypes[0]).tone;
  return `radial-gradient(75% 70% at 32% 26%, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 55%), radial-gradient(120% 125% at 50% 24%, ${a} 0%, ${b} 100%)`;
}
