import { describe, expect, it } from "vitest";

import { parseChangelog, splitInlineCode } from "@/features/changelog/lib/parse-changelog";

import { changelogFixture } from "./fixture";

describe("parseChangelog", () => {
  const releases = parseChangelog(changelogFixture);

  it("returns releases newest first, dropping an empty [Unreleased]", () => {
    expect(releases.map((release) => release.version)).toEqual([
      "1.3.0",
      "1.2.3",
      "1.0.1",
      "1.0.0",
    ]);
  });

  it("reads each release's date and sections in order", () => {
    const [latest] = releases;
    expect(latest!.date).toBe("2026-08-01");
    expect(latest!.sections.map((section) => section.type)).toEqual(["added", "changed", "fixed"]);
    expect(latest!.sections[2]!.items).toHaveLength(2);
  });

  it("joins wrapped bullets into a single entry", () => {
    expect(releases[0]!.sections[0]!.items[1]).toBe(
      "New catalog samples: `DataTable` / `PaginatedDataTable` and `Stepper`",
    );
  });

  it("keeps free text under a release as its summary", () => {
    expect(releases[2]!.summary).toEqual(["Initial public release."]);
    expect(releases[3]!.summary).toEqual(["Initial commit: project scaffolding."]);
    expect(releases[3]!.sections).toEqual([]);
  });

  it("links each release to its compare view when one is referenced", () => {
    expect(releases[0]!.compareUrl).toBe("https://github.com/x/y/compare/v1.2.3...v1.3.0");
    expect(releases[2]!.compareUrl).toBeNull();
  });

  it("keeps an [Unreleased] heading that has entries", () => {
    const [unreleased] = parseChangelog("## [Unreleased]\n### Added\n- Something new\n");
    expect(unreleased).toMatchObject({ version: "Unreleased", date: null });
  });

  it("ignores sections it doesn't recognize and text before the first release", () => {
    const [release] = parseChangelog("Intro\n## [2.0.0] - 2027-01-01\n### Notes\n- skipped\n");
    expect(release!.sections).toEqual([]);
    expect(release!.summary).toEqual([]);
  });
});

describe("splitInlineCode", () => {
  it("splits text around backtick spans", () => {
    expect(splitInlineCode("Use `dio` for `http` calls")).toEqual([
      { code: false, text: "Use " },
      { code: true, text: "dio" },
      { code: false, text: " for " },
      { code: true, text: "http" },
      { code: false, text: " calls" },
    ]);
  });
});
