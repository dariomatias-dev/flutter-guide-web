import { useTranslations } from "next-intl";

import { githubUrl } from "@/shared/lib/site";

import { GithubIcon } from "./brand-icons";
import { LinkButton } from "./link-button";

interface GithubButtonProps {
  tone?: "dark" | "light";
  className?: string;
}

export const GithubButton = ({ tone = "dark", className }: GithubButtonProps) => {
  const t = useTranslations("Common");

  return (
    <LinkButton
      href={githubUrl}
      variant={tone === "dark" ? "ghostDark" : "ghostLight"}
      className={className}
    >
      <GithubIcon className="size-4.5" />
      {t("viewOnGitHub")}
    </LinkButton>
  );
};
