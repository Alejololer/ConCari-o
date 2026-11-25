import Link from "next/link";
import { cn } from "@/lib/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, string | undefined>;
}

function buildHref(
  basePath: string,
  searchParams: Record<string, string | undefined> | undefined,
  page: number,
): string {
  const qs = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (key === "page") continue;
      if (value && value.trim() !== "") {
        qs.set(key, value);
      }
    }
  }
  if (page > 1) {
    qs.set("page", String(page));
  }
  const str = qs.toString();
  return str ? `${basePath}?${str}` : basePath;
}

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: (number | "ellipsis")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    const prev = sorted[i - 1];
    if (prev !== undefined) {
      if (page - prev === 2) {
        items.push(prev + 1);
      } else if (page - prev > 2) {
        items.push("ellipsis");
      }
    }
    items.push(page);
  }

  return items;
}

const circleBase =
  "flex h-9 w-9 items-center justify-center rounded-full text-[13.5px] transition sm:h-10 sm:w-10";
const inactiveBtn =
  "border border-line bg-surface text-ink-soft hover:border-line-strong hover:text-rose";
const activeBtn = "bg-primary font-semibold text-white shadow-card";
const disabledBtn =
  "cursor-not-allowed border border-line bg-surface/60 text-mute opacity-50";

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/catalogo",
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const items = getPageItems(safeCurrent, totalPages);
  const hasPrev = safeCurrent > 1;
  const hasNext = safeCurrent < totalPages;

  return (
    <nav
      aria-label="Paginación"
      className="mt-10 flex items-center justify-center gap-1.5 sm:gap-2"
    >
      {/* Previous */}
      {hasPrev ? (
        <Link
          href={buildHref(basePath, searchParams, safeCurrent - 1)}
          aria-label="Página anterior"
          className={cn(circleBase, inactiveBtn)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          aria-label="Página anterior"
          className={cn(circleBase, disabledBtn)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>
      )}

      {/* Page numbers & ellipses */}
      {items.map((item, idx) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            aria-hidden="true"
            className="flex h-9 w-7 items-center justify-center text-[13.5px] text-ink-mute sm:h-10"
          >
            …
          </span>
        ) : item === safeCurrent ? (
          <span
            key={item}
            aria-current="page"
            className={cn(circleBase, activeBtn)}
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(basePath, searchParams, item)}
            aria-label={`Ir a página ${item}`}
            className={cn(circleBase, inactiveBtn)}
          >
            {item}
          </Link>
        ),
      )}

      {/* Next */}
      {hasNext ? (
        <Link
          href={buildHref(basePath, searchParams, safeCurrent + 1)}
          aria-label="Página siguiente"
          className={cn(circleBase, inactiveBtn)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          aria-label="Página siguiente"
          className={cn(circleBase, disabledBtn)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      )}
    </nav>
  );
}
