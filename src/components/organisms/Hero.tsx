import { brand } from "@/data/brand";
import { waLink, genericText } from "@/lib/whatsapp";
import { Button } from "@/components/atoms/Button";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Dot } from "@/components/atoms/Dot";

export function Hero() {
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

        {/* Decorative floating cards */}
        <div className="relative hidden h-[380px] md:block">
          <div
            className="absolute left-6 top-4 h-[300px] w-[240px] rounded-panel shadow-soft"
            style={{ animation: "floaty 6s ease-in-out infinite", background: "radial-gradient(120% 120% at 50% 20%, #FBEAE6, #F2D0C9)" }}
          />
          <div
            className="absolute right-2 top-24 flex h-[150px] w-[200px] flex-col justify-end rounded-card bg-surface p-4 shadow-soft"
            style={{ animation: "floaty2 7s ease-in-out infinite" }}
          >
            <span className="font-display text-2xl text-rose">Hecho a mano</span>
            <span className="text-[12.5px] text-ink-mute">cada detalle, con cariño</span>
          </div>
          <div
            className="absolute bottom-2 left-0 flex items-center gap-2 rounded-pill bg-surface px-4 py-2.5 shadow-soft"
            style={{ animation: "floaty 5.5s ease-in-out infinite" }}
          >
            <Dot /> <span className="text-[13px] font-medium text-ink">Pedidos por WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
