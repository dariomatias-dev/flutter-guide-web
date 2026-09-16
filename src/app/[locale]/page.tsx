import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { AboutMeSection } from "@/features/about";
import { CatalogSection } from "@/features/catalog";
import { ContributionSection } from "@/features/contribution";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { LanguagesSection } from "@/features/languages";
import { LearningPathSection } from "@/features/learning-path";
import { OfficialResourcesSection } from "@/features/official-resources";
import { QualitySection } from "@/features/quality";
import { ScreenshotsSection } from "@/features/screenshots";
import { ShareSection } from "@/features/share";
import { ThemeCustomizationSection } from "@/features/theme-customization";
import { WhatsNewSection } from "@/features/whats-new";
import { routing } from "@/i18n/routing";
import { localeAlternates } from "@/shared/lib/locale-alternates";
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

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: localeAlternates("/") },
};

interface HomeProps {
  params: Promise<{ locale: string }>;
}

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

      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 -left-80 h-160 w-160 rounded-full bg-[radial-gradient(circle_at_center,rgba(179,185,196,0.15),transparent_40%)]" />
        <div className="absolute -right-80 bottom-0 h-160 w-160 rounded-full bg-[radial-gradient(circle_at_center,rgba(179,185,196,0.15),transparent_40%)]" />
      </div>

      <main id="main-content" tabIndex={-1} className="min-h-screen flex-1">
        <HeroSection />

        <CatalogSection />

        <ScreenshotsSection />

        <FeaturesSection />

        <ShareSection />

        <LearningPathSection />

        <ThemeCustomizationSection />

        <LanguagesSection />

        <QualitySection />

        <ContributionSection />

        <OfficialResourcesSection />

        <WhatsNewSection />

        <FaqSection />

        <AboutMeSection />
      </main>
    </>
  );
}
