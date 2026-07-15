"use client";
import { useState } from "react";

// Fotos existentes como hidden inputs repetidos: el orden del DOM es el orden
// final que persiste saveProduct. Las nuevas (input file multiple) van al final.
export function CmsImageManager({ initial }: { initial: string[] }) {
  const [urls, setUrls] = useState(initial);
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
        className="block w-full rounded-card border border-line-strong bg-cream px-3 py-2 text-[14.5px] text-ink file:mr-2 file:border-0 file:rounded-card file:bg-rose file:px-2 file:py-1 file:text-[13px] file:text-cream file:hover:bg-rose-dark"
      />
    </div>
  );
}
