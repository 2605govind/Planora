import ms from "ms"
import jwt from 'jsonwebtoken'
import { ENV } from "../config/env.js";

export function createJWTToken(playload) {
    const token = jwt.sign(playload, process.env.JWT_SECRET, {
        expiresIn: ENV.JWT_EXPIRES,
        issuer: ENV.JWT_ISSUER,
        audience: ENV.JWT_AUDIENCE,
    });
    return token
}

export function setJWTToken(token, res) {
    const maxAgeMs = ms(process.env.JWT_MAX_AGE || ENV.JWT_EXPIRES || "2h");

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax", // helps mitigate CSRF for typical form posts
        maxAge: maxAgeMs,
        path: "/",
    });
}

