import Link from "next/link";

import { Footer, Header } from "@/features/layout";
import { PrivacyPolicyContent } from "@/features/legal";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/ui/breadcrumb";

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.1),_transparent_40%)]" />

      <Header />

      <main className="container mx-auto max-w-4xl flex-grow px-4 pt-28 pb-16">
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

      <Footer />
    </div>
  );
}
