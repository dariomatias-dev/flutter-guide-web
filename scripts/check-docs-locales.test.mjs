import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  checkParity,
  extractHeadingLevels,
  findBaseMarkdownFiles,
  localePathFor,
} from "./check-docs-locales.mjs";

describe("extractHeadingLevels", () => {
  it("extracts ATX heading levels in order", () => {
    const markdown = "# Title\n\nsome text\n\n## Section\n\n### Subsection\n\n## Another";

    expect(extractHeadingLevels(markdown)).toEqual([1, 2, 3, 2]);
  });

  it("returns an empty array when there are no headings", () => {
    expect(extractHeadingLevels("just text, no headings")).toEqual([]);
  });
});

describe("localePathFor", () => {
  it("inserts the locale before .md", () => {
    expect(localePathFor("/docs/README.md", "pt-BR")).toBe("/docs/README.pt-BR.md");
  });
});

describe("findBaseMarkdownFiles", () => {
  let dir;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), "docs-locale-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("finds .md files but excludes locale variants", () => {
    writeFileSync(path.join(dir, "guide.md"), "# Guide");
    writeFileSync(path.join(dir, "guide.pt-BR.md"), "# Guia");
    writeFileSync(path.join(dir, "guide.es.md"), "# Guía");
    writeFileSync(path.join(dir, "notes.txt"), "not markdown");

    expect(findBaseMarkdownFiles(dir)).toEqual([path.join(dir, "guide.md")]);
  });
});

describe("checkParity", () => {
  let dir;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), "docs-locale-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("reports no problems when structures match", () => {
    const basePath = path.join(dir, "guide.md");
    writeFileSync(basePath, "# Guide\n\n## Setup\n\n## Usage");
    writeFileSync(path.join(dir, "guide.pt-BR.md"), "# Guia\n\n## Configuração\n\n## Uso");

    expect(checkParity(basePath)).toEqual([]);
  });

  it("reports a problem when a translation drops a heading", () => {
    const basePath = path.join(dir, "guide.md");
    writeFileSync(basePath, "# Guide\n\n## Setup\n\n## Usage");
    writeFileSync(path.join(dir, "guide.pt-BR.md"), "# Guia\n\n## Configuração");

    const problems = checkParity(basePath);

    expect(problems).toHaveLength(1);
    expect(problems[0].baseLevels).toEqual([1, 2, 2]);
    expect(problems[0].localeLevels).toEqual([1, 2]);
  });

  it("skips a locale that has no translation file yet", () => {
    const basePath = path.join(dir, "guide.md");
    writeFileSync(basePath, "# Guide\n\n## Setup");

    expect(checkParity(basePath)).toEqual([]);
  });
});
