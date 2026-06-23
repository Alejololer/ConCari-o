export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream/70 backdrop-blur-sm transition-all duration-300">
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer ring */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-rose/20" />
        {/* Spinning main wheel */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blush border-t-rose" />
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-rose animate-pulse">
        Cargando con cariño... 💝
      </p>
    </div>
  );
}
