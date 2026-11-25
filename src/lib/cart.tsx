"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "./types";
import { cartTotal } from "./whatsapp";

const STORAGE_KEY = "concarino-cart";

interface AddOptions {
  openDrawer?: boolean;
  note?: string;
}

export interface CartToastPayload {
  product: Product;
  qty: number;
  ts: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  lastAdded: CartToastPayload | null;
  add: (product: Product, qty?: number, options?: AddOptions) => void;
  setQty: (id: string, qty: number) => void;
  setNote: (id: string, note: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  dismissToast: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartToastPayload | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore storage quota errors
    }
  }, [lines]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setLastAdded(null);
  }, []);

  const api = useMemo<CartCtx>(() => {
    const add: CartCtx["add"] = (product, qty = 1, options = {}) => {
      const { openDrawer = true, note } = options;
      const cleanNote = note?.trim();

      setLines((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        if (found) {
          return prev.map((l) =>
            l.product.id === product.id
              ? { ...l, qty: l.qty + qty, note: cleanNote ?? l.note }
              : l,
          );
        }
        return [...prev, { product, qty, ...(cleanNote ? { note: cleanNote } : {}) }];
      });

      if (openDrawer) {
        dismissToast();
        setIsOpen(true);
      } else {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setLastAdded({ product, qty, ts: Date.now() });
        toastTimer.current = setTimeout(() => setLastAdded(null), 4200);
      }
    };

    const setQty: CartCtx["setQty"] = (id, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.product.id !== id)
          : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
      );

    const setNote: CartCtx["setNote"] = (id, note) =>
      setLines((prev) =>
        prev.map((l) => (l.product.id === id ? { ...l, note: note.trim() || undefined } : l)),
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
      lastAdded,
      add,
      setQty,
      setNote,
      remove,
      clear: () => setLines([]),
      open: () => {
        dismissToast();
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
      dismissToast,
    };
  }, [lines, isOpen, lastAdded, dismissToast]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
