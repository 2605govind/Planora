import { ENV } from "../config/env.js";
import crypto from 'crypto'


export function hasExceedForgotPassAttempts(user) {
    if(user.resetPasswordAttempts >= ENV.RESET_PASS_MAX_ATTEMPTS) {
        return true;
    }
    return false;
}

export function isForgotPasswordLocked(user) {
    return user.resetPasswordExpires && ((user.resetPasswordExpires.getTime() - ENV.RESET_TOKEN_EXP_MS) < ENV.PASSWORD_LOCK_DURATION);
}

export function isForgotPasswordCooldown(user) {
    return user.resetPasswordExpires && ((user.resetPasswordExpires.getTime() - ENV.RESET_TOKEN_EXP_MS) < ENV.RESET_PASS_RESEND_COOLDOWN) 
}

export function getWaitingTimeForCooldown(user) {
    return user.resetPasswordExpires && (((user.resetPasswordExpires.getTime() - ENV.RESET_TOKEN_EXP_MS) +  ENV.RESET_PASS_RESEND_COOLDOWN - now())   / 1000) 
}

export function generateResetPassToken(length=10) {
    return crypto.randomBytes(length*2).toString('hex');
}

export function isExpireResetPasswordToken(user) {
    return user.resetPasswordExpires && (user.resetPasswordExpires.getTime() >= new Date() + ENV.RESET_TOKEN_EXP_MS);
}

