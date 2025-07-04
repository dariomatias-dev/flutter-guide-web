"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { githubUrl, playStoreUrl } from "@/constants/constants";
import { Button } from "./ui/button";

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
  const pathname = usePathname();
  const router = useRouter();

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

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = href.replace(/.*#/, "");

    if (pathname !== "/") {
      router.push(`/#${targetId}`);
    } else {
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNormalLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <Link
            href="/#hero"
            className="flex cursor-pointer items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(e, "/#hero");
            }}
          >
            <span className="text-lg font-bold">FlutterGuide</span>
          </Link>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-zinc-300 lg:flex">
            {navLinks.map((link) =>
              link.isScrollLink ? (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
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

          <div className="hidden items-center space-x-2 lg:flex">
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-sm font-medium text-zinc-300 transition-colors hover:bg-transparent hover:text-white"
            >
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="h-9 w-full bg-gradient-to-br from-blue-600 to-cyan-500 bg-[length:200%_auto] text-sm font-semibold text-white transition-all duration-300 hover:bg-right hover:brightness-110 sm:w-auto"
            >
              <Link
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download App
              </Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-zinc-950 lg:hidden"
          >
            <div className="flex h-full flex-col p-4">
              <div className="flex h-8 items-center justify-between">
                <a
                  href="/"
                  className="flex cursor-pointer items-center space-x-2"
                  onClick={(e) => handleNavigation(e, "/#hero")}
                >
                  <span className="text-lg font-bold">FlutterGuide</span>
                </a>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-grow flex-col items-center justify-center gap-8 text-center text-2xl font-medium">
                {navLinks.map((link) =>
                  link.isScrollLink ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link.href)}
                      className="cursor-pointer text-zinc-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleNormalLinkClick}
                      className="text-zinc-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="flex flex-col gap-4 pb-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full transform rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 py-3 text-center font-semibold text-white transition-all duration-300 hover:brightness-110"
                >
                  <Link
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download App
                  </Link>
                </Button>

                <Button
                  size="lg"
                  asChild
                  className="w-full rounded-md bg-zinc-800 py-3 text-center font-semibold text-zinc-300 transition-colors hover:bg-zinc-700"
                >
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
