import { getLatestRelease } from "@/features/changelog";

import { HeroContent } from "./hero-content";

/** Fetches the latest app version and renders the hero. */
export const HeroSection = async () => (
  <HeroContent latestVersion={(await getLatestRelease())?.version ?? null} />
);
