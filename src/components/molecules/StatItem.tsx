// Small stat used in the CMS topbar and hero trust row.
export function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[26px] font-bold text-rose leading-none">{value}</span>
      <span className="mt-1 text-[12px] text-ink-mute">{label}</span>
    </div>
  );
}
