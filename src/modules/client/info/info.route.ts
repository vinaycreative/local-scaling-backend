import { Router } from "express"
import businessInfoRoutes from "./business-info/business-info.route"

const infoRoutes = Router()

infoRoutes.use("/business-info", businessInfoRoutes)

export default infoRoutes
