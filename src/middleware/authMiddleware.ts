import { logError } from "@/config/logger";
import { NextFunction, Request, Response } from "express";
import { supabaseAdmin } from "../config/db";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  };
  token?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = "";

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
      return;
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
      return;
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    };
    req.token = token;

    next();
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during authentication",
    });
    return;
  }
};
