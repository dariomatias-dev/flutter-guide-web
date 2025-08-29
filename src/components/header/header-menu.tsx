import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import { navLinks } from "@/constants/navLinks";
import { GithubButton } from "../buttons/github-button";
import { PlayStoreButton } from "../buttons/play-store-button";

interface HeaderMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const HeaderMenu = ({ setIsMenuOpen }: HeaderMenuProps) => {
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
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={handleNormalLinkClick}
                  className="group relative text-zinc-300 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all group-hover:left-0 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pb-4">
            <GithubButton />
            <PlayStoreButton />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
