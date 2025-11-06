import {sequelize} from '../config/db.js'
import User from '../models/user.model.js'
import {AppError} from '../utils/app-error.js'
import bcrypt from "bcrypt";

export async function register(body) {
    try{
        const {name, email, password} = body;
        
        const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10") 
        const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const user = await sequelize.transaction(async (t) => {
            const u = await User.create({
                name,
                email,
                password: hash,
            }, {transaction: t});
            return u;
        })

        return {
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }catch(e) {
        if(e.name == "SequelizeUniqueConstraintError") {
            throw new AppError("email not available", 409)
        }
    }
}