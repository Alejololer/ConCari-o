"use client";
import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { useWhatsapp } from "@/lib/whatsappContext";

// ponytail: trigger genérico de WhatsApp para componentes server (Hero, QuoteBand).
// El número se resuelve al click vía /api/wa (BotID); nunca está en el HTML.
export function WhatsappButton({
  children,
  variant,
  size,
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
}) {
  const { openGeneric } = useWhatsapp();
  return (
    <Button variant={variant} size={size} className={className} onClick={() => openGeneric()}>
      {children}
    </Button>
  );
}
