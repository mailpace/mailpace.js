import { describe, expect, it } from 'vitest';

import DomainClient from './DomainClient';
import { CLIENT_VERSION } from './version';

const token = 'token';
const client = new DomainClient(token);
const defaultClientOptions = {
  requestHost: 'app.mailpace.com/api/v1/',
  timeout: 60,
};
const otherClientOptions = { requestHost: 'another.com', timeout: 600 };

const defaultRequestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'MailPace-Server-Token': token,
  'User-Agent': `mailpace.js - ${CLIENT_VERSION}`,
};

describe('DomainClient configuration', () => {
  it('can initialize the domain client with default values', () => {
    expect('sendEmail' in client).toBe(true);
    expect(client.getOptions()).toEqual(defaultClientOptions);
    expect(client.clientVersion).toBe(CLIENT_VERSION);
  });

  it('sets the authentication token', () => {
    expect(client.prepareHeaders()).toEqual(defaultRequestHeaders);
  });

  it('trims whitespace around the token', () => {
    const paddedClient = new DomainClient('  token  ');

    expect(paddedClient.prepareHeaders()).toMatchObject({
      'MailPace-Server-Token': token,
    });
  });

  it('supports passing in different options', () => {
    const updatedClient = new DomainClient(token, otherClientOptions);

    expect(updatedClient.getOptions()).toEqual(otherClientOptions);
  });
});
