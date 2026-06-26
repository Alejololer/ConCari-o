"use client";

import { useEffect, useRef } from "react";

/**
 * Soft blush glow that smoothly trails the cursor across the home page.
 * Pure decoration: a fixed radial-gradient blob moved on mousemove (rAF-throttled);
 * the CSS transition does the smooth trailing. Skipped on touch / reduced-motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div
        ref={ref}
        className="absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full opacity-60 transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, var(--color-blush) 0%, transparent 70%)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
