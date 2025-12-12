import { logError } from "@/config/logger"
import { NextFunction, Request, Response } from "express"
import { supabaseAdmin } from "../config/db"
import { verifyToken } from "@/utils/jwt"
import { AppError } from "@/utils/appError"

export interface AuthRequest extends Request {
  user?: {
    id: string
    email?: string
    role?: string
  }
  token?: string
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = ""

    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
    } else if (req.cookies && req.cookies.access_token) {
      token = req.cookies.access_token
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      })
      return
    }
    verifyToken(token)

    next()
  } catch (error) {
    logError(error)
    throw new AppError("Unauthorized: Invalid or expired token", 401)
    return
  }
}
