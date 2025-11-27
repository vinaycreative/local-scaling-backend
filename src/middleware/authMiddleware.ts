import { logError } from "@/config/logger";
import { NextFunction, Request, Response } from "express";
import { supabaseAdmin } from "../config/db";

/**
 * Middleware to protect routes.
 * 1. extracts Bearer token
 * 2. Verifies token with Supabase
 * 3. Attaches user to request object
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

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
