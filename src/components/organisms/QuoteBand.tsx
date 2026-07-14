import { WhatsappButton } from "@/components/molecules/WhatsappButton";

export function QuoteBand() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-5 rounded-panel bg-gradient-to-br from-[#F7E3DC] to-[#F1CFC9] px-8 py-14 text-center">
        <p className="max-w-[640px] font-display text-[clamp(28px,4vw,42px)] font-bold leading-[1.15] text-ink">
          “Un detalle pequeño puede decir lo que mil palabras no alcanzan.”
        </p>
        <p className="text-[15px] text-ink-soft">¿Tienes una idea en mente? La hacemos realidad contigo.</p>
        <WhatsappButton>
          Cuéntanos tu idea
        </WhatsappButton>
      </div>
    </section>
  );
}
