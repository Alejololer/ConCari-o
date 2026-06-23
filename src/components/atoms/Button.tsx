import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-[0_12px_26px_rgba(150,90,105,.26)] hover:brightness-[1.03]",
  secondary: "bg-surface border border-line-strong text-ink hover:bg-blush/40",
  ghost: "bg-transparent text-ink-soft hover:bg-blush/50",
};

const sizes: Record<Size, string> = {
  sm: "text-[13.5px] px-4 py-2.5",
  md: "text-[15px] px-7 py-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  loading?: boolean;
}

type AsButton = CommonProps & ComponentProps<"button"> & { href?: undefined };
type AsLink = CommonProps & {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler;
};

export function Button({ variant = "primary", size = "md", className, children, loading, ...rest }: AsButton | AsLink) {
  const classes = cn(base, variants[variant], sizes[size], className);
  
  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, target, onClick } = rest as AsLink;
    const external = href.startsWith("http");
    return (
      <Link href={href} target={target} onClick={onClick} className={classes} rel={external ? "noopener noreferrer" : undefined}>
        {content}
      </Link>
    );
  }
  
  const buttonProps = rest as ComponentProps<"button">;
  return (
    <button className={classes} disabled={loading || buttonProps.disabled} {...buttonProps}>
      {content}
    </button>
  );
}
