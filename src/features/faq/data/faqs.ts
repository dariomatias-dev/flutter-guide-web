import type { FAQ } from "@/features/faq/faq.types";

/** Question/answer text lives in messages/*.json under Faq.items.<key>. */
export const faqs: FAQ[] = [
  { key: "free" },
  { key: "commercialUse" },
  { key: "ios" },
  { key: "docs" },
  { key: "languages" },
  { key: "updates" },
  { key: "contribute" },
];
