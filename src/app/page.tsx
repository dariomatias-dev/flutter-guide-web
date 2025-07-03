"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AboutMeSection } from "@/components/AboutMeSection";
import { CommunitySection } from "@/components/CommunitySection";
import { FaqSection } from "@/components/FaqSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SampleSection } from "@/components/SampleSection";
import { testimonials } from "@/constants/testimonials";

const screenshots = Array.from({ length: 6 }, (_, i) => ({
  src: `/screenshots/flutter_guide_screen_${i + 1}.jpeg`,
  alt: `Flutter Guide screen ${i + 1}`,
}));

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

        <section id="showcase" className="relative w-full py-24 sm:py-32">
          <div className="mx-auto max-w-screen-xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
                The App in Action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                See how Flutter Guide brings concepts to life with a clean,
                intuitive, and powerful interface.
              </p>
            </motion.div>

            {/* Grid Columns */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {/* Column 1 */}
              <div className="space-y-6 lg:space-y-8">
                <ScreenshotCard
                  src={screenshots[0].src}
                  alt={screenshots[0].alt}
                />
                <ScreenshotCard
                  src={screenshots[1].src}
                  alt={screenshots[1].alt}
                />
              </div>

              {/* Column 2 */}
              <div className="hidden space-y-6 sm:block lg:translate-y-24 lg:space-y-8">
                <ScreenshotCard
                  src={screenshots[2].src}
                  alt={screenshots[2].alt}
                />
                <ScreenshotCard
                  src={screenshots[3].src}
                  alt={screenshots[3].alt}
                />
              </div>

              {/* Column 3 */}
              <div className="space-y-6 lg:space-y-8">
                <ScreenshotCard
                  src={screenshots[4].src}
                  alt={screenshots[4].alt}
                />
                <ScreenshotCard
                  src={screenshots[5].src}
                  alt={screenshots[5].alt}
                />
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </section>

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

const ScreenshotCard = ({ src, alt }: { src: string; alt: string }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative overflow-hidden rounded-2xl border-4 border-zinc-800 bg-zinc-900 shadow-2xl shadow-blue-900/20`}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={866}
        className="h-auto w-full"
        priority
      />
    </motion.div>
  );
};
