# MailPace Node.js Library

[![npm version](https://badge.fury.io/js/%40mailpace%2Fmailpace.js.svg)](https://www.npmjs.com/package/@mailpace/mailpace.js)
[![CI](https://github.com/mailpace/mailpace.js/actions/workflows/ci.yml/badge.svg)](https://github.com/mailpace/mailpace.js/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

The official Node.js library for the [MailPace](https://mailpace.com) transactional email API.

## Requirements

- Node.js 22.12 or newer (Node.js 24 and 26 are also supported)
- An active MailPace domain with a sending API token
- TypeScript definitions are included

## Installation

```sh
npm install @mailpace/mailpace.js
```

Or with Yarn, pnpm, or Bun:

```sh
yarn add @mailpace/mailpace.js
pnpm add @mailpace/mailpace.js
bun add @mailpace/mailpace.js
```

## Quick start

Get your API token from [MailPace](https://app.mailpace.com) under **Organization → Domain → API Tokens**. Your domain must have completed DKIM authorization and have an active plan to send email.

### ES modules

```javascript
import { DomainClient } from '@mailpace/mailpace.js';

const client = new DomainClient('API_TOKEN_HERE');

const response = await client.sendEmail({
  from: 'test@example.com',
  to: 'test@example.com',
  subject: 'Hello from MailPace',
  htmlbody: '<h1>HTML email</h1>',
  textbody: 'HTML email',
});

console.log(response); // { id: 123, status: 'pending' }
```

### CommonJS

```javascript
const { DomainClient } = require('@mailpace/mailpace.js');

const client = new DomainClient('API_TOKEN_HERE');

client
  .sendEmail({
    from: 'test@example.com',
    to: 'test@example.com',
    subject: 'Hello from MailPace',
    htmlbody: '<h1>HTML email</h1>',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

## Configuration

The second argument to `DomainClient` accepts the following options:

| Option        | Default                      | Description                                      |
| :------------ | :--------------------------- | :----------------------------------------------- |
| `requestHost` | `app.mailpace.com/api/v1/`   | Host and API version used for requests           |
| `timeout`     | `60`                         | Request timeout in seconds                       |

```javascript
const client = new DomainClient('API_TOKEN_HERE', {
  timeout: 30,
});
```

## Sending email

`sendEmail` accepts a message and returns a promise. `from` and `to` are required. You should also provide a `subject` and at least one of `htmlbody` or `textbody`.

| Field              | Type                        | Description                                      |
| :----------------- | :-------------------------- | :----------------------------------------------- |
| `from`             | `string`                    | Sender address on an authorized domain           |
| `to`               | `string`                    | Recipient address                                |
| `subject`          | `string`                    | Email subject                                    |
| `htmlbody`         | `string`                    | HTML body                                        |
| `textbody`         | `string`                    | Plain-text body                                  |
| `cc`               | `string`                    | CC recipients                                    |
| `bcc`              | `string`                    | BCC recipients                                   |
| `replyto`          | `string`                    | Reply-To address                                 |
| `inreplyto`        | `string`                    | In-Reply-To message ID                           |
| `references`       | `string`                    | References header                                |
| `list_unsubscribe` | `string`                    | List-Unsubscribe header                          |
| `attachments`      | `Attachment[]`              | Attachments                                      |
| `tags`             | `string \| string[]`        | Tags used for filtering in MailPace              |

### Attachments

```javascript
await client.sendEmail({
  from: 'test@example.com',
  to: 'test@example.com',
  subject: 'Invoice',
  textbody: 'Your invoice is attached.',
  attachments: [
    {
      name: 'invoice.pdf',
      content: 'BASE64_ENCODED_CONTENT',
      content_type: 'application/pdf',
    },
  ],
});
```

### Callbacks

Every method returns a promise, and you can also pass a Node-style callback as the last argument:

```javascript
client.sendEmail(message, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(response);
});
```

## Error handling

Requests reject with an `OmsError` (or a subclass). All errors expose a `statusCode` property.

```javascript
import {
  DomainClient,
  InvalidAPIKey,
  OmsError,
  UnauthorizedDomain,
} from '@mailpace/mailpace.js';

try {
  await client.sendEmail(message);
} catch (error) {
  if (error instanceof InvalidAPIKey) {
    // The API token is missing or invalid.
  } else if (error instanceof UnauthorizedDomain) {
    // The domain is not authorized to send email.
  } else if (error instanceof OmsError) {
    console.error(error.message, error.statusCode);
  }
}
```

The following error classes are exported:

- `OmsError` — base class for all errors
- `HttpError` — base class for HTTP errors
- `InvalidAPIKey` — `401`
- `UnauthorizedDomain` — `403`
- `InvalidRequest` — `406`
- `InternalServerError` — `500`
- `ServiceUnavailableError` — `503`
- `UnknownError` — any other status code

## Documentation

API documentation is available in the [docs folder](./docs), or you can regenerate it with:

```sh
npm run docs
```

## Upgrading from 0.1.x

Version 0.2.0 contains breaking changes:

- Node.js 22.12 or newer is required.
- Axios 1.x is used; upgrade if you pin or patch the transitive Axios version.
- Internal deep imports are blocked by the new package `exports`. Import everything from `@mailpace/mailpace.js`.
- `Options.Configuration` is now a type-only interface. Pass a plain `{ requestHost, timeout }` object instead of constructing it.
- Build output and type declarations target ES2022.

See [CHANGELOG.md](./CHANGELOG.md) for the full list.

## Development

```sh
npm ci
npm test
npm run verify
```

`npm run verify` runs type checking, linting, formatting checks, spelling checks, the test suite with 100% coverage thresholds, and both builds.

To publish a release, update `version` in `package.json` and `CLIENT_VERSION` in `src/lib/version.ts`, update `CHANGELOG.md`, then push a matching `v*` tag. The release workflow runs the full verification and publishes to npm.

## Issues, support and contributions

If you have any difficulties, contact support@mailpace.com or open an issue on GitHub. Contributions are always welcome.

## License

MIT
