import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Request, Response } from "express"
import { AuthRequest } from "@/middleware/authMiddleware"
import { getNewClientsService, createNewClientsService } from "./clients.service"
import { clientsFormSchmea } from "./clients.schema"
import { AppError } from "@/utils/appError"

export const getNewClientsController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const result = await getNewClientsService(userId)

  return sendSuccess(res, "Clients fetched successfully", result)
})

export const createNewClientsController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id
  console.log("🚀 ~ req:", req)

  if (!userId) {
    res.status(401)
    throw new AppError("Unauthorized: User ID missing")
  }

  const payload = await clientsFormSchmea.parseAsync(req.body)

  const result = await createNewClientsService(userId, payload)

  return sendSuccess(res, "New Client saved successfully", result)
})
