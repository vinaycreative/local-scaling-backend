import { authMiddleware } from "@/middleware/authMiddleware"
import authRoutes from "@/modules/client/auth/auth.routes"
import onboardingRoutes from "@/modules/client/onboarding/onboarding.route"
import { Router } from "express"
import infoRoutes from "./info/info.route"
import ticketsRoutes from "./tickets/tickets.route"
import integrationsRoutes from "./integrations/integrations.routes"
const router = Router()

router.use("/auth", authRoutes)
router.use("/info", authMiddleware, infoRoutes)
router.use("/tickets", authMiddleware, ticketsRoutes)
router.use("/integrations", authMiddleware, integrationsRoutes)
export default router
