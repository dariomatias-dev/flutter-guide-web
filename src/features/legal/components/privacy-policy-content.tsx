import Link from "next/link";

export const PrivacyPolicyContent = () => (
  <section className="space-y-5 leading-relaxed text-zinc-300">
    <p>
      This Privacy Policy explains how the FlutterGuide app (the &quot;Application&quot;), developed
      by Dário Matias (&quot;Service Provider&quot;), handles your information. The Application is
      free, with no account or sign-up required.
    </p>

    <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">Local Preferences</h2>
    <p>
      The Application saves your favorites, theme (light/dark), code theme, and language preference
      directly on your device. This data is never transmitted to the Service Provider or anyone
      else, and is removed if you uninstall the Application.
    </p>

    <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">Advertising</h2>
    <p>
      The Application shows ads through{" "}
      <Link
        href="https://support.google.com/admob/answer/6128543"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent hover:text-brand-accent-soft underline transition-colors"
      >
        Google AdMob
      </Link>
      , which may collect device and advertising identifiers to deliver and measure ads. This data
      is handled by Google under its own policies, not by the Service Provider. See{" "}
      <Link
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent hover:text-brand-accent-soft underline transition-colors"
      >
        Google&apos;s Privacy Policy
      </Link>{" "}
      and{" "}
      <Link
        href="https://support.google.com/admob/answer/6128543"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent hover:text-brand-accent-soft underline transition-colors"
      >
        how Google uses data from AdMob
      </Link>{" "}
      for details. You can manage ad personalization in your device&apos;s ad settings.
    </p>

    <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">External Links</h2>
    <p>
      The Application links to external sites — the project&apos;s GitHub repository, its Play Store
      listing, and the developer&apos;s portfolio. Each of those sites has its own privacy
      practices, which this policy doesn&apos;t cover.
    </p>

    <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">Children</h2>
    <p>
      The Application is not directed at children under 13 and does not knowingly collect personal
      data from them.
    </p>

    <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
      Changes to This Policy
    </h2>
    <p>
      This Privacy Policy may be updated occasionally to reflect changes in the Application.
      Continued use of the Application after a change constitutes acceptance of the update.
    </p>
    <p className="mt-2 text-zinc-400 italic">Effective date: September 14, 2026</p>

    <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">Contact</h2>
    <p>
      For any question about this policy, contact the Service Provider at{" "}
      <a
        href="mailto:matiasdario75@gmail.com"
        className="text-brand-accent hover:text-brand-accent-soft underline transition-colors"
      >
        matiasdario75@gmail.com
      </a>
      .
    </p>
  </section>
);
