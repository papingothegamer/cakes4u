import { z } from "zod";

const passwordRules = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: passwordRules,
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: passwordRules,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// For the combined auth form that switches between login/signup
export const authFormSchema = loginSchema;