// One-off remote seeder. Reads SB_URL + SB_SERVICE from env (never written to disk)
// and upserts the seed catalogue via PostgREST. Run via the seed step in package.json /
// the inline command in handoff.md. Type-only import is stripped by node --experimental-strip-types.
import { seedProducts } from "../src/data/products.seed.ts";

const url = process.env.SB_URL;
const key = process.env.SB_SERVICE;
if (!url || !key) throw new Error("SB_URL and SB_SERVICE env vars are required");

const rows = seedProducts.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  type: p.type,
  occ: p.occ,
  description: p.desc,
  inc: p.inc,
  badge: p.badge ?? null,
  active: p.active,
  image_url: p.imageUrl ?? null,
}));

const res = await fetch(`${url}/rest/v1/products`, {
  method: "POST",
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(rows),
});

if (!res.ok) {
  console.error("Seed failed:", res.status, await res.text());
  process.exit(1);
}
console.log(`Seeded ${rows.length} products (HTTP ${res.status}).`);
