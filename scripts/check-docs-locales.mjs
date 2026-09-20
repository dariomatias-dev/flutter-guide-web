import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const LOCALES = ["pt-BR", "es"];
const ROOT = path.resolve(import.meta.dirname, "..");

export function extractHeadingLevels(markdown) {
  return [...markdown.matchAll(/^(#{1,6})\s+.+$/gm)].map((m) => m[1].length);
}

/** The base (English) markdown files in a directory. */
export function findBaseMarkdownFiles(dir) {
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => !LOCALES.some((locale) => file.endsWith(`.${locale}.md`)))
    .map((file) => path.join(dir, file));
}

export function localePathFor(baseFilePath, locale) {
  return baseFilePath.replace(/\.md$/, `.${locale}.md`);
}

/** Checks a file's translations for the same heading-level sequence. */
export function checkParity(baseFilePath) {
  const baseLevels = extractHeadingLevels(readFileSync(baseFilePath, "utf-8"));
  const problems = [];

  for (const locale of LOCALES) {
    const localePath = localePathFor(baseFilePath, locale);
    if (!existsSync(localePath)) {
      continue;
    }

    const localeLevels = extractHeadingLevels(readFileSync(localePath, "utf-8"));
    if (JSON.stringify(localeLevels) !== JSON.stringify(baseLevels)) {
      problems.push({
        localePath,
        baseLevels,
        localeLevels,
      });
    }
  }

  return problems;
}

function main() {
  const baseFiles = [
    ...findBaseMarkdownFiles(ROOT),
    ...findBaseMarkdownFiles(path.join(ROOT, "docs")),
  ];

  let failed = false;

  for (const baseFilePath of baseFiles) {
    for (const problem of checkParity(baseFilePath)) {
      failed = true;
      console.log(`${path.relative(ROOT, problem.localePath)}: heading structure doesn't match`);
      console.log(`  ${path.relative(ROOT, baseFilePath)}: [${problem.baseLevels.join(", ")}]`);
      console.log(
        `  ${path.relative(ROOT, problem.localePath)}: [${problem.localeLevels.join(", ")}]`,
      );
    }
  }

  if (failed) {
    process.exitCode = 1;
  } else {
    console.log("Translated docs match their base file's heading structure.");
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
