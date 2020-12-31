import axios, { AxiosError, AxiosInstance } from 'axios';

import { ErrorHandler } from './ErrorHandler';
import { Callback } from './models/Callback';
import { Options } from './models/Options';

const CLIENT_VERSION = '0.0.1'; // TODO: use library version in package.json
const API_VERSION = 'v1'; // TODO: MAKE THIS A CONFIG OPTION?

/**
 * Base client class from which client classes can be implemented
 * This class is NOT intended to be instantiated directly.
 */
export default abstract class BaseClient {
  /**
   * Client connection configuration options.
   * You may modify these values and new clients will use them.
   * Any values provided to a Client constructor will override default options.
   */
  public static DefaultOptions: Options.Configuration = {
    requestHost: `ohmysmtp.com/api/${API_VERSION}/`,
    timeout: 60,
  };

  public clientVersion: string;
  public readonly httpClient: AxiosInstance;
  protected errorHandler: ErrorHandler;
  private Options: Options.Configuration;
  private readonly authHeader: string;
  private readonly token: string;

  protected constructor(
    token: string,
    authHeader: string,
    configOptions?: Options.Configuration
  ) {
    this.clientVersion = CLIENT_VERSION;
    this.token = token.trim();
    this.authHeader = authHeader;
    this.Options = { ...BaseClient.DefaultOptions, ...configOptions };
    this.httpClient = this.buildDefaultHttpClient();
    this.errorHandler = new ErrorHandler();
    this.verifyToken(token);
  }

  public setOptions(configOptions: Options.Configuration): void {
    this.Options = configOptions;
    this.buildDefaultHttpClient();
  }

  public getOptions(): Options.Configuration {
    return this.Options;
  }

  /**
   * JSON object with default headers sent by HTTP request.
   */
  public getComposedHttpRequestHeaders(): object {
    return {
      [this.authHeader]: this.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `ohmysmtp.js - ${this.clientVersion}`,
    };
  }

  /**
   * Process http request with sending body - data.
   *
   * @see processRequest for more details.
   */
  protected processRequestWithBody<T>(
    method: Options.HttpMethod,
    path: string,
    body: null | object,
    callback?: Callback<T>
  ): Promise<T> {
    return this.processRequest(method, path, {}, body, callback);
  }

  /**
   * Process request for OMS Options.
   *
   * @param method - see processHttpRequest for details
   * @param path - see processHttpRequest for details
   * @param queryParameters - see processHttpRequest for details
   * @param body - see processHttpRequest for details
   * @param callback - callback function to be executed.
   *
   * @returns A promise that will complete when the API responds (or an error occurs).
   */
  private processRequest<T>(
    method: Options.HttpMethod,
    path: string,
    queryParameters: object,
    body: null | object,
    callback?: Callback<T>
  ): Promise<T> {
    const httpRequest: Promise<T> = this.processHttpRequest(
      method,
      path,
      queryParameters,
      body
    );
    this.processCallbackRequest(httpRequest, callback);
    return httpRequest;
  }

  /**
   * Process HTTP request.
   *
   * @param method - Which type of http request will be executed.
   * @param path - API URL endpoint.
   * @param queryParameters - Querystring parameters used for http request.
   * @param body - Data sent with http request.
   *
   * @returns A promise that will complete when the API responds (or an error occurs).
   */
  private processHttpRequest<T>(
    method: Options.HttpMethod,
    path: string,
    queryParameters: object,
    body: null | object
  ): Promise<T> {
    return this.httpRequest<T>(method, path, queryParameters, body)
      .then((response) => response)
      .catch((error: AxiosError) => {
        throw this.errorHandler.buildRequestError(error);
      });
  }

  /**
   * Process callback function for HTTP request.
   *
   * @param httpRequest - HTTP request for which callback will be executed
   * @param callback - callback function to be executed.
   */
  private processCallbackRequest<T>(
    httpRequest: Promise<T>,
    callback?: Callback<T>
  ): void {
    if (callback) {
      httpRequest
        .then((response) => callback(null, response))
        .catch((error) => callback(error, null));
    }
  }

  /**
   * Process http request.
   *
   * @param method - Which type of http request will be executed.
   * @param path - API URL endpoint.
   * @param queryParameters - Querystring parameters used for http request.
   * @param body - Data sent with http request.
   */
  private httpRequest<T>(
    method: Options.HttpMethod,
    path: string,
    queryParameters: {} | object,
    body: null | object
  ): Promise<T> {
    return this.httpClient.request<void, T>({
      method,
      url: path,
      data: body,
      headers: this.getComposedHttpRequestHeaders(),
      params: queryParameters,
    });
  }

  /**
   * Create http client instance with default settings.
   *
   * @return {AxiosInstance}
   */
  private buildDefaultHttpClient(): AxiosInstance {
    const httpClient = axios.create({
      baseURL: this.getBaseHttpRequestURL(),
      timeout: this.getRequestTimeoutInSeconds(),
      responseType: 'json',
      maxContentLength: Infinity,
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });

    httpClient.interceptors.response.use((response) => response.data);
    return httpClient;
  }

  private getRequestTimeoutInSeconds(): number {
    return (this.Options.timeout || 60) * 1000;
  }

  private getBaseHttpRequestURL(): string {
    return `https://${this.Options.requestHost}`;
  }

  /**
   * Token can't be empty.
   *
   * @param {string} token - HTTP request token
   */
  private verifyToken(token: string): void {
    if (!token || token.trim() === '') {
      throw this.errorHandler.buildGeneralError(
        'A valid API token must be provided.'
      );
    }
  }
}
