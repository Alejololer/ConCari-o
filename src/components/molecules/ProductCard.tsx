"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { cn } from "@/lib/cn";

/**
 * Storefront product card: square 1:1 full-bleed photo, floating circular quick-add `+`
 * button (adds 1 unit with non-intrusive toast), clean title + price hierarchy.
 * Reused across Home shelves, Catalog grid, and Related products.
 */
export function ProductCard({
  product,
  compact = false,
  className,
}: {
  product: Product;
  compact?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleQuickAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1, { openDrawer: false });
    setJustAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 950);
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-2 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-soft sm:p-2.5",
        className,
      )}
    >
      {/* Floating quick-add `+` button pinned top-right over the square photo */}
      <button
        type="button"
        onClick={handleQuickAdd}
        aria-label={`Agregar ${product.name} al carrito`}
        title="Agregar al carrito"
        className={cn(
          "absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-soft transition-transform duration-150 hover:scale-105 active:scale-95 sm:right-4 sm:top-4 sm:h-10 sm:w-10",
          justAdded ? "bg-whatsapp" : "bg-primary hover:brightness-105",
        )}
      >
        {justAdded ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </button>

      <Link href={`/producto/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square w-full overflow-hidden rounded-[14px]">
          <PhotoPlaceholder
            type={product.type}
            src={product.imageUrl}
            alt={product.name}
            fit="cover"
            sizes={
              compact
                ? "(max-width: 640px) 50vw, 25vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
            className="h-full w-full"
            imgClassName="transition-transform duration-300 group-hover:scale-[1.04]"
          />
          {product.badge && (
            <Badge className="absolute left-2 top-2 z-10 max-w-[calc(100%-3.4rem)] truncate bg-ink/85 backdrop-blur-xs">
              {product.badge}
            </Badge>
          )}
        </div>

        <div className={cn("flex flex-1 flex-col justify-between px-1.5 pt-2.5 pb-1", compact && "pt-2")}>
          <h3 className="line-clamp-2 text-[14px] font-medium leading-snug text-ink transition-colors group-hover:text-rose sm:text-[15px]">
            {product.name}
          </h3>
          <Price value={product.price} className="mt-1.5 block text-[15.5px] sm:text-[17px]" />
        </div>
      </Link>
    </article>
  );
}
