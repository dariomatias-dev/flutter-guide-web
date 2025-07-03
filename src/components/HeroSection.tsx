import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

import { githubUrl, playStoreUrl } from "@/constants/constants";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-4 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="flex flex-col items-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300"
        >
          <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
          The Essential Companion for Flutter Devs
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl"
        >
          Master Flutter,{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Faster.
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl"
        >
          Learn, practice, and build beautiful, high-performance apps with
          curated content in your pocket.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href={playStoreUrl} target="_blank" rel="noopener noreferrer">
              Get it on Google Play
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full text-black sm:w-auto"
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
