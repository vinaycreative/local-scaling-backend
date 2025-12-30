import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { AuthRequest } from "@/middleware/authMiddleware"
import { createTicketsService, getTicketsService } from "./tickets.service"
import { TicketFilters } from "./tickets.types"
import { getQueryArray } from "@/utils/query"

export const getTicketsController = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const userId = req.user.id
  const filters: TicketFilters = {
    page: Number(req.query.page || 1) as number | undefined,
    perPage: Number(req.query.perPage || 10) as number | undefined,
    title: req.query.title as string | undefined,
    category: getQueryArray(req.query, "category"),
    priority: req.query.priority as string | undefined,
    status: req.query.status as string | undefined,
    created_at: req.query.created_at as string | undefined,
  }
  const result = await getTicketsService(userId, filters)

  return sendSuccess(res, "Tickets fetched successfully", result)
})

export const createTicketsController = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const userId = req.user.id
  const payload = { ...req.body, created_by: userId, status: req.body.status ?? "open" }

  const result = await createTicketsService(userId, payload)

  return sendSuccess(res, "Tickets Created successfully", result)
})
