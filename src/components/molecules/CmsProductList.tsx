"use client";
import { useState, useDeferredValue } from "react";
import type { Product } from "@/lib/types";
import { typeById } from "@/data/types";
import { CmsRow } from "@/components/molecules/CmsRow";

interface Props {
  products: Product[];
}

export function CmsProductList({ products }: Props) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const term = deferred.trim().toLowerCase();
  const filtered = term
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (typeById[p.type]?.label ?? "").toLowerCase().includes(term),
      )
    : products;

  const active = filtered.filter((p) => p.active).length;
  const inactive = filtered.filter((p) => !p.active).length;

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-5">
        {/* Magnifier icon */}
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o tipo…"
          className="w-full rounded-[13px] border border-line-strong bg-cream py-3 pl-10 pr-4 text-[14.5px] text-ink outline-none transition focus:border-primary focus:bg-surface"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-mute hover:text-rose transition"
            aria-label="Limpiar búsqueda"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Result summary */}
      {term && (
        <p className="mb-3 text-[13px] text-ink-mute">
          {filtered.length === 0
            ? "Sin resultados para esa búsqueda."
            : `${filtered.length} detalle${filtered.length === 1 ? "" : "s"} · ${active} activo${active === 1 ? "" : "s"}, ${inactive} inactivo${inactive === 1 ? "" : "s"}`}
        </p>
      )}

      {/* Product list */}
      <div className="divide-y divide-line rounded-card border border-line bg-surface px-5">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-mute">
            No encontramos detalles con esa búsqueda.
          </p>
        ) : (
          filtered.map((p) => <CmsRow key={p.id} product={p} />)
        )}
      </div>
    </>
  );
}
