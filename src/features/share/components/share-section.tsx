"use client";

import { Link2, Share2, Smartphone } from "lucide-react";
import { motion } from "motion/react";

import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const steps = [
  {
    icon: Share2,
    title: "Find & Share",
    description: "Open any widget, function, or package in the app and tap Share.",
  },
  {
    icon: Link2,
    title: "Get a Link",
    description: "A direct link to that exact component is ready to send.",
  },
  {
    icon: Smartphone,
    title: "Opens Right There",
    description: "Whoever opens it lands straight on that component, no browsing required.",
  },
];

export const ShareSection = () => {
  return (
    <section id="share" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={textItemVariants}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl"
          >
            Every Component Has a Link
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            Share a component from the app — anyone who opens the link lands right on it.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardItemVariants}
              className="border-brand-surface-raised bg-brand-surface-elevated/50 flex flex-col items-center rounded-xl border p-6 text-center shadow-lg"
            >
              <div className="bg-brand-accent/20 text-brand-accent flex h-16 w-16 items-center justify-center rounded-full">
                <Icon className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>

              <p className="mt-2 text-zinc-400">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
