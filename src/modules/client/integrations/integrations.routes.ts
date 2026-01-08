import { Router } from "express"
import {
  connectGa4,
  getAllIntegrationStatusController,
  googleOAuthCallback,
  listGa4Properties,
  verifyGa4,
} from "./integrations.controller"

const router = Router()

/**
 * Get all integration status
 */
router.get("/status", getAllIntegrationStatusController)

/**
 * GA4 OAuth
 */
router.get("/google/ga4/connect", connectGa4)
router.get("/google/callback", googleOAuthCallback)

/**
 * GA4 Integration
 */
router.get("/google/ga4/:integrationId/properties", listGa4Properties)
router.post("/google/ga4/:integrationId/verify", verifyGa4)

export default router
