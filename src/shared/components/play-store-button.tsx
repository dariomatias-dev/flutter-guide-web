"use client";

import { useTranslations } from "next-intl";

import { playStoreUrl } from "@/shared/lib/site";

import { LinkButton } from "./link-button";

export const PlayStoreButton = () => {
  const t = useTranslations("Common");

  return (
    <LinkButton href={playStoreUrl} className="h-auto">
      {t("downloadOnGooglePlay")}
    </LinkButton>
  );
};
