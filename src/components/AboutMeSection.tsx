import { motion } from "framer-motion";
import Image from "next/image";

import { sectionAnimation } from "@/utils/sectionAnimation";

export const AboutMeSection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="about"
      className="bg-zinc-900/50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Image
          src="/dario-matias-avatar.jpeg"
          alt="Dário Matias"
          width={100}
          height={100}
          className="mx-auto rounded-full"
        />

        <h2 className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">
          Developer
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          I'm <strong>Dário Matias</strong>, a Full Stack developer. Flutter
          Guide is my open source contribution to the community, born out of a
          desire to make high-quality development resources accessible to
          everyone.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://dariomatias-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            Portfolio
          </a>
          <span className="text-zinc-600">|</span>
          <a
            href="https://www.instagram.com/dariomatias_dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            Instagram
          </a>
          <span className="text-zinc-600">|</span>
          <a
            href="https://www.linkedin.com/in/dariomatias-dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <span className="text-zinc-600">|</span>
          <a
            href="https://github.com/dariomatias-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.section>
  );
};
