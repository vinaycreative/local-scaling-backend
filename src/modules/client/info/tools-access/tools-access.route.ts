import { Router } from "express"
import { getToolsAccessController, saveToolsAccessController } from "./tools-access.controller"

const router = Router()

router.get("/", getToolsAccessController)
router.post("/", saveToolsAccessController)
export default router
