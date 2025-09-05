"use client";

import { motion } from "framer-motion";

import { features } from "@/constants/features";
import { cardItemVariants } from "@/constants/variants/cardItemVariants";
import { cardsContainerVariants } from "@/constants/variants/cardsContainerVariants";
import { headerVariants } from "@/constants/variants/headerVariants";
import { textItemVariants } from "@/constants/variants/textItemVariants";

export const FeaturesSection = () => {
  return (
    <section id="features" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-screen-xl">
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
            A Powerful Toolkit in Your Pocket
          </motion.h2>
          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            FlutterGuide is packed with features designed to accelerate your
            learning and productivity.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardItemVariants}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                <feature.icon className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-2 text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
