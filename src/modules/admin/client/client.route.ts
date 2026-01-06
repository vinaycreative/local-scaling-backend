import { Router } from "express"
import {
  getClientsController,
  createClientController,
  updateClientController,
  deleteClientController,
  successPaymentController,
  getClientProfilePageController,
} from "./client.controller"
import { adminOnlyMiddleware, authMiddleware } from "@/middleware/authMiddleware"

const router = Router()

// Temporary route
// Success payment and change client status and send login credentials to client
router.post("/success-payment/:id", successPaymentController)

router.use(authMiddleware, adminOnlyMiddleware)
router.get("/", getClientsController)
router.post("/", createClientController)
router.put("/:id", updateClientController)
router.delete("/:id", deleteClientController)
router.get("/:id/profile", getClientProfilePageController)

export default router
