import { getOccasions } from "@/lib/products";
import { saveOccasion, deleteOccasion } from "@/app/cms/actions";
import { FieldLabel, Input } from "@/components/atoms/Field";
import { SubmitButton } from "@/components/atoms/SubmitButton";

export default async function CmsOcasionesPage() {
  const occasions = await getOccasions();

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-7">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-rose">Ocasiones</h1>
        <p className="text-[14px] text-ink-mute">Gestiona las ocasiones para las que se filtran los detalles (home y catálogo).</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: list of occasions */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-ink mb-2">Ocasiones actuales</h2>
          <div className="divide-y divide-line rounded-card border border-line bg-surface px-5">
            {occasions.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-4 gap-4">
                <div>
                  <p className="font-semibold text-[15px] text-ink">{o.label}</p>
                  <p className="text-[12px] text-ink-mute">{o.sub}</p>
                  <p className="text-[12px] text-ink-mute font-mono">ID: {o.id}</p>
                </div>
                <form action={async (formData) => {
                  "use server";
                  const id = formData.get("id") as string;
                  await deleteOccasion(id);
                }}>
                  <input type="hidden" name="id" value={o.id} />
                  <button
                    type="submit"
                    className="text-[13.5px] font-medium text-berry hover:text-rose-dark cursor-pointer transition-colors"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Create new occasion */}
        <div className="rounded-card border border-line bg-surface p-5 h-fit">
          <h2 className="text-lg font-bold text-ink mb-4">Nueva ocasión</h2>
          <form action={saveOccasion} className="flex flex-col gap-4">
            <div>
              <FieldLabel>ID único (URL/sistema)</FieldLabel>
              <Input
                name="id"
                required
                placeholder="ej: aniversario"
                pattern="^[a-zA-Z0-9-]+$"
                title="Solo letras, números y guiones (-)"
              />
            </div>

            <div>
              <FieldLabel>Nombre para mostrar</FieldLabel>
              <Input
                name="label"
                required
                placeholder="ej: Para tu aniversario"
              />
            </div>

            <div>
              <FieldLabel>Subtítulo</FieldLabel>
              <Input
                name="sub"
                placeholder="ej: Celebra cada año juntos"
              />
            </div>

            <div className="mt-2">
              <SubmitButton className="w-full">Crear ocasión</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
