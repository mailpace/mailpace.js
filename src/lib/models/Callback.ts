import * as Errors from './Errors';

/**
 * A standard node callback. All errors returned to this callback will be a in namespace 'OmsError'
 */
export type Callback<T> = (
  error: Errors.OmsError | null,
  result: T | null
) => void;
