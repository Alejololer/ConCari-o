import { Suspense } from "react";
import type { OccasionId, ProductTypeId } from "@/lib/types";
import { getProducts, getProductTypes } from "@/lib/products";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { CatalogFilters } from "@/components/organisms/CatalogFilters";
import { ProductCard } from "@/components/molecules/ProductCard";

export const metadata = { title: "Catálogo · Con cariño" };

type SP = { ocasion?: string; tipo?: string; q?: string; orden?: string };

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { ocasion, tipo, q, orden } = await searchParams;
  const [all, productTypes] = await Promise.all([
    getProducts(),
    getProductTypes()
  ]);

  const term = (q ?? "").trim().toLowerCase();
  let products = all.filter((p) => {
    if (ocasion && !p.occ.includes(ocasion as OccasionId)) return false;
    if (tipo && p.type !== (tipo as ProductTypeId)) return false;
    if (term && !`${p.name} ${p.desc}`.toLowerCase().includes(term)) return false;
    return true;
  });

  // Apply sorting
  const sortOption = (orden ?? "destacados").toLowerCase();
  if (sortOption === "precio-asc") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (sortOption === "precio-desc") {
    products = products.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nombre") {
    products = products.sort((a, b) => a.name.localeCompare(b.name, "es"));
  } else {
    // "destacados" (default): products with badge first, stable otherwise
    products = products.sort((a, b) => {
      if (a.badge && !b.badge) return -1;
      if (!a.badge && b.badge) return 1;
      return 0; // maintain original order
    });
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-5 sm:py-12">
      <div className="mb-8 flex flex-col gap-3">
        <SectionLabel>Nuestro catálogo</SectionLabel>
        <h1 className="font-display text-[clamp(30px,5vw,52px)] font-bold leading-tight text-ink">
          Detalles para cada ocasión
        </h1>
      </div>

      {/* useSearchParams needs a Suspense boundary */}
      <Suspense>
        <CatalogFilters productTypes={productTypes} />
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
