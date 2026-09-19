import type { Release } from "@/features/changelog/changelog.types";
import { parseChangelog } from "@/features/changelog/lib/parse-changelog";
import { changelogSourceUrl } from "@/shared/lib/site";

/** Revalidation interval, in seconds, for pages showing release data. */
const REVALIDATE_SECONDS = 3600;

/** The app's releases, newest first, straight from its CHANGELOG.md on GitHub. */
export const getChangelog = async (): Promise<Release[] | null> => {
  try {
    const response = await fetch(changelogSourceUrl, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["changelog"] },
    });
    if (!response.ok) return null;

    const releases = parseChangelog(await response.text());
    return releases.length > 0 ? releases : null;
  } catch {
    return null;
  }
};

/** The newest release that has a date (skips an undated [Unreleased]). */
export const getLatestRelease = async (): Promise<Release | null> =>
  (await getChangelog())?.find((release) => release.date !== null) ?? null;
