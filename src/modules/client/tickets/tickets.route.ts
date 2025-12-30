import { Router } from "express"
import { getTicketsController } from "./tickets.controller"
import { createTicketsController } from "./tickets.controller"

const router = Router()

router.get("/", getTicketsController)
router.post("/", createTicketsController)

export default router
