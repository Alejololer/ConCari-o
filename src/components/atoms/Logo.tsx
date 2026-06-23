import Image from "next/image";
import { cn } from "@/lib/cn";
import { brand } from "@/data/brand";

// Brand mark + wordmark. `subtitle` shows the tagline beneath (header use).
export function Logo({ size = 46, subtitle = false, className }: { size?: number; subtitle?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-[11px]", className)}>
      <Image
        src="/logo-concarino.svg"
        alt={brand.name}
        width={size}
        height={size}
        className="object-contain drop-shadow-[0_3px_6px_rgba(150,90,105,.18)]"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[25px] font-bold text-rose">{brand.name}</span>
        {subtitle && (
          <span className="mt-[3px] text-[9.5px] uppercase tracking-[2.4px] text-mute">{brand.tagline}</span>
        )}
      </span>
    </span>
  );
}
