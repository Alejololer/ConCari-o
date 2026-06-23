import { getProductTypes } from "@/lib/products";
import { saveProductType, deleteProductType } from "@/app/cms/actions";
import { FieldLabel, Input } from "@/components/atoms/Field";
import { Button } from "@/components/atoms/Button";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { ColorPicker } from "@/components/molecules/ColorPicker";

export default async function CmsTiposPage() {
  const types = await getProductTypes();

  return (
    <div className="px-6 py-8">
      <div className="mb-7">
        <h1 className="font-display text-4xl font-bold text-rose">Tipos de detalle</h1>
        <p className="text-[14px] text-ink-mute">Gestiona las categorías de tus productos y sus colores de degradado.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: list of types */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-ink mb-2">Categorías actuales</h2>
          <div className="divide-y divide-line rounded-card border border-line bg-surface px-5">
            {types.map((t) => {
              const bgGradient = `linear-gradient(135deg, ${t.tone[0]}, ${t.tone[1]})`;
              return (
                <div key={t.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-card border border-line-strong shadow-sm"
                      style={{ background: bgGradient }}
                    />
                    <div>
                      <p className="font-semibold text-[15px] text-ink">{t.label}</p>
                      <p className="text-[12px] text-ink-mute font-mono">ID: {t.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline text-[12px] font-mono bg-cream border border-line px-2 py-1 rounded-[6px] text-ink-soft">
                      {t.tone[0]} → {t.tone[1]}
                    </span>
                    <form action={async (formData) => {
                      "use server";
                      const id = formData.get("id") as string;
                      await deleteProductType(id);
                    }}>
                      <input type="hidden" name="id" value={t.id} />
                      <button
                        type="submit"
                        className="text-[13.5px] font-medium text-berry hover:text-rose-dark cursor-pointer transition-colors"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Create new type */}
        <div className="rounded-card border border-line bg-surface p-5 h-fit">
          <h2 className="text-lg font-bold text-ink mb-4">Nueva categoría</h2>
          <form action={saveProductType} className="flex flex-col gap-4">
            <div>
              <FieldLabel>ID único (URL/sistema)</FieldLabel>
              <Input
                name="id"
                required
                placeholder="ej: boxes-premium"
                pattern="^[a-zA-Z0-9-]+$"
                title="Solo letras, números y guiones (-)"
              />
            </div>

            <div>
              <FieldLabel>Nombre para mostrar</FieldLabel>
              <Input
                name="label"
                required
                placeholder="ej: Boxes Premium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ColorPicker
                label="Color Inicial"
                name="tone1"
                defaultValue="#FBEAE6"
              />
              <ColorPicker
                label="Color Final"
                name="tone2"
                defaultValue="#F2D0C9"
              />
            </div>

            <div className="mt-2">
              <SubmitButton className="w-full">Crear categoría</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
