# Changelog

All notable changes to this project will be documented in this file.

## 0.2.0 (2026-11-10)

### Breaking changes

- **Node.js 22.12 or newer is now required.** The previous release supported Node.js 10 and later. Node.js 22, 24, and 26 are tested in CI.
- **Axios 1.x is now the supported HTTP client.** Projects that pinned or patched the previous Axios 0.21 dependency should upgrade before adopting this release.
- **Package `exports` are now defined.** Deep imports into internal build paths (for example `@mailpace/mailpace.js/build/main/lib/Errors`) are no longer part of the public API. Import from the package root instead.
- **`Options.Configuration` is now an interface rather than a class.** It remains available as a type, but `new Options.Configuration()` is no longer possible. Use a plain object: `{ requestHost, timeout }`.
- **Build output targets ES2022.** Tooling that consumes the declarations must support ES2022.

### Added

- Exported the error classes (`OmsError`, `HttpError`, `InvalidAPIKey`, `UnauthorizedDomain`, `InvalidRequest`, `InternalServerError`, `ServiceUnavailableError`, `UnknownError`) so callers can use `instanceof` checks.
- Exported the public `Attachment`, `Message`, `Options`, `Callback`, `SendResponse`, and `ErrorResponse` types.
- Added the `CLIENT_VERSION` export.
- Added a GitHub Actions release workflow that verifies and publishes tagged releases to npm with provenance.

### Changed

- Updated the minimum supported Node.js version to 22.12.
- Upgraded the runtime dependency to Axios 1.x.
- Modernized the toolchain: TypeScript 5.9, ESLint 9 flat config, Prettier 3, and Vitest.
- Replaced the CircleCI configuration with GitHub Actions running Node.js 22, 24, and 26.
- Reworked the README with current installation, usage, configuration, and error handling examples.
- The client version is now defined in a single place and validated against `package.json` by the test suite.

### Removed

- Removed the unused `@types/node` and `ts-node` runtime dependencies.
- Removed the deprecated AVA, NYC, standard-version, gh-pages, and codecov tooling.

## 0.1.3 (2024-10-12)

### Changed

- Dropped support for Node.js 10.

## 0.1.1 (2022-01-24)

### Changed

- Updated release tooling and CI configuration.

## 0.0.13 (2022-01-24)

- Initial published release.
