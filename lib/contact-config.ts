const clean = (value: string | undefined) => value?.trim() || null;

export const contactConfig = {
  supportEmail: clean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) ?? "support@ccommerce.com.bd",
  supportPhone: clean(process.env.NEXT_PUBLIC_SUPPORT_PHONE),
  whatsappNumber: (clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "8801833876434").replace(/\D/g, ""),
  officeAddress: clean(process.env.NEXT_PUBLIC_OFFICE_ADDRESS),
  supportHours: clean(process.env.NEXT_PUBLIC_SUPPORT_HOURS),
  availabilityText:
    clean(process.env.NEXT_PUBLIC_SUPPORT_AVAILABILITY) ??
    "Response times may vary depending on the inquiry.",
  whatsappMessage: "Hello C Commerce Support, I need help with C Commerce.",
} as const;

export function getWhatsAppUrl(message = contactConfig.whatsappMessage) {
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
