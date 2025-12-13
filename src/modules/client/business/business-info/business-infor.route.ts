import { Router } from "express"
import { getBusinessInfoController, saveBusinessInfoController } from "./business-info.controller"
import { authMiddleware } from "@/middleware/authMiddleware"

const router = Router()

router.get("/", authMiddleware, getBusinessInfoController)
router.post("/create", authMiddleware, saveBusinessInfoController)

export default router
