"use client";
import Link from "next/link";
import type { CartLine } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";

export function CartLineRow({
  line,
  onNavigate,
}: {
  line: CartLine;
  onNavigate?: () => void;
}) {
  const { setQty, remove } = useCart();
  const { product, qty, note } = line;

  return (
    <div className="flex items-start gap-3.5 py-4">
      <Link
        href={`/producto/${product.id}`}
        onClick={onNavigate}
        className="shrink-0 overflow-hidden rounded-[14px] border border-line transition hover:border-line-strong"
      >
        <PhotoPlaceholder
          type={product.type}
          src={product.imageUrl}
          alt={product.name}
          fit="cover"
          sizes="72px"
          className="h-[68px] w-[68px]"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/producto/${product.id}`}
            onClick={onNavigate}
            className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-ink transition hover:text-rose"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(product.id)}
            aria-label={`Quitar ${product.name} del carrito`}
            className="shrink-0 text-[12px] font-medium text-mute transition hover:text-rose"
          >
            Quitar
          </button>
        </div>

        {note && (
          <p className="line-clamp-2 text-[12px] italic leading-snug text-ink-mute">
            💌 «{note}»
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-0.5">
          <QtyStepper
            qty={qty}
            onChange={(n) => setQty(product.id, n)}
            size="sm"
          />
          <span className="text-[14.5px] font-bold text-rose">
            {money(product.price * qty)}
          </span>
        </div>
      </div>
    </div>
  );
}
