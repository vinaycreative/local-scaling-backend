import { Router } from "express"
import {
  connectGa4,
  getAllIntegrationStatusController,
  ga4OAuthCallback,
  listGa4Properties,
  verifyGa4,
  googleAdsOAuthCallback,
  connectGoogleAds,
  googleOAuthCallback,
  connectGtm,
  connectSearchConsole,
} from "./integrations.controller"

const router = Router()

router.get("/status", getAllIntegrationStatusController)
// GA4
router.get("/google/ga4/connect", connectGa4)
router.get("/google/callback", googleOAuthCallback)
router.get("/google/ga4/:integrationId/properties", listGa4Properties)
router.post("/google/ga4/:integrationId/verify", verifyGa4)

// Google Ads
router.get("/google/google-ads/connect", connectGoogleAds)
router.get("/google/google-ads/callback", googleAdsOAuthCallback)

// Google Tag Manager
router.get("/google/gtm/connect", connectGtm)

// Search Console
router.get("/google/search-console/connect", connectSearchConsole)

export default router
