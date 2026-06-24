"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { occasions } from "@/data/occasions";
import type { ProductTypeMeta } from "@/lib/types";
import { Chip } from "@/components/atoms/Chip";

// Reads/writes the URL search params (the catalog page filters server-side from them).
export function CatalogFilters({ productTypes }: { productTypes: ProductTypeMeta[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const ocasion = params.get("ocasion") ?? "";
  const tipo = params.get("tipo") ?? "";
  const orden = params.get("orden") ?? "destacados";

  // Debounce ref for the search input
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && next.get(key) !== value) next.set(key, value);
    else next.delete(key); // toggle off / clear
    router.push(`/catalogo?${next.toString()}`, { scroll: false });
  }

  function handleSearch(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set("q", value);
      else next.delete("q");
      router.push(`/catalogo?${next.toString()}`, { scroll: false });
    }, 300);
  }

  const hasFilters = !!(ocasion || tipo || params.get("q"));

  function clearAll() {
    const next = new URLSearchParams();
    if (orden && orden !== "destacados") next.set("orden", orden);
    router.push(`/catalogo?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ── Row 1: Search + Sort ─────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
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
            defaultValue={params.get("q") ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar un detalle…"
            className="w-full rounded-pill border border-line-strong bg-surface py-3 pl-10 pr-5 text-[14.5px] text-ink outline-none transition focus:border-primary"
          />
        </div>

        {/* Sort */}
        <div className="relative shrink-0 w-full sm:w-auto">
          <select
            value={orden}
            onChange={(e) => setParam("orden", e.target.value)}
            className="w-full appearance-none rounded-pill border border-line-strong bg-surface py-3 pl-5 pr-10 text-[14px] text-ink outline-none transition focus:border-primary"
          >
            <option value="destacados">✦ Destacados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
          {/* Chevron icon */}
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-mute"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── Row 2: Occasion chips ────────────────────────── */}
      <FilterRow label="Ocasión">
        <Chip active={!ocasion} onClick={() => setParam("ocasion", "")}>
          Todas
        </Chip>
        {occasions.map((o) => (
          <Chip
            key={o.id}
            active={ocasion === o.id}
            onClick={() => setParam("ocasion", o.id)}
          >
            {o.label}
          </Chip>
        ))}
      </FilterRow>

      {/* ── Row 3: Type chips ────────────────────────────── */}
      {productTypes.length > 0 && (
        <FilterRow label="Tipo">
          <Chip active={!tipo} onClick={() => setParam("tipo", "")}>
            Todos
          </Chip>
          {productTypes.map((t) => (
            <Chip
              key={t.id}
              active={tipo === t.id}
              onClick={() => setParam("tipo", t.id)}
            >
              {t.label}
            </Chip>
          ))}
        </FilterRow>
      )}

      {/* ── Clear all ────────────────────────────────────── */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="self-start text-[13px] text-berry underline underline-offset-2 hover:text-rose transition"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

// Helper: labelled horizontal-scroll chip row
function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {/* Pill label */}
      <span className="mt-[9px] shrink-0 text-[11px] font-semibold uppercase tracking-[.7px] text-label">
        {label}
      </span>
      {/* Scrollable chip strip */}
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-wrap">
        {children}
      </div>
    </div>
  );
}
