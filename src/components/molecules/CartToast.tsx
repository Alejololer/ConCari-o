"use client";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { cn } from "@/lib/cn";

/** Non-intrusive bottom-left feedback toast when quick-adding from a product card. */
export function CartToast() {
  const { lastAdded, open, dismissToast } = useCart();
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/producto/");

  if (!lastAdded) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "animate-toast-in fixed left-4 right-20 z-50 sm:right-auto sm:w-[360px]",
        isProductPage ? "bottom-22 md:bottom-5" : "bottom-5",
      )}
    >
      <div className="flex items-center gap-3 rounded-card border border-line-strong bg-surface p-3 shadow-soft">
        <PhotoPlaceholder
          type={lastAdded.product.type}
          src={lastAdded.product.imageUrl}
          alt={lastAdded.product.name}
          sizes="48px"
          className="h-12 w-12 shrink-0 rounded-[12px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-rose">¡Producto agregado!</p>
          <p className="truncate text-[13.5px] font-medium text-ink">{lastAdded.product.name}</p>
        </div>
        <button
          type="button"
          onClick={open}
          className="shrink-0 rounded-pill bg-primary px-3.5 py-2 text-[12.5px] font-semibold text-white transition hover:brightness-105"
        >
          Ver carrito
        </button>
        <button
          type="button"
          onClick={dismissToast}
          aria-label="Cerrar aviso"
          className="shrink-0 p-1 text-[14px] text-mute hover:text-rose"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
