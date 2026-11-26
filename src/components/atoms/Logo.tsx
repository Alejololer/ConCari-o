import Image from "next/image";
import { cn } from "@/lib/cn";
import { brand } from "@/data/brand";

// Brand mark + wordmark. `subtitle` shows the tagline beneath (header/footer use).
export function Logo({ size = 46, subtitle = false, className }: { size?: number; subtitle?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 sm:gap-[11px]", className)}>
      <Image
        src="/logo-concarino.png"
        alt={brand.name}
        width={size}
        height={size}
        className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_3px_6px_rgba(150,90,105,.18)] sm:h-auto sm:w-auto"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[22px] font-bold text-rose sm:text-[25px]">{brand.name}</span>
        {subtitle && (
          <span className="mt-[3px] hidden text-[9.5px] uppercase tracking-[2.4px] text-mute sm:block">{brand.tagline}</span>
        )}
      </span>
    </span>
  );
}
