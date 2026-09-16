import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PrivacyPolicyContent } from "@/features/legal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/ui/breadcrumb";
import { localeAlternates } from "@/shared/lib/locale-alternates";

import type { Metadata } from "next";

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: PrivacyPolicyPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/privacy-policy",
      languages: localeAlternates("/privacy-policy"),
    },
  };
};

export default async function Page({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("PrivacyPolicy");

  return (
    <>
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-240 w-240 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(179,185,196,0.1),transparent_40%)]" />

      <main
        id="main-content"
        tabIndex={-1}
        className="container mx-auto max-w-4xl grow px-4 pt-28 pb-16"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="transition-colors hover:text-white">
                  {t("breadcrumbHome")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-zinc-400">{t("title")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="my-8 text-center text-3xl font-bold md:text-4xl">{t("title")}</h1>

        <PrivacyPolicyContent />
      </main>
    </>
  );
}
