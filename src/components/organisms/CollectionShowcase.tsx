import Image from "next/image";
import Link from "next/link";
import type { CategoryPreview, Product } from "@/lib/types";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { ProductCard } from "@/components/molecules/ProductCard";

export function CollectionShowcase({
  collections,
}: {
  collections: { category: CategoryPreview; products: Product[] }[];
}) {
  if (collections.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1220px] px-4 py-8 sm:px-5 sm:py-10">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <SectionLabel>Explora por ocasión</SectionLabel>
        <h2 className="font-display text-[clamp(30px,4.5vw,44px)] font-bold leading-tight text-ink">
          Lo mejor de Con cariño
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        {collections.map(({ category, products }) => (
          <div
            key={category.id}
            className="grid items-stretch gap-5 lg:grid-cols-[280px_1fr]"
          >
            {/* Left tall editorial category card */}
            <Link
              href={`/catalogo?ocasion=${category.id}`}
              className="group relative flex min-h-[210px] flex-col justify-end overflow-hidden rounded-panel border border-line bg-blush p-6 shadow-card lg:min-h-[340px]"
            >
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
              />
              <div className="relative z-10 flex flex-col items-start gap-2">
                <h3 className="font-display text-[32px] font-bold leading-none text-surface">
                  {category.label}
                </h3>
                {category.sub && (
                  <p className="line-clamp-2 text-[13.5px] leading-snug text-surface/90">
                    {category.sub}
                  </p>
                )}
                <span className="mt-1 inline-flex items-center gap-1 rounded-pill bg-surface/95 px-3.5 py-1.5 text-[12.5px] font-semibold text-rose shadow-card transition group-hover:bg-surface">
                  Ver colección →
                </span>
              </div>
            </Link>

            {/* Right category header + 4-product storefront grid */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 rounded-card border border-line bg-surface px-5 py-3 shadow-card">
                <h3 className="text-[17px] font-bold text-ink sm:text-[18px]">
                  {category.label}
                </h3>
                <Link
                  href={`/catalogo?ocasion=${category.id}`}
                  className="shrink-0 text-[13.5px] font-semibold text-rose transition hover:underline"
                >
                  Ver más →
                </Link>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/catalogo"
        className="mt-8 flex items-center justify-center rounded-card border border-line bg-surface py-4 text-[15px] font-semibold text-rose shadow-card transition hover:border-line-strong hover:bg-blush/60"
      >
        Ver todos los productos →
      </Link>
    </section>
  );
}
