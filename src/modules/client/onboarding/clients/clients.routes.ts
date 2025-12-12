import { Router } from "express"
import { getNewClientsController, createNewClientsController } from "./clients.controller"
import { authMiddleware } from "@/middleware/authMiddleware"

const router = Router()

router.get("/", getNewClientsController)
router.post("/create", createNewClientsController)
export default router
