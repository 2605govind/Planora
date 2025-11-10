import { sendEmail } from "../sendEmail.js";

export const sendResetEmail = async (to, resetLink, expireTime) => {
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
      <h2 style="text-align:center; color:#007bff;">Password Reset Request</h2>
      <p style="font-size:16px; color:#333;">
        Hello 👋,<br/>
        We received a request to reset your password. Click the button below to set a new password:
      </p>
      
      <div style="text-align:center; margin: 25px 0;">
        <a href="${resetLink}" style="
          display:inline-block;
          padding:12px 25px;
          background-color:#007bff;
          color:#fff;
          text-decoration:none;
          border-radius:5px;
          font-weight:bold;
        ">
          Reset Password
        </a>
      </div>

      <p style="font-size:14px; color:#555; text-align:center;">
        This link will expire in <b>${expireTime} minutes</b>.<br/>
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

      <p style="font-size:12px; color:#888; text-align:center;">
        For your security, never share your password with anyone.
      </p>
    </div>
  `;

  return sendEmail(to, "Reset Your Password", html);
};
