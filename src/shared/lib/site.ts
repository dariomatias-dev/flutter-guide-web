import { env } from "@/shared/lib/env";

export const siteName = "FlutterGuide";
export const siteDescription =
  "A free, open-source companion app for Flutter developers, with curated widgets, functions, packages, and UI ideas to build apps faster.";
export const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide";
export const githubUrl = "https://github.com/dariomatias-dev/flutter_guide_app";
export const contributingUrl = `${githubUrl}/blob/main/docs/contributing.md`;
export const issuesUrl = `${githubUrl}/issues`;
export const changelogUrl = `${githubUrl}/blob/main/CHANGELOG.md`;

/** Host of the links the app shares (component_sample_app_bar_actions.dart). */
export const appLinkHost = "flutterguide.app";

export const author = {
  name: "Dário Matias",
  portfolioUrl: "https://dariomatias-dev.com/",
  githubUrl: "https://github.com/dariomatias-dev",
  linkedinUrl: "https://www.linkedin.com/in/dariomatias-dev/",
  instagramUrl: "https://www.instagram.com/dariomatias_dev/",
} as const;

export const flutterResources = {
  flutterDocs: "https://docs.flutter.dev",
  dartDocs: "https://dart.dev/guides",
  pubDev: "https://pub.dev",
  youtube: "https://www.youtube.com/@flutterdev",
} as const;

/** Raw CHANGELOG.md on the app's default branch. */
export const changelogSourceUrl =
  "https://raw.githubusercontent.com/dariomatias-dev/flutter_guide_app/main/CHANGELOG.md";
export const releasesUrl = `${githubUrl}/releases`;
