// Domain types. The Supabase `products` table mirrors Product (snake_case columns
// mapped in lib/products.ts). Keep this in sync with supabase/migrations/0001_init.sql.

export type OccasionId =
  | "amor"
  | "mama"
  | "papa"
  | "especial"
  | "porquesi"
  | "cumple"
  | "mujer"
  | "navidad"
  | "nino";

export type ProductTypeId = "fresas" | "desayunos" | "boxes";

export interface Product {
  id: string;
  name: string;
  price: number;
  type: ProductTypeId;
  occ: OccasionId[];
  desc: string;
  inc: string[]; // "incluye" bullet points
  badge?: string;
  imageUrl?: string; // product photo URL (Supabase Storage or /products path)
  active: boolean;
}

export interface Occasion {
  id: OccasionId;
  label: string;
  sub: string;
}

export interface ProductTypeMeta {
  id: ProductTypeId;
  label: string;
  tone: [string, string]; // gradient stops for the photo placeholder
}

export interface CartLine {
  product: Product;
  qty: number;
}
