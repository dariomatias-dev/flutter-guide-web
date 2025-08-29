import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Dispatch, MouseEvent, SetStateAction } from "react";

import { githubUrl, playStoreUrl } from "@/constants/constants";
import { navLinks } from "@/constants/navLinks";
import { Button } from "../ui/button";

interface HeaderMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  handleNavigation: (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    href: string,
  ) => void;
}

export const HeaderMenu = ({
  setIsMenuOpen,
  handleNavigation,
}: HeaderMenuProps) => {
  const handleNormalLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-zinc-950 lg:hidden"
      >
        <div className="flex h-full flex-col p-4">
          <div className="flex h-8 items-center justify-between">
            <Link
              href="/"
              scroll={false}
              className="flex cursor-pointer items-center space-x-2"
              onClick={(e) => handleNavigation(e, "/#hero")}
            >
              <span className="text-lg font-bold">FlutterGuide</span>
            </Link>

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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="cursor-pointer text-zinc-300 hover:text-white"
                >
                  {link.label}
                </Link>
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
              className="text-md w-full rounded-md bg-zinc-800 py-3 text-center font-semibold text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="text-md w-full transform rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 py-3 text-center font-semibold text-white transition-all duration-300 hover:brightness-110"
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
