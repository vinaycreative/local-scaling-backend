import { asyncHandler } from "@/utils/asyncHandler"
import { sendSuccess } from "@/utils/response"
import { Response } from "express"
import { AuthRequest } from "@/middleware/authMiddleware"
import { statusOfHowMuchFieldAreLeftInEachSection } from "./info.service"

export const getStatusOfHowMuchFieldAreLeftInEachSectionController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id || ""
    const result = await statusOfHowMuchFieldAreLeftInEachSection(userId)
    return sendSuccess(
      res,
      "Status of how much field are left in each section fetched successfully",
      result
    )
  }
)
