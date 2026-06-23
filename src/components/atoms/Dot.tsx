// Small status dot — the WhatsApp "online" green by default.
export function Dot({ size = 8, color = "var(--color-whatsapp)" }: { size?: number; color?: string }) {
  return (
    <span
      style={{ width: size, height: size, background: color }}
      className="inline-block rounded-full"
    />
  );
}
