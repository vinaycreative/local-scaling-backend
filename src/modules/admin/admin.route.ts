import { Router } from "express"
import clientRoutes from "./client/client.route"

const router = Router()

router.use("/clients", clientRoutes)

export default router
