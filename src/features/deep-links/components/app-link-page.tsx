"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
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
      className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-24 text-center focus:outline-none"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0" />
        <div className="bg-brand-600/20 absolute top-1/3 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full blur-[120px]" />
      </div>

      <span className="relative flex size-20 items-center justify-center rounded-3xl bg-white/5 ring-1 ring-white/10">
        <span className="bg-brand-500/20 animation-duration-[2s] absolute inset-0 animate-ping rounded-3xl" />
        <span className="relative h-8 w-12 overflow-hidden">
          <Image src="/flutter_guide_icon.png" alt="" fill sizes="48px" className="object-cover" />
        </span>
      </span>

      <p className="text-brand-300 mt-8 text-xs font-bold tracking-[0.2em] uppercase">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{t("title")}</h1>

      <p className="mx-auto mt-5 max-w-md text-lg text-slate-300">{t("body")}</p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        {deepLink && (
          <a
            href={deepLink}
            className="hover:border-brand-400/60 inline-flex h-13 items-center gap-2.5 rounded-xl border border-white/20 bg-white/3 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.07]"
          >
            {t("openInApp")}
            <ExternalLink className="size-4" />
          </a>
        )}

        <PlayStoreButton />
      </div>
    </main>
  );
};
