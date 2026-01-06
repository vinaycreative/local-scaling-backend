import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { AuthRequest } from "@/middleware/authMiddleware"
import { getToolsAccessService, saveToolsAccessService } from "./tools-access.service"
import { ToolsAccessPayload } from "./tools-access.schema"

export const getToolsAccessController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized: User ID missing")
  }

  const result = await getToolsAccessService(userId)

  return sendSuccess(res, "Website setup retrieved successfully", result)
})

export const saveToolsAccessController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id
  const payload: ToolsAccessPayload = req.body

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized: User ID missing")
  }

  const result = await saveToolsAccessService(userId, payload)

  return sendSuccess(res, "Website setup saved successfully", result)
})
