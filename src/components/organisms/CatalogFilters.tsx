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
    </div>
  );
}
