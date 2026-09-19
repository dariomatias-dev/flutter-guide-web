import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { CatalogSection } from "@/features/catalog";
import { WhatsNewSection } from "@/features/changelog";
import { DownloadCtaSection } from "@/features/download-cta";
import { ExamplesSection } from "@/features/examples";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { OpenSourceSection } from "@/features/open-source";
import { ScreenshotsSection } from "@/features/screenshots";
import { ShareSection } from "@/features/share";
import { routing } from "@/i18n/routing";
import { localeAlternates, localePath } from "@/shared/lib/locale-alternates";
import { playStoreUrl, siteDescription, siteName, siteUrl } from "@/shared/lib/site";

import type { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  operatingSystem: "ANDROID",
  applicationCategory: "DeveloperApplication",
  downloadUrl: playStoreUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: HomeProps): Promise<Metadata> => {
  const { locale } = await params;

  return {
    alternates: { canonical: localePath(locale, "/"), languages: localeAlternates("/") },
  };
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <HeroSection />
        <FeaturesSection />
        <ExamplesSection />
        <CatalogSection />
        <ScreenshotsSection />
        <ShareSection />
        <OpenSourceSection />
        <WhatsNewSection />
        <FaqSection />
        <DownloadCtaSection />
      </main>
    </>
  );
}
