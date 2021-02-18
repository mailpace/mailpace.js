import axios, { AxiosError, AxiosInstance } from 'axios';

import { ErrorHandler } from './ErrorHandler';
import { Options } from './models/Options';
import { Callback } from './types/Callback';

const CLIENT_VERSION = '0.0.6'; // TODO: use library version in package.json
const API_VERSION = 'v1'; // TODO: make this a client option

/**
 * Base client
 */
export default abstract class BaseClient {
  /**
   * Default options
   */
  public static readonly DefaultOptions: Options.Configuration = {
    requestHost: `app.ohmysmtp.com/api/${API_VERSION}/`,
    timeout: 60,
  };

  public readonly clientVersion: string;
  public readonly httpClient: AxiosInstance;
  protected readonly errorHandler: ErrorHandler;
  private readonly Options: Options.Configuration;
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
    this.httpClient = this.buildHttpClient();
    this.errorHandler = new ErrorHandler();
  }

  public getOptions(): Options.Configuration {
    return this.Options;
  }

  /**
   * Prepare the default HTTP Request Headers
   */
  public prepareHeaders(): object {
    return {
      [this.authHeader]: this.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `ohmysmtp.js - ${this.clientVersion}`,
    };
  }

  /**
   * Prepare the request and send on
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
   * Send HTTP request via Axios
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
   * Process HTTP request
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
   * Send request
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
      headers: this.prepareHeaders(),
      params: queryParameters,
    });
  }

  /**
   * Create http client for making requests
   *
   * @return {AxiosInstance}
   */
  private buildHttpClient(): AxiosInstance {
    const httpClient = axios.create({
      baseURL: `https://${this.Options.requestHost}`,
      timeout: this.Options.timeout * 1000,
      responseType: 'json',
      maxContentLength: Infinity,
      maxBodyLength: 50000,
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });

    httpClient.interceptors.response.use((response) => response.data);
    return httpClient;
  }
}
