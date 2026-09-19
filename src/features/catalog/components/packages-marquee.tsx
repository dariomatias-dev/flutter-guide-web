import { Package } from "lucide-react";
import { useTranslations } from "next-intl";

import { packages } from "@/features/catalog/data/packages";
import { cn } from "@/shared/lib/cn";

const half = Math.ceil(packages.length / 2);
const rows = [packages.slice(0, half), packages.slice(half)];

const PackagePill = ({ name }: { name: string }) => (
  <li className="ring-line text-heading flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-sm ring-1">
    <Package className="text-brand-600 size-3.5" aria-hidden="true" />
    {name}
  </li>
);

/** Two rows of the app's pub.dev packages drifting in opposite directions. */
export const PackagesMarquee = () => {
  const t = useTranslations("Catalog");

  return (
    <div className="reveal mt-16">
      <p className="text-body text-center text-sm font-medium">
        {t("packagesStrip", { count: packages.length })}
      </p>

      <div className="group mt-6 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, index) => (
          <div key={index} className="flex overflow-hidden">
            {[false, true].map((isCopy) => (
              <ul
                key={String(isCopy)}
                aria-hidden={isCopy || undefined}
                className={cn(
                  "marquee-track group-hover:paused flex shrink-0 gap-3 pr-3",
                  index === 1 && "marquee-reverse",
                )}
              >
                {row.map((name) => (
                  <PackagePill key={name} name={name} />
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
