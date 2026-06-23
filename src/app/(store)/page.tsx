import { getProducts } from "@/lib/products";
import { Hero } from "@/components/organisms/Hero";
import { CategoryGrid } from "@/components/organisms/CategoryGrid";
import { FeaturedGrid } from "@/components/organisms/FeaturedGrid";
import { HowTo } from "@/components/organisms/HowTo";
import { QuoteBand } from "@/components/organisms/QuoteBand";

export default async function HomePage() {
  const products = await getProducts();
  // Featured: badged products first, then fill up to 6.
  const featured = [...products]
    .sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))
    .slice(0, 6);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedGrid products={featured} />
      <HowTo />
      <QuoteBand />
    </>
  );
}
