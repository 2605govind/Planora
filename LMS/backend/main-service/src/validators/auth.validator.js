import { z } from "zod";

export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters")
  .max(90, "Password is too long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()~`+=_\-[\]{}|;:'",.<>?/\\])(?!.*\s).{6,20}$/,
    "Password must contain uppercase, lowercase, number, and special character"
  );

export const emailSchema = z
  .string({ required_error: "email is required" })
  .trim()
  .toLowerCase()
  .email("invalid email format");

export const userIdSchema = z
  .string({ required_error: "userId is required" })
  .trim()
  .max(50);

export const registerSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .toLowerCase()
    .min(3, "name must be at least 3 chars")
    .max(32, "name must be at most 32 chars"),
  email: emailSchema,
  password: passwordSchema,
  role: z
    .string({ required_error: "role is required" })
    .trim()
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string({ required_error: "password is required" })
    .max(90, "password is too long"),
});


export const verifyOTPSchema = z.object({
  id: userIdSchema,
  otp: z
  .string({ required_error: "otp is required" })
  .trim()
  .max(6)
})

export const sendOtpSchema = z.object({
  id: userIdSchema,
})

export const forgotPasswordSchema = z.object({
  email: emailSchema
})

export const newPasswordSchema = z.object({
  newPassword: passwordSchema,
  token: z
  .string({ required_error: "token is required" })
  .trim()
  .max(30),
  userId: userIdSchema,
})