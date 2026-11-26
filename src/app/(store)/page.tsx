import type { Metadata } from "next";
import { getProducts, getOccasions } from "@/lib/products";
import { buildCategoryPreviews } from "@/lib/storefront";
import { brand } from "@/data/brand";
import { JsonLd } from "@/components/atoms/JsonLd";
import { CursorDust } from "@/components/atoms/CursorDust";
import { Hero } from "@/components/organisms/Hero";
import { ProductShelf } from "@/components/organisms/ProductShelf";
import { CategoryCarousel } from "@/components/organisms/CategoryCarousel";
import { CollectionShowcase } from "@/components/organisms/CollectionShowcase";
import { ReviewsSection } from "@/components/organisms/ReviewsSection";
import { HowTo } from "@/components/organisms/HowTo";
import { FaqSection } from "@/components/organisms/FaqSection";
import { QuoteBand } from "@/components/organisms/QuoteBand";

export const metadata: Metadata = {
  title: {
    absolute: `${brand.name} · Detalles y regalos a domicilio en ${brand.city}`,
  },
  description: `Fresas con chocolate, desayunos sorpresa y boxes de regalo en ${brand.city} y alrededores (Lasso, Pujilí, Salcedo). Pide por WhatsApp con ${brand.name}.`,
  alternates: { canonical: "/" },
};

const faqs = [
  {
    q: `¿Hacen entregas a domicilio en ${brand.city} y alrededores?`,
    a: `Sí. Realizamos entregas a domicilio en ${brand.areaServed.slice(0, -1).join(", ")} y sectores cercanos de ${brand.province}. Cotizamos el valor del envío directamente por WhatsApp según la dirección.`,
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Agrega tus detalles favoritos al carrito desde el catálogo o la página principal y presiona pedir por WhatsApp. Te ayudamos a confirmar disponibilidad, hora de entrega y mensaje personalizado.",
  },
  {
    q: "¿Con cuánta anticipación debo reservar y se puede personalizar?",
    a: "Recomendamos reservar con 24 a 48 horas de anticipación, especialmente en desayunos sorpresa y fechas especiales. Puedes personalizar la tarjeta, colores y pequeños extras al escribirnos por WhatsApp.",
  },
  {
    q: "¿Cuáles son los métodos de pago?",
    a: "Trabajamos con transferencia o depósito bancario a Banco Pichincha. Al confirmar tu pedido por WhatsApp te compartimos los datos para apartar tu fecha de entrega.",
  },
  {
    q: "¿Qué tipo de detalles preparan?",
    a: "Preparamos fresas cubiertas con chocolate, desayunos sorpresa, boxes de regalo y detalles personalizados para cumpleaños, aniversarios, San Valentín, Día de la Madre, Día del Padre y más ocasiones.",
  },
];

export default async function HomePage() {
  const [products, occasions] = await Promise.all([getProducts(), getOccasions()]);
  const categories = buildCategoryPreviews(occasions, products);

  const flaggedBanner = products.filter((p) => p.featuredBanner);
  const bannerProducts =
    flaggedBanner.length > 0
      ? flaggedBanner
      : [...products]
          .sort(
            (a, b) =>
              Number(Boolean(b.badge)) - Number(Boolean(a.badge)) ||
              Number(Boolean(b.imageUrl)) - Number(Boolean(a.imageUrl)),
          )
          .slice(0, 2);

  const favorites = [...products]
    .sort(
      (a, b) =>
        Number(Boolean(b.badge)) - Number(Boolean(a.badge)) ||
        Number(Boolean(b.imageUrl)) - Number(Boolean(a.imageUrl)),
    )
    .slice(0, 8);

  const eligibleCategories = [...categories]
    .filter((c) => c.count >= 3)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const collectionSource =
    eligibleCategories.length > 0
      ? eligibleCategories
      : [...categories]
          .filter((c) => c.count > 0)
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

  const topCollections = collectionSource.map((category) => ({
    category,
    products: products
      .filter((p) => p.occ.includes(category.id))
      .sort(
        (a, b) =>
          Number(Boolean(b.imageUrl)) - Number(Boolean(a.imageUrl)) ||
          Number(Boolean(b.badge)) - Number(Boolean(a.badge)),
      )
      .slice(0, 4),
  }));

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: brand.name,
    description: brand.description,
    url: brand.siteUrl,
    image: `${brand.siteUrl}/logo-concarino.png`,
    priceRange: brand.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.city,
      addressRegion: brand.province,
      addressCountry: "EC",
    },
    geo: { "@type": "GeoCoordinates", latitude: brand.geo.lat, longitude: brand.geo.lng },
    areaServed: brand.areaServed.map((name) => ({ "@type": "City", name })),
    sameAs: [brand.instagram.url, brand.facebook.url],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${brand.siteUrl}/catalogo?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={website} />
      <JsonLd data={faqSchema} />
      <CursorDust />
      <Hero bannerProducts={bannerProducts} />
      <ProductShelf
        title="Los favoritos"
        subtitle="Los detalles más pedidos"
        viewMoreHref="/catalogo"
        products={favorites}
      />
      <CategoryCarousel categories={categories} />
      <CollectionShowcase collections={topCollections} />
      <ReviewsSection />
      <HowTo />
      <FaqSection faqs={faqs} />
      <QuoteBand />
    </>
  );
}
