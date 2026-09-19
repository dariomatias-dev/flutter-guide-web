import { HardDrive, Mail, Megaphone, UserX } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

const contactEmail = "matiasdario75@gmail.com";
const admobDataUrl = "https://support.google.com/admob/answer/6128543";
const googlePrivacyUrl = "https://policies.google.com/privacy";

const linkClassName =
  "font-medium text-brand-600 underline underline-offset-2 transition-colors hover:text-brand-700";

const glance = [
  { key: "noAccount", icon: UserX },
  { key: "onDevice", icon: HardDrive },
  { key: "ads", icon: Megaphone },
] as const;

const sectionKeys = [
  "localPreferences",
  "advertising",
  "externalLinks",
  "children",
  "changes",
  "contact",
] as const;

type SectionKey = (typeof sectionKeys)[number];

/** A `t.rich` tag renderer that wraps its text in an external link. */
const externalLink = (href: string) => {
  const ExternalLink = (chunks: React.ReactNode) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
      {chunks}
    </Link>
  );
  return ExternalLink;
};

const sectionId = (key: SectionKey) => key.replaceAll(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const PrivacyPolicyContent = async () => {
  const t = await getTranslations("PrivacyPolicy");

  const bodies: Record<SectionKey, React.ReactNode> = {
    localPreferences: <p>{t("localPreferencesBody")}</p>,
    advertising: (
      <p>
        {t.rich("advertisingBody", {
          admob: externalLink(admobDataUrl),
          privacy: externalLink(googlePrivacyUrl),
          usage: externalLink(admobDataUrl),
        })}
      </p>
    ),
    externalLinks: <p>{t("externalLinksBody")}</p>,
    children: <p>{t("childrenBody")}</p>,
    changes: <p>{t("changesBody")}</p>,
    contact: (
      <>
        <p>
          {t.rich("contactBody", {
            email: (chunks) => (
              <a href={`mailto:${contactEmail}`} className={linkClassName}>
                {chunks}
              </a>
            ),
          })}
        </p>
        <a
          href={`mailto:${contactEmail}`}
          className="bg-ink-900 hover:bg-ink-800 mt-6 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition-colors"
        >
          <Mail className="size-4" aria-hidden="true" />
          {t("contactCta")}
        </a>
      </>
    ),
  };

  return (
    <div className="grid gap-12 *:min-w-0 lg:grid-cols-[14rem_1fr]">
      <nav aria-label={t("onThisPage")} className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-heading text-xs font-bold tracking-wider uppercase">
            {t("onThisPage")}
          </p>
          <ol className="border-line mt-4 space-y-0.5 border-l text-sm">
            {sectionKeys.map((key) => (
              <li key={key}>
                <a
                  href={`#${sectionId(key)}`}
                  className="text-body hover:border-brand-500 hover:text-heading -ml-px block border-l border-transparent py-1.5 pl-4 transition-colors"
                >
                  {t(`${key}Title`)}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div>
        <section aria-labelledby="summary-title">
          <h2 id="summary-title" className="text-heading text-lg font-bold">
            {t("summaryTitle")}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {glance.map(({ key, icon: Icon }) => (
              <li key={key} className="ring-line rounded-2xl bg-white p-5 ring-1">
                <span className="bg-brand-500/10 text-brand-600 flex size-10 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-heading mt-4 font-bold">{t(`glance.${key}.title`)}</h3>
                <p className="text-body mt-1.5 text-sm leading-relaxed">
                  {t(`glance.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <article className="ring-line text-body mt-10 rounded-3xl bg-white p-7 leading-relaxed ring-1 sm:p-10">
          <p className="text-heading text-lg leading-relaxed">{t("intro")}</p>

          {sectionKeys.map((key, index) => (
            <section
              key={key}
              id={sectionId(key)}
              aria-labelledby={`${sectionId(key)}-title`}
              className="border-line mt-10 scroll-mt-28 border-t pt-10"
            >
              <h2
                id={`${sectionId(key)}-title`}
                className="text-heading flex items-baseline gap-3 text-xl font-bold tracking-tight"
              >
                <span aria-hidden="true" className="text-brand-600 font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {t(`${key}Title`)}
              </h2>
              <div className="mt-4">{bodies[key]}</div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
};
