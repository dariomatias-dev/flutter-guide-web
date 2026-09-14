"use client";

import { Lightbulb, Share2, Users } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { contributingUrl, githubUrl, issuesUrl } from "@/shared/lib/site";
import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const links = [
  {
    href: githubUrl,
    icon: Share2,
    iconClassName: "bg-blue-600/20 text-blue-400",
    label: "Widgets & Packages",
  },
  {
    href: issuesUrl,
    icon: Lightbulb,
    iconClassName: "bg-cyan-600/20 text-cyan-400",
    label: "UI Ideas",
  },
  {
    href: contributingUrl,
    icon: Users,
    iconClassName: "bg-purple-600/20 text-purple-400",
    label: "Knowledge Sharing",
  },
];

export const ContributionSection = () => {
  return (
    <section id="contribution" className="w-full bg-[#101011] px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl text-center">
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
            Share and Grow: A Vibrant Community
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            Contribute to the FlutterGuide community! Share your widgets, favorite packages, UI
            ideas, and more. Together, we build a knowledge repository for everyone.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col justify-center gap-8 md:flex-row"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {links.map(({ href, icon: Icon, iconClassName, label }) => (
            <motion.div key={label} variants={cardItemVariants}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${iconClassName}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <p className="mt-3 text-lg font-medium text-white group-hover:underline">{label}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
