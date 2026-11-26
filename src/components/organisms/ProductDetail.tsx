"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { getProductSoldCount } from "@/lib/storefront";
import { useWhatsapp } from "@/lib/whatsappContext";
import { Price } from "@/components/atoms/Price";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { Dot } from "@/components/atoms/Dot";
import { cn } from "@/lib/cn";

export interface OccasionChip {
  id: string;
  label: string;
}

export function ProductDetail({
  product,
  occasionChips = [],
}: {
  product: Product;
  occasionChips?: OccasionChip[];
}) {
  const { add } = useCart();
  const { openProduct } = useWhatsapp();

  const images = product.images?.length
    ? product.images
    : product.imageUrl
      ? [product.imageUrl]
      : [];

  const [active, setActive] = useState(0);
  const [fullFrame, setFullFrame] = useState(false);
  const [qty, setQty] = useState(1);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  const soldCount = getProductSoldCount(product.id, Boolean(product.badge));
  // Deterministic SSR initial value prevents hydration mismatch & layout shift;
  // randomized and gently drifted on the client after mount.
  const [viewers, setViewers] = useState<number>(() => (soldCount % 7) + 5);

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 9) + 5); // 5..13
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        return Math.min(15, Math.max(4, prev + delta));
      });
    }, 14000);
    return () => clearInterval(interval);
  }, [product.id]);

  const cleanNote = note.trim() || undefined;
  const hasMultipleImages = images.length > 1;

  function prevImage() {
    setActive((i) => (i - 1 + images.length) % images.length);
  }

  function nextImage() {
    setActive((i) => (i + 1) % images.length);
  }

  function handleAddToCart() {
    add(product, qty, { openDrawer: true, note: cleanNote });
  }

  function handleDirectWhatsapp() {
    openProduct(product.name, qty, product.price, cleanNote);
  }

  return (
    <>
      {/* Top 2-column white storefront card */}
      <div className="rounded-panel border border-line bg-surface p-4 shadow-card sm:p-7 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {/* Left column: Photo gallery */}
          <div className="flex flex-col gap-3.5">
            <div className="relative aspect-square w-full overflow-hidden rounded-[18px] border border-line/70">
              <PhotoPlaceholder
                type={product.type}
                src={images[active]}
                alt={product.name}
                fit={fullFrame ? "contain" : "cover"}
                priority
                sizes="(max-width: 768px) 100vw, 520px"
                className="h-full w-full"
              />

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-card backdrop-blur-xs transition hover:border-line-strong hover:text-rose"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Siguiente foto"
                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-card backdrop-blur-xs transition hover:border-line-strong hover:text-rose"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}

              {images.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFullFrame((v) => !v)}
                  className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface/90 px-3 py-1.5 text-[11.5px] font-semibold text-ink shadow-card backdrop-blur-xs transition hover:border-line-strong hover:text-rose"
                >
                  {fullFrame ? "Ajustar" : "Ver completa"}
                </button>
              )}
            </div>

            {/* Thumbnail strip — rendered ONLY when there are multiple real photos */}
            {hasMultipleImages && (
              <div className="flex flex-wrap gap-2.5">
                {images.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    aria-label={`Ver foto ${i + 1}`}
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[12px] transition",
                      i === active
                        ? "border-2 border-rose shadow-card"
                        : "border border-line opacity-80 hover:border-line-strong hover:opacity-100",
                    )}
                  >
                    <PhotoPlaceholder
                      type={product.type}
                      src={src}
                      alt={`${product.name} — foto ${i + 1}`}
                      fit="cover"
                      sizes="72px"
                      className="h-full w-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column: Buy box */}
          <div className="flex flex-col gap-3.5">
            {/* Top metadata row: deterministic sold count + optional badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12.5px] font-medium text-ink-mute">
                ✨ {soldCount} vendidos
              </span>
              {product.badge && <Badge>{product.badge}</Badge>}
            </div>

            <h1 className="font-display text-[clamp(30px,4.5vw,46px)] font-bold leading-tight text-ink">
              {product.name}
            </h1>

            {/* Clickable occasion chips */}
            {occasionChips.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {occasionChips.map((occ) => (
                  <Link
                    key={occ.id}
                    href={`/catalogo?ocasion=${occ.id}`}
                    className="rounded-pill bg-blush px-3 py-1 text-[12px] font-semibold text-berry transition hover:bg-primary hover:text-white"
                  >
                    {occ.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Live client-side social proof viewer pill */}
            <div className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-blush px-3.5 py-2 text-[13px] font-medium text-berry">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
              </span>
              <span>🔥 Hay {viewers} personas viendo este detalle</span>
            </div>

            <div className="my-1 border-t border-line" />

            {/* Price block */}
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold uppercase tracking-[1px] text-label">
                Precio unitario
              </span>
              <Price
                value={product.price}
                className="text-[30px] leading-none sm:text-[34px]"
              />
            </div>

            {/* Optional collapsible dedication note */}
            <div className="pt-0.5">
              {!showNote ? (
                <button
                  type="button"
                  onClick={() => setShowNote(true)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-berry transition hover:text-rose"
                >
                  <span>+ Agregar mensaje para la tarjeta (opcional)</span>
                </button>
              ) : (
                <div className="flex flex-col gap-1.5 rounded-[16px] border border-line bg-cream/60 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="dedication-note"
                      className="text-[12.5px] font-semibold text-ink-soft"
                    >
                      💌 Mensaje para la tarjeta
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowNote(false)}
                      className="text-[12px] font-medium text-mute transition hover:text-rose"
                    >
                      Ocultar
                    </button>
                  </div>
                  <textarea
                    id="dedication-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={180}
                    rows={2}
                    placeholder="Ej. Feliz cumpleaños, te quiero mucho 💝"
                    className="w-full resize-none rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-[13.5px] leading-relaxed text-ink outline-none transition focus:border-rose"
                  />
                  <span className="self-end text-[11px] text-mute">
                    {note.length}/180
                  </span>
                </div>
              )}
            </div>

            {/* Purchase actions */}
            <div className="mt-2 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <QtyStepper
                  qty={qty}
                  onChange={(n) => setQty(Math.max(1, n))}
                />
                <Button className="flex-1 min-w-[200px]" onClick={handleAddToCart}>
                  Agregar al carrito · {money(qty * product.price)}
                </Button>
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={handleDirectWhatsapp}
              >
                <Dot /> Pedir directo por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lower stacked collapsible info cards */}
      <div className="mt-5 flex flex-col gap-3.5">
        {/* 1. Descripción e incluye */}
        <details
          open
          className="group rounded-panel border border-line bg-surface shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-[16px] font-semibold text-ink">
              Descripción e incluye
            </span>
            <ChevronIcon />
          </summary>
          <div className="border-t border-line px-5 pt-4 pb-5 sm:px-7 sm:pb-6">
            <p className="text-[15px] leading-[1.7] text-ink-soft">
              {product.desc}
            </p>
            {product.inc.length > 0 && (
              <div className="mt-4 border-t border-line/70 pt-4">
                <span className="mb-2.5 block text-[11.5px] font-semibold uppercase tracking-[1px] text-label">
                  Este detalle incluye
                </span>
                <ul className="flex flex-col gap-2">
                  {product.inc.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[auto_1fr] items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>

        {/* 2. Envíos y coordinación */}
        <details
          open
          className="group rounded-panel border border-line bg-surface shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-[16px] font-semibold text-ink">
              Envíos y coordinación
            </span>
            <ChevronIcon />
          </summary>
          <div className="flex flex-col gap-3.5 border-t border-line px-5 pt-4 pb-5 sm:px-7 sm:pb-6">
            <p className="text-[14.5px] leading-[1.65] text-ink-soft">
              Realizamos entregas a domicilio en{" "}
              <strong className="font-semibold text-ink">
                Latacunga, Lasso, Pujilí, Salcedo y alrededores en Cotopaxi
              </strong>
              . Preparamos cada detalle fresco bajo pedido para que llegue impecable
              en la fecha y hora que coordinemos.
            </p>
            <div className="flex items-start gap-2.5 rounded-card border border-line-strong bg-blush px-4 py-3">
              <span className="mt-[1px] shrink-0 text-[16px]" aria-hidden="true">
                🚚
              </span>
              <p className="text-[13.5px] leading-[1.55] text-berry">
                <strong className="font-semibold">Envío no incluido:</strong> el
                valor se cotiza aparte por WhatsApp según tu ubicación.
              </p>
            </div>
          </div>
        </details>

        {/* 3. Formas de coordinación y pago */}
        <details
          open
          className="group rounded-panel border border-line bg-surface shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-[16px] font-semibold text-ink">
              Formas de coordinación y pago
            </span>
            <ChevronIcon />
          </summary>
          <div className="grid gap-3 border-t border-line px-5 pt-4 pb-5 sm:grid-cols-2 sm:px-7 sm:pb-6">
            <div className="flex items-start gap-3 rounded-card border border-line bg-cream/70 p-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-[16px]"
                aria-hidden="true"
              >
                🏦
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-ink">
                  Transferencia Banco Pichincha
                </span>
                <p className="text-[13px] leading-relaxed text-ink-mute">
                  Te compartimos los datos de la cuenta por WhatsApp al confirmar
                  tu pedido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-card border border-line bg-cream/70 p-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush"
                aria-hidden="true"
              >
                <Dot size={10} />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-ink">
                  Atención directa por WhatsApp
                </span>
                <p className="text-[13px] leading-relaxed text-ink-mute">
                  Coordinamos dedicatoria, horario de entrega y personalización en
                  minutos.
                </p>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* Mobile sticky bottom purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 shadow-soft backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-[1080px] items-center gap-3">
          <QtyStepper
            qty={qty}
            onChange={(n) => setQty(Math.max(1, n))}
            size="sm"
          />
          <Button size="sm" className="flex-1" onClick={handleAddToCart}>
            Agregar · {money(qty * product.price)}
          </Button>
        </div>
      </div>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-mute transition-transform duration-200 group-open:rotate-180"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
