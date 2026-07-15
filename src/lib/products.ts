import type { Occasion, Product, ProductTypeMeta, WhatsappSettings } from "./types";
import { seedProducts } from "@/data/products.seed";
import { occasions as seedOccasions } from "@/data/occasions";
import { hasSupabase } from "./supabase/env";
import { createClient } from "./supabase/server";
import { phone as fallbackPhone } from "./contact.server";

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

export async function getOccasions(): Promise<Occasion[]> {
  if (!hasSupabase) return seedOccasions;
  const supabase = await createClient();
  const { data, error } = await supabase.from("occasions").select("*").order("label");
  if (error) {
    console.error("getOccasions error, falling back to defaults:", error.message);
    return seedOccasions;
  }
  return (data as any[]).map((r) => ({
    id: r.id,
    label: r.label,
    sub: r.sub ?? "",
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
  image_urls: string[] | null;
  active: boolean;
  featured_banner?: boolean;
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
  imageUrl: r.image_urls?.[0] ?? undefined,
  images: r.image_urls ?? [],
  active: r.active,
  featuredBanner: r.featured_banner ?? false,
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

export async function getWhatsappSettings(): Promise<WhatsappSettings> {
  const fallback: WhatsappSettings = {
    phone_number: fallbackPhone,
    cart_template: "Hola! Quiero hacer un pedido con cariño\n\n{items}\n\nTotal aproximado: {total}",
    product_template: 'Hola! Me interesa el detalle "{name}" ({qty}x - {price}). Me ayudas a coordinarlo?',
    generic_template: "Hola Con cariño! Quisiera información sobre sus detalles",
  };
  if (!hasSupabase) {
    return fallback;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("whatsapp_settings")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    if (error) {
      console.error("getWhatsappSettings error, falling back to default:", error.message);
      return fallback;
    }
    if (!data) return fallback;
    return {
      phone_number: data.phone_number ?? fallback.phone_number,
      cart_template: data.cart_template ?? fallback.cart_template,
      product_template: data.product_template ?? fallback.product_template,
      generic_template: data.generic_template ?? fallback.generic_template,
    };
  } catch (e) {
    console.error("getWhatsappSettings generic error, falling back to default:", e);
    return fallback;
  }
}
