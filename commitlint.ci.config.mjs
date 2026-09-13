import baseConfig from "./commitlint.config.mjs";

// Used only by the commit-lint CI job, against the PR title.
const config = {
  ...baseConfig,
  defaultIgnores: false,
  ignores: [(message) => /^Revert /.test(message)],
};

export default config;
