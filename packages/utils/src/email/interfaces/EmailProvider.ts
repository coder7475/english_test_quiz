export interface EmailPayload {
  fromEmail: string;
  fromName?: string;
  toEmail: string;
  subject: string;
  message: string;
}

export interface EmailProvider {
  sendEmail(payload: EmailPayload): Promise<void>;
}
