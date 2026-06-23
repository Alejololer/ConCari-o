// "Cómo pedir" step.
export function StepCard({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="flex flex-col gap-[10px] rounded-card border border-line bg-surface p-[26px] shadow-card">
      <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-blush font-display text-2xl font-bold text-rose">
        {n}
      </span>
      <h3 className="text-[17px] font-semibold text-ink">{title}</h3>
      <p className="text-[14px] leading-[1.55] text-ink-mute">{text}</p>
    </div>
  );
}
