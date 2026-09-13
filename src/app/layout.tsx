import { Footer, Header } from "@/features/layout";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "FlutterGuide",
  description: "FlutterGuide WebSite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
