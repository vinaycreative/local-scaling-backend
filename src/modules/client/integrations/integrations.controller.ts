import { Request, Response } from "express"
import {
  startGa4OAuth,
  handleGa4OAuthCallback,
  getGa4Properties,
  verifyGa4Integration,
  getAllIntegrationStatus,
} from "./integrations.service"
import { sendSuccess } from "@/utils/response"

// get all integration status
export async function getAllIntegrationStatusController(req: Request, res: Response) {
  const userId = req.user?.id!
  const result = await getAllIntegrationStatus(userId)
  return sendSuccess(res, "All integration status fetched successfully", result)
}

/**
 * STEP 5.1
 * Redirect client to Google OAuth consent screen
 */
export async function connectGa4(req: Request, res: Response) {
  const { authUrl } = await startGa4OAuth()
  return res.redirect(authUrl)
}

/**
 * STEP 5.2
 * Google OAuth callback
 */
export async function googleOAuthCallback(req: Request, res: Response) {
  const { code, state } = req.query

  if (!code || typeof code !== "string") {
    return res.status(400).json({ message: "Missing OAuth code" })
  }

  /**
   * IMPORTANT:
   * In production, clientId should come from:
   * - signed state param OR
   * - authenticated session
   *
   * For now, we assume authenticated client context
   */
  const clientId = req.user?.id

  if (!clientId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const result = await handleGa4OAuthCallback({
    userId: clientId,
    code,
  })

  const frontendRedirectUrl = `${process.env.FRONTEND_DEV_URL}/tasks/tools-access?integrationId=${result.integrationId}`

  return res.redirect(frontendRedirectUrl)
}

/**
 * STEP 5.3
 * Fetch GA4 properties for selection
 */
export async function listGa4Properties(req: Request, res: Response) {
  const { integrationId } = req.params
  console.log("integrationId: ", integrationId)
  const properties = await getGa4Properties(integrationId)

  return sendSuccess(res, "GA4 properties fetched successfully", properties)
}

/**
 * STEP 5.4
 * Verify and finalize GA4 integration
 */
export async function verifyGa4(req: Request, res: Response) {
  const { integrationId } = req.params
  const { property_id, property_name } = req.body

  if (!property_id || !property_name) {
    return res.status(400).json({ message: "Missing property details" })
  }

  await verifyGa4Integration({
    clientIntegrationId: integrationId,
    propertyId: property_id,
    propertyName: property_name,
  })

  return sendSuccess(res, "GA4 integration verified successfully", {
    message: "GA4 integration verified",
  })
}
