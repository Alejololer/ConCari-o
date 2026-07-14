import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";
import { getWhatsappSettings } from "@/lib/products";

// Devuelve el número de WhatsApp SOLO a humanos verificados por BotID.
// El número nunca está en el HTML/JSON del sitio; el cliente lo pide aquí al click.
export async function POST() {
  const verdict = await checkBotId();
  if (verdict.isBot) {
    return NextResponse.json({ error: "denied" }, { status: 403 });
  }
  const { phone_number } = await getWhatsappSettings();
  return NextResponse.json({ phone: phone_number });
}
