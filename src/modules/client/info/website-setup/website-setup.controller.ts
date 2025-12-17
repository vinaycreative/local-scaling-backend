import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { WebsiteSetupPayload } from "./website-setup.schema"
import { AuthRequest } from "@/middleware/authMiddleware"
import { getWebsiteSetupService, saveWebsiteSetupService } from "./website-setup.service"

export const getWebsiteSetupController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || ""
  const result = await getWebsiteSetupService(userId)
  return sendSuccess(res, "Website setup retrieved successfully", result)
})

export const saveWebsiteSetupController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || ""
  const payload: WebsiteSetupPayload = req.body
  const result = await saveWebsiteSetupService(userId, payload)
  return sendSuccess(res, "Website setup saved successfully", result)
})
