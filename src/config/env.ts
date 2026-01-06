import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  JWT_SECRET: z.string(),
  COOKIE_DOMAIN: z.string().optional(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
})

export const env = envSchema.parse(process.env)
