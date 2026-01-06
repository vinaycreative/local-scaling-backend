import jwt, { SignOptions } from "jsonwebtoken"
import { env } from "@/config/env"
import { AppError } from "@/utils/appError"

export interface JwtPayload {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
}

export const generateToken = (
  payload: JwtPayload,
  expiresIn: SignOptions["expiresIn"] = "30d"
) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload
  } catch {
    throw new AppError("Invalid or expired token", 401)
  }
}
