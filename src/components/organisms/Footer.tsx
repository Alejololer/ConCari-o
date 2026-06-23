import Link from "next/link";
import { brand } from "@/data/brand";
import { Logo } from "@/components/atoms/Logo";
import { getWhatsappSettings } from "@/lib/products";

export async function Footer() {
  const settings = await getWhatsappSettings();
  const waHref = `https://wa.me/${settings.phone_number}?text=${encodeURIComponent(settings.generic_template)}`;

  let displayPhone = settings.phone_number;
  if (displayPhone.startsWith("593") && displayPhone.length === 12) {
    displayPhone = "0" + displayPhone.slice(3, 6) + " " + displayPhone.slice(6, 9) + " " + displayPhone.slice(9);
  }

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-[230px] text-[13.5px] leading-[1.6] text-ink-mute">{brand.description}</p>
        </div>
        <div className="flex flex-col gap-2 text-[14px]">
          <span className="mb-1 font-semibold text-ink">Explorar</span>
          <Link href="/catalogo" className="text-ink-mute hover:text-rose">Catálogo</Link>
          <Link href="/#como-pedir" className="text-ink-mute hover:text-rose">Cómo pedir</Link>
          <Link href="/#ocasiones" className="text-ink-mute hover:text-rose">Ocasiones</Link>
        </div>
        <div className="flex flex-col gap-2 text-[14px]">
          <span className="mb-1 font-semibold text-ink">Contacto</span>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="text-ink-mute hover:text-rose">
            WhatsApp {displayPhone}
          </a>
          <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer" className="text-ink-mute hover:text-rose">
            Instagram @{brand.instagram.handle}
          </a>
          <a href={brand.facebook.url} target="_blank" rel="noopener noreferrer" className="text-ink-mute hover:text-rose">
            Facebook
          </a>
          <span className="text-ink-mute">{brand.location}</span>
        </div>
        <div className="flex flex-col gap-2 text-[14px]">
          <span className="mb-1 font-semibold text-ink">Pagos</span>
          <span className="text-ink-mute">{brand.payment.bank}</span>
          <span className="text-ink-mute">{brand.payment.accountType} {brand.payment.accountNumber}</span>
          <span className="text-ink-mute">{brand.payment.holder}</span>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-[12.5px] text-mute">
        © {new Date().getFullYear()} {brand.name} · Hecho con cariño 💝
      </div>
    </footer>
  );
}
