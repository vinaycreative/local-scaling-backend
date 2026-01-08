// src/modules/client/integrations/integrations.service.ts

import { generateGa4AuthUrl, exchangeCodeForTokens } from "./google/google.oauth"
import { listGa4Properties } from "./google/google.service"
import { db } from "@/config/db" // adjust path if needed

/**
 * STEP 4.1
 * Start GA4 OAuth flow
 */
export async function startGa4OAuth(): Promise<{ authUrl: string }> {
  const authUrl = generateGa4AuthUrl()
  return { authUrl }
}

/**
 * STEP 4.2
 * Handle OAuth callback and persist credentials
 */
export async function handleGa4OAuthCallback(params: { userId: string; code: string }) {
  const { userId, code } = params

  // 1. Exchange code for tokens
  const tokens = await exchangeCodeForTokens(code)

  // 2. Create or update client_integrations
  const { data: integration, error: integrationError } = await db
    .from("client_integrations")
    .upsert(
      {
        client_id: userId,
        provider: "google",
        tool: "ga4",
        status: "pending",
        external_account_id: "",
        external_account_name: "",
        scopes: tokens.scope ? tokens.scope.split(" ") : null,
        connected_at: new Date().toISOString(),
      },
      { onConflict: "client_id,provider,tool" }
    )
    .select()
    .single()

  if (integrationError || !integration) {
    throw new Error("Failed to create client integration")
  }

  const { error: credentialError } = await db.from("oauth_credentials").upsert(
    {
      client_integration_id: integration.id,
      provider: "google",
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(tokens.expires_in).toISOString(),
    },
    { onConflict: "client_integration_id" }
  )

  if (credentialError) {
    throw new Error(`Failed to store OAuth credentials: ${credentialError.message}`)
  }

  return { integrationId: integration.id }
}

/**
 * STEP 4.3
 * List GA4 properties for selection
 */
export async function getGa4Properties(clientIntegrationId: string) {
  // 1. Fetch credentials
  const { data: credentials, error } = await db
    .from("oauth_credentials")
    .select("access_token, refresh_token")
    .eq("client_integration_id", clientIntegrationId)
    .single()

  if (error || !credentials) {
    throw new Error("OAuth credentials not found")
  }

  // 2. Fetch properties from Google
  return await listGa4Properties({
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token || undefined,
  })
}

/**
 * STEP 4.4
 * Verify & finalize GA4 integration
 */
export async function verifyGa4Integration(params: {
  clientIntegrationId: string
  propertyId: string
  propertyName: string
}) {
  const { clientIntegrationId, propertyId, propertyName } = params

  const { error } = await db
    .from("client_integrations")
    .update({
      external_account_id: propertyId,
      external_account_name: propertyName,
      status: "verified",
      last_verified_at: new Date().toISOString(),
    })
    .eq("id", clientIntegrationId)

  if (error) {
    throw new Error("Failed to verify GA4 integration" + error.message)
  }

  return { success: true, message: "GA4 integration verified" }
}

function normalizeExpiryDate(tokens: any): string | null {
  // Case 1: expiry_date is milliseconds (number or numeric string)
  if (tokens.expiry_date && !Number.isNaN(Number(tokens.expiry_date))) {
    const ms = Number(tokens.expiry_date)

    // sanity: must be within 1 year from now
    const oneYearMs = 1000 * 60 * 60 * 24 * 365
    if (ms > Date.now() - oneYearMs && ms < Date.now() + oneYearMs) {
      return new Date(ms).toISOString()
    }
  }

  // Case 2: expires_in is seconds
  if (
    typeof tokens.expires_in === "number" &&
    Number.isFinite(tokens.expires_in) &&
    tokens.expires_in > 0 &&
    tokens.expires_in < 60 * 60 * 24 * 365
  ) {
    return new Date(Date.now() + tokens.expires_in * 1000).toISOString()
  }

  return null
}

export async function getAllIntegrationStatus(client_id: string) {
  const { data, error } = await db
    .from("client_integrations")
    .select("*")
    .eq("client_id", client_id)

  // Define all supported tools
  const DEFAULT_TOOLS = [
    { tool: "ga4", provider: "google" },
    { tool: "google_ads", provider: "google" },
    { tool: "gtm", provider: "google" },
    { tool: "search_console", provider: "google" },
  ]

  // If DB fails, return all as not connected
  if (error || !data) {
    return DEFAULT_TOOLS.map((t) => ({
      tool: t.tool,
      provider: t.provider,
      status: "not_connected",
      external_account_name: "",
      connectedAt: "",
    }))
  }

  // Index DB rows by tool
  const integrationByTool = new Map<string, any>()
  data.forEach((row) => {
    integrationByTool.set(row.tool, row)
  })

  // Build normalized response
  return DEFAULT_TOOLS.map((t) => {
    const integration = integrationByTool.get(t.tool)

    if (!integration) {
      return {
        integration_id: "",
        tool: t.tool,
        provider: t.provider,
        status: "not_connected",
        external_account_name: "",
        connected_at: "",
      }
    }

    return {
      integration_id: integration.id,
      tool: integration.tool,
      provider: integration.provider,
      status: integration.status ?? "connected",
      external_account_name: integration.external_account_name ?? "",
      connected_at: integration.connected_at ?? "",
    }
  })
}
