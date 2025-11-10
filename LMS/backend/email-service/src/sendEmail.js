import { transporter } from './config/transport.config.js'

export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId)
        return info
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}