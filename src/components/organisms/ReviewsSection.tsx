import { SectionLabel } from "@/components/atoms/SectionLabel";

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  occasion: string;
  rating: number;
  text: string;
}

const reviews: ReviewItem[] = [
  {
    id: "r1",
    author: "Camila V.",
    location: "Latacunga",
    occasion: "Fresas con chocolate",
    rating: 5,
    text: "Llegaron puntuales y la presentación superó las fotos. Las fresas súper frescas y el detalle de la tarjeta quedó hermoso.",
  },
  {
    id: "r2",
    author: "Mateo R.",
    location: "Salcedo",
    occasion: "Desayuno sorpresa",
    rating: 5,
    text: "Pedí por WhatsApp para el cumpleaños de mi mamá y me ayudaron a personalizar todo súper rápido. Le encantó cada detalle.",
  },
  {
    id: "r3",
    author: "Andrea P.",
    location: "Latacunga",
    occasion: "Box de regalo",
    rating: 5,
    text: "Ya es la tercera vez que pido con ustedes. Siempre cuidan los colores, el lazo y la entrega sin ningún contratiempo.",
  },
  {
    id: "r4",
    author: "Sebastián M.",
    location: "Lasso",
    occasion: "Aniversario",
    rating: 5,
    text: "Súper recomendados. El ramo de fresas llegó intacto y el chocolate delicioso, excelente atención desde el primer mensaje.",
  },
];

export function ReviewsSection() {
  return (
    <section id="resenas" className="mx-auto max-w-[1220px] px-4 py-10 sm:px-5 sm:py-12">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <SectionLabel>Clientes felices</SectionLabel>
          <h2 className="mt-2 font-display text-[clamp(30px,4.5vw,44px)] font-bold leading-tight text-ink">
            Lo que dicen de nosotros
          </h2>
        </div>

        <div className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface px-4 py-2 shadow-card">
          <span className="flex items-center gap-0.5 text-terracotta" aria-label="5 de 5 estrellas">
            {"★★★★★"}
          </span>
          <span className="text-[13.5px] font-bold text-ink">4.9</span>
          <span className="text-[12.5px] text-ink-mute">· +120 detalles entregados</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex flex-col justify-between gap-4 rounded-card border border-line bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] tracking-tight text-terracotta" aria-hidden="true">
                  {"★".repeat(review.rating)}
                </span>
                <span className="rounded-pill bg-blush px-2.5 py-0.5 text-[11px] font-semibold text-berry">
                  {review.occasion}
                </span>
              </div>
              <p className="text-[14px] leading-[1.6] text-ink-soft">“{review.text}”</p>
            </div>

            <div className="flex items-center justify-between border-t border-line/70 pt-3 text-[12.5px]">
              <span className="font-semibold text-ink">{review.author}</span>
              <span className="text-mute">{review.location}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
