import { getProducts, getOccasions } from "@/lib/products";
import { brand } from "@/data/brand";
import { JsonLd } from "@/components/atoms/JsonLd";
import { CursorDust } from "@/components/atoms/CursorDust";
import { Hero } from "@/components/organisms/Hero";
import { CategoryGrid } from "@/components/organisms/CategoryGrid";
import { FeaturedGrid } from "@/components/organisms/FeaturedGrid";
import { HowTo } from "@/components/organisms/HowTo";
import { QuoteBand } from "@/components/organisms/QuoteBand";

export const metadata = {
  title: `Detalles a domicilio en ${brand.city} · ${brand.name}`,
  description: `Fresas con chocolate, desayunos sorpresa y boxes de regalo en ${brand.city} y alrededores (Lasso, Pujilí, Salcedo). Pide por WhatsApp con ${brand.name}.`,
  alternates: { canonical: "/" },
};

const faqs = [
  {
    q: `¿Hacen entregas en ${brand.city}?`,
    a: `Sí. Entregamos a domicilio en ${brand.areaServed.slice(0, -1).join(", ")} y alrededores de Cotopaxi.`,
  },
  {
    q: "¿Qué tipo de detalles venden?",
    a: "Fresas con chocolate, desayunos sorpresa y boxes de regalo para cumpleaños, aniversarios, San Valentín, Día de la madre/padre y más ocasiones.",
  },
  {
    q: "¿Cómo hago un pedido?",
    a: `Elige tus detalles en el catálogo y confirma el pedido por WhatsApp. Coordinamos fecha, entrega y personalización.`,
  },
];

export default async function HomePage() {
  const [products, occasions] = await Promise.all([getProducts(), getOccasions()]);
  const bannerProducts = products.filter((p) => p.featuredBanner);
  // Featured: badged products first, then fill up to 6.
  const featured = [...products]
    .sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))
    .slice(0, 6);

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
      <CategoryGrid occasions={occasions} />
      <FeaturedGrid products={featured} />
      <HowTo />
      <section className="mx-auto max-w-[820px] px-4 py-16 sm:px-5">
        <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold text-ink">
          Preguntas frecuentes
        </h2>
        <dl className="mt-6 flex flex-col gap-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-ink">{f.q}</dt>
              <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <QuoteBand />
    </>
  );
}
