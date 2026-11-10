# Contributing Guidelines

Pull requests are very welcome.

## Getting started

```sh
npm ci
```

## Checks

Before opening a pull request, run the full verification suite:

```sh
npm run verify
```

This runs type checking, linting, formatting checks, spelling checks, the test
suite with 100% coverage thresholds, and both builds.

You can also run individual commands:

```sh
npm test             # unit tests
npm run test:watch   # unit tests in watch mode
npm run typecheck
npm run lint
npm run format
npm run docs
```

## Releasing

1. Update `version` in `package.json` and `CLIENT_VERSION` in
   `src/lib/version.ts`.
2. Add an entry to `CHANGELOG.md`.
3. Push a `v*` tag. The release workflow verifies the package and publishes it
   to npm with provenance.
