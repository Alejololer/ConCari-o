"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "./types";
import { cartTotal } from "./whatsapp";

const STORAGE_KEY = "concarino-cart";

interface CartCtx {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const api = useMemo<CartCtx>(() => {
    const add: CartCtx["add"] = (product, qty = 1) =>
      setLines((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        if (found) {
          return prev.map((l) =>
            l.product.id === product.id ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [...prev, { product, qty }];
      });

    const setQty: CartCtx["setQty"] = (id, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.product.id !== id)
          : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
      );

    const remove: CartCtx["remove"] = (id) =>
      setLines((prev) => prev.filter((l) => l.product.id !== id));

    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = cartTotal(
      lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
    );

    return {
      lines,
      count,
      total,
      isOpen,
      add: (p, q) => {
        add(p, q);
        setIsOpen(true);
      },
      setQty,
      remove,
      clear: () => setLines([]),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [lines, isOpen]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
