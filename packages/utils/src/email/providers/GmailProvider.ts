import nodemailer from "nodemailer";

import { EmailPayload, EmailProvider } from "../interfaces/EmailProvider";

export class GmailProvider implements EmailProvider {
  async sendEmail({
    fromEmail,
    fromName = "No Name",
    toEmail,
    subject,
    message,
  }: EmailPayload): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${fromName}" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      replyTo: fromEmail,
      subject,
      text: message,
    });
  }
}
