import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

const linkClassName = "text-brand-accent hover:text-brand-accent-soft underline transition-colors";

export const PrivacyPolicyContent = async () => {
  const t = await getTranslations("PrivacyPolicy");

  return (
    <section className="space-y-5 leading-relaxed text-zinc-300">
      <p>{t("intro")}</p>

      <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
        {t("localPreferencesTitle")}
      </h2>
      <p>{t("localPreferencesBody")}</p>

      <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
        {t("advertisingTitle")}
      </h2>
      <p>
        {t.rich("advertisingBody", {
          admob: (chunks) => (
            <Link
              href="https://support.google.com/admob/answer/6128543"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {chunks}
            </Link>
          ),
          usage: (chunks) => (
            <Link
              href="https://support.google.com/admob/answer/6128543"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
        {t("externalLinksTitle")}
      </h2>
      <p>{t("externalLinksBody")}</p>

      <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
        {t("childrenTitle")}
      </h2>
      <p>{t("childrenBody")}</p>

      <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
        {t("changesTitle")}
      </h2>
      <p>{t("changesBody")}</p>
      <p className="mt-2 text-zinc-400 italic">{t("effectiveDate")}</p>

      <h2 className="mt-8! mb-3! text-xl font-semibold text-white md:text-2xl">
        {t("contactTitle")}
      </h2>
      <p>
        {t.rich("contactBody", {
          email: (chunks) => (
            <a href="mailto:matiasdario75@gmail.com" className={linkClassName}>
              {chunks}
            </a>
          ),
        })}
      </p>
    </section>
  );
};
