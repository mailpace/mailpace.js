import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';

import { ErrorHandler } from './ErrorHandler';
import { OmsError } from './models/Errors';

const handler = new ErrorHandler();

function axiosErrorWithResponse(response: Partial<AxiosResponse>): AxiosError {
  return new AxiosError(
    'Request failed with status code 400',
    'ERR_BAD_REQUEST',
    undefined,
    undefined,
    response as AxiosResponse,
  );
}

describe('ErrorHandler', () => {
  it('builds a generic error when there is no response', () => {
    const error = handler.buildRequestError(new AxiosError('Network Error'));

    expect(error).toBeInstanceOf(OmsError);
    expect(error).toMatchObject({ message: 'Network Error', statusCode: 0 });
  });

  it('falls back to the Axios message when the response has no error body', () => {
    const error = handler.buildRequestError(
      axiosErrorWithResponse({ data: {}, status: 400 }),
    );

    expect(error).toBeInstanceOf(OmsError);
    expect(error).toMatchObject({ statusCode: 400 });
    expect(error.message).toBe('Request failed with status code 400');
  });

  it('prefers the API error message', () => {
    const error = handler.buildRequestError(
      axiosErrorWithResponse({ data: { error: 'Bad request' }, status: 400 }),
    );

    expect(error.message).toBe('Bad request');
  });

  it('serializes API validation errors', () => {
    const errors = { from: ['is invalid'] };
    const error = handler.buildRequestError(
      axiosErrorWithResponse({ data: { errors }, status: 400 }),
    );

    expect(error.message).toBe(JSON.stringify(errors));
  });
});
