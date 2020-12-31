export class Message {
  public from: string;
  public to?: string;
  public cc?: string;
  public bcc?: string;
  public subject: string;
  public replyto?: string;
  public htmlbody?: string;
  public textbody?: string;
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
