import { Response } from "express"
import { ZodError, ZodIssue } from "zod"

export const sendSuccess = <T>(res: Response, message: string, data?: T, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  })
}

export const sendError = (res: Response, error: any) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: error.issues.map((e: ZodIssue) => e.message).join(", "),
    })
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.details ?? null,
    })
  }

  console.error("Unhandled Error:", error)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  })
}
