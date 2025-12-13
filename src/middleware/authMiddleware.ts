import "../types/express"
import { logError } from "@/config/logger"
import { NextFunction, Request, Response } from "express"
import { supabaseAdmin } from "../config/db"
import { verifyToken } from "@/utils/jwt"
import { AppError } from "@/utils/appError"
import { JwtPayload } from "@/config/jwt"

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.cookies.access_token
  if (!token) {
    throw new AppError("Unauthorized: No token provided", 401)
  }
  const decoded = verifyToken(token)
  req.user = {
    id: decoded.id,
    first_name: decoded.first_name || "",
    last_name: decoded.last_name || "",
    email: decoded.email || "",
    role: decoded.role || "",
  }
  next()
}

export const adminOnlyMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    throw new AppError("Unauthorized: You are not authorized to access this resource", 403)
  }
  next()
}
