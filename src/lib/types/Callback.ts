import { OmsError } from '../models/Errors';

/**
 * Node callback, with errors raised under 'OmsError'
 */
export type Callback<T> = (error: OmsError | null, result: T | null) => void;
