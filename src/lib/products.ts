import "server-only";
import type { Product } from "./types";
import { seedProducts } from "@/data/products.seed";
import { hasSupabase } from "./supabase/env";
import { createClient } from "./supabase/server";

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
