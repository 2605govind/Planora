import ms from "ms"

export function createJWTToken(playload) {
    const token = jwt.sign(playload, process.env.JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
    });
}

export function setJWTToken(token, res) {
    const maxAgeMs = ms(process.env.JWT_MAX_AGE || process.env.JWT_EXPIRES || "2h");

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax", // helps mitigate CSRF for typical form posts
        maxAge: maxAgeMs,
        path: "/",
    });
}