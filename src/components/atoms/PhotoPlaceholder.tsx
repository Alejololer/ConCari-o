import Image from "next/image";
import { cn } from "@/lib/cn";
import { placeholderBg } from "@/data/types";
import type { ProductTypeId } from "@/lib/types";

// Gradient stand-in when a product has no photo. Real photos use object-contain so
// images of any ratio fit whole (letterboxed by the gradient) instead of being cropped.
export function PhotoPlaceholder({
  type,
  className,
  src,
  children,
}: {
  type: ProductTypeId;
  className?: string;
  src?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: placeholderBg(type) }}>
      {src && <Image fill src={src} alt="Producto" className="object-contain" />}
      {children}
    </div>
  );
}
