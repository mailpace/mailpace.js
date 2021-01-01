import test from 'ava';
import { AxiosError } from 'axios';

import { ErrorHandler } from './ErrorHandler';
import { OmsError } from './models/Errors';

export class AxiosErrorObject implements AxiosError {
  public readonly name: string;
  public readonly message: string;
  public readonly isAxiosError: boolean;
  public readonly config: object;
  public readonly toJSON: () => object;
}
const axiosError: AxiosError = new AxiosErrorObject();

const handler = new ErrorHandler();

const noMessage = new OmsError('');

test('can build a request error', (t) => {
  const error = handler.buildRequestError(axiosError);
  t.deepEqual(error, noMessage);
});
