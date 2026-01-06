import { Router } from "express"
import { getBusinessInfoController, saveBusinessInfoController } from "./business-info.controller"
import { authMiddleware } from "@/middleware/authMiddleware"

const router = Router()

router.post("/", authMiddleware, saveBusinessInfoController)
router.get("/", authMiddleware, getBusinessInfoController)

export default router
