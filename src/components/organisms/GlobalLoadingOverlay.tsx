"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Non-blocking top progress indicator for internal route transitions.
 * Avoids jarring full-screen overlays on fast store navigations.
 */
export function GlobalLoadingOverlay() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const startDelayed = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(true), 140);
    };

    const handleAnchorClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }
      if (!target || target.tagName !== "A") return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        targetAttr !== "_blank" &&
        !href.includes("#")
      ) {
        const currentUrl = window.location.pathname + window.location.search;
        if (href !== currentUrl) startDelayed();
      }
    };

    window.addEventListener("click", handleAnchorClick, true);
    return () => {
      window.removeEventListener("click", handleAnchorClick, true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px] overflow-hidden bg-blush"
    >
      <div className="h-full w-2/3 animate-pulse rounded-r-full bg-rose" />
    </div>
  );
}
