import dotenv from "dotenv";

dotenv.config(); 


const num = (v, fallback = 0) => {
  const n = Number(v);
  return isNaN(n) ? fallback : n;
};


export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: num(process.env.PORT, 5000),

  // bcrypt
  BCRYPT_SALT_ROUNDS: num(process.env.BCRYPT_SALT_ROUNDS, 10),

  // jwt
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  JWT_EXPIRES: process.env.JWT_EXPIRES || "2h",
  JWT_MAX_AGE: process.env.JWT_MAX_AGE || "2h",
  JWT_ISSUER: process.env.JWT_ISSUER || "yourapp",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || "yourusers",

  // otp
  OTP_SECRET: process.env.OTP_SECRET || "super_secret_otp_key",
  OTP_MAX_ATTEMPTS: num(process.env.OTP_MAX_ATTEMPTS, 3),
  OTP_EXP_MS: num(process.env.OTP_EXP_MS, 5 * 60 * 1000),
  OTP_RESEND_COOLDOWN: num(process.env.OTP_RESEND_COOLDOWN, 60 * 1000),
  OTP_LOCK_DURATION: num(process.env.OTP_LOCK_DURATION, 15 * 60 * 1000),
  
  // forgot
  RESET_PASS_MAX_ATTEMPTS: num(process.env.RESET_PASS_MAX_ATTEMPTS,  20 * 60 * 1000),
  RESET_PASS_RESEND_COOLDOWN: num(process.env.RESET_PASS_RESEND_COOLDOWN, 60 * 1000 ),
  RESET_TOKEN_EXP_MS: num(process.env.RESET_TOKEN_EXP_MS, 5 * 60 * 1000),
  PASSWORD_LOCK_DURATION: num(process.env.PASSWORD_LOCK_DURATION, 15 * 60 * 1000),
  PASSWORD_RESET_URL: process.envPASSWORD_RESET_URL || "http://localhost:5173/reset-password",

  // redis
  REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379",

  // email
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || "gmail",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "LMS",
  MAIL_FROM: process.env.MAIL_FROM || process.env.EMAIL_USER,
};
