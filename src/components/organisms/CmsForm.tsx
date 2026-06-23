import type { Product } from "@/lib/types";
import { occasions } from "@/data/occasions";
import { productTypes } from "@/data/types";
import { saveProduct } from "@/app/cms/actions";
import { Button } from "@/components/atoms/Button";
import { FieldLabel, Input, Select, Textarea } from "@/components/atoms/Field";

// Plain HTML form posting to the saveProduct server action. No client JS needed.
export function CmsForm({ product }: { product?: Product }) {
  const p = product;
  return (
    <form action={saveProduct} className="flex max-w-[640px] flex-col gap-5">
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
        <FieldLabel>Insignia (opcional)</FieldLabel>
        <Input name="badge" defaultValue={p?.badge} placeholder="Lo más pedido" />
      </div>

      <div>
        <FieldLabel>Descripción</FieldLabel>
        <Textarea name="desc" defaultValue={p?.desc} placeholder="Cuenta qué hace especial este detalle…" />
      </div>

      <div>
        <FieldLabel>Incluye (una línea por ítem)</FieldLabel>
        <Textarea name="inc" defaultValue={p?.inc.join("\n")} placeholder={"6 fresas con chocolate\nTarjeta personalizada"} />
      </div>

      <label className="flex items-center gap-2 text-[14.5px] text-ink-soft">
        <input type="checkbox" name="active" defaultChecked={p?.active ?? true} />
        Visible en la tienda
      </label>

      <div className="flex gap-3">
        <Button>{p ? "Guardar cambios" : "Crear detalle"}</Button>
        <Button href="/cms" variant="secondary">Cancelar</Button>
      </div>
    </form>
  );
}
