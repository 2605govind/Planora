import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

// transporter.verify((error, success) => {
//     if (error) {
//         console.error("Email transporter error:", error);
//     } else {
//         console.log("Email transporter ready to send messages");
//     }
// })