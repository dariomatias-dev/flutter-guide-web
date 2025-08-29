"use client";

import { motion, Variants } from "framer-motion";
import { LinkButton } from "@/components/link-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useEffect } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const NotFoundPage = () => {
  useEffect(() => {
    const path = window.location.pathname;
    const appBasePaths = [
      "/widgets",
      "/packages",
      "/functions",
      "/elements",
      "/uis",
    ];

    const matchedBasePath = appBasePaths.find(
      (p) => path.startsWith(p + "/") && path.length > (p + "/").length,
    );

    if (matchedBasePath) {
      window.location.href = `flutterguide://open.app${path}`;
    }
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-900/20" />

        <motion.div
          className="pointer-events-none absolute top-1/4 left-[10%] h-32 w-32 rounded-2xl border border-blue-500/20 bg-zinc-900/50"
          initial={{ opacity: 0, y: 50, rotate: -10 }}
          animate={{
            opacity: 1,
            y: [0, -20],
            rotate: 10,
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="pointer-events-none absolute right-[10%] bottom-1/4 h-20 w-40 rounded-full border border-cyan-500/20 bg-zinc-900/50"
          initial={{ opacity: 0, y: -50, rotate: 10 }}
          animate={{
            opacity: 1,
            y: [0, 25],
            rotate: -15,
          }}
          transition={{
            opacity: { duration: 0.5, delay: 1 },
            y: {
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="pointer-events-none absolute top-[5%] right-[20%] h-16 w-16 rounded-full border border-purple-500/20 bg-zinc-900/30"
          initial={{ opacity: 0, x: -30, rotate: 0 }}
          animate={{
            opacity: 1,
            x: [0, 30],
            y: [0, 15],
            rotate: 20,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            x: {
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            y: {
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 7,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="pointer-events-none absolute bottom-[15%] left-[25%] h-12 w-24 rounded-lg border border-blue-400/20 bg-zinc-900/40"
          initial={{ opacity: 0, y: 40, rotate: 5 }}
          animate={{
            opacity: 1,
            y: [0, -10],
            x: [0, -20],
            rotate: -5,
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.9 },
            y: {
              duration: 4.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            x: {
              duration: 5.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 9,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="pointer-events-none absolute top-[60%] left-[5%] h-10 w-10 border border-cyan-500/10 bg-zinc-900/20 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"
          initial={{ opacity: 0, y: -20, rotate: 45 }}
          animate={{
            opacity: 1,
            y: [0, 10],
            rotate: [45, 60],
          }}
          transition={{
            opacity: { duration: 0.4, delay: 1.2 },
            y: {
              duration: 3.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 6.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />
      </div>

      <Header />

      <main className="z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={itemVariants}
            className="bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text font-mono text-9xl font-bold tracking-tighter text-transparent sm:text-[12rem] md:text-[14rem]"
          >
            404
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-4 text-4xl font-extrabold tracking-tighter text-zinc-100 sm:text-5xl"
          >
            Widget Not Found in the Tree.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-md text-base text-zinc-400 md:text-lg"
          >
            We couldn&apos;t render this screen. It seems the route you followed
            doesn&apos;t exist in our widget tree.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <LinkButton href="/" target="_self" className="py-5">
              Back to Home
            </LinkButton>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
