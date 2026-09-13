import { Footer, Header } from "@/features/layout";
import { MotionProvider } from "@/shared/components/motion-provider";
import { siteDescription, siteName } from "@/shared/lib/site";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
            <Header />
            {children}
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
