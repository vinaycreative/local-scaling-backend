import { Router } from "express"
import clientRoutes from "./clients/clients.routes"
import adsBudgetRoutes from "./ads-budget/ads-budget.routes"
// import brandingInfoRoutes from "../info/branding-info/branding-info.route"
import businessInfoRoutes from "./business-info/business-info-routes"
import toolsAccessRoutes from "./tools-access/tools-access.routes"
import websiteSetupRoutes from "./website-setup/website-setup.routes"

const router = Router()

router.use("/clients", clientRoutes)
router.use("/ads-budget", adsBudgetRoutes)
// router.use("/branding-info", brandingInfoRoutes)
router.use("/business-info", businessInfoRoutes)
router.use("/tools-access", toolsAccessRoutes)
router.use("/website-setup", websiteSetupRoutes)

export default router
