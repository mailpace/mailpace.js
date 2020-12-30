export namespace Options {
  export class Configuration {
    public requestHost: string;
    public timeout: number;
    constructor(requestHost: string, timeout: number) {
      this.requestHost = requestHost;
      this.timeout = timeout;
    }
  }

  export enum HttpMethod {
    POST = 'POST',
  }

  export enum DefaultHeaderNames {
    SERVER_TOKEN = 'OhMySMTP-Server-Token',
  }
}
