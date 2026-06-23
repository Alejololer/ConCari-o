import { cn } from "@/lib/cn";

// Dark pill badge ("Lo más pedido", "Nuevo"…).
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-pill bg-ink px-[11px] py-[5px] text-[11px] font-semibold tracking-[.4px] text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
