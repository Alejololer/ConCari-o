import { cn } from "@/lib/cn";
import { money } from "@/lib/format";

export function Price({ value, className }: { value: number; className?: string }) {
  return <span className={cn("font-bold text-rose", className)}>{money(value)}</span>;
}
