import { ENV } from "../config/env.js";
import crypto from 'crypto'


export function hasExceedForgotPassAttempts(user) {
    if(user.resetPasswordAttempts.getTime() >= ENV.RESET_PASS_MAX_ATTEMPTS) {
        return true;
    }
    return false;
}

export function isForgotPasswordLocked(user) {
    if((user.resetPasswordExpires.getTime() - ENV.RESET_TOKEN_EXP_MS) < ENV.PASSWORD_LOCK_DURATION) {
        return true;
    }
    return false;
}

export function isForgotPasswordCooldown(user) {
    if((user.resetPasswordExpires.getTime() - ENV.RESET_TOKEN_EXP_MS) < ENV.RESET_PASS_RESEND_COOLDOWN) {
        return true;
    }
    return false;
}

export function getWaitingTimeForCooldown(user) {
    if(((user.resetPasswordExpires.getTime() - ENV.RESET_TOKEN_EXP_MS) +  ENV.RESET_PASS_RESEND_COOLDOWN - now())   / 1000) {
        return true;
    }
    return false;
}

export function generateResetPassToken(length=10) {
    return crypto.randomBytes(length*2).toString('hex');
}

export function isExpireResetPasswordToken() {
    if(user.resetPasswordExpires.getTime() >= ENV.RESET_TOKEN_EXP_MS) {
        return true;
    }
    return false;
}

