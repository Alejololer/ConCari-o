"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { OccasionId, ProductTypeId } from "@/lib/types";
import { hasSupabase } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

async function db() {
  if (!hasSupabase) {
    throw new Error("Modo demo: conecta Supabase para guardar cambios (ver handoff.md).");
  }
  return createClient();
}

function refresh() {
  revalidatePath("/cms");
  revalidatePath("/catalogo");
  revalidatePath("/");
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
  };
}

export async function saveProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const row = parseForm(formData);
  if (!row.name || !(row.price >= 0)) throw new Error("Nombre y precio válidos son obligatorios.");

  const supabase = await db();

  // Handle image upload if present and Supabase is available.
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
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
  const supabase = await db();
  const { error } = await supabase.from("products").update({ active }).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteProduct(id: string) {
  const supabase = await db();
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

  const supabase = await db();
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
  const supabase = await db();
  const { error } = await supabase.from("product_types").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

// --- Auth ---
export async function signIn(formData: FormData) {
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
