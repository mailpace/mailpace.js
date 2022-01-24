export namespace Options {
  export class Configuration {
    public readonly requestHost: string;
    public readonly timeout: number;
  }

  export enum HttpMethod {
    POST = 'POST',
  }

  export enum DefaultHeaderNames {
    SERVER_TOKEN = 'MailPace-Server-Token',
  }
}
