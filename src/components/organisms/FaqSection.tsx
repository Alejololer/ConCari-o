"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { cn } from "@/lib/cn";

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section
      id="preguntas-frecuentes"
      className="scroll-mt-24 mx-auto max-w-[920px] px-4 py-10 sm:px-5 sm:py-12"
    >
      <div className="mb-7 flex flex-col items-center gap-2 text-center">
        <SectionLabel>Resolvemos tus dudas</SectionLabel>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold leading-tight text-ink">
          Preguntas frecuentes
        </h2>
      </div>

      <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-card">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `faq-panel-${idx}`;

          return (
            <div key={faq.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-blush/35 sm:px-6 sm:py-5"
              >
                <span className="text-[15px] font-semibold text-ink sm:text-[16px]">
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush text-rose transition-transform duration-200",
                    isOpen && "rotate-180 bg-primary text-surface",
                  )}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              <div
                id={panelId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink-soft sm:px-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
