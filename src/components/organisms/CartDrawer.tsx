"use client";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button";
import { CartLineRow } from "@/components/molecules/CartLineRow";
import { useWhatsapp } from "@/lib/whatsappContext";

export function CartDrawer() {
  const { lines, total, isOpen, close, count, clear } = useCart();
  const { openCart } = useWhatsapp();

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-50 bg-ink/35 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[calc(100vw-1rem)] flex-col bg-cream shadow-soft transition-transform sm:max-w-[420px]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-semibold text-ink">
              Carrito de compras
            </span>
            {count > 0 && (
              <span className="inline-flex items-center justify-center rounded-pill bg-blush px-2.5 py-0.5 text-[12px] font-bold text-berry">
                {count}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {lines.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-[12.5px] font-medium text-ink-mute transition hover:text-rose"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar carrito"
              className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-mute transition hover:bg-blush hover:text-rose"
            >
              ✕
            </button>
          </div>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2.5 px-6 text-center">
            <span className="font-display text-3xl text-rose">
              Aún no hay detalles
            </span>
            <p className="text-[14px] text-ink-mute">
              Agrega algo bonito desde el catálogo 💝
            </p>
            <Button
              href="/catalogo"
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={close}
            >
              Ver catálogo
            </Button>
          </div>
        ) : (
          <>
            {/* Scrollable items + order summary */}
            <div className="flex-1 overflow-y-auto px-5 py-1">
              <div className="divide-y divide-line">
                {lines.map((line) => (
                  <CartLineRow
                    key={line.product.id}
                    line={line}
                    onNavigate={close}
                  />
                ))}
              </div>

              {/* Resumen de pedido card */}
              <div className="mt-3 mb-5 rounded-card border border-line bg-surface p-4 shadow-card">
                <span className="mb-3 block text-[11.5px] font-semibold uppercase tracking-[1px] text-label">
                  Resumen de pedido
                </span>

                <div className="flex items-center justify-between text-[13.5px]">
                  <span className="text-ink-soft">
                    {count} {count === 1 ? "producto" : "productos"}
                  </span>
                  <span className="font-semibold text-ink">{money(total)}</span>
                </div>

                <div className="my-2.5 border-t border-line" />

                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-ink">
                    Subtotal aproximado
                  </span>
                  <span className="text-[19px] font-bold text-rose">
                    {money(total)}
                  </span>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-blush px-3 py-2 text-[12px] leading-snug text-berry">
                  <span className="shrink-0" aria-hidden="true">
                    🚚
                  </span>
                  <span>
                    Envío cotizado aparte por WhatsApp según tu ubicación
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="border-t border-line bg-surface px-5 py-4">
              <Button
                className="w-full"
                onClick={() =>
                  openCart(
                    lines.map((l) => ({
                      name: l.product.name,
                      qty: l.qty,
                      price: l.product.price,
                      note: l.note,
                    })),
                  )
                }
              >
                Pedir por WhatsApp · {money(total)}
              </Button>
              <button
                type="button"
                onClick={close}
                className="mt-2.5 block w-full py-1 text-center text-[13px] font-medium text-ink-mute transition hover:text-rose"
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
