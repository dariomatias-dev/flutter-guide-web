"use client";

import Link from "next/link";

import { ToggleThemeButton } from "./toggleThemeButton";

export const Header = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);

    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold">Flutter Guide</span>
        </Link>

        <nav className="hidden items-center space-x-6 text-sm font-medium text-zinc-300 md:flex">
          <Link
            href="#features"
            onClick={handleScroll}
            className="transition-colors hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#about"
            onClick={handleScroll}
            className="transition-colors hover:text-white"
          >
            About
          </Link>

          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
};
