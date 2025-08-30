"use client";

import { AboutMeSection } from "@/components/about-me-section";
import { CommunitySection } from "@/components/community-section";
import { FaqSection } from "@/components/faq-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ScreenshotsSection } from "@/components/screenshots-section";
import { testimonials } from "@/constants/testimonials";

import { LearningPathSection } from "@/components/learning-path-section";
import { OfficialResourcesSection } from "@/components/official-resources-section";
import { ThemeCustomizationSection } from "@/components/theme-customization-section";
import { ContributionSection } from "@/components/contribution-section";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 left-[-20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
        <div className="absolute right-[-20rem] bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
      </div>

      <Header />

      <main className="min-h-screen flex-1">
        <HeroSection />

        <ScreenshotsSection />

        <FeaturesSection />

        <LearningPathSection />

        <ThemeCustomizationSection />

        <OfficialResourcesSection />

        <ContributionSection />

        {testimonials.length != 0 && <CommunitySection />}

        <FaqSection />

        <AboutMeSection />
      </main>

      <Footer />
    </div>
  );
}
