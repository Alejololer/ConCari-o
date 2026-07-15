// Domain types. The Supabase `products` table mirrors Product (snake_case columns
// mapped in lib/products.ts). Keep this in sync with supabase/migrations/0001_init.sql.

export type OccasionId = string;

export type ProductTypeId = string;

export interface Product {
  id: string;
  name: string;
  price: number;
  type: ProductTypeId;
  occ: OccasionId[];
  desc: string;
  inc: string[]; // "incluye" bullet points
  badge?: string;
  imageUrl?: string; // portada = images[0] (derivado en products.ts)
  images?: string[]; // todas las fotos en orden; ausente en el seed TS
  active: boolean;
  featuredBanner?: boolean;
}

export interface Occasion {
  id: string;
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

export interface WhatsappSettings {
  phone_number: string;
  cart_template: string;
  product_template: string;
  generic_template: string;
}
