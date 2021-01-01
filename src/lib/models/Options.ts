export namespace Options {
  export class Configuration {
    public readonly useHttps: boolean;
    public readonly requestHost: string;
    public readonly timeout: number;
    constructor(useHttps: boolean, requestHost: string, timeout: number) {
      this.useHttps = useHttps;
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
