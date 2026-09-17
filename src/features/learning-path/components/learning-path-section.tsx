"use client";

import { Code, Eye, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const steps = [
  { icon: Eye, key: "visualPreview" },
  { icon: Code, key: "instantSourceCode" },
  { icon: Rocket, key: "practicalImplementation" },
] as const;

export const LearningPathSection = () => {
  const t = useTranslations("LearningPath");

  return (
    <section id="learning-path" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial={false}
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
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map(({ icon: Icon, key }) => (
            <motion.div
              key={key}
              variants={cardItemVariants}
              className="border-brand-surface-raised bg-brand-surface-elevated/50 flex flex-col items-center rounded-xl border p-6 text-center shadow-lg"
            >
              <div className="bg-brand-accent/20 text-brand-accent flex h-16 w-16 items-center justify-center rounded-full">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-zinc-400">{t(`${key}.description`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
