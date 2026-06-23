import { cn } from "@/lib/cn";

// Filter chip (catalog occasion/type filters). `active` = selected.
export function Chip({
  active,
  children,
  ...rest
}: { active?: boolean; children: React.ReactNode } & React.ComponentProps<"button">) {
  return (
    <button
      {...rest}
      className={cn(
        "rounded-pill px-[14px] py-2 text-[13.5px] font-medium transition",
        active
          ? "bg-primary text-white"
          : "bg-surface border border-line-strong text-ink-soft hover:bg-blush/50",
      )}
    >
      {children}
    </button>
  );
}
