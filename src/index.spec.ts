// This is an integration test
import test from 'ava';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock the send endpoint
const mock = new MockAdapter(axios);
const successResponse = { id: 0, status: 'pending' };
mock.onPost('/send').reply(200, successResponse);

import * as ohmysmtp from './index';
const client = new ohmysmtp.DomainClient('token');

test('importing and calling sendEmail triggers /send endpoint', async (t) => {
  const response = await client.sendEmail({
    from: 'test@test.com',
    to: 'test@test.com',
    subject: 'test',
  });
  t.deepEqual(response, successResponse);
});

mock.restore();
