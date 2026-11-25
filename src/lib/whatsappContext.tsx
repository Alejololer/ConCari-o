"use client";
import React, { createContext, useContext } from "react";
import { money } from "./format";
import { formatOrderLine, type OrderLine } from "./whatsapp";

type Templates = {
  cart_template: string;
  product_template: string;
  generic_template: string;
};

interface WhatsappContextType {
  openCart: (lines: OrderLine[]) => Promise<void>;
  openProduct: (name: string, qty: number, price: number, note?: string) => Promise<void>;
  openGeneric: () => Promise<void>;
}

const WhatsappContext = createContext<WhatsappContextType | null>(null);

// ponytail: el número NO viaja al cliente. Se pide a /api/wa (verificado por BotID)
// recién al hacer click, así nunca aparece en el HTML estático ni en el bundle.
async function openWhatsapp(message: string) {
  let phone: string | undefined;
  try {
    const res = await fetch("/api/wa", { method: "POST" });
    if (!res.ok) throw new Error("denied");
    phone = (await res.json()).phone;
  } catch {
    phone = undefined;
  }
  if (!phone) {
    alert("No pudimos abrir WhatsApp. Vuelve a intentarlo en un momento.");
    return;
  }
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function WhatsappProvider({
  templates,
  children,
}: {
  templates: Templates;
  children: React.ReactNode;
}) {
  const openCart = (lines: OrderLine[]) => {
    const itemsText = lines.map(formatOrderLine).join("\n");
    const totalVal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const text = templates.cart_template
      .replace(/{items}/g, itemsText)
      .replace(/{total}/g, money(totalVal));
    return openWhatsapp(text);
  };

  const openProduct = (name: string, qty: number, price: number, note?: string) => {
    const base = templates.product_template
      .replace(/{name}/g, name)
      .replace(/{qty}/g, String(qty))
      .replace(/{price}/g, money(price * qty));
    const cleanNote = note?.trim();
    const text = cleanNote ? `${base}\nDedicatoria para tarjeta: "${cleanNote}"` : base;
    return openWhatsapp(text);
  };

  const openGeneric = () => openWhatsapp(templates.generic_template);

  return (
    <WhatsappContext.Provider value={{ openCart, openProduct, openGeneric }}>
      {children}
    </WhatsappContext.Provider>
  );
}

export function useWhatsapp() {
  const ctx = useContext(WhatsappContext);
  if (!ctx) {
    throw new Error("useWhatsapp must be used within a WhatsappProvider");
  }
  return ctx;
}
