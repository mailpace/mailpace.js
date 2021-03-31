// These are basically integration tests
import test from 'ava';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock the send endpoint
const mock = new MockAdapter(axios);
const successResponse = { id: 0, status: 'pending' };

const exampleEmail = {
  from: 'test@test.com',
  to: 'test@test.com',
  subject: 'test',
  htmlbody: '<h1>Hi</h1>',
};

import * as ohmysmtp from './index';
const client = new ohmysmtp.DomainClient('token');

test.afterEach.always(() => {
  mock.reset();
});

test.serial('calling sendEmail responds to 200', async (t) => {
  mock.onPost('/send').reply(200, successResponse);
  const response = await client.sendEmail(exampleEmail);
  t.deepEqual(response, successResponse);
});

test.serial(
  'calling sendEmail when the server is down throws an error',
  async (t) => {
    mock.onPost('/send').reply(500, {});
    const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
    t.is(error.message, 'Request failed with status code 500');
  }
);

test.serial('the callback is called on success', async (t) => {
  mock.onPost('/send').reply(200, successResponse);
  await client.sendEmail(exampleEmail, function () {
    t.pass();
  });
});

test.serial('the callback is called when there is an error', async (t) => {
  mock.onPost('/send').timeout();
  const error = await t.throwsAsync(() =>
    client.sendEmail(exampleEmail, () => {
      t.pass();
    })
  );
  t.is(error.message, 'timeout of 60000ms exceeded');
});

test.serial('handles 400 errors', async (t) => {
  mock.onPost('/send').reply(400, {});
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 400');
});

test.serial('handles 401 errors', async (t) => {
  mock.onPost('/send').reply(401, {});
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 401');
});

test.serial('handles 403 errors', async (t) => {
  mock.onPost('/send').reply(403, {});
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 403');
});

test.serial('handles 404 errors', async (t) => {
  mock.onPost('/send').reply(404, {});
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 404');
});

test.serial('handles 406 errors', async (t) => {
  mock.onPost('/send').reply(406, {});
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 406');
});

test.serial('handles 503 errors', async (t) => {
  mock.onPost('/send').reply(503, {});
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 503');
});

test.serial('handles other errors', async (t) => {
  mock.onPost('/send').reply(418); // I'm a teapot
  const error = await t.throwsAsync(() => client.sendEmail(exampleEmail));
  t.is(error.message, 'Request failed with status code 418');
});

test.serial('can handle attachments', async (t) => {
  const exampleAttachment = {
    name: 'hello.pdf',
    cid: 'hello',
    content: 'test',
    content_type: 'test/test',
  };
  const emailWithAttachments = Object.assign(
    { attachments: [exampleAttachment, exampleAttachment] },
    exampleEmail
  );
  mock.onPost('/send').reply(200, successResponse);
  const response = await client.sendEmail(emailWithAttachments);
  t.deepEqual(response, successResponse);
});

test.serial('can handle single tags', async (t) => {
  const emailWithTags = Object.assign({ tags: 'a single tag' }, exampleEmail);
  mock.onPost('/send').reply(200, successResponse);
  const response = await client.sendEmail(emailWithTags);
  const request = JSON.parse(mock.history.post[0].data);
  t.deepEqual(response, successResponse);
  t.deepEqual(request.tags, 'a single tag');
});

test.serial('can handle array of tags', async (t) => {
  const emailWithTags = Object.assign(
    { tags: ['array', 'of', 'tags'] },
    exampleEmail
  );
  mock.onPost('/send').reply(200, successResponse);
  const response = await client.sendEmail(emailWithTags);
  const request = JSON.parse(mock.history.post[0].data);
  t.deepEqual(response, successResponse);
  t.deepEqual(request.tags, ['array', 'of', 'tags']);
});
