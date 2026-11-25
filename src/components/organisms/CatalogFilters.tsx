"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Occasion, ProductTypeMeta } from "@/lib/types";
import { Chip } from "@/components/atoms/Chip";

export interface CatalogFiltersProps {
  productTypes: ProductTypeMeta[];
  occasions: Occasion[];
  totalCount: number;
  showingFrom: number;
  showingTo: number;
  showTypeFilter?: boolean;
}

// Reads/writes the URL search params (the catalog page filters, sorts & paginates server-side).
export function CatalogFilters({
  productTypes,
  occasions,
  totalCount,
  showingFrom,
  showingTo,
  showTypeFilter = false,
}: CatalogFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const ocasion = params.get("ocasion") ?? "";
  const tipo = params.get("tipo") ?? "";
  const orden = params.get("orden") ?? "destacados";
  const urlQ = params.get("q") ?? "";

  const [query, setQuery] = useState(urlQ);
  const lastPushedQ = useRef(urlQ);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync controlled input on external URL navigation (e.g. Back/Forward or Clear All)
  useEffect(() => {
    if (urlQ !== lastPushedQ.current) {
      setQuery(urlQ);
      lastPushedQ.current = urlQ;
    }
  }, [urlQ]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function pushParams(mutate: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    next.delete("page"); // Always reset to page 1 on any filter or sort change
    const qs = next.toString();
    router.push(qs ? `/catalogo?${qs}` : "/catalogo", { scroll: false });
  }

  function toggleFilterParam(key: "ocasion" | "tipo", value: string) {
    pushParams((next) => {
      if (value && next.get(key) !== value) next.set(key, value);
      else next.delete(key);
    });
  }

  function handleSortChange(value: string) {
    pushParams((next) => {
      if (value && value !== "destacados") next.set("orden", value);
      else next.delete("orden");
    });
  }

  function commitSearch(rawValue: string) {
    const trimmed = rawValue.trim();
    lastPushedQ.current = trimmed;
    pushParams((next) => {
      if (trimmed) next.set("q", trimmed);
      else next.delete("q");
    });
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      commitSearch(value);
    }, 300);
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    commitSearch(query);
  }

  function handleClearSearch() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    commitSearch("");
  }

  function handleClearAll() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    lastPushedQ.current = "";
    const next = new URLSearchParams();
    if (orden && orden !== "destacados") next.set("orden", orden);
    const qs = next.toString();
    router.push(qs ? `/catalogo?${qs}` : "/catalogo", { scroll: false });
  }

  const hasFilters = Boolean(ocasion || tipo || urlQ);
  const showTypesRow = showTypeFilter && productTypes.length > 1;

  return (
    <section aria-label="Filtros del catálogo" className="flex flex-col gap-4">
      {/* Row 1: Wide rounded search bar */}
      <form
        onSubmit={handleSearchSubmit}
        role="search"
        className="flex w-full items-center rounded-pill border border-line-strong bg-surface p-1.5 shadow-card transition focus-within:border-primary"
      >
        <svg
          className="ml-3 shrink-0 text-mute"
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
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar fresas, desayunos, boxes…"
          aria-label="Buscar en el catálogo"
          className="min-w-0 flex-1 bg-transparent py-2 pl-2.5 pr-2 text-[14.5px] text-ink outline-none"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClearSearch}
            aria-label="Limpiar búsqueda"
            className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] text-ink-mute transition hover:bg-blush hover:text-rose"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          className="hidden shrink-0 items-center justify-center rounded-pill bg-primary px-5 py-2 text-[13.5px] font-semibold text-white transition hover:brightness-[1.03] active:scale-[.98] sm:inline-flex"
        >
          Buscar
        </button>
      </form>

      {/* Row 2: Horizontal scrollable occasion chips on mobile, clean wrap on desktop */}
      <div
        role="group"
        aria-label="Filtrar por ocasión"
        className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 [&>button]:shrink-0 [&>button]:whitespace-nowrap"
      >
        <Chip
          type="button"
          active={!ocasion}
          onClick={() => toggleFilterParam("ocasion", "")}
        >
          Todas
        </Chip>
        {occasions.map((o) => (
          <Chip
            key={o.id}
            type="button"
            active={ocasion === o.id}
            onClick={() => toggleFilterParam("ocasion", o.id)}
          >
            {o.label}
          </Chip>
        ))}
      </div>

      {/* Optional Row 3: Product type chips (only when multiple types are in use) */}
      {showTypesRow && (
        <div className="flex items-start gap-3">
          <span className="mt-2 shrink-0 text-[11px] font-semibold uppercase tracking-[0.7px] text-label">
            Tipo
          </span>
          <div
            role="group"
            aria-label="Filtrar por tipo de detalle"
            className="no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 [&>button]:shrink-0 [&>button]:whitespace-nowrap"
          >
            <Chip
              type="button"
              active={!tipo}
              onClick={() => toggleFilterParam("tipo", "")}
            >
              Todos
            </Chip>
            {productTypes.map((t) => (
              <Chip
                key={t.id}
                type="button"
                active={tipo === t.id}
                onClick={() => toggleFilterParam("tipo", t.id)}
              >
                {t.label}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar row: Result range + Clear filters (left) | Sort select (right) */}
      <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-[13.5px] text-ink-mute">
            {totalCount === 0
              ? "0 detalles"
              : `Mostrando ${showingFrom} – ${showingTo} de ${totalCount} ${totalCount === 1 ? "detalle" : "detalles"}`}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[13px] font-medium text-berry underline underline-offset-2 transition hover:text-rose"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Sort select (single SVG chevron only) */}
        <div className="relative w-full shrink-0 sm:w-auto">
          <select
            value={orden}
            onChange={(e) => handleSortChange(e.target.value)}
            aria-label="Ordenar productos"
            className="w-full appearance-none rounded-pill border border-line-strong bg-surface py-2.5 pl-4 pr-10 text-[13.5px] font-medium text-ink outline-none transition hover:border-primary/60 focus:border-primary sm:w-auto"
          >
            <option value="destacados">Ordenar: Destacados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre: A – Z</option>
            <option value="nombre-desc">Nombre: Z – A</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
