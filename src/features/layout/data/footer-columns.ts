import type { FooterColumn } from "@/features/layout/layout.types";
import {
  contributingUrl,
  flutterResources,
  githubUrl,
  issuesUrl,
  playStoreUrl,
} from "@/shared/lib/site";

/** Footer link columns; `nav.*` labels come from Header, the rest from Footer.links. */
export const footerColumns: FooterColumn[] = [
  {
    titleKey: "app",
    links: [
      { href: "/#features", labelKey: "nav.features" },
      { href: "/#examples", labelKey: "nav.examples" },
      { href: "/#catalog", labelKey: "nav.catalog" },
      { href: "/#showcase", labelKey: "nav.screenshots" },
      { href: "/#whats-new", labelKey: "whatsNew" },
    ],
  },
  {
    titleKey: "resources",
    links: [
      { href: flutterResources.flutterDocs, labelKey: "flutterDocs", external: true },
      { href: flutterResources.dartDocs, labelKey: "dartDocs", external: true },
      { href: flutterResources.pubDev, labelKey: "pubDev", external: true },
      { href: flutterResources.youtube, labelKey: "youtube", external: true },
    ],
  },
  {
    titleKey: "openSource",
    links: [
      { href: githubUrl, labelKey: "sourceCode", external: true },
      { href: contributingUrl, labelKey: "contributing", external: true },
      { href: issuesUrl, labelKey: "reportIssue", external: true },
      { href: "/changelog", labelKey: "changelog" },
    ],
  },
  {
    titleKey: "support",
    links: [
      { href: playStoreUrl, labelKey: "googlePlay", external: true },
      { href: "/#faq", labelKey: "nav.faq" },
    ],
  },
];
