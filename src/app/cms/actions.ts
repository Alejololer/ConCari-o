"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkBotId } from "botid/server";
import type { OccasionId, ProductTypeId } from "@/lib/types";
import { hasSupabase } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

async function db() {
  if (!hasSupabase) {
    throw new Error("Modo demo: conecta Supabase para guardar cambios (ver handoff.md).");
  }
  return createClient();
}

// Defensa en profundidad: el proxy + layout ya bloquean /cms, pero las Server
// Actions tienen su propio endpoint, así que cada mutación re-verifica identidad.
async function requireUser() {
  const supabase = await db();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("No autorizado.");
  return supabase;
}

function refresh() {
  revalidatePath("/cms");
  revalidatePath("/catalogo");
  revalidatePath("/");
  revalidatePath("/sitemap.xml"); // keep sitemap in sync when products change
  revalidatePath("/producto/[id]", "page"); // refresh all product detail pages
}

// Shared shape for insert/update (snake_case columns).
function parseForm(form: FormData) {
  const inc = String(form.get("inc") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    name: String(form.get("name") ?? "").trim(),
    price: Number(form.get("price") ?? 0),
    type: String(form.get("type") ?? "fresas") as ProductTypeId,
    occ: form.getAll("occ").map(String) as OccasionId[],
    description: String(form.get("desc") ?? "").trim(),
    inc,
    active: form.get("active") === "on",
    featured_banner: form.get("featured_banner") === "on",
  };
}

export async function saveProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const row = parseForm(formData);
  if (!row.name || !(row.price >= 0)) throw new Error("Nombre y precio válidos son obligatorios.");

  const supabase = await requireUser();

  if (row.featured_banner) {
    let query = supabase.from("products").select("id").eq("featured_banner", true);
    if (id) {
      query = query.neq("id", id);
    }
    const { data: currentFeatured, error: countError } = await query;
    if (countError) throw new Error(countError.message);
    if (currentFeatured && currentFeatured.length >= 2) {
      throw new Error("Límite excedido: Solo puedes tener un máximo de 2 productos destacados en el banner. Por favor, desactiva el banner en otro producto primero.");
    }
  }

  // Handle image upload if present and Supabase is available.
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) throw new Error("El archivo debe ser una imagen.");
    try {
      const sanitizedName = image.name.replace(/\s+/g, "-");
      const path = `${crypto.randomUUID()}-${sanitizedName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, image, { upsert: false });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);

      // Include image_url in the update/insert.
      (row as any).image_url = publicUrlData.publicUrl;
    } catch (err) {
      throw new Error(`Image upload error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert({ id: crypto.randomUUID(), ...row });
  if (error) throw new Error(error.message);

  refresh();
  redirect("/cms");
}

export async function toggleActive(id: string, active: boolean) {
  const supabase = await requireUser();
  const { error } = await supabase.from("products").update({ active }).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteProduct(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveProductType(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const label = String(formData.get("label") ?? "").trim();
  const tone1 = String(formData.get("tone1") ?? "#FBEAE6").trim();
  const tone2 = String(formData.get("tone2") ?? "#F2D0C9").trim();

  if (!id || !label) throw new Error("ID y Nombre son obligatorios.");

  const supabase = await requireUser();
  const row = {
    id,
    label,
    tone: [tone1, tone2],
  };

  const { error } = await supabase.from("product_types").upsert(row);
  if (error) throw new Error(error.message);

  refresh();
  redirect("/cms/tipos");
}

export async function deleteProductType(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("product_types").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveOccasion(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const label = String(formData.get("label") ?? "").trim();
  const sub = String(formData.get("sub") ?? "").trim();

  if (!id || !label) throw new Error("ID y Nombre son obligatorios.");

  const supabase = await requireUser();
  const { error } = await supabase.from("occasions").upsert({ id, label, sub });
  if (error) throw new Error(error.message);

  refresh();
  redirect("/cms/ocasiones");
}

export async function deleteOccasion(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("occasions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveWhatsappSettings(formData: FormData) {
  const phone_number = String(formData.get("phone_number") ?? "").trim();
  const cart_template = String(formData.get("cart_template") ?? "").trim();
  const product_template = String(formData.get("product_template") ?? "").trim();
  const generic_template = String(formData.get("generic_template") ?? "").trim();

  const cleanedPhone = phone_number.replace(/\D/g, "");
  if (!cleanedPhone) {
    throw new Error("El número de WhatsApp no puede estar vacío y debe contener solo dígitos.");
  }

  // Ensure no diamond emojis or other emoji characters that break. We can warn/strip, or just let it pass,
  // but let's make sure the prompt constraint is followed: "Avoid emojis in WhatsApp templates as they render as replacement diamonds on the user's setup."
  // Wait, let's strip any non-ASCII characters or common emoji ranges, or just warn/sanitize!
  // It's safer to strip any emojis or symbols from the templates. Or at least warn or filter them out.
  // Actually, we can remove emojis regex-wise or just advise in the form.
  // Let's filter out non-ASCII/special emoji ranges just in case to be robust.
  // But a simple regex helper to strip emojis/non-standard unicode symbols is:
  // /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g
  // Let's just remove characters outside standard Latin/Spanish ranges and punctuation if needed, or simply strip emojis.
  // Stripping emoji regex:
  const emojiRegex = /[\u{1F300}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]/gu;
  const cleanCart = cart_template.replace(emojiRegex, "");
  const cleanProduct = product_template.replace(emojiRegex, "");
  const cleanGeneric = generic_template.replace(emojiRegex, "");

  const supabase = await requireUser();
  const { error } = await supabase
    .from("whatsapp_settings")
    .upsert({
      id: "default",
      phone_number: cleanedPhone,
      cart_template: cleanCart,
      product_template: cleanProduct,
      generic_template: cleanGeneric,
    });

  if (error) throw new Error(error.message);

  refresh();
  revalidatePath("/cms/whatsapp");
  redirect("/cms");
}

// --- Auth ---
export async function signIn(formData: FormData) {
  const { isBot } = await checkBotId();
  if (isBot) redirect("/login?error=1");
  const supabase = await db();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) redirect("/login?error=1");
  redirect("/cms");
}

export async function signOut() {
  const supabase = await db();
  await supabase.auth.signOut();
  redirect("/login");
}
