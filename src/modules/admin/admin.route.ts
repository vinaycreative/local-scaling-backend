import { Router } from "express"
import clientRoutes from "./client/client.route"
import authRoutes from "./auth/auth.route"

const router = Router()
router.use("/auth", authRoutes)
router.use("/clients", clientRoutes)

export default router
