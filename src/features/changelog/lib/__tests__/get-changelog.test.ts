import { afterEach, describe, expect, it, vi } from "vitest";

import { getChangelog, getLatestRelease } from "@/features/changelog/lib/get-changelog";

import { changelogFixture } from "./fixture";

const mockFetch = (implementation: () => Promise<Response>) =>
  vi.spyOn(globalThis, "fetch").mockImplementation(implementation);

describe("getChangelog", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches the app's CHANGELOG.md, cached for an hour under a tag", async () => {
    mockFetch(async () => new Response(changelogFixture));

    const releases = await getChangelog();

    expect(releases?.[0]?.version).toBe("1.3.0");
    expect(fetch).toHaveBeenCalledWith(
      "https://raw.githubusercontent.com/dariomatias-dev/flutter_guide_app/main/CHANGELOG.md",
      { next: { revalidate: 3600, tags: ["changelog"] } },
    );
  });

  it("returns null when GitHub answers with an error", async () => {
    mockFetch(async () => new Response("Not found", { status: 404 }));
    expect(await getChangelog()).toBeNull();
  });

  it("returns null when the request fails", async () => {
    mockFetch(async () => {
      throw new TypeError("fetch failed");
    });
    expect(await getChangelog()).toBeNull();
  });

  it("returns null when the file has no releases", async () => {
    mockFetch(async () => new Response("# Changelog\n"));
    expect(await getChangelog()).toBeNull();
  });
});

describe("getLatestRelease", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips an undated [Unreleased] entry", async () => {
    mockFetch(async () => new Response(`## [Unreleased]\n### Added\n- Soon\n${changelogFixture}`));
    expect((await getLatestRelease())?.version).toBe("1.3.0");
  });

  it("returns null without a changelog", async () => {
    mockFetch(async () => new Response("", { status: 500 }));
    expect(await getLatestRelease()).toBeNull();
  });
});
