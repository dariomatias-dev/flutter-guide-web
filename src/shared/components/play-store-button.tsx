import { useTranslations } from "next-intl";

import { playStoreUrl } from "@/shared/lib/site";

import { GooglePlayIcon } from "./brand-icons";
import { LinkButton } from "./link-button";

interface PlayStoreButtonProps {
  variant?: "primary" | "ink";
  size?: "md" | "lg";
  className?: string;
}

export const PlayStoreButton = ({ variant = "primary", size, className }: PlayStoreButtonProps) => {
  const t = useTranslations("Common");

  return (
    <LinkButton href={playStoreUrl} variant={variant} size={size} className={className}>
      <GooglePlayIcon className="size-5" />
      {t("downloadOnGooglePlay")}
    </LinkButton>
  );
};
