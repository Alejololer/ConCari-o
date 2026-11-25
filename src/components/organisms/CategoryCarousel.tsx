"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { CategoryPreview } from "@/lib/types";
import { CategoryCircle } from "@/components/molecules/CategoryCircle";

export function CategoryCarousel({ categories }: { categories: CategoryPreview[] }) {
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
  }, [categories.length, updateScrollState]);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  if (categories.length === 0) return null;

  return (
    <section id="ocasiones" className="scroll-mt-24 mx-auto max-w-[1220px] px-4 py-6 sm:px-5 sm:py-8">
      <div className="mb-6 flex items-center justify-between gap-4 rounded-card border border-line bg-surface px-5 py-3.5 shadow-card">
        <h2 className="text-[18px] font-bold text-ink sm:text-[20px]">Categorías</h2>
        <Link
          href="/catalogo"
          className="shrink-0 text-[13.5px] font-semibold text-rose transition hover:underline"
        >
          Ver catálogo →
        </Link>
      </div>

      <div className="relative">
        {canPrev && (
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            aria-label="Categorías anteriores"
            className="absolute -left-3 top-10 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface/95 text-ink shadow-soft transition hover:border-primary hover:text-rose md:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-1 pt-1.5 pb-2 sm:gap-6"
        >
          {categories.map((category) => (
            <CategoryCircle key={category.id} category={category} />
          ))}
        </div>

        {canNext && (
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            aria-label="Siguientes categorías"
            className="absolute -right-3 top-10 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface/95 text-ink shadow-soft transition hover:border-primary hover:text-rose md:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
