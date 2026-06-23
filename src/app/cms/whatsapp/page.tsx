import { getWhatsappSettings } from "@/lib/products";
import { saveWhatsappSettings } from "@/app/cms/actions";
import { FieldLabel, Input, Textarea } from "@/components/atoms/Field";
import { SubmitButton } from "@/components/atoms/SubmitButton";

export const metadata = { title: "WhatsApp · CMS · Con cariño" };

export default async function CmsWhatsappPage() {
  const settings = await getWhatsappSettings();

  return (
    <div className="px-6 py-8">
      <div className="mb-7">
        <h1 className="font-display text-4xl font-bold text-rose">WhatsApp & Mensajes</h1>
        <p className="text-[14px] text-ink-mute">
          Configura el número de teléfono receptor y las plantillas para los mensajes automáticos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Form Column */}
        <div className="lg:col-span-2 rounded-card border border-line bg-surface p-6">
          <form action={saveWhatsappSettings} className="flex flex-col gap-6">
            <div>
              <FieldLabel>Número de WhatsApp receptor</FieldLabel>
              <Input
                name="phone_number"
                defaultValue={settings.phone_number}
                required
                placeholder="ej: 593984800307"
                title="Solo números, sin signos de suma (+) ni espacios"
              />
              <p className="mt-1 text-[12px] text-ink-mute">
                Formato E.164 (código de país seguido del número, sin "+"). Por ejemplo: <strong>593984800307</strong> para Ecuador.
              </p>
            </div>

            <div>
              <FieldLabel>Plantilla para Carrito de Compras</FieldLabel>
              <Textarea
                name="cart_template"
                defaultValue={settings.cart_template}
                required
                className="font-mono text-[13.5px]"
                rows={5}
              />
              <p className="mt-1 text-[12px] text-ink-mute">
                Utiliza <code>{`{items}`}</code> para insertar la lista de productos y <code>{`{total}`}</code> para el valor total estimado.
              </p>
            </div>

            <div>
              <FieldLabel>Plantilla para Producto Individual (Pedir directo)</FieldLabel>
              <Textarea
                name="product_template"
                defaultValue={settings.product_template}
                required
                className="font-mono text-[13.5px]"
                rows={3}
              />
              <p className="mt-1 text-[12px] text-ink-mute">
                Utiliza <code>{`{name}`}</code> para el nombre del producto, <code>{`{qty}`}</code> para la cantidad y <code>{`{price}`}</code> para el precio subtotal.
              </p>
            </div>

            <div>
              <FieldLabel>Plantilla para Mensaje Genérico (Contacto)</FieldLabel>
              <Textarea
                name="generic_template"
                defaultValue={settings.generic_template}
                required
                className="font-mono text-[13.5px]"
                rows={3}
              />
              <p className="mt-1 text-[12px] text-ink-mute">
                Mensaje predefinido para preguntas y consultas generales desde el pie de página o el menú.
              </p>
            </div>

            <div className="mt-2 border-t border-line pt-4">
              <SubmitButton className="w-full sm:w-auto">Guardar cambios</SubmitButton>
            </div>
          </form>
        </div>

        {/* Right Info Sidebar Column */}
        <div className="flex flex-col gap-6">
          <div className="rounded-card border border-line bg-surface p-5">
            <h2 className="text-lg font-bold text-ink mb-3">Consejos útiles</h2>
            <div className="flex flex-col gap-3.5 text-[13.5px] leading-relaxed text-ink-soft">
              <div className="flex gap-2">
                <span className="text-rose font-bold">✓</span>
                <span>
                  <strong>Sin Emojis:</strong> Evita agregar caracteres emoji a las plantillas, ya que pueden mostrarse como símbolos no identificados (rombos con signos de interrogación) en algunos dispositivos.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-rose font-bold">✓</span>
                <span>
                  <strong>Formato Limpio:</strong> Las plantillas se limpian automáticamente de cualquier carácter emoji antes de guardarse para asegurar una compatibilidad total.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-rose font-bold">✓</span>
                <span>
                  <strong>Saltos de Línea:</strong> Puedes utilizar saltos de línea normales en los cuadros de texto y se respetarán en el mensaje enviado por WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
