# OhMySMTP Node.js Library

[![<ORG_NAME>](https://circleci.com/gh/ohmysmtp/ohmysmtp.js.svg?style=svg)](https://app.circleci.com/pipelines/github/ohmysmtp/ohmysmtp.js)
[![codecov](https://codecov.io/gh/ohmysmtp/ohmysmtp.js/branch/master/graph/badge.svg?token=QDLVU2JGyD)](https://codecov.io/gh/ohmysmtp/ohmysmtp.js)
[![npm version](https://badge.fury.io/js/%40ohmysmtp%2Fohmysmtp.js.svg)](https://badge.fury.io/js/%40ohmysmtp%2Fohmysmtp.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This is the official Node.js library for the https://ohmysmtp.com transactional email API

## Quick Start

### Pre-requisites

First you will need to retrieve your API token for your sending domain from [OhMySMTP](https://app.ohmysmtp.com). You can find it under Organization -> Domain -> API Tokens

Your domain must have completed DKIM authorization and have an active plan to send emails.

### Installation

If using NPM

`npm install --save @ohmysmtp/ohmysmtp.js`

If using Yarn

`yarn add @ohmysmtp/ohmysmtp.js`

### Sending an email

```javascript
const OhMySMTP = require('@ohmysmtp/ohmysmtp.js');
const client = new OhMySMTP.DomainClient('API_TOKEN_HERE');

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

See [the ./docs folder](https://github.com/ohmysmtp/ohmysmtp.js/tree/master/docs) for documentation and options

To regenerate the documentation, run `yarn docs:md`

## Issues, Support & Contributions

If you have any difficulties please contact support@ohmysmtp.com or open an issue on github.

Contributions are always welcome

## License

MIT
