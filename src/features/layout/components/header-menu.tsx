import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { navLinks } from "@/features/layout/data/nav-links";
import { GithubButton } from "@/shared/components/github-button";
import { PlayStoreButton } from "@/shared/components/play-store-button";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface HeaderMenuProps {
  onNavigate: () => void;
}

export const HeaderMenu = ({ onNavigate }: HeaderMenuProps) => {
  return (
    <DialogPortal>
      <DialogOverlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in fixed inset-0 z-50 bg-zinc-950 duration-300 lg:hidden" />

      <DialogContent className="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in fixed inset-0 z-50 flex flex-col p-4 duration-300 lg:hidden">
        <DialogTitle className="sr-only">Navigation menu</DialogTitle>

        <div className="flex h-8 items-center justify-between">
          <Link href="/" scroll={false} className="flex cursor-pointer items-center space-x-2">
            <span className="text-lg font-bold">FlutterGuide</span>
          </Link>

          <DialogClose
            className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </DialogClose>
        </div>

        <nav className="flex grow flex-col items-center justify-center gap-8 text-center text-2xl font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={link.href}
                onClick={onNavigate}
                className="group relative text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-linear-to-r from-indigo-500 to-cyan-500 transition-all group-hover:left-0 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex flex-col gap-4 pb-4">
          <GithubButton />
          <PlayStoreButton />
        </div>
      </DialogContent>
    </DialogPortal>
  );
};
