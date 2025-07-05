"use client";

import { AboutMeSection } from "@/components/AboutMeSection";
import { CommunitySection } from "@/components/CommunitySection";
import { FaqSection } from "@/components/FaqSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/HeroSection";
import { SampleSection } from "@/components/SampleSection";
import { ScreenshotsSection } from "@/components/ScreenshotsSection";
import { testimonials } from "@/constants/testimonials";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 left-[-20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
        <div className="absolute right-[-20rem] bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
      </div>

      <Header />

      <main className="min-h-screen flex-1">
        <HeroSection />

        <ScreenshotsSection />

        <FeaturesSection />

        <SampleSection />

        {testimonials.length != 0 && <CommunitySection />}

        <FaqSection />

        <AboutMeSection />
      </main>

      <Footer />
    </div>
  );
}
