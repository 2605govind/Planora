import express from 'express';
import {
  registerUser,
  loginUser,
  verifyOTP,
  sendOtp,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/send-otp', sendOtp);
authRoutes.post('/verify-otp', verifyOTP);
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.post('/reset-password', resetPassword);

export default authRoutes;
