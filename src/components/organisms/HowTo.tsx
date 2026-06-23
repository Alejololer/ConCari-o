import { StepCard } from "@/components/molecules/StepCard";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { title: "Elige tu detalle", text: "Explora el catálogo y arma tu carrito con lo que más te gusta." },
  { title: "Escríbenos por WhatsApp", text: "Confirmamos disponibilidad, personalización y fecha de entrega." },
  { title: "Realiza tu pago", text: "Transferencia a Banco Pichincha. Apartamos tu pedido al confirmarlo." },
  { title: "Recíbelo con cariño", text: "Coordinamos la entrega para que llegue justo a tiempo 💝" },
];

export function HowTo() {
  return (
    <section id="como-pedir" className="mx-auto max-w-[1180px] px-5 py-16">
      <SectionHeading label="Así de fácil" title="Cómo pedir" lead="Cuatro pasos para sorprender a quien quieres." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <StepCard key={s.title} n={i + 1} title={s.title} text={s.text} />
        ))}
      </div>
    </section>
  );
}
