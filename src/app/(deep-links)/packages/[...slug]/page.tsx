import { AppLinkPage } from "@/features/deep-links";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opening in the app",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AppLinkPage />;
}
