"use client";
import { useState } from "react";
import Link from "next/link";
import { brand } from "@/data/brand";
import { useCart } from "@/lib/cart";
import { Logo } from "@/components/atoms/Logo";
import { Dot } from "@/components/atoms/Dot";
import { useWhatsapp } from "@/lib/whatsappContext";

export function Header() {
  const { count, open } = useCart();
  const { getGenericLink } = useWhatsapp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-[14px]">
        <Link href="/" aria-label={brand.name}>
          <Logo subtitle />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[14.5px] font-medium text-ink-soft md:flex">
          <Link href="/" className="hover:text-rose">Inicio</Link>
          <Link href="/catalogo" className="hover:text-rose">Catálogo</Link>
          <Link href="/#como-pedir" className="hover:text-rose">Cómo pedir</Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={getGenericLink()}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-line-strong bg-surface md:hidden"
          >
            <span
              className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden border-t border-line bg-cream/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4 gap-1">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="rounded-[12px] px-3 py-3 text-[15px] font-medium text-ink-soft hover:bg-blush hover:text-rose transition"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            onClick={() => setMenuOpen(false)}
            className="rounded-[12px] px-3 py-3 text-[15px] font-medium text-ink-soft hover:bg-blush hover:text-rose transition"
          >
            Catálogo
          </Link>
          <Link
            href="/#como-pedir"
            onClick={() => setMenuOpen(false)}
            className="rounded-[12px] px-3 py-3 text-[15px] font-medium text-ink-soft hover:bg-blush hover:text-rose transition"
          >
            Cómo pedir
          </Link>
          <a
            href={getGenericLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center gap-2 rounded-pill bg-whatsapp px-4 py-3 text-[14px] font-semibold text-white justify-center"
          >
            <Dot color="#fff" /> Escríbenos por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
