"use client";
import { useState } from "react";

// Achica la foto en el navegador antes de subirla (lado mayor ≤ 1600px, WebP):
// una foto de celular de ~5 MB queda en ~200 kB, cabe en el límite de la Server
// Action y no llena el Storage gratis. Si el navegador no puede decodificarla
// (p. ej. HEIC), se sube el original.
async function compress(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

// Fotos existentes como hidden inputs repetidos: el orden del DOM es el orden
// final que persiste saveProduct. Las nuevas (input file multiple) van al final.
export function CmsImageManager({ initial }: { initial: string[] }) {
  const [urls, setUrls] = useState(initial);
  const [busy, setBusy] = useState(false);
  const onFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (!input.files?.length) return;
    setBusy(true);
    const dt = new DataTransfer();
    for (const f of await Promise.all([...input.files].map(compress))) dt.items.add(f);
    input.files = dt.files;
    setBusy(false);
  };
  const move = (i: number, d: number) =>
    setUrls((u) => {
      const n = [...u];
      [n[i], n[i + d]] = [n[i + d], n[i]];
      return n;
    });
  const btn =
    "h-8 w-8 rounded-card border border-line-strong bg-cream text-[14px] text-ink-soft hover:bg-blush disabled:opacity-30";
  return (
    <div className="flex flex-col gap-3">
      {urls.map((url, i) => (
        <div key={url} className="flex items-center gap-3">
          <input type="hidden" name="existing_images" value={url} />
          <img
            src={url}
            alt=""
            className="aspect-[4/5] w-20 rounded-card border border-line bg-cream object-contain"
          />
          <span className="w-16 text-[12px] text-mute">{i === 0 ? "Portada" : `Foto ${i + 1}`}</span>
          <button type="button" aria-label="Subir" disabled={i === 0} onClick={() => move(i, -1)} className={btn}>↑</button>
          <button type="button" aria-label="Bajar" disabled={i === urls.length - 1} onClick={() => move(i, 1)} className={btn}>↓</button>
          <button type="button" aria-label="Eliminar" onClick={() => setUrls(urls.filter((_, j) => j !== i))} className={btn}>✕</button>
        </div>
      ))}
      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={onFiles}
        className="block w-full rounded-card border border-line-strong bg-cream px-3 py-2 text-[14.5px] text-ink file:mr-2 file:border-0 file:rounded-card file:bg-rose file:px-2 file:py-1 file:text-[13px] file:text-cream file:hover:bg-rose-dark"
      />
      {busy && <span className="text-[12px] text-mute">Optimizando fotos…</span>}
    </div>
  );
}
