import { AppError } from "../utils/app.error.js";
import { loginSchema, newPasswordSchema, registerSchema } from "../validators/auth.validator.js";
import {registerService, loginService, sendOTPService, verifyOTPService, forgotPasswordService, resetPasswordService} from '../services/auth.service.js'
import {createJWTToken, setJWTToken } from '../utils/jwt.token.js'


export const registerUser = async (req, res, next) => {
    try{
        const parse = registerSchema.safeParse(req.body);
        if(!parse.success) {
            console.log("registerSchema", parse)
            const message = parse.error.errors?.[0]?.message || "Invalid input";
            throw new AppError(message, 400)
        }

        const user = await registerService(parse.data);

        // create and set token
        const playload = {
            id: user.id,
            role: user.role
        }
        const token = createJWTToken(playload);
        console.log("token", token)
        setJWTToken(token, res);

        res.status(201).json({
            success: true,
            message: "user register successfuly.",
            result: {
                user
            } 
        })

    }catch(e) {
        console.log("Error at registerUser controller: ", e.message);
        if (e.name == "SequelizeUniqueConstraintError") {
            next( new AppError("Email is not available", 409) );
        }
        next(e)
    }
}

export const loginUser = async (req, res, next) => {
    try{
        const parse = loginSchema.safeParse(req.body);
        if(!parse.success) {
            console.log("loginUser", parse)
            const message = parse.error.errors?.[0]?.message || "Invalid input";
            throw new AppError(message, 400)
        }

        const user = await loginService(parse.data);

        // create and set token
        const playload = {
            id: user.id,
            role: user.role
        }
        const token = createJWTToken(playload);
        setJWTToken(token, res);

        res.status(200).json({
            success: true,
            message: "user login successfuly.",
            result: {
                user
            } 
        })

    }catch(e) {
        console.log("Error at loginUser controller: ", e.message);
        next(e)
    }
}

export const sendOtp = async (req, res, next) => {
    try{
        const {id} = req.body;

        const data = await sendOTPService(id);
     
        res.status(200).json({
            success: true,
            message: "otp sent successfuly.",
            result: {
                otpData: data
            }
        })

    }catch(e) {
        console.log("Error at sendOtp controller: ", e.message);
        next(e)
    }
}

export const verifyOTP = async (req, res, next) => {
    try{
        const {id , otp} = req.body;

        const data = await verifyOTPService(otp, id);
     
        res.status(200).json({
            success: true,
            message: "otp verified successfuly.",
            result: {
                data
            } 
        })

    }catch(e) {
        console.log("Error at verifyOTP controller: ", e.message);
        next(e)
    }
}

export const forgotPassword = async (req, res, next) => {
    try{
        const {email} = req.body;

        await forgotPasswordService(email);
     
        res.status(200).json({
            success: true,
            message: "Forgot password email sent successfuly.",
        })

    }catch(e) {
        console.log("Error at forgotPassword controller: ", e.message);
        next(e)
    }
}

// GET /forgot-password?token=abc123xyz&userId=12345    // body: newPassword
export const resetPassword = async (req, res, next) => {
    try{
        const {token, userId } = req.body;

        const parse = newPasswordSchema.safeParse(req.body.newPassword);
        if(!parse.success) {
            console.log("newPasswordSchema", parse)
            const message = parse.error.errors?.[0]?.message || "Invalid input";
            throw new AppError(message, 400)
        }

        const {newPassword} = parse.data;

        await resetPasswordService(userId, token, newPassword);
     
        res.status(200).json({
            success: true,
            message: "Password reset successfuly.",
        })

    }catch(e) {
        console.log("Error at resetPassword controller: ", e.message);
        next(e)
    }
}




