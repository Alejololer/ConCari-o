import { seedProducts } from "../src/data/products.seed.ts";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const extractedDir = "extracted-images";

// 1. Validate all files exist
console.log("Checking that all high-resolution images exist in extracted-images/...");
const missing: string[] = [];
for (const p of seedProducts) {
  const localPath = path.join(extractedDir, `${p.id}.png`);
  if (!fs.existsSync(localPath)) {
    missing.push(`Missing image: ${localPath}`);
  }
}

if (missing.length > 0) {
  console.error("Validation failed. Missing files:\n", missing.join("\n"));
  process.exit(1);
}
console.log("Validation successful! All 109 high-resolution images are present.");

// 2. Upload images to Supabase Storage in parallel batches
console.log("Uploading high-resolution images to Supabase Storage...");
const uploadTasks = seedProducts.map((p) => {
  const localPath = path.join(extractedDir, `${p.id}.png`);
  const remotePath = `products/${p.id}.png`;
  return { id: p.id, localPath, remotePath };
});

const CONCURRENCY = 8;
async function uploadAll() {
  for (let i = 0; i < uploadTasks.length; i += CONCURRENCY) {
    const batch = uploadTasks.slice(i, i + CONCURRENCY);
    console.log(`Uploading batch ${i / CONCURRENCY + 1} of ${Math.ceil(uploadTasks.length / CONCURRENCY)}...`);
    await Promise.all(
      batch.map(async (task) => {
        try {
          const cmd = `supabase storage cp --linked --experimental "${task.localPath}" "ss:///product-images/${task.remotePath}"`;
          execSync(cmd, { stdio: "pipe" });
        } catch (err: any) {
          const stderr = err.stderr ? err.stderr.toString() : "";
          const stdout = err.stdout ? err.stdout.toString() : "";
          const fullOutput = stdout + "\n" + stderr;
          if (fullOutput.includes("Duplicate") || fullOutput.includes("already exists") || fullOutput.includes("409")) {
            console.log(`  - ${task.id} already exists, skipping.`);
          } else {
            console.error(`  - Failed to upload ${task.id}:`, stderr || err.message);
            throw err;
          }
        }
      })
    );
  }
  console.log("All high-resolution uploads completed successfully!");
}

await uploadAll();

// 3. Update src/data/products.seed.ts
console.log("Updating src/data/products.seed.ts...");
const updatedProducts = seedProducts.map((p) => {
  const imageUrl = `https://qmdxmvswtqpvushfogjn.supabase.co/storage/v1/object/public/product-images/products/${p.id}.png`;
  return { ...p, imageUrl };
});

const seedFileContent = `import type { Product } from "@/lib/types";

// Catálogo real importado de los PDFs de campaña (San Valentín, Madres, Padre,
// Mujer, Navidad, Niño). Fallback sin Supabase y fuente para supabase/seed.sql.
// Ver handoff.md.
export const seedProducts: Product[] = ${JSON.stringify(updatedProducts, null, 2)};
`;

fs.writeFileSync("src/data/products.seed.ts", seedFileContent, "utf8");
console.log("src/data/products.seed.ts updated.");

// 4. Update supabase/seed.sql
console.log("Generating supabase/seed.sql...");
function formatSqlRow(p: any) {
  const id = p.id.replace(/'/g, "''");
  const name = p.name.replace(/'/g, "''");
  const price = p.price;
  const type = p.type.replace(/'/g, "''");
  const occSql = `ARRAY[${p.occ.map((o: string) => `'${o.replace(/'/g, "''")}'`).join(",")}]::text[]`;
  const desc = p.desc ? `'${p.desc.replace(/'/g, "''")}'` : "null";
  const incSql = `ARRAY[${p.inc.map((i: string) => `'${i.replace(/'/g, "''")}'`).join(",")}]::text[]`;
  const badge = p.badge ? `'${p.badge.replace(/'/g, "''")}'` : "null";
  const active = p.active ? "true" : "false";
  const imageUrl = p.imageUrl ? `'${p.imageUrl.replace(/'/g, "''")}'` : "null";

  return `  ('${id}','${name}',${price},'${type}',${occSql},${desc},${incSql},${badge},${active},${imageUrl})`;
}

const sqlRows = updatedProducts.map(formatSqlRow).join(",\n");
const sqlContent = `-- Seed data for Con Cariño — catálogo real de campañas. Idempotente.
-- Reemplaza el catálogo completo con los productos reales (PDFs).
delete from public.products;
insert into public.products (id,name,price,type,occ,description,inc,badge,active,image_url) values
${sqlRows};
`;

fs.writeFileSync("supabase/seed.sql", sqlContent, "utf8");
console.log("supabase/seed.sql updated.");
