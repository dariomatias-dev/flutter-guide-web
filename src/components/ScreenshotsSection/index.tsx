import { motion } from "framer-motion";
import { ScreenshotCard } from "./ScreenshotCard";

const screenshots = Array.from({ length: 6 }, (_, i) => ({
  src: `/screenshots/flutter_guide_screen_${i + 1}.jpeg`,
  alt: `Flutter Guide screen ${i + 1}`,
}));

export const ScreenshotsSection = () => {
  return (
    <section id="showcase" className="relative w-full py-20 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          <ScreenshotCard src={screenshots[0].src} alt={screenshots[0].alt} />
          <ScreenshotCard
            className="lg:mt-16"
            src={screenshots[1].src}
            alt={screenshots[1].alt}
          />
          <ScreenshotCard src={screenshots[2].src} alt={screenshots[2].alt} />
          <ScreenshotCard src={screenshots[3].src} alt={screenshots[3].alt} />
          <ScreenshotCard
            className="lg:mt-16"
            src={screenshots[4].src}
            alt={screenshots[4].alt}
          />
          <ScreenshotCard src={screenshots[5].src} alt={screenshots[5].alt} />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
};
