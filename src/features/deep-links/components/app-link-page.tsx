"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { PlayStoreButton } from "@/shared/components/play-store-button";

import { resolveAppDeepLink } from "../lib/resolve-app-deep-link";

export const AppLinkPage = () => {
  const t = useTranslations("AppLink");
  const [deepLink, setDeepLink] = useState<string | null>(null);

  useEffect(() => {
    const { pathname, search, hash } = window.location;
    const link = resolveAppDeepLink(pathname, search, hash);
    setDeepLink(link);
    if (link) window.location.href = link;
  }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col items-center justify-center px-4 py-28 text-center"
    >
      <h1 className="text-3xl font-bold text-white md:text-4xl">{t("title")}</h1>

      <p className="mx-auto mt-4 max-w-md text-lg text-zinc-400">{t("body")}</p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        {deepLink && (
          <a
            href={deepLink}
            className="bg-brand-accent text-brand-surface shadow-brand-accent/20 hover:bg-brand-accent-soft inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-semibold shadow-lg transition-colors"
          >
            {t("openInApp")}
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        <PlayStoreButton />
      </div>
    </main>
  );
};
