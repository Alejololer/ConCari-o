"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Occasion, ProductTypeMeta } from "@/lib/types";
import { Chip } from "@/components/atoms/Chip";
import { cn } from "@/lib/cn";

const SORT_OPTIONS = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Nombre: A – Z" },
  { value: "nombre-desc", label: "Nombre: Z – A" },
] as const;

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
  const [sortOpen, setSortOpen] = useState(false);
  const lastPushedQ = useRef(urlQ);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sortOpen]);

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

        {/* Custom pill sort dropdown (single crisp chevron across all browsers) */}
        <div ref={sortRef} className="relative w-full shrink-0 sm:w-auto">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 rounded-pill border border-line-strong bg-surface py-2.5 pl-4 pr-3.5 text-[13.5px] font-medium text-ink shadow-card transition hover:border-primary/60 focus:border-primary sm:w-auto"
          >
            <span>
              Ordenar por:{" "}
              <strong className="font-semibold text-rose">
                {SORT_OPTIONS.find((opt) => opt.value === orden)?.label ?? "Destacados"}
              </strong>
            </span>
            <svg
              className={cn(
                "shrink-0 text-ink-mute transition-transform duration-200",
                sortOpen && "rotate-180",
              )}
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
          </button>

          {sortOpen && (
            <div
              role="listbox"
              aria-label="Ordenar productos"
              className="absolute right-0 top-full z-30 mt-2 w-full min-w-[230px] overflow-hidden rounded-card border border-line-strong bg-surface p-1.5 shadow-soft sm:w-auto"
            >
              {SORT_OPTIONS.map((opt) => {
                const selected = orden === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      setSortOpen(false);
                      handleSortChange(opt.value);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left text-[13.5px] transition",
                      selected
                        ? "bg-blush font-semibold text-berry"
                        : "text-ink-soft hover:bg-cream hover:text-rose",
                    )}
                  >
                    <span>{opt.label}</span>
                    {selected && <span aria-hidden="true">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
