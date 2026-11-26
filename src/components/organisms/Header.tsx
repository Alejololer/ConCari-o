"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CategoryPreview } from "@/lib/types";
import { brand } from "@/data/brand";
import { useCart } from "@/lib/cart";
import { useWhatsapp } from "@/lib/whatsappContext";
import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/cn";

type OpenPopover = "categories" | "info" | null;
type MobileAccordion = "categories" | "info" | null;

export function Header({ categories = [] }: { categories?: CategoryPreview[] }) {
  const { count, open } = useCart();
  const { openGeneric } = useWhatsapp();
  const pathname = usePathname();
  const router = useRouter();

  const [popover, setPopover] = useState<OpenPopover>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileAccordion>("categories");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setPopover(null);
    setMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!popover) return;
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setPopover(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopover(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popover]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    setMobileSearchOpen(false);
    setMenuOpen(false);
    router.push(trimmed ? `/catalogo?q=${encodeURIComponent(trimmed)}` : "/catalogo");
  }

  const visibleCategories = categories.filter((c) => c.count > 0);
  const navCategories = visibleCategories.length > 0 ? visibleCategories : categories;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[64px] max-w-[1220px] items-center justify-between gap-2 px-3.5 sm:h-[68px] sm:gap-3 sm:px-5">
        {/* Brand */}
        <Link href="/" aria-label={brand.name} className="shrink-0">
          <Logo size={40} subtitle />
        </Link>

        {/* Desktop center navigation: Inicio · Categorías · Reseñas · Información */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 text-[14.5px] font-medium text-ink-soft md:flex"
        >
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-rose",
              pathname === "/" && "font-semibold text-rose",
            )}
          >
            Inicio
          </Link>

          {/* Categorías popover */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={popover === "categories"}
              onClick={() => setPopover((p) => (p === "categories" ? null : "categories"))}
              className={cn(
                "flex items-center gap-1.5 py-2 transition-colors hover:text-rose",
                (popover === "categories" || pathname === "/catalogo") && "font-semibold text-rose",
              )}
            >
              Categorías
              <Chevron open={popover === "categories"} />
            </button>

            {popover === "categories" && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[340px] -translate-x-1/2 overflow-hidden rounded-card border border-line bg-surface shadow-soft">
                <div className="max-h-[380px] divide-y divide-line/60 overflow-y-auto p-2">
                  {navCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalogo?ocasion=${cat.id}`}
                      onClick={() => setPopover(null)}
                      className="group flex items-center gap-3 rounded-[14px] px-2.5 py-2 transition hover:bg-blush/60"
                    >
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-blush">
                        {cat.imageUrl ? (
                          <Image
                            src={cat.imageUrl}
                            alt={cat.label}
                            fill
                            sizes="40px"
                            loading="eager"
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-[15px]">💝</span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-ink group-hover:text-rose">
                          {cat.label}
                        </span>
                        {cat.count > 0 && (
                          <span className="block text-[11.5px] text-mute">
                            {cat.count} {cat.count === 1 ? "detalle" : "detalles"}
                          </span>
                        )}
                      </span>
                      <span className="text-mute transition group-hover:translate-x-0.5 group-hover:text-rose">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-line bg-cream/60 p-2">
                  <Link
                    href="/catalogo"
                    onClick={() => setPopover(null)}
                    className="flex items-center justify-between rounded-[12px] px-3 py-2.5 text-[13.5px] font-semibold text-rose transition hover:bg-blush"
                  >
                    <span>Ver todos los productos</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#resenas"
            className="transition-colors hover:text-rose"
          >
            Reseñas
          </Link>

          {/* Información popover */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={popover === "info"}
              onClick={() => setPopover((p) => (p === "info" ? null : "info"))}
              className={cn(
                "flex items-center gap-1.5 py-2 transition-colors hover:text-rose",
                popover === "info" && "font-semibold text-rose",
              )}
            >
              Información
              <Chevron open={popover === "info"} />
            </button>

            {popover === "info" && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[250px] -translate-x-1/2 rounded-card border border-line bg-surface p-2 shadow-soft">
                {[
                  { label: "Cómo pedir", href: "/#como-pedir" },
                  { label: "Envíos y pagos", href: "/#envios-y-pagos" },
                  { label: "Preguntas frecuentes", href: "/#preguntas-frecuentes" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setPopover(null)}
                    className="flex items-center justify-between rounded-[12px] px-3 py-2.5 text-[14px] text-ink-soft transition hover:bg-blush/60 hover:text-rose"
                  >
                    <span>{item.label}</span>
                    <span className="text-mute">›</span>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setPopover(null);
                    openGeneric();
                  }}
                  className="mt-1 flex w-full items-center justify-between rounded-[12px] border-t border-line/70 px-3 py-2.5 text-left text-[14px] font-medium text-whatsapp transition hover:bg-blush/50"
                >
                  <span>Escribir por WhatsApp</span>
                  <span>›</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right actions: Search + Cart Pill + Mobile Menu */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* Desktop inline search */}
          <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar detalles…"
              aria-label="Buscar detalles"
              className="w-[210px] rounded-pill border border-line-strong bg-cream/70 py-2 pl-9 pr-4 text-[13.5px] text-ink outline-none transition focus:w-[250px] focus:border-primary focus:bg-surface"
            />
          </form>

          {/* Mobile/tablet search icon */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
            aria-label="Buscar en la tienda"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface text-ink-soft transition hover:border-primary hover:text-rose sm:h-10 sm:w-10 lg:hidden"
          >
            <SearchIcon />
          </button>

          {/* Storefront Cart Pill */}
          <button
            type="button"
            onClick={open}
            aria-label={`Abrir carrito (${count} ${count === 1 ? "producto" : "productos"})`}
            className="flex h-9 items-center gap-1.5 rounded-pill bg-primary px-3 text-[13.5px] font-semibold text-white shadow-card transition hover:brightness-105 active:scale-95 sm:h-10 sm:gap-2 sm:px-4 sm:text-[14px]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="min-w-[14px] text-center">{count}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
              setMobileSearchOpen(false);
            }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line-strong bg-surface sm:h-10 sm:w-10 md:hidden"
          >
            <span
              className={cn(
                "block h-[2px] w-4 rounded-full bg-ink transition-all duration-200",
                menuOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-4 rounded-full bg-ink transition-all duration-200",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-4 rounded-full bg-ink transition-all duration-200",
                menuOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Tablet/Mobile expandable search strip */}
      {mobileSearchOpen && (
        <div className="border-t border-line bg-cream/95 px-4 py-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-[600px] gap-2">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar fresas, desayunos, boxes…"
                className="w-full rounded-pill border border-line-strong bg-surface py-2.5 pl-9 pr-4 text-[14px] text-ink outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="rounded-pill bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-white"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation menu: Inicio · Categorías · Reseñas · Información */}
      {menuOpen && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-line bg-surface px-4 py-4 shadow-soft md:hidden">
          <nav className="flex flex-col divide-y divide-line">
            {/* 1. Inicio */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center justify-between py-3.5 text-[15.5px] font-semibold",
                pathname === "/" ? "text-rose" : "text-ink",
              )}
            >
              <span>Inicio</span>
              <span className="text-mute">›</span>
            </Link>

            {/* 2. Categorías (expandable with circular photos) */}
            <div className="py-1">
              <button
                type="button"
                aria-expanded={mobileSection === "categories"}
                onClick={() =>
                  setMobileSection((s) => (s === "categories" ? null : "categories"))
                }
                className="flex w-full items-center justify-between py-2.5 text-[15.5px] font-semibold text-ink"
              >
                <span>Categorías</span>
                <Chevron open={mobileSection === "categories"} />
              </button>

              {mobileSection === "categories" && (
                <div className="pb-3 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    {navCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/catalogo?ocasion=${cat.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 rounded-[14px] border border-line bg-cream/70 p-2 text-[13px] font-medium text-ink transition hover:border-primary/40 hover:text-rose"
                      >
                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blush">
                          {cat.imageUrl ? (
                            <Image
                              src={cat.imageUrl}
                              alt={cat.label}
                              fill
                              sizes="32px"
                              loading="eager"
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-xs">💝</span>
                          )}
                        </span>
                        <span className="truncate">{cat.label}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/catalogo"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2.5 flex items-center justify-center rounded-pill bg-blush py-2.5 text-[13.5px] font-semibold text-berry"
                  >
                    Ver todos los productos →
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Reseñas */}
            <Link
              href="/#resenas"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3.5 text-[15.5px] font-semibold text-ink hover:text-rose"
            >
              <span>Reseñas</span>
              <span className="text-mute">›</span>
            </Link>

            {/* 4. Información (expandable) */}
            <div className="py-1">
              <button
                type="button"
                aria-expanded={mobileSection === "info"}
                onClick={() => setMobileSection((s) => (s === "info" ? null : "info"))}
                className="flex w-full items-center justify-between py-2.5 text-[15.5px] font-semibold text-ink"
              >
                <span>Información</span>
                <Chevron open={mobileSection === "info"} />
              </button>

              {mobileSection === "info" && (
                <div className="flex flex-col gap-1 pb-3 pl-2">
                  <Link
                    href="/#como-pedir"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[10px] px-2.5 py-2 text-[14px] text-ink-soft hover:bg-blush/60 hover:text-rose"
                  >
                    Cómo pedir
                  </Link>
                  <Link
                    href="/#envios-y-pagos"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[10px] px-2.5 py-2 text-[14px] text-ink-soft hover:bg-blush/60 hover:text-rose"
                  >
                    Envíos y pagos
                  </Link>
                  <Link
                    href="/#preguntas-frecuentes"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[10px] px-2.5 py-2 text-[14px] text-ink-soft hover:bg-blush/60 hover:text-rose"
                  >
                    Preguntas frecuentes
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openGeneric();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-whatsapp px-4 py-3 text-[14px] font-semibold text-white"
          >
            Escríbenos por WhatsApp
          </button>
        </div>
      )}
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform duration-200", open && "rotate-180")}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
