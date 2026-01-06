import { Router } from "express"
import businessInfoRoutes from "./business-info/business-info.route"
import brandingInfoRoutes from "./branding-info/branding-info.route"
import toolsAccessRoutes from "./tools-access/tools-access.route"
import websiteSetupRoutes from "./website-setup/website-setup.routes"
import { authMiddleware } from "@/middleware/authMiddleware"
import adsBudgetRoutes from "./ads-budget/ads-budget.routes"
import { getStatusOfHowMuchFieldAreLeftInEachSectionController } from "./info.controller"

const infoRoutes = Router()
infoRoutes.get(
  "/field-are-left-in-each-section",
  getStatusOfHowMuchFieldAreLeftInEachSectionController
)
infoRoutes.use(authMiddleware)
infoRoutes.use("/business-info", businessInfoRoutes)
infoRoutes.use("/branding-info", brandingInfoRoutes)
infoRoutes.use("/tools-access", toolsAccessRoutes)
infoRoutes.use("/website-setup", websiteSetupRoutes)
infoRoutes.use("/ads-budget-location", adsBudgetRoutes)

export default infoRoutes
