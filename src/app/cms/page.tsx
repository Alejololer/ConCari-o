import Link from "next/link";
import { getProducts } from "@/lib/products";
import { StatItem } from "@/components/molecules/StatItem";
import { CmsProductList } from "@/components/molecules/CmsProductList";
import { money } from "@/lib/format";

export default async function CmsHome() {
  const products = await getProducts({ includeInactive: true });
  const activeCount = products.filter((p) => p.active).length;
  const avg = products.length
    ? products.reduce((s, p) => s + p.price, 0) / products.length
    : 0;

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-rose">Productos</h1>
          <p className="text-[14px] text-ink-mute">Gestiona tu catálogo con cariño.</p>
        </div>
        <Link
          href="/cms/producto/nuevo"
          className="rounded-pill bg-primary px-5 py-3 text-[14.5px] font-semibold text-white hover:opacity-90 transition"
        >
          + Nuevo detalle
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 flex flex-wrap gap-6 sm:gap-8 rounded-card border border-line bg-surface px-5 py-5">
        <StatItem value={String(products.length)} label="Detalles" />
        <StatItem value={String(activeCount)} label="Activos" />
        <StatItem value={money(avg)} label="Precio promedio" />
      </div>

      {/* Searchable product list (client island) */}
      <CmsProductList products={products} />
    </div>
  );
}
