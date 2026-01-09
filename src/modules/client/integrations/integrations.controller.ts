import { Request, Response } from "express"
import {
  startGa4OAuth,
  handleGa4OAuthCallback,
  getGa4Properties,
  verifyGa4Integration,
  getAllIntegrationStatus,
  startGoogleAdsOAuth,
  handleGoogleAdsOAuthCallback,
  startGtmOAuth,
  handleGtmOAuthCallback,
  startSearchConsoleOAuth,
  handleSearchConsoleOAuthCallback,
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
export async function ga4OAuthCallback(req: Request, res: Response) {
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

  return sendSuccess(res, "GA4 integration connected successfully", {
    message: "GA4 integration connected",
  })
}

// Google Ads Integration
export async function connectGoogleAds(req: Request, res: Response) {
  const clientId = req.user?.id

  if (!clientId) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const { authUrl } = await startGoogleAdsOAuth(clientId)
  return res.redirect(authUrl)
}

export async function googleAdsOAuthCallback(req: Request, res: Response) {
  const { code, state } = req.query

  if (!code || typeof code !== "string" || !state || typeof state !== "string") {
    return res.status(400).json({ message: "Invalid OAuth callback" })
  }

  await handleGoogleAdsOAuthCallback({
    clientIntegrationId: state,
    code,
  })
  const frontendRedirectUrl = `${process.env.FRONTEND_DEV_URL}/tasks/tools-access?tool=google_ads&integrationId=${state}`

  return res.redirect(frontendRedirectUrl)
}

export async function googleOAuthCallback(req: Request, res: Response) {
  const { code, state } = req.query
  const clientId = req.user?.id

  // Validate required parameters
  if (!code || typeof code !== "string") {
    return res.status(400).json({ message: "Missing or invalid OAuth code" })
  }

  if (!state || typeof state !== "string") {
    return res.status(400).json({ message: "Missing or invalid OAuth state" })
  }

  if (!clientId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // Decode and parse state
  let decodedState: { integrationId?: string; tool: string }
  try {
    decodedState = JSON.parse(Buffer.from(state, "base64").toString("utf-8"))
  } catch (error) {
    return res.status(400).json({ message: "Invalid OAuth state format" })
  }

  const { integrationId, tool } = decodedState

  if (!tool) {
    return res.status(400).json({ message: "Missing tool in OAuth state" })
  }

  // Handle OAuth callback based on tool
  let finalIntegrationId: string

  try {
    switch (tool) {
      case "ga4": {
        // GA4 creates integration during callback, so integrationId from state is optional
        const result = await handleGa4OAuthCallback({
          userId: clientId,
          code,
        })
        finalIntegrationId = result.integrationId
        break
      }

      case "google_ads": {
        // Google Ads requires integrationId from state (created before OAuth)
        if (!integrationId) {
          return res.status(400).json({
            message: "Missing integrationId in OAuth state for Google Ads",
          })
        }
        await handleGoogleAdsOAuthCallback({
          clientIntegrationId: integrationId,
          code,
        })
        finalIntegrationId = integrationId
        break
      }

      case "gtm":
        if (!integrationId) {
          return res.status(400).json({
            message: "Missing integrationId in OAuth state for GTM",
          })
        }
        await handleGtmOAuthCallback({ clientIntegrationId: integrationId, code })
        finalIntegrationId = integrationId
        break

      case "search_console":
        if (!integrationId) {
          return res.status(400).json({
            message: "Missing integrationId in OAuth state for Search Console",
          })
        }
        await handleSearchConsoleOAuthCallback({ clientIntegrationId: integrationId, code })
        finalIntegrationId = integrationId
        break

      default:
        return res.status(400).json({ message: `Unknown integration tool: ${tool}` })
    }
  } catch (error) {
    console.error(`OAuth callback error for ${tool}:`, error)
    return res.status(500).json({
      message: `Failed to complete OAuth flow for ${tool}`,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  return res.redirect(
    `${process.env.FRONTEND_DEV_URL}/tasks/tools-access?tool=${tool}&integrationId=${finalIntegrationId}`
  )
}

// Google Tag Manager Integration
export async function connectGtm(req: Request, res: Response) {
  const clientId = req.user?.id

  if (!clientId) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const { authUrl } = await startGtmOAuth(clientId)
  return res.redirect(authUrl)
}

// Search Console Integration
export async function connectSearchConsole(req: Request, res: Response) {
  const clientId = req.user?.id

  if (!clientId) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const { authUrl } = await startSearchConsoleOAuth(clientId)
  return res.redirect(authUrl)
}
