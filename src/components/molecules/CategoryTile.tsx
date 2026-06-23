import Link from "next/link";
import type { Occasion } from "@/lib/types";

// Occasion entry on the home grid → links to the filtered catalog.
export function CategoryTile({ occasion }: { occasion: Occasion }) {
  return (
    <Link
      href={`/catalogo?ocasion=${occasion.id}`}
      className="group flex flex-col gap-[6px] rounded-card border border-line bg-surface p-[22px] shadow-card transition hover:-translate-y-1 hover:border-line-strong hover:shadow-soft"
    >
      <span className="text-[17px] font-semibold text-ink group-hover:text-rose">{occasion.label}</span>
      <span className="text-[13px] text-ink-mute">{occasion.sub}</span>
      <span className="mt-[10px] text-[13px] font-semibold text-rose">Ver detalles →</span>
    </Link>
  );
}
