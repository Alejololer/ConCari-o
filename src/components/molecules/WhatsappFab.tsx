"use client";
import { usePathname } from "next/navigation";
import { useWhatsapp } from "@/lib/whatsappContext";
import { cn } from "@/lib/cn";

/** Floating WhatsApp quick-contact FAB (protected by BotID via useWhatsapp). */
export function WhatsappFab() {
  const { openGeneric } = useWhatsapp();
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/producto/");

  return (
    <button
      type="button"
      onClick={() => openGeneric()}
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className={cn(
        "fixed right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-whatsapp text-white shadow-soft transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-5 sm:h-14 sm:w-14",
        isProductPage ? "bottom-22 md:bottom-5" : "bottom-5",
      )}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.88 11.88 0 0 0 5.75 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.46-8.42ZM12.06 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.88-9.9 9.88Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </button>
  );
}
