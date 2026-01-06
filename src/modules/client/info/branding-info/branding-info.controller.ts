import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { brandingInfoSchema } from "./branding-info.schema"
import { AuthRequest } from "@/middleware/authMiddleware"
import { getBrandingInfoService, saveBrandingInfoService } from "./branding-info.service"

export const getBrandingController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id
  console.log("🚀 ~ userId:", userId)

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const result = await getBrandingInfoService(userId)
  return sendSuccess(res, "Branding information fetched successfully", result)
})

export const saveBrandingController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized: User ID missing")
  }

  const payload = await brandingInfoSchema.parseAsync(req.body)

  const result = await saveBrandingInfoService(userId, payload)

  return sendSuccess(res, "Branding assets saved successfully", result)
})
