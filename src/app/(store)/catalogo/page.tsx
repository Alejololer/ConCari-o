import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { OccasionId, ProductTypeId } from "@/lib/types";
import { getProducts, getProductTypes, getOccasions } from "@/lib/products";
import { buildCategoryPreviews } from "@/lib/storefront";
import { Button } from "@/components/atoms/Button";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductCard } from "@/components/molecules/ProductCard";
import { CatalogFilters } from "@/components/organisms/CatalogFilters";
import { brand } from "@/data/brand";

export const metadata = {
  title: `Catálogo de detalles en ${brand.city}`,
  description: `Explora fresas con chocolate, desayunos sorpresa y boxes de regalo. Entregas a domicilio en ${brand.city} y alrededores. Pide por WhatsApp.`,
  alternates: { canonical: "/catalogo" },
};

type SP = {
  ocasion?: string;
  tipo?: string;
  q?: string;
  orden?: string;
  page?: string;
};

const PAGE_SIZE = 12;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const { ocasion, tipo, q, orden, page } = await searchParams;
  const [all, productTypes, occasions] = await Promise.all([
    getProducts(),
    getProductTypes(),
    getOccasions(),
  ]);

  const categories = buildCategoryPreviews(occasions, all);
  const activeCategory = ocasion
    ? categories.find((c) => c.id === ocasion)
    : undefined;
  const distinctActiveTypes = new Set(all.map((p) => p.type)).size;

  // Filter by occasion, product type, and search term (name + desc + included items)
  const term = (q ?? "").trim().toLowerCase();
  const filtered = all.filter((p) => {
    if (ocasion && !p.occ.includes(ocasion as OccasionId)) return false;
    if (tipo && p.type !== (tipo as ProductTypeId)) return false;
    if (term) {
      const searchable = `${p.name} ${p.desc} ${p.inc.join(" ")}`.toLowerCase();
      if (!searchable.includes(term)) return false;
    }
    return true;
  });

  // Sort
  const sortOption = (orden ?? "destacados").toLowerCase();
  if (sortOption === "precio-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "precio-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nombre") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, "es"));
  } else if (sortOption === "nombre-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name, "es"));
  } else {
    // "destacados" (default): products with badge first, preserving original order otherwise
    filtered.sort((a, b) => {
      if (a.badge && !b.badge) return -1;
      if (!a.badge && b.badge) return 1;
      return 0;
    });
  }

  // Paginate (1-based)
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, parseInt(page ?? "1", 10) || 1),
    totalPages,
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = totalCount === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, totalCount);

  return (
    <div className="mx-auto max-w-[1220px] px-4 pt-6 pb-14 sm:px-5 sm:pb-20">
      {/* Category / Catalog Hero Banner */}
      {activeCategory ? (
        activeCategory.imageUrl ? (
          <header className="relative mb-8 flex min-h-[160px] items-end overflow-hidden rounded-panel border border-line bg-blush shadow-card sm:min-h-[200px]">
            <Image
              src={activeCategory.imageUrl}
              alt={activeCategory.label}
              fill
              priority
              sizes="(max-width: 1220px) 100vw, 1220px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-primary/25"
            />
            <div className="relative z-10 w-full px-6 py-7 sm:px-10 sm:py-9">
              <nav
                aria-label="Ruta de navegación"
                className="mb-2 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-white/80"
              >
                <Link href="/" className="transition hover:text-white">
                  Inicio
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/catalogo" className="transition hover:text-white">
                  Catálogo
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white">{activeCategory.label}</span>
              </nav>
              <h1 className="font-display text-[clamp(32px,5vw,50px)] font-bold leading-[1.08] text-white">
                {activeCategory.label}
              </h1>
              {activeCategory.sub && (
                <p className="mt-1.5 max-w-xl text-[14.5px] text-white/90 sm:text-[15.5px]">
                  {activeCategory.sub}
                </p>
              )}
            </div>
          </header>
        ) : (
          <header className="relative mb-8 flex min-h-[160px] items-end overflow-hidden rounded-panel border border-line bg-blush/75 px-6 py-7 sm:min-h-[200px] sm:px-10 sm:py-9">
            <div className="w-full">
              <nav
                aria-label="Ruta de navegación"
                className="mb-2 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-ink-mute"
              >
                <Link href="/" className="transition hover:text-berry">
                  Inicio
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/catalogo" className="transition hover:text-berry">
                  Catálogo
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-ink">{activeCategory.label}</span>
              </nav>
              <h1 className="font-display text-[clamp(32px,5vw,50px)] font-bold leading-[1.08] text-ink">
                {activeCategory.label}
              </h1>
              {activeCategory.sub && (
                <p className="mt-1.5 max-w-xl text-[14.5px] text-ink-soft sm:text-[15.5px]">
                  {activeCategory.sub}
                </p>
              )}
            </div>
          </header>
        )
      ) : (
        <header className="mb-8 rounded-panel border border-line bg-blush/70 px-6 py-8 sm:px-10 sm:py-10">
          <nav
            aria-label="Ruta de navegación"
            className="mb-2 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-ink-mute"
          >
            <Link href="/" className="transition hover:text-berry">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Catálogo</span>
          </nav>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] text-ink">
            Nuestro catálogo
          </h1>
          <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft sm:text-[15.5px]">
            Fresas con chocolate, desayunos sorpresa y boxes artesanales hechos a mano en {brand.city}. Elige tus favoritos y arma tu pedido por WhatsApp.
          </p>
        </header>
      )}

      {/* Search, occasion/type chips & toolbar */}
      <Suspense>
        <CatalogFilters
          productTypes={productTypes}
          occasions={occasions}
          totalCount={totalCount}
          showingFrom={showingFrom}
          showingTo={showingTo}
          showTypeFilter={distinctActiveTypes > 1}
        />
      </Suspense>

      {/* Product Grid or Empty State */}
      {paginated.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-panel border border-line bg-surface px-6 py-16 text-center shadow-card">
          <p className="font-display text-[clamp(28px,4vw,38px)] font-bold text-rose">
            No encontramos detalles con esos filtros
          </p>
          <p className="mt-2 max-w-md text-[14.5px] text-ink-soft">
            Prueba cambiando la ocasión o limpiando tu búsqueda para ver todos nuestros regalos disponibles.
          </p>
          <div className="mt-6">
            <Button href="/catalogo" variant="secondary" size="sm">
              Ver todo el catálogo
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={{ ocasion, tipo, q, orden }}
      />
    </div>
  );
}
