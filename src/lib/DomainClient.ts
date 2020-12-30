import BaseClient from './BaseClient';

import { Callback } from './models/Callback';
import { Options } from './models/Options';
import { Message, MessageSendingResponse } from './models/Message';

/**
 * Client class that can be used to interact with an OhMySMTP Domain
 */
export default class DomainClient extends BaseClient {
  /**
   * Create a client.
   *
   * @param serverToken - The token for the server that you wish to interact with.
   * @param configOptions - Options to customize the behavior of the this client.
   */
  constructor(serverToken: string, configOptions?: Options.Configuration) {
    super(serverToken, Options.DefaultHeaderNames.SERVER_TOKEN, configOptions);
  }

  /** Send a single email message.
   *
   * @param send - Email message to send.
   * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
   * @returns A promise that will complete when the API responds (or an error occurs).
   */
  public sendEmail(
    email: Message,
    callback?: Callback<MessageSendingResponse>
  ): Promise<MessageSendingResponse> {
    return this.processRequestWithBody<MessageSendingResponse>(
      Options.HttpMethod.POST,
      '/send',
      email,
      callback
    );
  }
}
