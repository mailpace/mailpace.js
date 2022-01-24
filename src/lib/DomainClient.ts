import BaseClient from './BaseClient';
import { Message } from './models/Message';
import { Options } from './models/Options';
import { Callback } from './types/Callback';
import { SendResponse } from './types/Responses';

/**
 * Client class that can be used to interact with an MailPace Domain
 */
export default class DomainClient extends BaseClient {
  /**
   * Create a client for sending emails from a domain
   *
   * @param domainToken - The API token for the domain
   * @param configOptions - Configuration options for accessing the API
   */
  constructor(domainToken: string, configOptions?: Options.Configuration) {
    super(domainToken, Options.DefaultHeaderNames.SERVER_TOKEN, configOptions);
  }

  /** Send a single email message through the API
   *
   * @param send - Email to send
   * @param callback - A callback that if provided will be called after sending the email is complete
   * @returns A promise that will resolve when the API responds (or an error occurs)
   */
  public sendEmail(
    email: Message,
    callback?: Callback<SendResponse>
  ): Promise<SendResponse> {
    return this.processRequestWithBody<SendResponse>(
      Options.HttpMethod.POST,
      '/send',
      email,
      callback
    );
  }
}
