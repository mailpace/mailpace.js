import { AxiosError, AxiosResponse } from 'axios';

import * as Errors from './models/Errors';
import { ErrorResponse } from './types/Responses';

/**
 * Handles three different error types:
 *  - Unknown
 *  - Single error (from API)
 *  - Array of errors (from API)
 */
export class ErrorHandler {
  /**
   * Handle generic and Axios errors
   *
   * @param error - Axios error
   *
   * @return {OmsError} - Oms error
   */
  public buildRequestError(error: AxiosError): Errors.OmsError {
    const response: AxiosResponse | undefined = error.response;

    if (response !== undefined) {
      return this.buildAxiosError(response, error.message);
    } else {
      return new Errors.OmsError(error.message);
    }
  }

  /**
   * Prepare the axios based error
   *
   * @param {AxiosResponse} response - Error from Axios library
   * @return {OmsError} - cleaned up error
   */
  private buildAxiosError(
    response: AxiosResponse,
    errorMessage: string
  ): Errors.OmsError {
    const data: ErrorResponse = response.data || {};
    const status = this.retrieveDefaultOrValue<number>(0, response.status);
    const message = this.retrieveDefaultOrValue<string>(
      errorMessage,
      data.error || JSON.stringify(data.errors)
    );

    return this.mapErrorToStatus(message, status);
  }

  private retrieveDefaultOrValue<T>(defaultValue: T, data: T): T {
    return data === undefined ? defaultValue : data;
  }

  /**
   * Map the error based on status code to the correct error type
   *
   * @param error - Axios error
   *
   * @returns correct error type based on the status code
   */
  private mapErrorToStatus(
    errorMessage: string,
    errorStatusCode: number
  ): Errors.HttpError {
    switch (errorStatusCode) {
      case 400:
        return new Errors.OmsError(errorMessage, errorStatusCode);

      case 401:
        return new Errors.InvalidAPIKey(errorMessage, errorStatusCode);

      case 403:
        return new Errors.UnauthorizedDomain(errorMessage, errorStatusCode);

      case 406:
        return new Errors.InvalidRequest(errorMessage, errorStatusCode);

      case 500:
        return new Errors.InternalServerError(errorMessage, errorStatusCode);

      case 503:
        return new Errors.ServiceUnavailableError(
          errorMessage,
          errorStatusCode
        );

      default:
        return new Errors.UnknownError(errorMessage, errorStatusCode);
    }
  }
}
