import type { Occasion, Product, ProductTypeMeta } from "@/lib/types";
import { saveProduct } from "@/app/cms/actions";
import { Button } from "@/components/atoms/Button";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { FieldLabel, Input, Select, Textarea } from "@/components/atoms/Field";
import { CmsImageManager } from "@/components/molecules/CmsImageManager";

// Plain HTML form posting to the saveProduct server action. No client JS needed.
export function CmsForm({ product, productTypes, occasions }: { product?: Product; productTypes: ProductTypeMeta[]; occasions: Occasion[] }) {
  const p = product;
  return (
    <form action={saveProduct} encType="multipart/form-data" className="flex max-w-[640px] flex-col gap-5">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div>
        <FieldLabel>Nombre</FieldLabel>
        <Input name="name" defaultValue={p?.name} required placeholder="Caja Clásica" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Precio (USD)</FieldLabel>
          <Input name="price" type="number" step="0.01" min="0" defaultValue={p?.price} required />
        </div>
        <div>
          <FieldLabel>Tipo</FieldLabel>
          <Select name="type" defaultValue={p?.type ?? "fresas"}>
            {productTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <FieldLabel>Ocasiones</FieldLabel>
        <div className="flex flex-wrap gap-3">
          {occasions.map((o) => (
            <label key={o.id} className="flex items-center gap-2 rounded-pill border border-line-strong bg-cream px-3 py-2 text-[13.5px] text-ink-soft">
              <input type="checkbox" name="occ" value={o.id} defaultChecked={p?.occ.includes(o.id)} />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Fotos del producto (opcional)</FieldLabel>
        <p className="-mt-1 mb-2 text-[12.5px] leading-[1.5] text-ink-mute">
          Mejor fotos <strong>verticales 4:5</strong> (ej. 1080×1350px). Si tienen otra
          proporción se mostrarán completas con bordes de relleno — nunca se recortan.
          La primera foto es la portada; las nuevas se añaden al final.
        </p>
        <CmsImageManager initial={p?.images?.length ? p.images : p?.imageUrl ? [p.imageUrl] : []} />
      </div>

      <div>
        <FieldLabel>Descripción</FieldLabel>
        <Textarea name="desc" defaultValue={p?.desc} placeholder="Cuenta qué hace especial este detalle…" />
      </div>

      <div>
        <FieldLabel>Incluye (una línea por ítem)</FieldLabel>
        <Textarea name="inc" defaultValue={p?.inc.join("\n")} placeholder={"6 fresas con chocolate\nTarjeta personalizada"} />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="flex items-center gap-2 text-[14.5px] text-ink-soft">
          <input type="checkbox" name="active" defaultChecked={p?.active ?? true} />
          Visible en la tienda
        </label>
        <label className="flex items-center gap-2 text-[14.5px] text-ink-soft">
          <input type="checkbox" name="featured_banner" defaultChecked={p?.featuredBanner ?? false} />
          Destacado en el banner (máx. 2 productos)
        </label>
      </div>

      <div className="flex gap-3">
        <SubmitButton>{p ? "Guardar cambios" : "Crear detalle"}</SubmitButton>
        <Button href="/cms" variant="secondary">Cancelar</Button>
      </div>
    </form>
  );
}
