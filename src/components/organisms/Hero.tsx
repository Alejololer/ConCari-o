import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { brand } from "@/data/brand";
import { Button } from "@/components/atoms/Button";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Dot } from "@/components/atoms/Dot";
import { Price } from "@/components/atoms/Price";
import { WhatsappButton } from "@/components/molecules/WhatsappButton";

// Floating slots around the desktop logo medallion (top-left and bottom-right).
const cardSlots = [
  "float-a left-0 top-2 lg:left-2",
  "float-b bottom-2 right-0 lg:right-2",
];

export function Hero({ bannerProducts = [] }: { bannerProducts?: Product[] }) {
  const featured = bannerProducts.slice(0, 2);

  return (
    <section className="mx-auto max-w-[1220px] px-4 pt-5 pb-8 sm:px-5">
      <div className="relative overflow-hidden rounded-panel border border-line bg-gradient-to-br from-surface via-blush/55 to-cream p-6 shadow-card sm:p-10 md:px-12 md:py-12">
        {/* Soft decorative ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 hidden h-[300px] w-[300px] rounded-full bg-blush/80 blur-2xl sm:block"
        />

        <div className="relative grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Left column: copy + CTAs + mobile quick showcase */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <SectionLabel>
              Detalles hechos a mano · {brand.city}, {brand.province}
            </SectionLabel>

            <h1 className="font-display text-[clamp(36px,6vw,64px)] font-bold leading-[1.04] text-ink pb-1">
              Detalles que <span className="text-rose">abrazan</span>
            </h1>

            <p className="max-w-[460px] text-[15px] leading-[1.6] text-ink-soft sm:text-[16px]">
              Fresas con chocolate, desayunos sorpresa y boxes hechos con cariño para cada
              fecha especial. Elige, personaliza y coordinamos tu entrega por WhatsApp.
            </p>

            <div className="mt-1 flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto md:justify-start">
              <Button className="w-full sm:w-auto" href="/catalogo">
                Explorar catálogo
              </Button>
              <WhatsappButton className="w-full sm:w-auto" variant="secondary">
                <Dot /> Escríbenos
              </WhatsappButton>
            </div>

            {/* Mobile featured product strip */}
            {featured.length > 0 && (
              <div className="mt-3 grid w-full grid-cols-2 gap-3 md:hidden">
                {featured.map((p) => (
                  <Link
                    key={p.id}
                    href={`/producto/${p.id}`}
                    className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface p-2 text-left shadow-card transition active:scale-[0.98]"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-blush">
                      {p.imageUrl ? (
                        <Image
                          src={p.imageUrl}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 42vw, 180px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl">
                          💝
                        </div>
                      )}
                    </div>
                    <div className="px-1 pt-2 pb-0.5">
                      <div className="truncate text-[13px] font-semibold text-ink">
                        {p.name}
                      </div>
                      <Price value={p.price} className="mt-0.5 block text-[13.5px]" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right column (desktop): warm logo medallion + floating product cards */}
          <div className="relative hidden h-[350px] lg:h-[370px] md:block">
            <div className="absolute inset-0 m-auto flex h-[250px] w-[250px] items-center justify-center rounded-full border border-line/70 bg-surface/90 shadow-soft">
              <Image
                src="/logo-concarino.png"
                alt={brand.name}
                width={205}
                height={205}
                className="object-contain"
                priority
              />
            </div>

            {featured.map((p, i) => (
              <div key={p.id} className={`${cardSlots[i]} absolute z-10 w-[158px] lg:w-[168px]`}>
                <Link
                  href={`/producto/${p.id}`}
                  className="group block rounded-card border border-line bg-surface p-2 shadow-soft transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-blush">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="168px"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl">
                        💝
                      </div>
                    )}
                  </div>
                  <div className="px-1 pt-2 pb-0.5">
                    <div className="truncate text-[13px] font-semibold text-ink transition-colors group-hover:text-rose">
                      {p.name}
                    </div>
                    <Price value={p.price} className="mt-0.5 block text-[14px]" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
