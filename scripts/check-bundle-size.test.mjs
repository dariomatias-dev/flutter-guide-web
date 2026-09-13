import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { gzipSync } from "node:zlib";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { extractChunkPaths, gzipSizeOf, measureRoute } from "./check-bundle-size.mjs";

describe("extractChunkPaths", () => {
  it("extracts every /_next/static/chunks script src", () => {
    const html = `
      <script src="/_next/static/chunks/a.js" async></script>
      <script src="/_next/static/css/b.css"></script>
      <script src="/_next/static/chunks/c.js"></script>
    `;

    expect(extractChunkPaths(html)).toEqual([
      "/_next/static/chunks/a.js",
      "/_next/static/chunks/c.js",
    ]);
  });

  it("returns an empty array when there are no chunk scripts", () => {
    expect(extractChunkPaths("<html></html>")).toEqual([]);
  });
});

describe("gzipSizeOf and measureRoute", () => {
  let nextDir;

  beforeEach(() => {
    nextDir = mkdtempSync(path.join(tmpdir(), "bundle-size-test-"));
  });

  afterEach(() => {
    rmSync(nextDir, { recursive: true, force: true });
  });

  it("measures a chunk's gzip size", () => {
    const chunksDir = path.join(nextDir, "static", "chunks");
    mkdirSync(chunksDir, { recursive: true });
    const content = "x".repeat(1000);
    writeFileSync(path.join(chunksDir, "a.js"), content);

    expect(gzipSizeOf(nextDir, "/_next/static/chunks/a.js")).toBe(gzipSync(content).length);
  });

  it("sums the gzip size of every chunk referenced in a route's HTML", () => {
    const chunksDir = path.join(nextDir, "static", "chunks");
    mkdirSync(chunksDir, { recursive: true });
    writeFileSync(path.join(chunksDir, "a.js"), "a".repeat(1000));
    writeFileSync(path.join(chunksDir, "b.js"), "b".repeat(2000));

    const appDir = path.join(nextDir, "server", "app");
    mkdirSync(appDir, { recursive: true });
    const htmlPath = path.join(appDir, "index.html");
    writeFileSync(
      htmlPath,
      '<script src="/_next/static/chunks/a.js"></script><script src="/_next/static/chunks/b.js"></script>',
    );

    const { total, sizes } = measureRoute(nextDir, htmlPath);

    expect(sizes).toHaveLength(2);
    expect(total).toBe(gzipSync("a".repeat(1000)).length + gzipSync("b".repeat(2000)).length);
  });
});
