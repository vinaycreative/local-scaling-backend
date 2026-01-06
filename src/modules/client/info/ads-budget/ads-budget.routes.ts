import { Router } from "express"
import { getAdsBudgetController, saveAdsBudgetController } from "./ads-budget.controller"

const router = Router()

router.get("/", getAdsBudgetController)
router.post("/create", saveAdsBudgetController)
export default router
