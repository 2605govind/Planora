import { sequelize } from '../config/db.js'
import User from '../models/user.model.js'
import { AppError } from '../utils/app-error.js'
import bcrypt from "bcrypt";
import { canResendOTP, generateNumericOTP, isOTPLocked } from '../utils/otp.js';

export async function registerService(body) {
    const { name, email, password, role } = body;

    const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const user = await sequelize.transaction(async (t) => {
        const u = await User.create({
            name,
            email,
            role,
            password: hash,
        }, { transaction: t });
        return u;
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isOnboarded: user.isOnboarded,
    }
}

export async function loginService(data) {
    const { email, password } = data;

    const user = await User.findOne({
        where: { email }
    })

    if (!user) {
        throw new AppError("You are not register", 400);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new AppError("Invalid email and password", 401);
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isOnboarded: user.isOnboarded,
        profile_photo: user.profile_photo,
        bio: user.bio,
        social_links: user.social_links,
    }
}

export async function sendOTPService(id) {

    const user = await User.findByPk(id);

    if (!user) {
        throw new AppError("You are not register", 400);
    }

    if (user.isVerified) {
        throw new AppError("You are already verified", 400);
    }

    if (!isOTPLocked(user)) {
        throw new AppError("You have exceeded the OTP sending limit. Please try again later.", 400);
    }

    if (!canResendOTP(user)) {
        const waitTime = Math.ceil((user.otpLastSentAt.getTime() + Number(process.env.OTP_RESEND_COOLDOWN) - now()) / 1000);
        throw new AppError(`Please wait ${waitTime} seconds before requesting a new OTP.`, 400);
    }

    user.otpAttempts = (user.otpAttempts || 0) + 1;
    if (user.otpAttempts > Number(process.env.OTP_MAX_ATTEMPTS)) {
        // set lock
        user.otpLockedUntil = new Date(now() + Number(process.env.OTP_LOCK_DURATION));
        user.otpAttempts = 0;
        await user.save();
        throw new AppError("Too many OTP requests. Locked temporarily.", 423);
    }


    const otp = generateNumericOTP(6);
    user.otpHash = hashOTP(otp);
    user.otpExpiresAt = new Date(Date.now() + Number(process.env.OTP_EXP_MS));
    user.otpLastSentAt = new Date(),
        user.save();

    // here send email for otp using message queue using bullMQ
    // await emailQueue('sent-email', {
    //     to: user.email,
    //     template: 'otp',
    //     vars: {
    //         otp,
    //         minutes: Math.floor(Number(process.env.OTP_EXP_MS) / 60000)
    //     }
    // }, { jobId: `email:otp:${user.id}:${Date.now()}` })

    return { message: "OTP sent" };
}


