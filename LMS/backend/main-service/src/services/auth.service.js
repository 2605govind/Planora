import { sequelize } from '../config/db.js'
import User from '../models/user.model.js'
import { AppError } from '../utils/app.error.js'
import bcrypt from "bcrypt";
import { canResendOTP, generateNumericOTP, hashOTP, isOTPExpired, isOTPLocked } from '../utils/otp.js';
import { emailQueue, passwordResetQueue } from '../queue/bullmq.js';
import { generateResetPassToken, getWaitingTimeForCooldown, hasExceedForgotPassAttempts, isExpireResetPasswordToken, isForgotPasswordCooldown, isForgotPasswordLocked } from '../utils/password.js';
import { ENV } from '../config/env.js';

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
    console.log("govind", id)
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
        const waitTime = Math.ceil((user.otpLastSentAt.getTime() + ENV.OTP_RESEND_COOLDOWN - Date.now() ) / 1000);
        throw new AppError(`Please wait ${waitTime} seconds before requesting a new OTP.`, 400);
    }

    user.otpAttempts = (user.otpAttempts || 0) + 1;
    if (user.otpAttempts > ENV.OTP_MAX_ATTEMPTS) {
        // set lock

        user.otpLockedUntil = new Date(Date.now() + ENV.OTP_LOCK_DURATION);
        user.otpAttempts = 0;
        await user.save();
        throw new AppError("Too many OTP requests. Locked temporarily.", 423);
    }


    const otp = generateNumericOTP(6);
    user.otpHash = hashOTP(otp);
    user.otpExpiresAt = new Date(Date.now() + ENV.OTP_EXP_MS);
    user.otpLastSentAt = new Date(),
    await user.save();

    // here send email for otp using message queue using bullMQ  
    const emailData = {
        to: user.email,
        template: 'otp',
        otp,
        expireTimeMin: Math.floor(ENV.OTP_EXP_MS / 60000)
    }

    console.log("emailData", emailData)
    const addedEmail = await emailQueue.add("email-queue", emailData, {
        jobId: `email-otp-${user.id}-${Date.now()}`,
        removeOnComplete: true,
    })

    return { sendEmailId: addedEmail.id };
}

export async function verifyOTPService(otp, id) {
    const user = await User.findByPk(id);

    // Edge cases
    if (!user) {
        throw new AppError("You are not register", 400);
    }

    if (user.isVerified) {
        throw new AppError("You are already verified", 400);
    }
    
    const hashedOTP = hashOTP(otp);
    
    if(user.otpHash !== hashedOTP) {
        throw new AppError("OTP is Invalid", 400);
    }

    if(isOTPExpired(user)) {
        throw new AppError("OTP is Expired", 400);
    }

    user.isVerified = true;

    user.otpHash = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;
    user.otpLockedUntil = null;
    user.otpLastSentAt = null;


    await user.save();

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

    /*
        1. hash otp
        2. compare db-otp to hashed-otp (throw error enter otp is wrong)
        3. check otp expired or not if expire (throw otp is expire)
        4. upate isVerified and reset all datas of otp
        5. return data of user
    */
}


export async function forgotPasswordService(email) {
    const user = await User.findOne({
        where: {email}
    });

    // Edge cases
    if (!user) {
        throw new AppError("You are not register", 400);
    }

    if (!user.isVerified) {
        throw new AppError("email id is not verified", 400);
    }

    if(hasExceedForgotPassAttempts(user) ) {
        // check last creation time with reset_lock if greter then reset if not throw error
        if(isForgotPasswordLocked(user)) {
            throw new AppError("You have exceeded the Forgot password limit. Please try again later.", 400);
        }else {
            user.resetPasswordAttempts = 0;
        }
    }


    // check cooldown
    if(isForgotPasswordCooldown(user)) {
        const waitTime = getWaitingTimeForCooldown(user);
        throw new AppError(`Please wait ${waitTime} seconds before requesting a new OTP.`, 400);
    }
    
    const token = generateResetPassToken(7);
    user.resetPasswordToken = token;
    user.resetPasswordAttempts = (user.resetPasswordAttempts || 0) + 1;
    user.resetPasswordExpires = new Date(Date.now() + ENV.RESET_TOKEN_EXP_MS);

    await user.save();


    const url = `${ENV.PASSWORD_RESET_URL}?token=${token}&userId=${user.id}`

    const emailData = {
        to: user.email,
        template: 'reset password',
        url,
        expireTimeMin: Math.floor(ENV.RESET_TOKEN_EXP_MS / 60000)
    }

    console.log(emailData);
     const addedEmail = await passwordResetQueue.add("password-reset-queue", emailData , {
        jobId: `email-password-reset-${user.id}-${Date.now()}`,
        removeOnComplete: true,
    })

    return { sendEmailId: addedEmail.id };

    /*
        1. check resetPasswordAttempts if less than maxiAttemp than (++attemp, createToken, setExpire)
        2. resetPasswordAttempts if great >= than maxiAttemp than throw message but 
        befor check (expireTime - otpTime)=>creation time now check creationTime >= lockTime (reset_attemp ++attemp, createToken, setExpire)  (not thro error) 
        3. create url => frontent/token
        4. send email forgot-passwordQueue(url, to);
    */
}



export async function resetPasswordService(userId, token, newPassword) {
    const user = await User.findByPk(userId);

    // Edge cases
    if (!user) {
        throw new AppError("You are not register", 400);
    }

    if (!user.isVerified) {
        throw new AppError("email id is not verified", 400);
    }
    
    if(user.resetPasswordToken !== token) {
        throw new AppError("reset password token is invalid", 400);
    }
    
    if(isExpireResetPasswordToken(user)) {
        throw new AppError("reset password token is expire", 400);
    }
    
    user.resetPasswordToken = null;
    user.resetPasswordAttempts = 0;
    user.resetPasswordExpires = null;
    user.password = await bcrypt.hash(newPassword, ENV.BCRYPT_SALT_ROUNDS);
    
    await user.save();
}
