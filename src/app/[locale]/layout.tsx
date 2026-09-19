import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Footer, Header } from "@/features/layout";
import { routing } from "@/i18n/routing";
import { RevealObserver } from "@/shared/components/reveal-observer";
import { geistMono, jakartaSans } from "@/shared/lib/fonts";
import { siteDescription, siteName, siteUrl } from "@/shared/lib/site";

import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  icons: { icon: "/favicon.ico", apple: "/flutter_guide_icon.png" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations("RootLayout");

  const isVercelDeployment = process.env.VERCEL === "1";

  return (
    <html
      data-scroll-behavior="smooth"
      lang={locale}
      className={`${jakartaSans.variable} ${geistMono.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale}>
          <a
            href="#main-content"
            className="bg-brand-500 sr-only rounded-xl px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            {t("skipToContent")}
          </a>
          <div className="bg-ink-950 relative flex min-h-screen w-full flex-col overflow-x-clip text-white">
            <RevealObserver />
            <Header />
            {children}
            <Footer />
          </div>

          {isVercelDeployment && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
