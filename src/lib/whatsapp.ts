// WhatsApp order links. Pure functions (no framework imports) so the logic is
// runnable as a standalone check — see whatsapp.check.ts.
import { money } from "./format.ts";

export interface OrderLine {
  name: string;
  qty: number;
  price: number;
  note?: string;
}

export function waLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function cartTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}

export function formatOrderLine(line: OrderLine): string {
  const base = `- ${line.qty}x ${line.name} - ${money(line.price * line.qty)}`;
  const cleanNote = line.note?.trim();
  return cleanNote ? `${base} (Dedicatoria: "${cleanNote}")` : base;
}

/** Message body for a full cart order. */
export function cartText(lines: OrderLine[]): string {
  const items = lines.map(formatOrderLine).join("\n");
  return (
    "Hola! Quiero hacer un pedido con cariño\n\n" +
    items +
    `\n\nTotal aproximado: ${money(cartTotal(lines))}`
  );
}

/** Message body for a single product. */
export function productText(name: string, qty: number, price: number, note?: string): string {
  const base = `Hola! Me interesa el detalle "${name}" (${qty}x - ${money(price * qty)}). Me ayudas a coordinarlo?`;
  const cleanNote = note?.trim();
  return cleanNote ? `${base}\nDedicatoria para tarjeta: "${cleanNote}"` : base;
}

export const genericText = "Hola Con cariño! Quisiera información sobre sus detalles";
