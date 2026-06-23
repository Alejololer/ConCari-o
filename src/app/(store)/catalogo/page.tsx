import { Suspense } from "react";
import type { OccasionId, ProductTypeId } from "@/lib/types";
import { getProducts } from "@/lib/products";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { CatalogFilters } from "@/components/organisms/CatalogFilters";
import { ProductCard } from "@/components/molecules/ProductCard";

export const metadata = { title: "Catálogo · Con cariño" };

type SP = { ocasion?: string; tipo?: string; q?: string };

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { ocasion, tipo, q } = await searchParams;
  const all = await getProducts();

  const term = (q ?? "").trim().toLowerCase();
  const products = all.filter((p) => {
    if (ocasion && !p.occ.includes(ocasion as OccasionId)) return false;
    if (tipo && p.type !== (tipo as ProductTypeId)) return false;
    if (term && !`${p.name} ${p.desc}`.toLowerCase().includes(term)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-12">
      <div className="mb-8 flex flex-col gap-3">
        <SectionLabel>Nuestro catálogo</SectionLabel>
        <h1 className="font-display text-[clamp(34px,5vw,52px)] font-bold leading-tight text-ink">
          Detalles para cada ocasión
        </h1>
      </div>

      {/* useSearchParams needs a Suspense boundary */}
      <Suspense>
        <CatalogFilters />
      </Suspense>

      <p className="mt-6 text-[13.5px] text-ink-mute">
        {products.length} detalle{products.length === 1 ? "" : "s"}
      </p>

      {products.length === 0 ? (
        <p className="py-20 text-center font-display text-3xl text-rose">
          No encontramos detalles con esos filtros 🥺
        </p>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
