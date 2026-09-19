import type { routing } from "@/i18n/routing";

/** Each locale's name in its own language. */
export const localeNames: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  "pt-BR": "Português",
  es: "Español",
};
