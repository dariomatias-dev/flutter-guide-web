import { NextIntlClientProvider } from "next-intl";

import { Footer, Header } from "@/features/layout";
import { RevealObserver } from "@/shared/components/reveal-observer";
import { geistMono, jakartaSans } from "@/shared/lib/fonts";
import { siteDescription, siteName, siteUrl } from "@/shared/lib/site";

import enMessages from "../../../messages/en.json";

import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
};

/** English-only root layout for the unprefixed deep-link routes. */
export default function DeepLinksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${jakartaSans.variable} ${geistMono.variable}`}
    >
      <body>
        <NextIntlClientProvider locale="en" messages={enMessages} timeZone="UTC">
          <a
            href="#main-content"
            className="bg-brand-500 sr-only rounded-xl px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            {enMessages.RootLayout.skipToContent}
          </a>
          <div className="bg-ink-950 relative flex min-h-screen w-full flex-col overflow-x-clip text-white">
            <RevealObserver />
            <Header showLocaleMenu={false} />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
