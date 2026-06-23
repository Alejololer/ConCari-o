import { cn } from "@/lib/cn";

// Uppercase, letter-spaced eyebrow label used above headings.
export function SectionLabel({
  children,
  tone = "terracotta",
  className,
}: {
  children: React.ReactNode;
  tone?: "terracotta" | "rose";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-[2.6px]",
        tone === "rose" ? "text-rose" : "text-terracotta",
        className,
      )}
    >
      {children}
    </span>
  );
}
