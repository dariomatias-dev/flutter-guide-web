import { AboutMeSection } from "@/features/about";
import { ContributionSection } from "@/features/contribution";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { LearningPathSection } from "@/features/learning-path";
import { OfficialResourcesSection } from "@/features/official-resources";
import { ScreenshotsSection } from "@/features/screenshots";
import { ThemeCustomizationSection } from "@/features/theme-customization";
import { playStoreUrl, siteDescription, siteName, siteUrl } from "@/shared/lib/site";

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 -left-80 h-160 w-160 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.15),transparent_40%)]" />
        <div className="absolute -right-80 bottom-0 h-160 w-160 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.15),transparent_40%)]" />
      </div>

      <main className="min-h-screen flex-1">
        <HeroSection />

        <ScreenshotsSection />

        <FeaturesSection />

        <LearningPathSection />

        <ThemeCustomizationSection />

        <ContributionSection />

        <OfficialResourcesSection />

        <FaqSection />

        <AboutMeSection />
      </main>
    </>
  );
}
