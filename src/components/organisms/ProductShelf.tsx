"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/molecules/ProductCard";

export function ProductShelf({
  title,
  subtitle,
  viewMoreHref,
  viewMoreLabel = "Ver más →",
  products,
}: {
  title: string;
  subtitle?: string;
  viewMoreHref: string;
  viewMoreLabel?: string;
  products: Product[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products.length, updateScrollState]);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.75), behavior: "smooth" });
  }

  if (products.length === 0) return null;

  const showArrows = products.length > 4;

  return (
    <section className="mx-auto max-w-[1220px] px-4 py-6 sm:px-5 sm:py-8">
      <div className="mb-5 flex items-center justify-between gap-4 rounded-card border border-line bg-surface px-5 py-3.5 shadow-card">
        <div className="min-w-0">
          <h2 className="text-[18px] font-bold text-ink sm:text-[20px]">{title}</h2>
          {subtitle && (
            <p className="text-[13px] text-ink-mute">{subtitle}</p>
          )}
        </div>
        <Link
          href={viewMoreHref}
          className="shrink-0 text-[13.5px] font-semibold text-rose transition hover:underline"
        >
          {viewMoreLabel}
        </Link>
      </div>

      {/* Desktop horizontal carousel */}
      <div className="relative hidden md:block">
        {showArrows && canPrev && (
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            aria-label="Productos anteriores"
            className="absolute -left-3.5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/95 text-ink shadow-soft transition hover:border-primary hover:text-rose"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div
          ref={scrollerRef}
          className="no-scrollbar -my-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc((100%-2rem)/3)] shrink-0 snap-start lg:w-[calc((100%-3rem)/4)]"
            >
              <ProductCard product={product} className="h-full" />
            </div>
          ))}
        </div>

        {showArrows && canNext && (
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            aria-label="Siguientes productos"
            className="absolute -right-3.5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/95 text-ink shadow-soft transition hover:border-primary hover:text-rose"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile crisp 2-column grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </section>
  );
}
