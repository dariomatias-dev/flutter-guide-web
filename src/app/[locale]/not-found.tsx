import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { LinkButton } from "@/shared/components/link-button";

const NotFoundPage = () => {
  const t = useTranslations("NotFound");

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

      <p className="text-brand-300 text-xs font-bold tracking-[0.2em] uppercase">{t("eyebrow")}</p>

      <p
        aria-hidden="true"
        className="text-gradient mt-4 font-mono text-[9rem] leading-none font-bold tracking-tighter sm:text-[12rem]"
      >
        404
      </p>

      <h1 className="mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {t("title")}
      </h1>

      <p className="mx-auto mt-5 max-w-md text-lg text-slate-300">{t("body")}</p>

      <LinkButton href="/" target="_self" rel="" className="mt-10">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("backToHome")}
      </LinkButton>
    </main>
  );
};

export default NotFoundPage;
