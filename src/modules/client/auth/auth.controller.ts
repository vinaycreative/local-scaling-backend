import { env } from "@/config/env"
import { AuthRequest } from "@/middleware/authMiddleware"
import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Request, Response } from "express"
import { exchangeSessionSchema, loginSchema, signUpSchema } from "./auth.schema"
import { exchangeSessionService, loginService, logoutService, signUpService } from "./auth.service"

export const COOKIE_NAME = "access_token"

const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  domain: env.COOKIE_DOMAIN,
  path: "/",
  sameSite: (env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax",
})

export const getLoggedInUserController = asyncHandler(async (req: AuthRequest, res: Response) => {
  return sendSuccess(res, "User data fetched successfully", {
    user: req.user,
  })
})

export const loginUserController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = await loginSchema.parseAsync(req.body)

  const data = await loginService({ email, password })

  res.cookie(COOKIE_NAME, data?.token, {
    ...getCookieOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  return sendSuccess(res, "Login successful", data)
})

export const devSignUpController = asyncHandler(async (req: Request, res: Response) => {
  const seedUser = async () => {
    try {
      console.log("Seeding user...")
      const result = await signUpService({
        email: "abhay@webbywolf.com",
        password: "abhay-webbywolf-password",
      })
      console.log("User created successfully:", result.user.id)
    } catch (err) {
      console.error("Seeding failed:", err)
    }
  }

  seedUser()

  return sendSuccess(res, "Login successful")
})

export const devLoginController = asyncHandler(async (req: Request, res: Response) => {
  const email = "abhay@webbywolf.com"
  const password = "abhay-webbywolf-password"

  const { token, user } = await loginService({ email, password })

  console.log("token is ", token)

  res.cookie(COOKIE_NAME, token, {
    ...getCookieOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  return sendSuccess(res, "Dev Login successful", { user })
})

export const signUpUserController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = await signUpSchema.parseAsync(req.body)

  const result = await signUpService({ email, password })

  res.status(201).json({
    success: true,
    message: "User registered successfully. Please check email for verification.",
    data: result,
  })
})

export const exchangeSessionController = asyncHandler(async (req: Request, res: Response) => {
  const { accessToken } = await exchangeSessionSchema.parseAsync(req.body)

  const { token, user } = await exchangeSessionService({ accessToken })

  res.cookie(COOKIE_NAME, token, {
    ...getCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  return sendSuccess(res, "Session successfully exchanged", { user })
})

export const logoutUserController = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]
  await logoutService(token)

  res.clearCookie(COOKIE_NAME, {
    ...getCookieOptions(),
    maxAge: 0,
  })

  return sendSuccess(res, "Logged out successfully")
})
