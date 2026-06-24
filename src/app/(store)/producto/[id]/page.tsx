import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import { brand } from "@/data/brand";
import { JsonLd } from "@/components/atoms/JsonLd";
import { ProductDetail } from "@/components/organisms/ProductDetail";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SectionLabel } from "@/components/atoms/SectionLabel";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Detalle no encontrado" };
  return {
    title: product.name,
    description: `${product.desc} Entrega a domicilio en ${brand.city} y alrededores. Pide por WhatsApp con ${brand.name}.`,
    alternates: { canonical: `/producto/${product.id}` },
    openGraph: { images: product.imageUrl ? [product.imageUrl] : ["/logo-concarino.png"] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const related = (await getProducts())
    .filter((p) => p.id !== product.id && p.occ.some((o) => product.occ.includes(o)))
    .slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: product.imageUrl ? [product.imageUrl] : [`${brand.siteUrl}/logo-concarino.png`],
    brand: { "@type": "Brand", name: brand.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${brand.siteUrl}/producto/${product.id}`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${brand.siteUrl}/catalogo` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${brand.siteUrl}/producto/${product.id}` },
    ],
  };

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8 sm:px-5 sm:py-12">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumb} />
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
