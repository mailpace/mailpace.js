export namespace Options {
  export interface Configuration {
    readonly requestHost: string;
    readonly timeout: number;
  }

  export enum HttpMethod {
    POST = 'POST',
  }

  export enum DefaultHeaderNames {
    SERVER_TOKEN = 'MailPace-Server-Token',
  }
}
