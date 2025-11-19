import { supabaseAdmin } from "@/config/db";
import { COOKIE_NAME } from "@/modules/client/auth/auth.controller";
import { NextFunction, Request, Response } from "express";

// AuthMiddleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    res.clearCookie(COOKIE_NAME);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }

  req.user = {
    id: data.user.id,
    role: data.user.app_metadata.role || "client",
  };

  next();
};
