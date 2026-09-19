import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ChangelogContent, getChangelog } from "@/features/changelog";
import { routing } from "@/i18n/routing";
import { localeAlternates, localePath } from "@/shared/lib/locale-alternates";

import type { Metadata } from "next";

interface ChangelogPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: ChangelogPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Changelog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: localePath(locale, "/changelog"),
      languages: localeAlternates("/changelog"),
    },
  };
};

/** Changelog page, regenerated as the fetched changelog's cache expires. */
export default async function ChangelogPage({ params }: ChangelogPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ChangelogContent releases={await getChangelog()} />;
}
