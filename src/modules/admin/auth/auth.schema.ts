import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const exchangeSessionSchema = z.object({
  accessToken: z.string().min(1, "Missing Supabase access token"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ExchangeSessionInput = z.infer<typeof exchangeSessionSchema>;
