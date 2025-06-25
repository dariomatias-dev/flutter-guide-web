import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-white px-4 md:px-16 dark:border-[#1e2d3d] dark:bg-[#0d1117]">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 py-6 text-center text-sm text-[#4a5a6a] md:flex-row md:text-left dark:text-[#a0b4c8]">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <span>© 2025 Flutter Guide</span>
          <span className="hidden md:inline">|</span>
          <span>All rights reserved</span>
        </div>

        <div>
          Developed by{" "}
          <Link
            href="https://github.com/dariomatias-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#02569B] transition hover:underline hover:opacity-80 dark:text-[#7ab8f5]"
          >
            Dário Matias
          </Link>
        </div>
      </div>
    </footer>
  );
};
