"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { typeById } from "@/data/types";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { Price } from "@/components/atoms/Price";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { Dot } from "@/components/atoms/Dot";
import { useWhatsapp } from "@/lib/whatsappContext";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const { openProduct } = useWhatsapp();
  const images = product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [];
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 md:gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <PhotoPlaceholder type={product.type} src={images[active]} className="aspect-[4/5] w-full rounded-panel" />

        {/* Thumbnail strip: fotos reales clicables + gradientes de relleno hasta 4 */}
        <div className="flex flex-wrap gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[70px] w-[70px] shrink-0 rounded-[12px] overflow-hidden ${i === active ? "border-2 border-rose" : "border border-line"}`}
            >
              <PhotoPlaceholder type={product.type} src={src} className="h-full w-full" />
            </button>
          ))}
          {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, i) => (
            <div key={i} className="h-[70px] w-[70px] shrink-0 rounded-[12px] overflow-hidden border border-line">
              <PhotoPlaceholder type={product.type} className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[12px] font-semibold uppercase tracking-[1.6px] text-label">
          {typeById[product.type]?.label}
        </span>
        <h1 className="font-display text-[clamp(30px,5vw,50px)] font-bold leading-tight text-ink">
          {product.name}
        </h1>
        <Price value={product.price} className="text-[28px]" />
        <p className="text-[15.5px] leading-[1.65] text-ink-soft">{product.desc}</p>

        {product.inc.length > 0 && (
          <div className="rounded-card border border-line bg-surface p-5">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[.6px] text-mute">Incluye</span>
            <ul className="flex flex-col gap-2">
              {product.inc.map((item) => (
                <li key={item} className="grid grid-cols-[auto_1fr] items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Shipping disclaimer */}
        <div className="flex items-start gap-2.5 rounded-card border border-line-strong bg-blush px-4 py-3">
          <span className="mt-[2px] shrink-0 text-[16px]">🚚</span>
          <p className="text-[13px] leading-[1.5] text-berry">
            <strong className="font-semibold">Envío no incluido.</strong> El costo de envío se coordina y se cotiza aparte por WhatsApp según tu ubicación.
          </p>
        </div>

        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <QtyStepper qty={qty} onChange={(n) => setQty(Math.max(1, n))} />
          <Button className="w-full sm:w-auto" onClick={() => add(product, qty)}>
            Agregar al carrito · {money(qty * product.price)}
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => openProduct(product.name, qty, product.price)}
          >
            <Dot /> Pedir directo
          </Button>
        </div>
        <p className="text-[12.5px] text-mute">
          Pago por transferencia · te compartimos los datos por WhatsApp.
        </p>
      </div>
    </div>
  );
}
