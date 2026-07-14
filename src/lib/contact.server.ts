import "server-only";

// ponytail: datos sensibles SOLO en el servidor — nunca se importan desde un
// componente cliente, así no entran al bundle del browser ni al HTML estático.
// El celular se sirve recién al hacer click vía /api/wa (verificado por BotID).
// Los datos de pago se comparten manualmente en el chat de WhatsApp; se conservan
// aquí como registro de la información real del negocio.

export const phone = "593984800307"; // E.164 sin '+', fallback para wa.me

export const payment = {
  bank: "Banco Pichincha",
  accountType: "Ahorros",
  accountNumber: "2207281322",
  holder: "Fanny Patricia Jácome",
} as const;
