import { google } from "googleapis"
import { GOOGLE_SCOPES } from "./google.scopes"
import { GoogleOAuthTokens } from "./google.types"

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

/**
 * STEP 4.2
 * Generate Google OAuth consent URL for GA4
 */
export function generateGa4AuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_SCOPES.GA4,
  })
}

/**
 * STEP 4.3
 * Exchange OAuth code for access + refresh tokens
 */
export async function exchangeCodeForTokens(code: string): Promise<GoogleOAuthTokens> {
  const { tokens } = await oauth2Client.getToken(code)

  if (!tokens.access_token || !tokens.expiry_date) {
    throw new Error("Invalid OAuth token response from Google")
  }

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token ?? undefined,
    expires_in: tokens.expiry_date,
    token_type: tokens.token_type || "Bearer",
    scope: tokens.scope,
  }
}

/**
 * STEP 4.4
 * Attach credentials to OAuth client for API calls
 */
export function setOAuthCredentials(tokens: { access_token: string; refresh_token?: string }) {
  oauth2Client.setCredentials(tokens)
  return oauth2Client
}

/**
 * Generic Google OAuth URL generator (used by all tools)
 */
export function generateGoogleAuthUrl(params: {
  scopes: readonly string[]
  state?: string
}): string {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [...params.scopes],
    state: params.state,
  })
}
