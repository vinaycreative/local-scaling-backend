import { google } from "googleapis"
import { GA4_SCOPES } from "./google.scopes"
import { GoogleOAuthTokens } from "./google.types"

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)
