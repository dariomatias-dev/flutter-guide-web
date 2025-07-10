import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";

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
              <BreadcrumbPage className="font-medium text-zinc-400">
                Privacy Policy
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="my-8 text-center text-3xl font-bold md:text-4xl">
          Privacy Policy
        </h1>

        <section className="space-y-5 leading-relaxed text-zinc-300">
          <p>
            This Privacy Policy governs how the Flutter Guide app (referred to
            as the &quot;Application&quot;), developed by Dário Matias
            (&quot;Service Provider&quot;), collects, uses, and protects your
            information. This service is offered as-is and free of charge.
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Information Collection and Use
          </h2>
          <p>The Application may collect the following information:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Your device&#39;s IP address</li>
            <li>
              Pages you visit within the Application, along with timestamps and
              duration
            </li>
            <li>Overall time spent on the Application</li>
            <li>Your mobile device&#39;s operating system</li>
          </ul>
          <p>The Application does not collect precise geolocation data.</p>
          <p>
            Occasionally, the Service Provider may contact you with important
            notices or promotional materials using the information you provide.
          </p>
          <p>
            For enhanced functionality, the Application may request certain
            personally identifiable information, which will be handled according
            to this policy.
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Third Party Access
          </h2>
          <p>
            Aggregated, anonymized data may be shared with trusted third-party
            services to improve the Application and related services.
          </p>
          <p>
            The Application also uses third-party services, each with their own
            privacy policies:
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline transition-colors hover:text-cyan-300"
              >
                Google Play Services
              </Link>
            </li>
            <li>
              <Link
                href="https://support.google.com/admob/answer/6128543?sjid=9327073537188592133-SA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline transition-colors hover:text-cyan-300"
              >
                AdMob
              </Link>
            </li>
          </ul>
          <p>
            Disclosure of your information may occur in the following cases:
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>As required by law or legal processes</li>
            <li>To protect rights, safety, or investigate fraud</li>
            <li>
              With trusted service providers who comply with this privacy policy
            </li>
          </ul>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Opt-Out Rights
          </h2>
          <p>
            You can stop information collection by uninstalling the Application
            using standard device procedures.
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Data Retention Policy
          </h2>
          <p>
            Your data is retained only as long as necessary. To request deletion
            of your data, please contact:{" "}
            <a
              href="mailto:matiasdario75@gmail.com"
              className="text-cyan-400 underline transition-colors hover:text-cyan-300"
            >
              matiasdario75@gmail.com
            </a>
            .
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Children
          </h2>
          <p>
            The Application is not intended for children under 13 and does not
            knowingly collect their data. If such data is discovered, it will be
            promptly deleted.
          </p>
          <p>
            Parents or guardians who suspect their child has provided personal
            data can contact the Service Provider at{" "}
            <a
              href="mailto:matiasdario75@gmail.com"
              className="text-cyan-400 underline transition-colors hover:text-cyan-300"
            >
              matiasdario75@gmail.com
            </a>
            .
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Security
          </h2>
          <p>
            Reasonable physical, electronic, and procedural safeguards are in
            place to protect your information.
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Changes to This Policy
          </h2>
          <p>
            This Privacy Policy may be updated occasionally. Continued use of
            the Application constitutes acceptance of changes. Please review
            regularly.
          </p>
          <p className="mt-2 text-zinc-400 italic">
            Effective date: January 6, 2025
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Your Consent
          </h2>
          <p>
            By using the Application, you consent to the terms outlined in this
            Privacy Policy.
          </p>

          <h2 className="!mt-8 !mb-3 text-xl font-semibold text-white md:text-2xl">
            Contact Us
          </h2>
          <p>
            For privacy-related inquiries, contact the Service Provider at{" "}
            <a
              href="mailto:matiasdario75@gmail.com"
              className="text-cyan-400 underline transition-colors hover:text-cyan-300"
            >
              matiasdario75@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
