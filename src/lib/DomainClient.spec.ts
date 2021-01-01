import test from 'ava';

import DomainClient from './DomainClient';

const token = 'token';
const client = new DomainClient(token);
const defaultClientOptions = {
  useHttps: true,
  requestHost: 'app.ohmysmtp.com/api/v1/',
  timeout: 60,
};
const defaultRequestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'OhMySMTP-Server-Token': token,
  'User-Agent': 'ohmysmtp.js - 0.0.1',
};

test('can initialize the domain client with default values', (t) => {
  t.truthy('sendEmail' in client);
  t.deepEqual(client.getOptions(), defaultClientOptions);
});

test('token is set', (t) => {
  t.deepEqual(client.getComposedHttpRequestHeaders(), defaultRequestHeaders);
});
