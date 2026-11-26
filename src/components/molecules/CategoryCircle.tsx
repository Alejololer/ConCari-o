import Image from "next/image";
import Link from "next/link";
import type { CategoryPreview } from "@/lib/types";

export function CategoryCircle({ category }: { category: CategoryPreview }) {
  return (
    <Link
      href={`/catalogo?ocasion=${category.id}`}
      className="group flex shrink-0 flex-col items-center gap-2 text-center"
    >
      <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-surface bg-blush shadow-card ring-1 ring-line transition duration-200 group-hover:-translate-y-1 group-hover:ring-primary sm:h-28 sm:w-28">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.label}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-3xl" aria-hidden="true">
            💝
          </span>
        )}
      </div>

      <span className="max-w-[148px] truncate whitespace-nowrap rounded-pill border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink shadow-card transition group-hover:border-primary/40 group-hover:text-rose">
        {category.label}
      </span>

      {category.count > 0 && (
        <span className="-mt-1 text-[11.5px] text-mute">
          {category.count} {category.count === 1 ? "detalle" : "detalles"}
        </span>
      )}
    </Link>
  );
}
