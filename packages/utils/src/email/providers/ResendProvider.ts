import { Resend } from "resend";

import { EmailPayload, EmailProvider } from "../interfaces/EmailProvider";

export class ResendProvider implements EmailProvider {
  private resend = new Resend(process.env.RESEND_API_KEY!);

  async sendEmail({
    fromEmail,
    fromName = "No Name",
    toEmail,
    subject,
    message,
  }: EmailPayload): Promise<void> {
    await this.resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      subject,
      text: message,
    });
  }
}
