import { Router } from "express"
import { getWebsiteSetupController, saveWebsiteSetupController } from "./website-setup.controller"

const router = Router()

router.get("/", getWebsiteSetupController)
router.post("/create", saveWebsiteSetupController)
export default router
