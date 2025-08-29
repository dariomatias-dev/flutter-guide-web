"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { githubUrl, playStoreUrl } from "@/constants/constants";
import { navLinks } from "@/constants/navLinks";
import { LinkButton } from "../link-button";
import { Button } from "../ui/button";
import { HeaderMenu } from "./header-menu";

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
      <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <Link href="/" className="flex cursor-pointer items-center space-x-2">
            <span className="text-lg font-bold">FlutterGuide</span>
          </Link>

          <nav className="ml-auto hidden items-center space-x-8 text-sm font-medium text-zinc-300 lg:flex pr-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
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

      {isMenuOpen && <HeaderMenu setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};
