"use client";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { typeById } from "@/data/types";
import { useCart } from "@/lib/cart";
import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";

function shortDesc(desc: string): string {
  return desc.length > 74 ? desc.slice(0, 74).trimEnd() + "…" : desc;
}

// Used on Home (featured), Catalog and related lists. `compact` = smaller related card.
export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const router = useRouter();
  const { add } = useCart();

  return (
    <div
      onClick={() => router.push(`/producto/${product.id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition hover:-translate-y-[5px] hover:shadow-soft"
    >
      <PhotoPlaceholder type={product.type} src={product.imageUrl} className={compact ? "h-[180px]" : "h-[218px]"}>
        {product.badge && (
          <span className="absolute left-[13px] top-[13px]">
            <Badge>{product.badge}</Badge>
          </span>
        )}
      </PhotoPlaceholder>

      <div className="flex flex-1 flex-col gap-[7px] p-[18px] pt-[17px]">
        {!compact && (
          <span className="text-[11px] font-semibold uppercase tracking-[1.4px] text-label">
            {typeById[product.type]?.label}
          </span>
        )}
        <h3 className="text-[17px] font-semibold text-ink">{product.name}</h3>
        {!compact && (
          <p className="text-[13.5px] leading-[1.5] text-ink-mute">{shortDesc(product.desc)}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-[11px]">
          <Price value={product.price} className="text-xl" />
          {compact ? (
            <span className="text-xs text-label">{typeById[product.type]?.label}</span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                add(product);
              }}
              className="rounded-pill bg-blush px-4 py-[9px] text-[13px] font-semibold text-berry hover:brightness-95"
            >
              Agregar +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
