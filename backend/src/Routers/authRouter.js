import express from 'express';
import { login, register } from '../Controller/authController.js';

const authRouter = express.Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', (req, res) => {
    res.cookie('token', '', {maxAge: 0 });
    res.status(200).json({succes: true})
});




export default authRouter;