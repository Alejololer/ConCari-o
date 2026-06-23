"use client";
import { cn } from "@/lib/cn";

// −/qty/+ control. Controlled.
export function QtyStepper({
  qty,
  onChange,
  size = "md",
}: {
  qty: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "w-[30px] h-[30px] text-base" : "w-[42px] h-11 text-[19px]";
  const num = size === "sm" ? "min-w-[24px] text-[13.5px]" : "min-w-[34px] text-base";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-pill border border-line-strong bg-surface">
      <button type="button" aria-label="Quitar uno" onClick={() => onChange(qty - 1)} className={cn("text-berry", btn)}>
        −
      </button>
      <span className={cn("text-center font-bold", num)}>{qty}</span>
      <button type="button" aria-label="Agregar uno" onClick={() => onChange(qty + 1)} className={cn("text-berry", btn)}>
        +
      </button>
    </div>
  );
}
