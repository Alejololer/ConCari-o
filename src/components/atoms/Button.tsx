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
}

type AsButton = CommonProps & ComponentProps<"button"> & { href?: undefined };
type AsLink = CommonProps & {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler;
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: AsButton | AsLink) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if ("href" in rest && rest.href) {
    const { href, target, onClick } = rest as AsLink;
    const external = href.startsWith("http");
    return (
      <Link href={href} target={target} onClick={onClick} className={classes} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
