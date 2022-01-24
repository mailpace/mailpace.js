# MailPace Node.js Library

[![<ORG_NAME>](https://circleci.com/gh/mailpace/mailpace.js.svg?style=svg)](https://app.circleci.com/pipelines/github/mailpace/mailpace.js)
[![codecov](https://codecov.io/gh/mailpace/mailpace.js/branch/master/graph/badge.svg?token=QDLVU2JGyD)](https://codecov.io/gh/mailpace/mailpace.js)
[![npm version](https://badge.fury.io/js/%40mailpace%2Fmailpace.js.svg)](https://badge.fury.io/js/%40mailpace%2Fmailpace.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This is the official Node.js library for the https://mailpace.com transactional email API

## Quick Start

### Pre-requisites

First you will need to retrieve your API token for your sending domain from [MailPace](https://app.mailpace.com). You can find it under Organization -> Domain -> API Tokens

Your domain must have completed DKIM authorization and have an active plan to send emails.

### Installation

If using NPM

`npm install --save @mailpace/mailpace.js`

If using Yarn

`yarn add @mailpace/mailpace.js`

### Sending an email

```javascript
const MailPace = require('@mailpace/mailpace.js');
const client = new MailPace.DomainClient('API_TOKEN_HERE');

client
  .sendEmail({
    from: 'test@test.com',
    to: 'test@test.com',
    subject: 'test',
    htmlbody: '<H1>HTML Email</h1>',
  })
  .then((r) => {
    console.log(r);
  });
```

## Documentation

See [the ./docs folder](https://github.com/mailpace/mailpace.js/tree/master/docs) for documentation and options

To regenerate the documentation, run `yarn docs:md`

## Issues, Support & Contributions

If you have any difficulties please contact support@mailpace.com or open an issue on github.

Contributions are always welcome

## License

MIT
