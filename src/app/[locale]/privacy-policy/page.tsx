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
import { localeAlternates, localePath } from "@/shared/lib/locale-alternates";

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
      canonical: localePath(locale, "/privacy-policy"),
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
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <div className="bg-ink-950 relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="dot-grid absolute inset-0" />
          <div className="bg-brand-600/20 absolute -top-40 left-1/2 h-96 w-3xl -translate-x-1/2 rounded-full blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList className="text-slate-400">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="transition-colors hover:text-white">
                    {t("breadcrumbHome")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-slate-200">{t("title")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-10 text-4xl font-extrabold tracking-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t("description")}</p>
          <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-sm text-slate-300">
            {t("effectiveDate")}
          </p>
        </div>
      </div>

      <div className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PrivacyPolicyContent />
        </div>
      </div>
    </main>
  );
}
