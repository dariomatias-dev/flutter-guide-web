"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { githubUrl, playStoreUrl } from "@/constants/constants";
import { navLinks } from "@/constants/navLinks";
import { LinkButton } from "../link-button";
import { Button } from "../ui/button";
import { HeaderMenu } from "./header-menu";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-lg"
      >
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Link
              href="/"
              className="flex cursor-pointer items-center space-x-2"
            >
              <span className="text-lg font-bold text-white">FlutterGuide</span>
            </Link>
          </motion.div>

          <motion.nav
            className="ml-auto hidden items-center space-x-8 pr-12 text-sm font-medium text-zinc-300 lg:flex"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="hidden items-center space-x-2 lg:flex">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="text-sm font-medium text-zinc-300 transition-colors hover:bg-transparent hover:text-white"
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <LinkButton href={playStoreUrl} className="h-9 text-sm">
                Download App
              </LinkButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="lg:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {isMenuOpen && <HeaderMenu setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};
