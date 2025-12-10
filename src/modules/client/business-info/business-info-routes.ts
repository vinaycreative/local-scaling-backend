import { Router } from "express"
import { getBusinessInfoController, saveBusinessInfoController } from "./business-info.controller"
import { authMiddleware } from "@/middleware/authMiddleware"

const router = Router()

router.get("/business-info", authMiddleware, getBusinessInfoController)
router.post("/business-info", authMiddleware, saveBusinessInfoController)

export default router
