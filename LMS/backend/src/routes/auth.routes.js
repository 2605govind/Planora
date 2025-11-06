import express from 'express';
import {
  registerUser,
  // loginUser,
  // verifyEmail,
  // resendOtp,
  // forgotPassword,
  // resetPassword
} from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
// authRoutes.post('/login', loginUser);
// authRoutes.post('/verify-email', verifyEmail);
// authRoutes.post('/resend-otp', resendOtp);
// authRoutes.post('/forgot-password', forgotPassword);
// authRoutes.post('/reset-password', resetPassword);

export default authRoutes;
