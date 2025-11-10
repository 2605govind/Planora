import express from 'express';
import 'dotenv/config'
import { Worker } from 'bullmq'
import { sendOTPEmail } from './html/otp.email.js';
import { connection } from './config/redis.config.js';
import { sendResetEmail } from './html/reset.password.email.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json())

// email-queue
const sendOtpWorker = new Worker("email-queue", async (job) => {
  try {
    const { to, otp, expireTimeMin } = job.data;
    await sendOTPEmail(to, otp, expireTimeMin);
    console.log(`OTP email sent successfully to ${to}`);

  } catch (err) {
    console.error("Failed to send OTP:", err);
  }
}, {
  connection
})

// password-reset-queue
const sendResetLink = new Worker("password-reset-queue", async (job) => {
   try {
    const { to, url, expireTimeMin } = job.data;
    await sendResetEmail(to, url, expireTimeMin);
    console.log(`reset password email sent successfully to ${to}`);

  } catch (err) {
    console.error("Failed to send reset email:", err);
  }
},  {
  connection
})


app.listen(PORT, () => {
  console.log("Email Server is running at " + PORT);
});
