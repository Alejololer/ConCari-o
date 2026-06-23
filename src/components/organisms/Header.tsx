"use client";
import Link from "next/link";
import { brand } from "@/data/brand";
import { useCart } from "@/lib/cart";
import { waLink, genericText } from "@/lib/whatsapp";
import { Logo } from "@/components/atoms/Logo";
import { Dot } from "@/components/atoms/Dot";

export function Header() {
  const { count, open } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-[14px]">
        <Link href="/" aria-label={brand.name}>
          <Logo subtitle />
        </Link>

        <nav className="hidden items-center gap-7 text-[14.5px] font-medium text-ink-soft md:flex">
          <Link href="/" className="hover:text-rose">Inicio</Link>
          <Link href="/catalogo" className="hover:text-rose">Catálogo</Link>
          <Link href="/#como-pedir" className="hover:text-rose">Cómo pedir</Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={waLink(brand.whatsapp.number, genericText)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-pill bg-whatsapp px-4 py-2.5 text-[13.5px] font-semibold text-white sm:flex"
          >
            <Dot color="#fff" /> WhatsApp
          </a>
          <button
            onClick={open}
            className="relative rounded-pill border border-line-strong bg-surface px-4 py-2.5 text-[13.5px] font-semibold text-ink"
          >
            Carrito
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
