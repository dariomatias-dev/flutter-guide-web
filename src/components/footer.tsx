import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-800/50 bg-zinc-950 px-4">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 py-8 text-center text-sm text-zinc-400 md:flex-row md:text-left">
        <span>
          © {new Date().getFullYear()} FlutterGuide. All rights reserved.
        </span>

        <div>
          <span>Developed by </span>
          <Link
            href="https://dariomatias-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition hover:text-blue-400"
          >
            Dário Matias
          </Link>
        </div>
      </div>
    </footer>
  );
};
