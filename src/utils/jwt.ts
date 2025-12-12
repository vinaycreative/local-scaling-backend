import jwt from "jsonwebtoken"
import { env } from "@/config/env"
import { JwtPayload } from "@/config/jwt"
import { AppError } from "./appError"

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload
  } catch {
    throw new AppError("Invalid or expired token", 401)
  }
}
