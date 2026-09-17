"use client";

import { Lightbulb, Share2, Users } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { contributingUrl, githubUrl, issuesUrl } from "@/shared/lib/site";
import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const links = [
  { href: githubUrl, icon: Share2, key: "widgetsAndPackages" },
  { href: issuesUrl, icon: Lightbulb, key: "uiIdeas" },
  { href: contributingUrl, icon: Users, key: "knowledgeSharing" },
] as const;

export const ContributionSection = () => {
  const t = useTranslations("Contribution");

  return (
    <section id="contribution" className="bg-brand-surface w-full px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
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
          className="mt-16 flex flex-col justify-center gap-8 md:flex-row"
          variants={cardsContainerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {links.map(({ href, icon: Icon, key }) => (
            <motion.div key={key} variants={cardItemVariants}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <div className="bg-brand-accent/20 text-brand-accent flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                  <Icon className="h-8 w-8" />
                </div>
                <p className="mt-3 text-lg font-medium text-white group-hover:underline">
                  {t(key)}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
