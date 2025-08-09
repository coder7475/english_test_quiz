import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { logger } from "./logger";

const transporter = nodemailer.createTransport({
 
    secure: true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    },
    port: Number(env.SMTP_PORT),
    host: env.SMTP_HOST
})

interface SendEmailOptions {
    to: string,
    subject: string;
    templateName: string;
    templateData?: Record<string, any>
    attachments?: {
        filename: string,
        content: Buffer | string,
        contentType: string
    }[]
}

export const sendEmail = async ({
    to,
    subject,
    templateName,
    templateData,
    attachments
}: SendEmailOptions) => {
    try {
        const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
        const html = await ejs.renderFile(templatePath, templateData);

        const info = await transporter.sendMail({
            from: env.SMTP_FROM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map(attachment => ({
                filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType
            }))
        })
        logger.info(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    } catch (error: any) {
        logger.info("email sending error", error.message);
        throw new AppError(401, "Email error")
    }

}