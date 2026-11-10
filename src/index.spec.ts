import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { Message } from './index';
import {
  DomainClient,
  InternalServerError,
  InvalidAPIKey,
  InvalidRequest,
  OmsError,
  ServiceUnavailableError,
  UnauthorizedDomain,
  UnknownError,
} from './index';

const successResponse = { id: 0, status: 'pending' };

const exampleEmail: Message = {
  from: 'test@test.com',
  to: 'test@test.com',
  subject: 'test',
  htmlbody: '<h1>Hi</h1>',
};

describe('DomainClient', () => {
  let client: DomainClient;
  let mock: MockAdapter;

  beforeEach(() => {
    client = new DomainClient('token');
    mock = new MockAdapter(client.httpClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it('responds to a successful send', async () => {
    mock.onPost('/send').reply(200, successResponse);

    await expect(client.sendEmail(exampleEmail)).resolves.toEqual(
      successResponse,
    );
  });

  it('sends the email as the request body', async () => {
    mock.onPost('/send').reply(200, successResponse);

    await client.sendEmail(exampleEmail);

    expect(JSON.parse(mock.history.post[0]?.data ?? '{}')).toEqual(
      exampleEmail,
    );
  });

  it('throws when the server is down', async () => {
    mock.onPost('/send').reply(500, {});

    await expect(client.sendEmail(exampleEmail)).rejects.toMatchObject({
      message: 'Request failed with status code 500',
      statusCode: 500,
    });
  });

  it('calls the callback on success', async () => {
    mock.onPost('/send').reply(200, successResponse);

    const result = await new Promise<unknown>((resolve, reject) => {
      client
        .sendEmail(exampleEmail, (error, response) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(response);
        })
        .catch(reject);
    });

    expect(result).toEqual(successResponse);
  });

  it('calls the callback when there is an error', async () => {
    mock.onPost('/send').timeout();

    const callbackError = new Promise<OmsError>((resolve) => {
      client.sendEmail(exampleEmail, (error) => {
        if (error) {
          resolve(error);
        }
      });
    });

    await expect(client.sendEmail(exampleEmail)).rejects.toMatchObject({
      message: expect.stringContaining('timeout of 60000ms exceeded'),
    });
    await expect(callbackError).resolves.toBeInstanceOf(OmsError);
  });

  it('handles network errors', async () => {
    mock.onPost('/send').networkError();

    const error = await client.sendEmail(exampleEmail).catch((err) => err);

    expect(error).toBeInstanceOf(OmsError);
    expect(error).toMatchObject({ message: 'Network Error', statusCode: 0 });
  });

  it.each([
    [400, OmsError],
    [401, InvalidAPIKey],
    [403, UnauthorizedDomain],
    [406, InvalidRequest],
    [500, InternalServerError],
    [503, ServiceUnavailableError],
    [418, UnknownError],
  ])('maps a %i response to the matching error type', async (status, type) => {
    mock.onPost('/send').reply(status);

    const error = await client.sendEmail(exampleEmail).catch((err) => err);

    expect(error).toBeInstanceOf(type);
    expect(error).toMatchObject({
      message: `Request failed with status code ${status}`,
      statusCode: status,
    });
  });

  it('uses the API error message when one is provided', async () => {
    mock.onPost('/send').reply(401, { error: 'Invalid API token' });

    const error = await client.sendEmail(exampleEmail).catch((err) => err);

    expect(error).toBeInstanceOf(InvalidAPIKey);
    expect(error).toMatchObject({ message: 'Invalid API token' });
  });

  it('serializes validation errors returned by the API', async () => {
    const errors = { from: ['is invalid'] };
    mock.onPost('/send').reply(400, { errors });

    const error = await client.sendEmail(exampleEmail).catch((err) => err);

    expect(error).toMatchObject({ message: JSON.stringify(errors) });
  });

  it('can handle attachments', async () => {
    const exampleAttachment = {
      name: 'hello.pdf',
      cid: 'hello',
      content: 'test',
      content_type: 'test/test',
    };
    const emailWithAttachments = {
      ...exampleEmail,
      attachments: [exampleAttachment, exampleAttachment],
    };
    mock.onPost('/send').reply(200, successResponse);

    await expect(client.sendEmail(emailWithAttachments)).resolves.toEqual(
      successResponse,
    );
    expect(JSON.parse(mock.history.post[0]?.data ?? '{}')).toMatchObject({
      attachments: [exampleAttachment, exampleAttachment],
    });
  });

  it('can handle single tags', async () => {
    const emailWithTags = { ...exampleEmail, tags: 'a single tag' };
    mock.onPost('/send').reply(200, successResponse);

    await client.sendEmail(emailWithTags);

    expect(JSON.parse(mock.history.post[0]?.data ?? '{}').tags).toBe(
      'a single tag',
    );
  });

  it('can handle an array of tags', async () => {
    const emailWithTags = { ...exampleEmail, tags: ['array', 'of', 'tags'] };
    mock.onPost('/send').reply(200, successResponse);

    await client.sendEmail(emailWithTags);

    expect(JSON.parse(mock.history.post[0]?.data ?? '{}').tags).toEqual([
      'array',
      'of',
      'tags',
    ]);
  });

  it('can handle list-unsubscribe headers', async () => {
    const emailWithListUnsubscribe = {
      ...exampleEmail,
      list_unsubscribe:
        '<http://www.host.com/list.cgi?cmd=unsub&lst=list>, <mailto:list-request@host.com?subject=unsubscribe>',
    };
    mock.onPost('/send').reply(200, successResponse);

    await expect(client.sendEmail(emailWithListUnsubscribe)).resolves.toEqual(
      successResponse,
    );
  });

  it('can handle in-reply-to', async () => {
    const emailWithInReplyTo = {
      ...exampleEmail,
      inreplyto: '<message-id@test.com>',
    };
    mock.onPost('/send').reply(200, successResponse);

    await expect(client.sendEmail(emailWithInReplyTo)).resolves.toEqual(
      successResponse,
    );
  });

  it('can handle references', async () => {
    const emailWithReferences = {
      ...exampleEmail,
      references: '<message-id@test.com>, <abc@test.com>',
    };
    mock.onPost('/send').reply(200, successResponse);

    await expect(client.sendEmail(emailWithReferences)).resolves.toEqual(
      successResponse,
    );
  });
});
