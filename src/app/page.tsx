"use client";

import { AboutMeSection } from "@/features/about";
import { CommunitySection, testimonials } from "@/features/community";
import { ContributionSection } from "@/features/contribution";
import { FaqSection } from "@/features/faq";
import { FeaturesSection } from "@/features/features-showcase";
import { HeroSection } from "@/features/hero";
import { Footer, Header } from "@/features/layout";
import { LearningPathSection } from "@/features/learning-path";
import { OfficialResourcesSection } from "@/features/official-resources";
import { ScreenshotsSection } from "@/features/screenshots";
import { ThemeCustomizationSection } from "@/features/theme-customization";

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

        <ContributionSection />

        <OfficialResourcesSection />

        {testimonials.length != 0 && <CommunitySection />}

        <FaqSection />

        <AboutMeSection />
      </main>

      <Footer />
    </div>
  );
}
