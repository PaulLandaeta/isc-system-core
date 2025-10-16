export interface MailOptions {
  to: string;
  recipientName: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface MailerPlugin {
  sendMail(_options: MailOptions): Promise<void>;
}
