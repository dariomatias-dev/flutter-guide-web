import { NextIntlClientProvider } from "next-intl";

import { Footer, Header } from "@/features/layout";
import { MotionProvider } from "@/shared/components/motion-provider";
import { siteDescription, siteName, siteUrl } from "@/shared/lib/site";

import enMessages from "../../../messages/en.json";

import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
};

// These routes are an Android App Links invariant (see e2e/app-integration.spec.ts):
// they must stay reachable at this exact, unprefixed path for every locale,
// so they render in English only rather than joining the [locale] tree.
export default function DeepLinksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale="en" messages={enMessages} timeZone="UTC">
          <a
            href="#main-content"
            className="bg-brand-accent text-brand-surface focus-visible:ring-brand-accent sr-only rounded-full px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus-visible:ring-2 focus-visible:outline-none"
          >
            {enMessages.RootLayout.skipToContent}
          </a>

          <MotionProvider>
            <div className="bg-brand-surface relative flex min-h-screen w-full flex-col overflow-x-hidden text-white">
              <Header />
              {children}
              <Footer />
            </div>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
