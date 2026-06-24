"use client";
import { brand } from "@/data/brand";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button";
import { CartLineRow } from "@/components/molecules/CartLineRow";
import { useWhatsapp } from "@/lib/whatsappContext";

export function CartDrawer() {
  const { lines, total, isOpen, close, count } = useCart();
  const { getCartLink } = useWhatsapp();

  const checkoutHref = getCartLink(
    lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
  );

  return (
    <>
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-ink/35 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[calc(100vw-1rem)] sm:max-w-[400px] flex-col bg-cream shadow-soft transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-[18px]">
          <span className="text-[18px] font-semibold text-ink">Tu carrito {count > 0 && `(${count})`}</span>
          <button onClick={close} aria-label="Cerrar" className="text-xl text-mute hover:text-rose">✕</button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-display text-3xl text-rose">Aún no hay detalles</span>
            <p className="text-[14px] text-ink-mute">Agrega algo bonito desde el catálogo 💝</p>
            <Button href="/catalogo" variant="secondary" size="sm" className="mt-2" onClick={close}>
              Ver catálogo
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((line) => (
                <CartLineRow key={line.product.id} line={line} />
              ))}
            </div>
            <div className="border-t border-line px-5 py-[18px]">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[15px] text-ink-soft">Total aproximado</span>
                <span className="text-[22px] font-bold text-rose">{money(total)}</span>
              </div>
              <p className="mb-2 text-[12px] leading-[1.5] text-mute">
                Coordinamos el detalle final y el pago por WhatsApp ({brand.payment.bank} ·{" "}
                {brand.payment.accountType} {brand.payment.accountNumber}).
              </p>
              <div className="mb-3 flex items-start gap-2 rounded-[10px] bg-blush px-3 py-2.5">
                <span className="shrink-0 text-[14px]">🚚</span>
                <p className="text-[11.5px] leading-[1.5] text-berry">
                  <strong className="font-semibold">Envío no incluido.</strong> El costo se cotiza aparte según tu ubicación.
                </p>
              </div>
              <Button href={checkoutHref} target="_blank" className="w-full">
                Pedir por WhatsApp
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
