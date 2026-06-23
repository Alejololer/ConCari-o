import type { Product } from "@/lib/types";
import { Button } from "@/components/atoms/Button";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading label="Los favoritos" title="Detalles más pedidos" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/catalogo" variant="secondary">Ver todo el catálogo</Button>
        </div>
      </div>
    </section>
  );
}
