import { Router } from "express"
import businessInfoRoutes from "./business-info/business-info.route"
import brandingInfoRoutes from "./branding-info/branding-info.route"
import toolsAccessRoutes from "./tools-access/tools-access.route"

const infoRoutes = Router()

infoRoutes.use("/business-info", businessInfoRoutes)
infoRoutes.use("/branding-info", brandingInfoRoutes)
infoRoutes.use("/tools-access", toolsAccessRoutes)

export default infoRoutes
