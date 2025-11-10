import crypto from "crypto";
import { ENV } from "../config/env.js";

const now = () => Date.now();


export function generateNumericOTP(length = 6) {
    const max = 10 ** length;
    const n = crypto.randomInt(0, max);
    return String(n).padStart(length, "0");
}

export function hashOTP(otp) {
    return crypto.createHmac("sha256", process.env.OTP_SECRET).update(otp).digest('hex');
}

export function isOTPLocked(user) {
    if (user.otpLockedUntil && user.otpLockedUntil.getTime() > now()) return false;
    return true;
}

export function canResendOTP(user) {
    return !user.otpLastSentAt || now() - user.otpLastSentAt.getTime() >= ENV.OTP_RESEND_COOLDOWN;
}


export function registerOTPLocked(user) {
  user.otpAttempts = (user.otpAttempts || 0) + 1;
  if (user.otpAttempts >= ENV.OTP_MAX_ATTEMPTS) {
    user.otpLockedUntil = now() + ENV.OTP_LOCK_DURATION;
  }
}

export function resetOTPAttempts(user) {
  user.otpAttempts = 0;
  user.otpLockedUntil = null;
}

// for otp verification 
export function isOTPExpired(user) {
    return !user.otpExpiresAt || user.otpExpiresAt.getTime() <= now();
}

