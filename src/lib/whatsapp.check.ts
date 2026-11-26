// ponytail: one runnable check for the money path. Run: npm run check
import assert from "node:assert";
import { waLink, cartTotal, cartText, productText } from "./whatsapp.ts";

const lines = [
  { name: "Caja Clásica", qty: 2, price: 11.5 },
  { name: "Desayuno Premium", qty: 1, price: 23, note: "Feliz cumple mamá" },
];

assert.strictEqual(cartTotal(lines), 46, "total = 2*11.5 + 23");
assert.ok(cartText(lines).includes("Total aproximado: $46.00"), "total formatted");
assert.ok(cartText(lines).includes("- 2x Caja Clásica - $23.00"), "line total");
assert.ok(cartText(lines).includes('Dedicatoria: "Feliz cumple mamá"'), "optional note included");
assert.ok(
  productText("Ramo Perfecto", 1, 12.5, "Te quiero").includes('Dedicatoria para tarjeta: "Te quiero"'),
  "product note included",
);

const link = waLink("593984800307", "hola mundo & cariño");
assert.ok(link.startsWith("https://wa.me/593984800307?text="), "wa.me base");
assert.ok(link.includes("hola%20mundo%20%26%20cari%C3%B1o"), "text url-encoded");

console.log("whatsapp.check.ts OK");
