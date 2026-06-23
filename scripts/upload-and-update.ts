import { seedProducts } from "../src/data/products.seed.ts";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

// 1. Define mapping function
function getLocalImagePath(productId: string): string | null {
  const match = productId.match(/^([a-z]+)-(\d+)$/);
  if (!match) return null;
  const campaign = match[1];
  const index = parseInt(match[2], 10);

  if (campaign === "amor") {
    const page = Math.floor((index - 1) / 3) + 2;
    const offset = (index - 1) % 3;
    const num = 4 * page - 4 + offset;
    return `extracted-images/amor-${String(num).padStart(3, "0")}.png`;
  }

  if (campaign === "mama") {
    const page = Math.floor((index - 1) / 3) + 2;
    const offset = (index - 1) % 3;
    if (page < 5) {
      const num = 4 * page - 4 + offset;
      return `extracted-images/mama-${String(num).padStart(3, "0")}.png`;
    } else if (page === 5) {
      const num = 16 + offset;
      return `extracted-images/mama-${String(num).padStart(3, "0")}.png`;
    } else {
      const num = 4 * page - 3 + offset;
      return `extracted-images/mama-${String(num).padStart(3, "0")}.png`;
    }
  }

  if (campaign === "papa") {
    const papaMap: Record<number, number> = {
      1: 6, 2: 7, 3: 8,
      4: 10, 5: 11, 6: 12,
      7: 14, 8: 15, 9: 16,
      10: 18, 11: 19, 12: 20,
      13: 24, 14: 25,
      15: 27, 16: 28, 17: 29,
      18: 31, 19: 32
    };
    const num = papaMap[index];
    return `extracted-images/papa-${String(num).padStart(3, "0")}.png`;
  }

  if (campaign === "mujer") {
    const page = Math.floor((index - 1) / 3) + 2;
    const offset = (index - 1) % 3;
    const num = 4 * page - 4 + offset;
    return `extracted-images/mujer-${String(num).padStart(3, "0")}.png`;
  }

  if (campaign === "nino") {
    const page = Math.floor((index - 1) / 3) + 2;
    const offset = (index - 1) % 3;
    if (page < 6) {
      const num = 4 * page - 4 + offset;
      return `extracted-images/nino-${String(num).padStart(3, "0")}.png`;
    } else {
      const num = 21 + offset;
      return `extracted-images/nino-${String(num).padStart(3, "0")}.png`;
    }
  }

  if (campaign === "navidad") {
    const page = Math.floor((index - 1) / 3) + 2;
    const offset = (index - 1) % 3;
    const startNum = 17 * page - 11;
    const num = startNum + 5 * offset;
    return `extracted-images/navidad-${String(num).padStart(3, "0")}.png`;
  }

  return null;
}

// 2. Validate all mappings exist
console.log("Validating that all extracted images exist...");
const missing: string[] = [];
for (const p of seedProducts) {
  const localPath = getLocalImagePath(p.id);
  if (!localPath) {
    missing.push(`No mapping defined for product ID ${p.id}`);
    continue;
  }
  const fullPath = path.resolve(localPath);
  if (!fs.existsSync(fullPath)) {
    missing.push(`File not found for ${p.id}: ${localPath}`);
  }
}

if (missing.length > 0) {
  console.error("Validation failed. Missing files:\n", missing.join("\n"));
  process.exit(1);
}
console.log("Validation successful! All 109 images are present.");

// 3. Upload images to Supabase Storage in parallel batches
console.log("Uploading images to Supabase Storage...");
const uploadTasks = seedProducts.map((p) => {
  const localPath = getLocalImagePath(p.id)!;
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
  console.log("All uploads completed successfully!");
}

await uploadAll();

// 4. Update src/data/products.seed.ts
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

// 5. Update supabase/seed.sql
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
