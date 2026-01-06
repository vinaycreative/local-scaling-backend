import { Request, Response, NextFunction } from "express"
import { ZodError, ZodIssue } from "zod"
import { AppError } from "@/utils/appError"

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`)

  if (err instanceof ZodError) {
    const formatted = err.issues
      .map((e: ZodIssue) => `${e.path.join(".")}: ${e.message as string}`)
      .join(", ")
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: formatted,
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details ?? null,
    })
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  })
}
