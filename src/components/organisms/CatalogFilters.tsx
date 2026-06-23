"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { occasions } from "@/data/occasions";
import { productTypes } from "@/data/types";
import { Chip } from "@/components/atoms/Chip";

// Reads/writes the URL search params (the catalog page filters server-side from them).
export function CatalogFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const ocasion = params.get("ocasion") ?? "";
  const tipo = params.get("tipo") ?? "";
  const orden = params.get("orden") ?? "destacados";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && next.get(key) !== value) next.set(key, value);
    else next.delete(key); // toggle off / clear
    router.push(`/catalogo?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        defaultValue={params.get("q") ?? ""}
        onChange={(e) => setParam("q", e.target.value)}
        placeholder="Buscar un detalle…"
        className="w-full rounded-pill border border-line-strong bg-surface px-5 py-3 text-[14.5px] text-ink outline-none focus:border-primary"
      />
      <div className="flex flex-wrap gap-2">
        <Chip active={!ocasion} onClick={() => setParam("ocasion", "")}>Todas las ocasiones</Chip>
        {occasions.map((o) => (
          <Chip key={o.id} active={ocasion === o.id} onClick={() => setParam("ocasion", o.id)}>
            {o.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip active={!tipo} onClick={() => setParam("tipo", "")}>Todos los tipos</Chip>
        {productTypes.map((t) => (
          <Chip key={t.id} active={tipo === t.id} onClick={() => setParam("tipo", t.id)}>
            {t.label}
          </Chip>
        ))}
      </div>
      <select
        value={orden}
        onChange={(e) => setParam("orden", e.target.value)}
        className="w-full appearance-none rounded-pill border border-line-strong bg-surface px-5 py-3 pr-12 text-[14.5px] text-ink outline-none focus:border-primary bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%25233e2a30%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[position:right_1.25rem_center] bg-[size:18px] bg-no-repeat"
      >
        <option value="destacados">Destacados</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
        <option value="nombre">Nombre A-Z</option>
      </select>
    </div>
  );
}
