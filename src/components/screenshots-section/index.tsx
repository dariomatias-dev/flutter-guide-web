import { motion } from "framer-motion";

import { ScreenshotsCarousel } from "./screenshots-carousel";

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
          className="mt-8"
        >
          <ScreenshotsCarousel />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
};
