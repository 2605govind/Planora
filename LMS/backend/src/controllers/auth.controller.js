import { AppError } from "../utils/app-error.js";
import { loginSchema, registerSchema } from "../validators/auth-validator.js";
import {registerService, loginService, sendOTPService} from '../services/auth.service.js'
import {createJWTToken, setJWTToken } from '../utils/jwt-token.js'


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
        setJWTToken(token, res);

        res.status(201).json({
            success: true,
            message: "user register successfuly.",
            result: {
                user
            } 
        })

    }catch(e) {
        console.log("Error at registerUser controller: ", e);
        if (e.name == "SequelizeUniqueConstraintError") {
            next( new AppError("email not available", 409) );
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
        console.log("Error at loginUser controller: ", e);
        next(e)
    }
}

export const resendOtp = async (req, res, next) => {
    try{
        const {id} = req.body;

        const data = await sendOTPService();
     
        res.status(200).json({
            success: true,
            message: "otp sent successfuly.",
            result: {
                otpData: data
            }
        })

    }catch(e) {
        console.log("Error at loginUser controller: ", e);
        next(e)
    }
}

export const verifyOTP = async (req, res, next) => {
    try{
        const {id} = req.body;

        const data = await sendOTPService();
     
        res.status(200).json({
            success: true,
            message: "otp sent successfuly.",
            result: {
                
            } 
        })

    }catch(e) {
        console.log("Error at loginUser controller: ", e);
        next(e)
    }
}




