"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#showcase", label: "Showcase", isScrollLink: true },
  { href: "#features", label: "Features", isScrollLink: true },
  { href: "#sample", label: "Sample", isScrollLink: true },
  { href: "#faq", label: "FAQ", isScrollLink: true },
  { href: "#about", label: "About", isScrollLink: true },
  { href: "/privacy-policy", label: "Privacy Policy", isScrollLink: false },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();

    setIsMenuOpen(false);

    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);

    elem?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={(e) => handleScroll(e, "hero")}
          >
            <span className="text-lg font-bold">FlutterGuide</span>
          </Link>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-zinc-300 md:flex">
            {navLinks.map((link) =>
              link.isScrollLink ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center space-x-4 md:flex">
            <a
              href="https://github.com/your-repo/flutterguide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              GitHub
            </a>

            <a
              href="#"
              className="transform rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110" // <-- CLASSES ATUALIZADAS
            >
              Download App
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-full bg-zinc-950 p-6 md:hidden"
          >
            <nav className="flex flex-col space-y-6 text-lg">
              {navLinks.map((link) =>
                link.isScrollLink ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-zinc-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    className="text-zinc-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="mt-8 border-t border-zinc-800 pt-6">
              <a
                href="#"
                className="block w-full transform rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 py-3 text-center font-semibold text-white transition-all duration-300 hover:brightness-110" // <-- CLASSES ATUALIZADAS
              >
                Download App
              </a>
              <a
                href="https://github.com/your-repo/flutterguide"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full rounded-md bg-zinc-800 py-3 text-center font-semibold text-zinc-300 transition-colors hover:bg-zinc-700"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
