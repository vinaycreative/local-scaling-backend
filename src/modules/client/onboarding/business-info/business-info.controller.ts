import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { getBusinessInfoService, saveBusinessInfoService } from "./business-info-service"
import { businessFormSchema } from "./business-info-schema"
import { AuthRequest } from "@/middleware/authMiddleware"

export const getBusinessInfoController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const result = await getBusinessInfoService(userId)
  return sendSuccess(res, "Business information fetched successfully", result)
})

export const saveBusinessInfoController = asyncHandler(async (req: AuthRequest, res: Response) => {
  console.log("req.body is ", req.body)
  const payload = await businessFormSchema.parseAsync(req.body)
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized: User ID missing")
  }

  const result = await saveBusinessInfoService(userId, payload)

  return sendSuccess(res, "Business information saved successfully", result)
})
