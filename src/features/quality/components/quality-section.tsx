"use client";

import { FlaskConical, GitBranch, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { GithubButton } from "@/shared/components/github-button";
import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

// From flutter_guide_app's README.md "Testing" section. Re-check and update
// after a change to the app's test suite or coverage gates.
const stats = [
  { icon: ShieldCheck, value: "97.8%", key: "lineCoverage" },
  { icon: FlaskConical, value: "378", key: "testCases" },
  { icon: GitBranch, value: "MIT", key: "license" },
] as const;

export const QualitySection = () => {
  const t = useTranslations("Quality");

  return (
    <section id="quality" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={textItemVariants}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map(({ icon: Icon, value, key }) => (
            <motion.div
              key={key}
              variants={cardItemVariants}
              className="border-brand-surface-raised bg-brand-surface-elevated/50 flex w-48 flex-col items-center gap-3 rounded-xl border px-6 py-8 text-center shadow-lg"
            >
              <Icon className="text-brand-accent h-8 w-8" />
              <span className="text-3xl font-bold text-white">{value}</span>
              <span className="text-sm text-zinc-400">{t(key)}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={textItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <GithubButton />
        </motion.div>
      </div>
    </section>
  );
};
