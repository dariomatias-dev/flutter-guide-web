export const changelogFixture = `# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

## [1.3.0] - 2026-08-01
### Added
- Spanish localization, alongside existing Portuguese (BR) and English
- New catalog samples: \`DataTable\` /
  \`PaginatedDataTable\` and \`Stepper\`

### Changed
- Rewrote the app architecture on Riverpod

### Fixed
- Controller leaks across several catalog samples
- Search state resetting on unrelated rebuilds

## [1.2.3] - 2025-09-05
### Fixed
- Theme not applying correctly after opening the app from a deep link

## [1.0.1] - 2025-04-13
Initial public release.

### Added
- Favorites system

## [1.0.0] - 2024-03-21
Initial commit: project scaffolding.

[Unreleased]: https://github.com/x/y/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/x/y/compare/v1.2.3...v1.3.0
[1.2.3]: https://github.com/x/y/compare/v1.2.2...v1.2.3
`;
