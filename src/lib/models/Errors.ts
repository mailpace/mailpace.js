/**
 * Standard Oms error on which all sub-errors are based.
 */
export class OmsError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 0) {
    super(message);
    this.statusCode = statusCode;

    // this is mandatory due:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, OmsError.prototype);
    this.setUpStackTrace();
  }

  protected setUpStackTrace() {
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpError extends OmsError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.setUpStackTrace();
  }
}

export class InvalidAPIKey extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, InvalidAPIKey.prototype);
    this.setUpStackTrace();
  }
}

export class UnauthorizedDomain extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, UnauthorizedDomain.prototype);
    this.setUpStackTrace();
  }
}

export class InvalidRequest extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, InvalidRequest.prototype);
    this.setUpStackTrace();
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.setUpStackTrace();
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
    this.setUpStackTrace();
  }
}

export class UnknownError extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    Object.setPrototypeOf(this, UnknownError.prototype);
    this.setUpStackTrace();
  }
}
