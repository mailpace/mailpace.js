export class Message {
  public readonly from: string;
  public readonly to?: string;
  public readonly cc?: string;
  public readonly bcc?: string;
  public readonly subject: string;
  public readonly replyto?: string;
  public readonly htmlbody?: string;
  public readonly textbody?: string;
  constructor(
    from: string,
    subject: string,
    htmlbody?: string,
    textbody?: string,
    to?: string,
    cc?: string,
    bcc?: string,
    replyto?: string
  ) {
    this.from = from;
    this.to = to;
    this.cc = cc;
    this.bcc = bcc;
    this.subject = subject;
    this.replyto = replyto;
    this.htmlbody = htmlbody;
    this.textbody = textbody;
  }
}
