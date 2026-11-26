"use client";
import Link from "next/link";
import type { CategoryPreview } from "@/lib/types";
import { brand } from "@/data/brand";
import { Logo } from "@/components/atoms/Logo";
import { useWhatsapp } from "@/lib/whatsappContext";

export function Footer({ categories = [] }: { categories?: CategoryPreview[] }) {
  const { openGeneric } = useWhatsapp();
  const topCategories = categories.filter((c) => c.count > 0).slice(0, 7);

  return (
    <footer className="mt-20 border-t border-line">
      {/* Top brand & social band (inspired by storefront two-tone footer, in Con Cariño palette) */}
      <div className="bg-blush/85">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-5">
          <Link href="/" aria-label={brand.name}>
            <Logo size={42} subtitle />
          </Link>

          <div className="flex items-center gap-2.5">
            <a
              href={brand.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition hover:bg-rose"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={brand.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition hover:bg-rose"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => openGeneric()}
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white transition hover:brightness-105"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.88 11.88 0 0 0 5.75 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.46-8.42ZM12.06 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.88-9.9 9.88Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-column storefront footer */}
      <div className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1220px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-ink">Acerca de {brand.name}</span>
            <p className="text-[13.5px] leading-[1.65] text-ink-mute">{brand.description}</p>
            <p className="text-[13px] font-medium text-ink-soft">📍 {brand.location}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="rounded-pill border border-line-strong bg-cream px-3 py-1 text-[11.5px] font-semibold text-ink">
                🏦 Banco Pichincha
              </span>
              <span className="rounded-pill border border-line-strong bg-cream px-3 py-1 text-[11.5px] font-semibold text-ink">
                💬 Pedido por WhatsApp
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-[14px]">
            <span className="mb-1 font-semibold text-ink">Categorías</span>
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?ocasion=${cat.id}`}
                className="text-ink-mute transition hover:text-rose"
              >
                {cat.label}
              </Link>
            ))}
            <Link href="/catalogo" className="font-semibold text-rose hover:underline">
              Ver todo el catálogo →
            </Link>
          </div>

          <div className="flex flex-col gap-2 text-[14px]">
            <span className="mb-1 font-semibold text-ink">Información</span>
            <Link href="/" className="text-ink-mute transition hover:text-rose">
              Inicio
            </Link>
            <Link href="/#como-pedir" className="text-ink-mute transition hover:text-rose">
              Cómo pedir
            </Link>
            <Link href="/#resenas" className="text-ink-mute transition hover:text-rose">
              Reseñas
            </Link>
            <Link href="/#envios-y-pagos" className="text-ink-mute transition hover:text-rose">
              Envíos y pagos
            </Link>
            <Link href="/#preguntas-frecuentes" className="text-ink-mute transition hover:text-rose">
              Preguntas frecuentes
            </Link>
          </div>

          <div className="flex flex-col gap-2 text-[14px]">
            <span className="mb-1 font-semibold text-ink">Contacto y entregas</span>
            <button
              type="button"
              onClick={() => openGeneric()}
              className="text-left font-medium text-whatsapp hover:underline"
            >
              Escribir por WhatsApp →
            </button>
            <a
              href={brand.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-mute transition hover:text-rose"
            >
              Instagram @{brand.instagram.handle}
            </a>
            <a
              href={brand.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-mute transition hover:text-rose"
            >
              Facebook
            </a>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-mute">
              Entregas a domicilio en {brand.areaServed.slice(0, -1).join(", ")} y alrededores.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-line bg-cream py-5 text-center text-[12.5px] text-mute">
        © {new Date().getFullYear()} {brand.name} · Hecho con cariño 💝 por{" "}
        <a href="https://alejololer.is-a.dev" className="underline-offset-2 hover:underline">
          Alejandro Alemán
        </a>
      </div>
    </footer>
  );
}
