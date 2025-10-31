import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import { MyError } from '../utils/customError.js';



export const register = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        username = username.toLowerCase();

        if(!username || !password) {
            return next(new MyError("Field are require", 400));
        }

        
        const user = await User.findOne({
            where: {
                username: username,
            }
        })

        if(user) {
            return next(new MyError("Username is present", 400));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashPassword,
        });

        const token = jwt.sign({id: newUser.id, role: newUser.role}, process.env.JWT_SECRET, {expiresIn: '2h'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
        })

        return res.status(201).json({success: true, message: "user created", user: {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            balance: newUser.balance,
            plan: newUser.plan
        }});

    } catch (error) {
        console.log("error at register controller "+ error.message);
        return next(new MyError("Internal Server", 500));
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return next(new MyError("Field are require", 400));
        }

        const user = await User.findOne({
            where: {
                username: username,
            }
        })

        if(!user) {
            return next(new MyError("You are not register", 400));
        }
        
        const isAllow = await bcrypt.compare(password, user.password);
        
        if(!isAllow) {
            return next(new MyError("Wrong username and password", 400));
        }

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '2h'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
        })

        return res.status(200).json({success: true, message: "Login successfuly", user: {
            id: user.id,
            username: user.username,
            role: user.role,
            balance: user.balance,
            plan: user.plan
        }});

  

    } catch (error) {
        console.log("error at login controller "+ error.message);
        return next(new MyError("Internal Server", 500));
    }
};
