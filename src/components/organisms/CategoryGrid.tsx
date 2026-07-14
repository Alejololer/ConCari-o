import type { Occasion } from "@/lib/types";
import { CategoryTile } from "@/components/molecules/CategoryTile";
import { SectionHeading } from "./SectionHeading";

export function CategoryGrid({ occasions }: { occasions: Occasion[] }) {
  return (
    <section id="ocasiones" className="mx-auto max-w-[1180px] px-5 py-16">
      <SectionHeading
        label="Para cada momento"
        title="Encuentra el detalle ideal"
        lead="Cada ocasión merece algo pensado con cariño. Explora por el momento que quieres celebrar."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {occasions.map((o) => (
          <CategoryTile key={o.id} occasion={o} />
        ))}
      </div>
    </section>
  );
}
