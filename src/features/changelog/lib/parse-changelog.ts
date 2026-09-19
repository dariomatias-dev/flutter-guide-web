import type { ChangeType, Release, ReleaseSection } from "@/features/changelog/changelog.types";

const changeTypes: Record<string, ChangeType> = {
  added: "added",
  changed: "changed",
  deprecated: "deprecated",
  removed: "removed",
  fixed: "fixed",
  security: "security",
};

const releaseHeading = /^## \[([^\]]+)\](?:\s+-\s+(\d{4}-\d{2}-\d{2}))?\s*$/;
const sectionHeading = /^### (.+?)\s*$/;
const linkReference = /^\[([^\]]+)\]:\s*(\S+)\s*$/;

/** Parses a Keep a Changelog markdown file into releases, newest first. */
export const parseChangelog = (markdown: string): Release[] => {
  const releases: Release[] = [];
  const links = new Map<string, string>();
  let release: Release | null = null;
  let section: ReleaseSection | null = null;
  let pastSummary = false;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd();

    const reference = linkReference.exec(line);
    if (reference) {
      links.set(reference[1]!, reference[2]!);
      continue;
    }

    const releaseMatch = releaseHeading.exec(line);
    if (releaseMatch) {
      release = {
        version: releaseMatch[1]!,
        date: releaseMatch[2] ?? null,
        summary: [],
        sections: [],
      };
      releases.push(release);
      section = null;
      pastSummary = false;
      continue;
    }

    if (!release) continue;

    const sectionMatch = sectionHeading.exec(line);
    if (sectionMatch) {
      pastSummary = true;
      const type = changeTypes[sectionMatch[1]!.toLowerCase()];
      section = type ? { type, items: [] } : null;
      if (section) release.sections.push(section);
      continue;
    }

    if (line.startsWith("- ") && section) {
      section.items.push(line.slice(2).trim());
    } else if (/^\s+\S/.test(line) && section && section.items.length > 0) {
      const last = section.items.length - 1;
      section.items[last] = `${section.items[last]} ${line.trim()}`;
    } else if (line.trim() && !pastSummary) {
      release.summary.push(line.trim());
    }
  }

  return releases
    .filter((entry) => entry.version !== "Unreleased" || entry.sections.length > 0)
    .map((entry) => ({ ...entry, compareUrl: links.get(entry.version) ?? null }));
};

/** Splits text around `inline code` spans. */
export const splitInlineCode = (text: string) =>
  text.split(/(`[^`]+`)/).flatMap((part) => {
    if (!part) return [];
    return part.startsWith("`") && part.endsWith("`")
      ? [{ code: true, text: part.slice(1, -1) }]
      : [{ code: false, text: part }];
  });
