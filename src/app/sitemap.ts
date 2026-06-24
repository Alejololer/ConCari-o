import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";
import { getProducts } from "@/lib/products";

// Fallback refresh; the CMS revalidates /sitemap.xml instantly on every edit.
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = brand.siteUrl;
  const now = new Date();

  const products = await getProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/producto/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalogo`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...productRoutes,
  ];
}
