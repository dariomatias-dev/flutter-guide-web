import { readFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

// Measured 2026-09-13 (`pnpm build`): 361,410 and 334,657 bytes gzip.
// See docs/performance.md. Measures the default locale's (en) output,
// since that's what a visitor gets at the unprefixed route.
export const budgets = {
  "/": { html: "en.html", budgetBytes: 420_000 },
  "/privacy-policy": { html: "en/privacy-policy.html", budgetBytes: 390_000 },
};

export function extractChunkPaths(html) {
  return [...html.matchAll(/<script src="(\/_next\/static\/chunks\/[^"]+)"/g)].map((m) => m[1]);
}

export function gzipSizeOf(nextDir, chunkPath) {
  const filePath = path.join(nextDir, chunkPath.replace(/^\/_next\//, ""));
  return gzipSync(readFileSync(filePath)).length;
}

export function measureRoute(nextDir, htmlPath) {
  const html = readFileSync(htmlPath, "utf-8");
  const chunks = extractChunkPaths(html);
  const sizes = chunks.map((chunk) => ({ chunk, bytes: gzipSizeOf(nextDir, chunk) }));
  const total = sizes.reduce((sum, s) => sum + s.bytes, 0);
  return { total, sizes };
}

function main() {
  const nextDir = path.resolve(import.meta.dirname, "..", ".next");
  const appDir = path.join(nextDir, "server", "app");
  let failed = false;

  for (const [route, { html, budgetBytes }] of Object.entries(budgets)) {
    const { total, sizes } = measureRoute(nextDir, path.join(appDir, html));
    const overBudget = total > budgetBytes;
    console.log(`${route}: ${total} bytes gzip (budget ${budgetBytes})`);

    if (overBudget) {
      failed = true;
      console.log(`  over budget by ${total - budgetBytes} bytes:`);
      for (const s of sizes.sort((a, b) => b.bytes - a.bytes)) {
        console.log(`    ${s.chunk}: ${s.bytes} bytes`);
      }
    }
  }

  if (failed) {
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
