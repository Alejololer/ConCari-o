import Link from "next/link";
import { notFound } from "next/navigation";
import { getOccasions, getProduct, getProducts } from "@/lib/products";
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
  const [product, allProducts, occasions] = await Promise.all([
    getProduct(id),
    getProducts(),
    getOccasions(),
  ]);
  if (!product) notFound();

  const occasionLabelById = new Map(occasions.map((o) => [o.id, o.label]));
  const occasionChips = product.occ
    .map((occId) => {
      const label = occasionLabelById.get(occId);
      return label ? { id: occId, label } : null;
    })
    .filter((chip): chip is { id: string; label: string } => chip !== null);

  const primaryOccasion = occasionChips[0];

  const otherProducts = allProducts.filter((p) => p.id !== product.id);
  const sameOccasion = otherProducts.filter((p) =>
    p.occ.some((o) => product.occ.includes(o)),
  );
  const fallbackProducts = otherProducts.filter(
    (p) => !p.occ.some((o) => product.occ.includes(o)),
  );
  const related = [...sameOccasion, ...fallbackProducts].slice(0, 4);

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

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Inicio", item: brand.siteUrl },
    { "@type": "ListItem", position: 2, name: "Catálogo", item: `${brand.siteUrl}/catalogo` },
    ...(primaryOccasion
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: primaryOccasion.label,
            item: `${brand.siteUrl}/catalogo?ocasion=${primaryOccasion.id}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: product.name,
            item: `${brand.siteUrl}/producto/${product.id}`,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${brand.siteUrl}/producto/${product.id}`,
          },
        ]),
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-6 pb-24 sm:px-5 sm:pt-10 md:pb-12">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumb} />

      {/* Visible breadcrumb trail */}
      <nav
        aria-label="Ruta de navegación"
        className="mb-5 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-mute"
      >
        <Link href="/" className="transition hover:text-rose">
          Inicio
        </Link>
        <span aria-hidden="true" className="text-mute">
          /
        </span>
        <Link href="/catalogo" className="transition hover:text-rose">
          Catálogo
        </Link>
        {primaryOccasion && (
          <>
            <span aria-hidden="true" className="text-mute">
              /
            </span>
            <Link
              href={`/catalogo?ocasion=${primaryOccasion.id}`}
              className="transition hover:text-rose"
            >
              {primaryOccasion.label}
            </Link>
          </>
        )}
        <span aria-hidden="true" className="text-mute">
          /
        </span>
        <span className="truncate font-medium text-ink" aria-current="page">
          {product.name}
        </span>
      </nav>

      <ProductDetail product={product} occasionChips={occasionChips} />

      {related.length > 0 && (
        <section className="mt-14 sm:mt-20">
          <SectionLabel>También te puede gustar</SectionLabel>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
