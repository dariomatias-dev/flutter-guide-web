"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { links } from "@/constants/links";

const containerVariants = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const AboutMeSection = () => (
  <section id="about" className="bg-[#101011] py-20 md:py-28">
    <motion.div
      className="mx-auto max-w-4xl bg-transparent px-4 text-center sm:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={itemVariants}>
        <Image
          src="/avatar.png"
          alt="Dário Matias"
          width={100}
          height={100}
          className="mx-auto rounded-full"
        />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl"
      >
        Dário Matias
      </motion.h2>

      <motion.h3
        variants={itemVariants}
        className="mt-2 text-xl font-semibold text-zinc-400"
      >
        Software Developer | Full Stack & Mobile
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300"
      >
        I work on developing complete, scalable solutions that are easy to
        maintain, with a focus on quality, performance, and usability.
      </motion.p>

      <motion.div className="mt-8 flex flex-wrap justify-center gap-y-2 text-sm text-zinc-400 sm:text-base">
        {links.map(({ href, label, aria }, i) => (
          <motion.div
            key={href}
            className="flex items-center"
            variants={itemVariants}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);
