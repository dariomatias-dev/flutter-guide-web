"use client";

import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { navLinks } from "@/features/layout/data/nav-links";
import { LinkButton } from "@/shared/components/link-button";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { githubUrl, playStoreUrl } from "@/shared/lib/site";
import { DURATION_BASE } from "@/shared/motion/durations";

import { HeaderMenu } from "./header-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION_BASE }}
        className="border-brand-surface-raised/50 bg-brand-surface/50 fixed top-0 z-50 w-full border-b backdrop-blur-lg"
      >
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex cursor-pointer items-center space-x-2">
            <span className="text-lg font-bold text-white">FlutterGuide</span>
          </Link>

          <nav className="ml-auto hidden items-center space-x-8 pr-12 text-sm font-medium text-zinc-300 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
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

            <LinkButton href={playStoreUrl} className="h-9 text-sm">
              Download App
            </LinkButton>
          </div>

          <DialogTrigger
            className="hover:bg-brand-surface-raised rounded-md p-2 text-zinc-300 transition-colors hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </DialogTrigger>
        </div>
      </motion.header>

      <HeaderMenu onNavigate={() => setIsMenuOpen(false)} />
    </Dialog>
  );
};
