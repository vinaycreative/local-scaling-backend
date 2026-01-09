export interface GoogleOAuthTokens {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope?: string
}

export interface GoogleOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}
