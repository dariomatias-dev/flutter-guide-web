import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer, Header } from "@/features/layout";
import { MotionProvider } from "@/shared/components/motion-provider";
import { siteDescription, siteName, siteUrl } from "@/shared/lib/site";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  alternates: { canonical: "/" },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The Analytics/SpeedInsights scripts resolve only on Vercel's platform
  // (production and preview deployments), where VERCEL is set to "1".
  const isVercelDeployment = process.env.VERCEL === "1";

  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="bg-brand-accent text-brand-surface focus-visible:ring-brand-accent sr-only rounded-full px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus-visible:ring-2 focus-visible:outline-none"
        >
          Skip to content
        </a>

        <MotionProvider>
          <div className="bg-brand-surface relative flex min-h-screen w-full flex-col overflow-x-hidden text-white">
            <Header />
            {children}
            <Footer />
          </div>
        </MotionProvider>

        {isVercelDeployment && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
