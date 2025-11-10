import { sendEmail } from "../sendEmail.js";

export const sendOTPEmail = async (to, otp, expireTime) => {
     const html = `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 20px;
      background-color: #f9f9f9;
    ">
      <h2 style="text-align:center; color:#007bff;">Email Verification</h2>
      <p style="font-size:16px; color:#333;">
        Hello 👋,<br/>
        Use the following OTP to verify your email address:
      </p>
      
      <div style="
        font-size:28px;
        letter-spacing:5px;
        font-weight:bold;
        text-align:center;
        color:#222;
        margin:20px 0;
      ">
        ${otp}
      </div>

      <p style="font-size:14px; color:#555; text-align:center;">
        This OTP is valid for <b>${expireTime} minutes</b>.<br/>
        Please do not share this code with anyone.
      </p>

      <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

      <p style="font-size:12px; color:#888; text-align:center;">
        If you didn’t request this verification, you can safely ignore this email.
      </p>
    </div>
  `;

  return sendEmail(to, "Your OTP Code", html)
}