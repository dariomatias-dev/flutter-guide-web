import { execFileSync } from "node:child_process";

const FORMATTABLE = /\.(ts|tsx|js|jsx|mjs|json|md|yml|yaml|css)$/;

let input = "";
process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const { tool_input: toolInput } = JSON.parse(input);
    const filePath = toolInput?.file_path;
    if (!filePath || !FORMATTABLE.test(filePath)) return;

    execFileSync("npx", ["prettier", "--write", filePath], {
      cwd: new URL("../..", import.meta.url).pathname,
      stdio: "ignore",
    });
  } catch {
    // Any failure here (unformattable path, prettier error): skip silently.
  }
});
