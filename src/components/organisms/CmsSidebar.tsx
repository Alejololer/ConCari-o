"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { signOut } from "@/app/cms/actions";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/cms", label: "Productos" },
  { href: "/cms/tipos", label: "Tipos de detalle" },
  { href: "/cms/whatsapp", label: "Configurar WhatsApp" },
  { href: "/", label: "Ver tienda ↗" },
];

export function CmsSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-4 md:hidden">
        <Link href="/cms">
          <Logo />
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-line-strong"
        >
          <span className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "overflow-hidden border-b border-line bg-surface transition-all duration-300 md:hidden",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          <span className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[1.4px] text-mute">Panel</span>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-[12px] px-3 py-2.5 text-[14.5px] font-medium text-ink-soft hover:bg-blush/60"
            >
              {l.label}
            </Link>
          ))}
          <form action={signOut}>
            <button className="w-full rounded-[12px] px-3 py-2.5 text-left text-[14px] text-mute hover:bg-blush/60 hover:text-rose">
              Cerrar sesión
            </button>
          </form>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[240px] flex-col gap-1 border-r border-line bg-surface p-5 sticky top-0 h-screen">
        <Link href="/cms" className="mb-6">
          <Logo />
        </Link>
        <span className="px-3 text-[11px] font-semibold uppercase tracking-[1.4px] text-mute">Panel</span>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-[12px] px-3 py-2.5 text-[14.5px] font-medium text-ink-soft hover:bg-blush/60"
          >
            {l.label}
          </Link>
        ))}
        <form action={signOut} className="mt-auto">
          <button className="w-full rounded-[12px] px-3 py-2.5 text-left text-[14px] text-mute hover:bg-blush/60 hover:text-rose">
            Cerrar sesión
          </button>
        </form>
      </aside>
    </>
  );
}
