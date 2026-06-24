import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import { ProductDetail } from "@/components/organisms/ProductDetail";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SectionLabel } from "@/components/atoms/SectionLabel";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? `${product.name} · Con cariño` : "Detalle no encontrado" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const related = (await getProducts())
    .filter((p) => p.id !== product.id && p.occ.some((o) => product.occ.includes(o)))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8 sm:px-5 sm:py-12">
      <Link href="/catalogo" className="mb-6 inline-block text-[13.5px] text-ink-mute hover:text-rose">
        ← Volver al catálogo
      </Link>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-20">
          <SectionLabel>También te puede gustar</SectionLabel>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
