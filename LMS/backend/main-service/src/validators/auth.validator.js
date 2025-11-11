import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .toLowerCase()
    .min(3, "name must be at least 3 chars")
    .max(32, "name must be at most 32 chars"),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .toLowerCase()
    .email("invalid email format"),

  password: z
    .string({ required_error: "password is required" })
    .min(6, "password must be at least 6 chars")
    .max(90, "password is too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()~`+=_\-[\]{}|;:'",.<>?/\\])(?!.*\s).{6,20}$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),

  role: z
    .string({ required_error: "role is required" })
    .trim()
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .toLowerCase()
    .email("invalid email format"),

  password: z
    .string({ required_error: "password is required" })
    .max(90, "password is too long"),
});

export const newPasswordSchema = z.object({
    newPassword: z
    .string({ required_error: "password is required" })
    .min(6, "password must be at least 6 chars")
    .max(90, "password is too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()~`+=_\-[\]{}|;:'",.<>?/\\])(?!.*\s).{6,20}$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
})