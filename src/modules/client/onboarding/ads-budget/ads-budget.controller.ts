import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { AuthRequest } from "@/middleware/authMiddleware"
import { getAdsBudgetService, saveAdsBudgetService } from "./ads-budget.service"
import { adsBudgetSchema } from "./ads-budget.schema"

export const getAdsBudgetController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const result = await getAdsBudgetService(userId)

  return sendSuccess(res, "Ads budget fetched successfully", result)
})

export const saveAdsBudgetController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized: User ID missing")
  }

  const payload = await adsBudgetSchema.parseAsync(req.body)

  const result = await saveAdsBudgetService(userId, payload)

  return sendSuccess(res, "Ads budget saved successfully", result)
})
