export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream/70 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer ring */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
        {/* Spinning main wheel */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-line-strong border-t-primary" />
      </div>
      <p className="mt-4 text-[14.5px] font-semibold text-ink-soft animate-pulse">
        Cargando panel...
      </p>
    </div>
  );
}
