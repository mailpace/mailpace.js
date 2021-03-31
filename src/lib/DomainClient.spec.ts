import test from 'ava';

import DomainClient from './DomainClient';

const token = 'token';
const client = new DomainClient(token);
const defaultClientOptions = {
  requestHost: 'app.ohmysmtp.com/api/v1/',
  timeout: 60,
};
const otherClientOptions = { requestHost: 'another.com', timeout: 600 };

const defaultRequestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'OhMySMTP-Server-Token': token,
  'User-Agent': 'ohmysmtp.js - 0.0.9',
};

test('can initialize the domain client with default values', (t) => {
  t.truthy('sendEmail' in client);
  t.deepEqual(client.getOptions(), defaultClientOptions);
});

test('token is set', (t) => {
  t.deepEqual(client.prepareHeaders(), defaultRequestHeaders);
});

test('supports passing in different options', (t) => {
  const updatedClient = new DomainClient(token, otherClientOptions);
  t.deepEqual(updatedClient.getOptions(), otherClientOptions);
});
