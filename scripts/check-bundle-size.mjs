import { readFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

/** Gzip budgets per route, in bytes; see docs/performance.md. */
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
