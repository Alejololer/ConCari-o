import type { Product, ProductTypeMeta } from "./types";
import { seedProducts } from "@/data/products.seed";
import { hasSupabase } from "./supabase/env";
import { createClient } from "./supabase/server";

export async function getProductTypes(): Promise<ProductTypeMeta[]> {
  if (!hasSupabase) {
    return [
      { id: "fresas", label: "Fresas con chocolate", tone: ["#FBEAE6", "#F2D0C9"] },
      { id: "desayunos", label: "Desayunos sorpresa", tone: ["#F5ECDD", "#E8D5BC"] },
      { id: "boxes", label: "Boxes y cajas", tone: ["#F6E4EB", "#E8CCDB"] },
    ];
  }
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_types").select("*");
  if (error) {
    console.error("getProductTypes error, falling back to defaults:", error.message);
    return [
      { id: "fresas", label: "Fresas con chocolate", tone: ["#FBEAE6", "#F2D0C9"] },
      { id: "desayunos", label: "Desayunos sorpresa", tone: ["#F5ECDD", "#E8D5BC"] },
      { id: "boxes", label: "Boxes y cajas", tone: ["#F6E4EB", "#E8CCDB"] },
    ];
  }
  return (data as any[]).map((r) => ({
    id: r.id,
    label: r.label,
    tone: (r.tone && r.tone.length >= 2) ? [r.tone[0], r.tone[1]] : ["#FBEAE6", "#F2D0C9"],
  }));
}

// DB row → domain Product (description → desc).
interface Row {
  id: string;
  name: string;
  price: number;
  type: Product["type"];
  occ: Product["occ"];
  description: string;
  inc: string[];
  badge: string | null;
  image_url: string | null;
  active: boolean;
}
const toProduct = (r: Row): Product => ({
  id: r.id,
  name: r.name,
  price: Number(r.price),
  type: r.type,
  occ: r.occ ?? [],
  desc: r.description,
  inc: r.inc ?? [],
  badge: r.badge ?? undefined,
  imageUrl: r.image_url ?? undefined,
  active: r.active,
});

/**
 * All products. `includeInactive` is for the CMS (requires an authed session).
 * Falls back to the bundled seed when Supabase isn't configured.
 */
export async function getProducts(
  { includeInactive = false } = {},
): Promise<Product[]> {
  if (!hasSupabase) {
    return includeInactive ? seedProducts : seedProducts.filter((p) => p.active);
  }
  const supabase = await createClient();
  let query = supabase.from("products").select("*").order("created_at");
  if (!includeInactive) query = query.eq("active", true);
  const { data, error } = await query;
  if (error) throw new Error(`getProducts: ${error.message}`);
  return (data as Row[]).map(toProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!hasSupabase) return seedProducts.find((p) => p.id === id) ?? null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getProduct: ${error.message}`);
  return data ? toProduct(data as Row) : null;
}
