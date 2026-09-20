import baseConfig from "./commitlint.config.mjs";

/** The commit-lint CI job's config, applied to the pull request title. */
const config = {
  ...baseConfig,
  defaultIgnores: false,
  ignores: [(message) => /^Revert /.test(message)],
};

export default config;
