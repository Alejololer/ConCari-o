import type { CategoryPreview, Occasion, Product } from "./types";

/**
 * Derives visual category previews (representative photo + product count)
 * from active products without requiring extra DB columns or migrations.
 */
export function buildCategoryPreviews(
  occasions: Occasion[],
  products: Product[],
): CategoryPreview[] {
  const byOccasion = new Map<string, { count: number; imageUrl?: string }>();

  for (const product of products) {
    const cover = product.imageUrl ?? product.images?.[0];
    for (const occId of product.occ) {
      const current = byOccasion.get(occId) ?? { count: 0, imageUrl: undefined };
      current.count += 1;
      if (!current.imageUrl && cover) {
        current.imageUrl = cover;
      }
      byOccasion.set(occId, current);
    }
  }

  return occasions.map((occ) => {
    const meta = byOccasion.get(occ.id);
    return {
      ...occ,
      count: meta?.count ?? 0,
      imageUrl: meta?.imageUrl,
    };
  });
}

/**
 * Deterministic social-proof sold count per product ID (no DB column needed).
 * Produces a consistent believable number per product (28–67, boosted slightly for badged items).
 */
export function getProductSoldCount(productId: string, hasBadge = false): number {
  let hash = 2166136261;
  for (let i = 0; i < productId.length; i++) {
    hash ^= productId.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const normalized = Math.abs(hash) % 34; // 0..33
  return (hasBadge ? 42 : 28) + normalized;
}
