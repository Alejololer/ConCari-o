import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { signOut } from "@/app/cms/actions";

export function CmsSidebar() {
  return (
    <aside className="flex w-full flex-col gap-1 border-line bg-surface p-5 md:h-screen md:w-[240px] md:border-r">
      <Link href="/cms" className="mb-6">
        <Logo />
      </Link>
      <span className="px-3 text-[11px] font-semibold uppercase tracking-[1.4px] text-mute">Panel</span>
      <Link href="/cms" className="rounded-[12px] px-3 py-2.5 text-[14.5px] font-medium text-ink-soft hover:bg-blush/60">
        Productos
      </Link>
      <Link href="/cms/producto/nuevo" className="rounded-[12px] px-3 py-2.5 text-[14.5px] font-medium text-ink-soft hover:bg-blush/60">
        + Nuevo detalle
      </Link>
      <Link href="/" className="rounded-[12px] px-3 py-2.5 text-[14.5px] font-medium text-ink-soft hover:bg-blush/60">
        Ver tienda ↗
      </Link>
      <form action={signOut} className="mt-auto">
        <button className="w-full rounded-[12px] px-3 py-2.5 text-left text-[14px] text-mute hover:bg-blush/60 hover:text-rose">
          Cerrar sesión
        </button>
      </form>
    </aside>
  );
}
