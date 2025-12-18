import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { AuthRequest } from "@/middleware/authMiddleware"
import { uploadFileService } from "./upload.service"
import { AppError } from "@/utils/appError"

export const uploadFileController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || ""
  const file = req.file
  if (!file) throw new AppError("File is required", 400)
  const result = await uploadFileService(userId, file)
  return sendSuccess(res, "File uploaded successfully", result)
})
