import { motion } from "framer-motion";
import Image from "next/image";

import { links } from "@/constants/links";
import { sectionAnimation } from "@/utils/sectionAnimation";

export const AboutMeSection = () => (
  <motion.section
    {...sectionAnimation}
    id="about"
    className="bg-zinc-900/50 py-20 md:py-28"
  >
    <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
      <Image
        src="/avatar.png"
        alt="Dário Matias"
        width={100}
        height={100}
        className="mx-auto rounded-full"
      />

      <h2 className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">
        Dário Matias
      </h2>
      <h3 className="mt-2 text-xl font-semibold text-zinc-400">
        Software Developer | Full Stack & Mobile
      </h3>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
        I work on developing complete, scalable solutions that are easy to
        maintain, with a focus on quality, performance, and usability.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-y-2 text-sm text-zinc-400 sm:text-base">
        {links.map(({ href, label, aria }, i) => (
          <div key={href} className="flex items-center">
            {i > 0 && <span className="mx-2 text-zinc-600">|</span>}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={aria}
              className="transition-colors hover:text-white"
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);
