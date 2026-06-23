"use client";
import Link from "next/link";
import { useTransition } from "react";
import type { Product } from "@/lib/types";
import { typeById } from "@/data/types";
import { money } from "@/lib/format";
import { cn } from "@/lib/cn";
import { deleteProduct, toggleActive } from "@/app/cms/actions";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";

export function CmsRow({ product }: { product: Product }) {
  const [pending, start] = useTransition();

  return (
    <div className={cn("flex items-center gap-3 py-3", pending && "opacity-50")}>
      <PhotoPlaceholder type={product.type} src={product.imageUrl} label={false} className="h-[46px] w-[46px] shrink-0 rounded-[12px]" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14.5px] font-semibold text-ink">{product.name}</div>
        <div className="text-[12px] text-ink-mute">
          {typeById[product.type]?.label} · {product.occ.length} ocasion{product.occ.length === 1 ? "" : "es"}
        </div>
      </div>
      <span className="w-16 text-right text-[14px] font-bold text-rose">{money(product.price)}</span>

      {/* Active toggle */}
      <button
        aria-label={product.active ? "Desactivar" : "Activar"}
        onClick={() => start(() => toggleActive(product.id, !product.active))}
        className={cn(
          "relative h-[26px] w-[46px] shrink-0 rounded-pill transition",
          product.active ? "bg-whatsapp" : "bg-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all",
            product.active ? "left-[23px]" : "left-[3px]",
          )}
        />
      </button>

      <Link href={`/cms/producto/${product.id}`} className="rounded-pill px-3 py-2 text-[13px] font-semibold text-berry hover:bg-blush">
        Editar
      </Link>
      <button
        onClick={() => {
          if (confirm(`¿Eliminar "${product.name}"?`)) start(() => deleteProduct(product.id));
        }}
        className="rounded-pill px-3 py-2 text-[13px] font-semibold text-mute hover:text-rose"
      >
        Eliminar
      </button>
    </div>
  );
}
