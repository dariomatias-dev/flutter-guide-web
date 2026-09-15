import Link from "next/link";

import { PrivacyPolicyContent } from "@/features/legal";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/ui/breadcrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the FlutterGuide app collects, uses, and protects your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-240 w-240 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(179,185,196,0.1),transparent_40%)]" />

      <main
        id="main-content"
        tabIndex={-1}
        className="container mx-auto max-w-4xl grow px-4 pt-28 pb-16"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-zinc-400">Privacy Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="my-8 text-center text-3xl font-bold md:text-4xl">Privacy Policy</h1>

        <PrivacyPolicyContent />
      </main>
    </>
  );
}
