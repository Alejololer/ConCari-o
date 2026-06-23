// WhatsApp order links. Pure functions (no framework imports) so the logic is
// runnable as a standalone check — see whatsapp.check.ts.
import { money } from "./format.ts";

export interface OrderLine {
  name: string;
  qty: number;
  price: number;
}

export function waLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function cartTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}

/** Message body for a full cart order. */
export function cartText(lines: OrderLine[]): string {
  const items = lines
    .map((l) => `• ${l.qty}× ${l.name} — ${money(l.price * l.qty)}`)
    .join("\n");
  return (
    "¡Hola! Quiero hacer un pedido con cariño 💝\n\n" +
    items +
    `\n\nTotal aproximado: ${money(cartTotal(lines))}`
  );
}

/** Message body for a single product. */
export function productText(name: string, qty: number, price: number): string {
  return `¡Hola! Me interesa el detalle "${name}" (${qty}× — ${money(price * qty)}). ¿Me ayudas a coordinarlo? 💝`;
}

export const genericText = "¡Hola Con cariño! Quisiera información sobre sus detalles 💝";
