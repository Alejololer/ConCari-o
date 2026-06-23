"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { brand } from "@/data/brand";
import { typeById } from "@/data/types";
import { useCart } from "@/lib/cart";
import { Price } from "@/components/atoms/Price";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { Dot } from "@/components/atoms/Dot";
import { productText, waLink } from "@/lib/whatsapp";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <PhotoPlaceholder type={product.type} className="aspect-square w-full rounded-panel">
        {product.badge && (
          <span className="absolute left-4 top-4">
            <Badge>{product.badge}</Badge>
          </span>
        )}
      </PhotoPlaceholder>

      <div className="flex flex-col gap-4">
        <span className="text-[12px] font-semibold uppercase tracking-[1.6px] text-label">
          {typeById[product.type]?.label}
        </span>
        <h1 className="font-display text-[clamp(34px,5vw,50px)] font-bold leading-tight text-ink">
          {product.name}
        </h1>
        <Price value={product.price} className="text-[28px]" />
        <p className="text-[15.5px] leading-[1.65] text-ink-soft">{product.desc}</p>

        {product.inc.length > 0 && (
          <div className="rounded-card border border-line bg-surface p-5">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[.6px] text-mute">Incluye</span>
            <ul className="flex flex-col gap-2">
              {product.inc.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14.5px] text-ink-soft">
                  <span className="mt-[6px]"><Dot color="var(--color-rose)" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <QtyStepper qty={qty} onChange={(n) => setQty(Math.max(1, n))} />
          <Button onClick={() => add(product, qty)}>Agregar al carrito</Button>
          <Button
            href={waLink(brand.whatsapp.number, productText(product.name, qty, product.price))}
            target="_blank"
            variant="secondary"
          >
            <Dot /> Pedir directo
          </Button>
        </div>
        <p className="text-[12.5px] text-mute">
          Pago por transferencia · {brand.payment.bank} {brand.payment.accountType}{" "}
          {brand.payment.accountNumber}
        </p>
      </div>
    </div>
  );
}
