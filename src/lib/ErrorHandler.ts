import { AxiosError, AxiosResponse } from 'axios';

import * as Errors from './models/Errors';
import { ErrorResponse } from './models/Responses';

/**
 * Handles three different error types:
 *  - Unknown
 *  - Single error (from API)
 *  - Array of errors (from API)
 */
export class ErrorHandler {
  /**
   * Error Handler
   *
   * @param error - Axios error
   *
   * @return {OmsError} - Oms error
   */
  public buildRequestError(error: AxiosError): Errors.OmsError {
    const response: AxiosResponse | undefined = error.response;

    if (response !== undefined) {
      return this.buildErrorForResponse(response, error.message);
    } else if (error !== undefined) {
      return this.buildGeneralError(error.message);
    } else {
      return this.buildGeneralError(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
    }
  }

  /**
   * Cover standard errors
   *
   * @param errorMessage - error message that needs to be identified and transformed to proper OMS error.
   *
   * @returns properly formatted Oms error.
   */
  public buildGeneralError(errorMessage: string): Errors.OmsError {
    return new Errors.OmsError(errorMessage);
  }

  /**
   * Covers known errors
   *
   * @param {AxiosResponse} response - Error from Axios library
   * @return {OmsError} - cleaned up error
   */
  private buildErrorForResponse(
    response: AxiosResponse,
    errorMessage: string
  ): Errors.OmsError {
    const data: ErrorResponse = response.data;
    const status = this.retrieveDefaultOrValue<number>(0, response.status);
    const message = this.retrieveDefaultOrValue<string>(
      errorMessage,
      data.error || JSON.stringify(data.errors)
    );

    return this.buildRequestErrorByStatus(message, status);
  }

  private retrieveDefaultOrValue<T>(defaultValue: T, data: T): T {
    return data === undefined ? defaultValue : data;
  }

  /**
   * Clean up the error
   *
   * @param error - Axios error
   *
   * @returns correct error type based on the status code
   */
  private buildRequestErrorByStatus(
    errorMessage: string,
    errorStatusCode: number
  ): Errors.HttpError {
    switch (errorStatusCode) {
      case 400:
        return new Errors.OmsError(errorMessage, errorStatusCode);

      case 401:
        return new Errors.InvalidAPIKeyError(errorMessage, errorStatusCode);

      case 403:
        return new Errors.UnauthorizedDomain(errorMessage, errorStatusCode);

      case 404:
        return new Errors.OmsError(errorMessage, errorStatusCode);

      case 406:
        return new Errors.ApiInputError(errorMessage, errorStatusCode);

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
