
import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path, { dirname } from "node:path";
import { logger } from "./logger";
import { fileURLToPath } from "node:url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
    port: Number(env.SMTP_PORT),
    host: env.SMTP_HOST,
    secure: true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    },
    //  debug: true,
    // logger: true
})


interface SendEmailOptions {
    to: string,
    subject: string;
    templateName: string;
    templateData?: Record<string, any>    
}

export const sendEmail = async ({
    to,
    subject,
    templateName,
    templateData,    
}: SendEmailOptions) => {

    try {
        const templatePath = path.join(__dirname, 'templates', `${templateName}.ejs`);        
        const html = await ejs.renderFile(templatePath, templateData || {});
        const info = await transporter.sendMail({
            from: env.SMTP_FROM,
            to: to,
            subject: subject,
            html: html
           
        })
        console.log(info);
        logger.info(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    } catch (error: any) {
        logger.info("email sending error", error.message);
        console.log(error);
        throw new AppError(401, "Email error");
    }

}