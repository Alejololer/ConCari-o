import { SectionLabel } from "@/components/atoms/SectionLabel";

// Centered eyebrow + display title + optional lead, reused across home sections.
export function SectionHeading({
  label,
  title,
  lead,
}: {
  label: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <div className="mx-auto mb-10 flex max-w-[560px] flex-col items-center gap-3 text-center">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display text-[clamp(32px,4.5vw,46px)] font-bold leading-tight text-ink">{title}</h2>
      {lead && <p className="text-[15.5px] leading-[1.6] text-ink-mute">{lead}</p>}
    </div>
  );
}
