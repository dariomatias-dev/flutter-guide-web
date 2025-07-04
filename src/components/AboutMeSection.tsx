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
        I&apos;m <strong>Dário Matias</strong>, a Full Stack developer. Flutter
        Guide is my open source contribution to the community, born out of a
        desire to make high-quality development resources accessible to
        everyone.
      </p>

      <div className="mt-8 flex justify-center gap-4 text-zinc-400">
        {links.map(({ href, label, aria }, i) => (
          <span key={href} className="flex items-center">
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
          </span>
        ))}
      </div>
    </div>
  </motion.section>
);
