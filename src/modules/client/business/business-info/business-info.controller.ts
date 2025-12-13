import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { getBusinessInfoService, saveBusinessInfoService } from "./business-info.service"
import { businessFormSchema } from "./business-info.schema"
import { AuthRequest } from "@/middleware/authMiddleware"

export const getBusinessInfoController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || ""
  const result = await getBusinessInfoService(userId)
  return sendSuccess(res, "Business information fetched successfully", result)
})

export const saveBusinessInfoController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const payload = await businessFormSchema.parseAsync(req.body)
  const userId = req.user?.id || ""
  const result = await saveBusinessInfoService(userId, payload)
  return sendSuccess(res, "Business information saved successfully", result)
})
