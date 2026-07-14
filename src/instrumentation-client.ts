import { initBotId } from "botid/client/core";

// BotID (modo Basic, gratis en Hobby). Marca las rutas que deben adjuntar el
// token anti-bot; el servidor las verifica con checkBotId() en cada handler.
initBotId({
  protect: [
    { path: "/api/wa", method: "POST" }, // revela el número de WhatsApp
    { path: "/login", method: "POST" }, // protege el login (Server Action)
  ],
});
