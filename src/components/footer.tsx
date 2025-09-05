"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full border-t border-zinc-800/50 bg-zinc-950 px-4"
    >
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 py-8 text-center text-sm text-zinc-400 md:flex-row md:text-left">
        <span>
          © {new Date().getFullYear()} FlutterGuide. All rights reserved.
        </span>

        <div>
          <span>Developed by </span>
          <Link
            href="https://dariomatias-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition hover:text-blue-400"
          >
            Dário Matias
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};
