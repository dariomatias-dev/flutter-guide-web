"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const accordionContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const accordionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MotionAccordionItem = motion(AccordionItem);

export const FaqSection = () => {
  return (
    <section id="faq" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
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
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            Have a question? Find the answer here.
          </motion.p>
        </motion.div>

        <motion.div
          variants={accordionContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion type="single" collapsible className="mt-12 w-full">
            {faqs.map((faq, index) => (
              <MotionAccordionItem
                key={index}
                value={`item-${index}`}
                variants={accordionItemVariants}
              >
                <AccordionTrigger className="text-left text-lg hover:no-underline cursor-pointer focus-visible:ring-0">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-base text-zinc-400">
                  {faq.answer}
                </AccordionContent>
              </MotionAccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
