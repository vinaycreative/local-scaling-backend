import { env } from "@/config/env";
import { asyncHandler } from "@/utils/asyncHandler";
import { sendSuccess } from "@/utils/response";
import { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { getLoggedInService, loginService } from "./auth.service";

export const COOKIE_NAME = "auth_token";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = await loginSchema.parseAsync(req.body);
    const { token, user } = await loginService({ email, password });
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      domain: env.COOKIE_DOMAIN,
      path: "/",
      sameSite: "none" as const,
    });

    return sendSuccess(res, "Login successful", user);
  }
);

export const getLoggedInUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const user = await getLoggedInService(userId!);
    return sendSuccess(res, "Logged in user", user);
  }
);

export const logoutUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const cookieOptions = {
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };
    res.clearCookie(COOKIE_NAME, cookieOptions);
    return sendSuccess(res, "Logged out successfully");
  }
);
