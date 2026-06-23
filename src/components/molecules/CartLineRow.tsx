"use client";
import type { CartLine } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";

export function CartLineRow({ line }: { line: CartLine }) {
  const { setQty, remove } = useCart();
  const { product, qty } = line;
  return (
    <div className="flex gap-3 py-[14px]">
      <PhotoPlaceholder type={product.type} label={false} className="h-[62px] w-[62px] shrink-0 rounded-[14px]" />
      <div className="flex flex-1 flex-col gap-[6px]">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[14.5px] font-semibold text-ink">{product.name}</span>
          <button onClick={() => remove(product.id)} aria-label="Quitar" className="text-[13px] text-mute hover:text-rose">
            ✕
          </button>
        </div>
        <div className="flex items-center justify-between">
          <QtyStepper qty={qty} onChange={(n) => setQty(product.id, n)} size="sm" />
          <span className="text-[14px] font-bold text-rose">{money(product.price * qty)}</span>
        </div>
      </div>
    </div>
  );
}
