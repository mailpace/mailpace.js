import { Attachment } from './Attachment';
export type Message = {
  from: string;
  to: string;
  subject?: string;
  htmlbody?: string;
  textbody?: string;
  cc?: string;
  bcc?: string;
  replyto?: string;
  list_unsubscribe?: string;
  attachments?: ReadonlyArray<Attachment>;
  tags?: string | ReadonlyArray<string>;
};
