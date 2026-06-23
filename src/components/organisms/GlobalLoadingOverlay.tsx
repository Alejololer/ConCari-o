"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function GlobalLoadingOverlay() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset loading state when page pathname or query parameters change
  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Find closest anchor tag
      let target = e.target as HTMLElement;
      while (target && target.tagName !== "A") {
        target = target.parentElement as HTMLElement;
      }

      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");
        const targetAttr = target.getAttribute("target");

        // If it's a valid relative internal link and not opening in new tab
        if (
          href &&
          (href.startsWith("/") || href.startsWith("./") || href.startsWith("../")) &&
          !href.startsWith("//") &&
          targetAttr !== "_blank" &&
          // Ignore anchor hashes unless it actually changes routes
          !href.startsWith("#")
        ) {
          const currentUrl = window.location.pathname + window.location.search;
          if (href !== currentUrl) {
            setLoading(true);
          }
        }
      }
    };

    const handleFormSubmit = (e: SubmitEvent) => {
      const target = e.target as HTMLFormElement;
      const targetAttr = target.getAttribute("target");
      
      // If it doesn't open in a new window/tab, show loading
      if (targetAttr !== "_blank") {
        setLoading(true);
      }
    };

    // Listen to all clicks and form submissions in the capturing phase
    window.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("submit", handleFormSubmit, true);

    return () => {
      window.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("submit", handleFormSubmit, true);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream/75 backdrop-blur-[3px] transition-all duration-300">
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer ring */}
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-rose/20" />
        {/* Spinning main wheel */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blush border-t-rose" />
      </div>
      <p className="mt-6 font-display text-3xl font-bold text-rose animate-pulse">
        Cargando con cariño... 💝
      </p>
    </div>
  );
}
