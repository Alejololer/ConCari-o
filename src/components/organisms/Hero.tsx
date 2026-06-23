import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { brand } from "@/data/brand";
import { waLink, genericText } from "@/lib/whatsapp";
import { Button } from "@/components/atoms/Button";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Dot } from "@/components/atoms/Dot";

export function Hero({ bannerProducts = [] }: { bannerProducts?: Product[] }) {
  const leftProduct = bannerProducts[0] || {
    id: "amor-2",
    name: "Caja Especial Clásica",
    price: 6.00,
    imageUrl: "https://qmdxmvswtqpvushfogjn.supabase.co/storage/v1/object/public/product-images/products/amor-2.png"
  };

  const rightProduct = bannerProducts[1] || {
    id: "amor-18",
    name: "Desayuno Premium",
    price: 25.00,
    imageUrl: "https://qmdxmvswtqpvushfogjn.supabase.co/storage/v1/object/public/product-images/products/amor-18.png"
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-blush blur-[10px]" />
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-5">
          <SectionLabel>Detalles hechos a mano · {brand.location}</SectionLabel>
          <h1 className="font-display text-[clamp(44px,7vw,76px)] font-bold leading-[1.02] text-ink">
            Detalles que <span className="text-rose">abrazan</span>
          </h1>
          <p className="max-w-[440px] text-[16.5px] leading-[1.6] text-ink-soft">
            Fresas con chocolate, desayunos sorpresa y boxes pensados con cariño para cada
            fecha especial. Elige, personaliza y lo coordinamos por WhatsApp.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Button href="/catalogo">Ver catálogo</Button>
            <Button href={waLink(brand.whatsapp.number, genericText)} target="_blank" variant="secondary">
              <Dot /> Escríbenos
            </Button>
          </div>
        </div>

        {/* Zoomed logo and decorative floating product cards */}
        <div className="relative hidden h-[480px] md:block">
          {/* Zoomed Logo Circle */}
          <div
            className="absolute inset-0 m-auto flex h-[330px] w-[330px] items-center justify-center rounded-full shadow-[0_30px_70px_rgba(150,90,105,0.20)]"
            style={{ background: "radial-gradient(circle at 50% 40%, #ffffff 0%, #FBEDE9 70%)" }}
          >
            <Image
              src="/logo-concarino.png"
              alt="Con cariño"
              width={280}
              height={280}
              className="object-contain"
              priority
            />
          </div>

          {/* Left Card: Caja Especial Clásica */}
          <Link
            href={`/producto/${leftProduct.id}`}
            className="absolute left-[-8px] top-[14px] w-[178px] rounded-[18px] bg-white p-[11px] shadow-[0_18px_40px_rgba(120,70,85,0.16)] transition hover:scale-105 active:scale-95 block z-10"
            style={{ animation: "floaty 5.5s ease-in-out infinite" }}
          >
            <div className="relative h-[108px] overflow-hidden rounded-[12px] bg-cream">
              {leftProduct.imageUrl && (
                <Image
                  src={leftProduct.imageUrl}
                  alt={leftProduct.name}
                  fill
                  className="object-cover"
                  sizes="156px"
                />
              )}
            </div>
            <div className="px-1.5 py-2">
              <div className="text-[13px] font-semibold text-ink truncate">{leftProduct.name}</div>
              <div className="mt-0.5 text-[14px] font-bold text-rose">${leftProduct.price.toFixed(2)}</div>
            </div>
          </Link>

          {/* Right Card: Desayuno Premium */}
          <Link
            href={`/producto/${rightProduct.id}`}
            className="absolute bottom-[18px] right-[-6px] w-[178px] rounded-[18px] bg-white p-[11px] shadow-[0_18px_40px_rgba(120,70,85,0.16)] transition hover:scale-105 active:scale-95 block z-10"
            style={{ animation: "floaty2 6.2s ease-in-out infinite" }}
          >
            <div className="relative h-[108px] overflow-hidden rounded-[12px] bg-cream">
              {rightProduct.imageUrl && (
                <Image
                  src={rightProduct.imageUrl}
                  alt={rightProduct.name}
                  fill
                  className="object-cover"
                  sizes="156px"
                />
              )}
            </div>
            <div className="px-1.5 py-2">
              <div className="text-[13px] font-semibold text-ink truncate">{rightProduct.name}</div>
              <div className="mt-0.5 text-[14px] font-bold text-rose">${rightProduct.price.toFixed(2)}</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
