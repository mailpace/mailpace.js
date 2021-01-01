# OhMySMTP Node.js Library

[![<ORG_NAME>](https://circleci.com/gh/ohmysmtp/ohmysmtp.js.svg?style=svg)](https://app.circleci.com/pipelines/github/ohmysmtp/ohmysmtp.js)
[![codecov](https://codecov.io/gh/ohmysmtp/ohmysmtp.js/branch/master/graph/badge.svg?token=QDLVU2JGyD)](https://codecov.io/gh/ohmysmtp/ohmysmtp.js)

This is the official Node.js library for the https://ohmysmtp.com transactional email API

## Quick Start

### Pre-requisites

First you will need to retrieve your API token for your sending domain from [OhMySMTP](https://app.ohmysmtp.com). You can find it under Organization -> Domain -> API Tokens

Your domain must have completed DKIM authorization and have an active plan to send emails.

### Installation

If using NPM

`npm install --save ohmysmtp.js`

If using Yarn

`yarn add ohmysmtp.js`

### Sending an email

```javascript
const OhMySMTP = require('ohmysmtp.js');
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

See https://docs.ohmysmtp.com/integrations/node for detailed documentation and all options

## Issues, Support & Contributions

If you have any difficulties please contact support@ohmysmtp.com or open an issue on github.

Contributions are always welcome

## License

MIT
