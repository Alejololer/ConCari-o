import Image from "next/image";
import { cn } from "@/lib/cn";
import { placeholderBg } from "@/data/types";
import type { ProductTypeId } from "@/lib/types";

// Gradient stand-in when a product has no photo.
// `fit="cover"` gives full-bleed e-commerce cards; `fit="contain"` preserves uncropped framing.
export function PhotoPlaceholder({
  type,
  className,
  imgClassName,
  src,
  alt = "Producto",
  fit = "cover",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
  children,
}: {
  type: ProductTypeId;
  className?: string;
  imgClassName?: string;
  src?: string;
  alt?: string;
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: placeholderBg(type) }}>
      {src && (
        <Image
          fill
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className={cn(fit === "cover" ? "object-cover" : "object-contain", imgClassName)}
        />
      )}
      {children}
    </div>
  );
}
