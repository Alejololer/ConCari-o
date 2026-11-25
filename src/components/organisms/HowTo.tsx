import { brand } from "@/data/brand";
import { StepCard } from "@/components/molecules/StepCard";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Elige tu detalle",
    text: "Explora el catálogo, añade al carrito lo que te guste y escribe tu dedicatoria.",
  },
  {
    title: "Coordina por WhatsApp",
    text: "Confirmamos disponibilidad, personalización, horario y cotizamos tu envío al instante.",
  },
  {
    title: "Pago por Banco Pichincha",
    text: "Realizas tu transferencia o depósito a Banco Pichincha y apartamos tu pedido al confirmarlo.",
  },
  {
    title: "Entrega con cariño",
    text: "Preparamos todo fresco el mismo día y lo llevamos a domicilio justo a tiempo 💝",
  },
];

const trustItems = [
  {
    icon: "🚚",
    title: "Envíos a domicilio",
    text: `Entregas en ${brand.areaServed.slice(0, 4).join(", ")} y alrededores de ${brand.province}. Cotización directa por WhatsApp.`,
  },
  {
    icon: "🏦",
    title: "Pago por transferencia",
    text: "Aceptamos transferencia o depósito a Banco Pichincha. Te enviamos los datos al confirmar tu pedido.",
  },
  {
    icon: "💬",
    title: "Atención personalizada",
    text: "Ajustamos colores, dedicatorias y detalles a tu gusto directamente por WhatsApp.",
  },
];

export function HowTo() {
  return (
    <section id="como-pedir" className="scroll-mt-24 mx-auto max-w-[1220px] px-4 py-10 sm:px-5 sm:py-12">
      <SectionHeading
        label="Así de fácil"
        title="Cómo pedir"
        lead="Todo el pedido, envío y transferencia se coordinan de forma sencilla por WhatsApp."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <StepCard key={s.title} n={i + 1} title={s.title} text={s.text} />
        ))}
      </div>

      {/* Shipping & payment trust strip */}
      <div
        id="envios-y-pagos"
        className="scroll-mt-24 mt-6 grid gap-4 sm:grid-cols-3"
      >
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3.5 rounded-card border border-line bg-surface px-5 py-4 shadow-card"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush text-[18px]"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-ink">{item.title}</h3>
              <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-mute">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
