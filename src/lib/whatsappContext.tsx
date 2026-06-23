"use client";
import React, { createContext, useContext } from "react";
import type { WhatsappSettings } from "./types";
import { money } from "./format";

interface WhatsappContextType {
  settings: WhatsappSettings;
  getCartLink: (lines: { name: string; qty: number; price: number }[]) => string;
  getProductLink: (name: string, qty: number, price: number) => string;
  getGenericLink: () => string;
  formattedPhone: string;
}

const WhatsappContext = createContext<WhatsappContextType | null>(null);

function formatPhoneNumber(num: string): string {
  // e.g. "593984800307" -> "098 480 0307" or similar
  if (num.startsWith("593") && num.length === 12) {
    return "0" + num.slice(3, 6) + " " + num.slice(6, 9) + " " + num.slice(9);
  }
  return num;
}

export function WhatsappProvider({
  settings,
  children,
}: {
  settings: WhatsappSettings;
  children: React.ReactNode;
}) {
  const getCartLink = (lines: { name: string; qty: number; price: number }[]) => {
    const itemsText = lines
      .map((l) => `- ${l.qty}x ${l.name} - ${money(l.price * l.qty)}`)
      .join("\n");
    const totalVal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const totalText = money(totalVal);

    const text = settings.cart_template
      .replace(/{items}/g, itemsText)
      .replace(/{total}/g, totalText);

    return `https://wa.me/${settings.phone_number}?text=${encodeURIComponent(text)}`;
  };

  const getProductLink = (name: string, qty: number, price: number) => {
    const text = settings.product_template
      .replace(/{name}/g, name)
      .replace(/{qty}/g, String(qty))
      .replace(/{price}/g, money(price * qty));

    return `https://wa.me/${settings.phone_number}?text=${encodeURIComponent(text)}`;
  };

  const getGenericLink = () => {
    return `https://wa.me/${settings.phone_number}?text=${encodeURIComponent(settings.generic_template)}`;
  };

  const formattedPhone = formatPhoneNumber(settings.phone_number);

  return (
    <WhatsappContext.Provider
      value={{
        settings,
        getCartLink,
        getProductLink,
        getGenericLink,
        formattedPhone,
      }}
    >
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
