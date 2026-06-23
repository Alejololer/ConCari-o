import { cn } from "@/lib/cn";
import { placeholderBg } from "@/data/types";
import type { ProductTypeId } from "@/lib/types";

// Gradient stand-in until real product photos exist (Supabase Storage — next iteration).
export function PhotoPlaceholder({
  type,
  label = "Foto de muestra",
  className,
  children,
}: {
  type: ProductTypeId;
  label?: string | false;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)} style={{ background: placeholderBg(type) }}>
      {children}
      {label && (
        <span className="absolute bottom-3 right-3 rounded-pill bg-ink/30 px-[10px] py-[3px] text-[10px] font-medium tracking-[.3px] text-white backdrop-blur-[2px]">
          {label}
        </span>
      )}
    </div>
  );
}
