// src/modules/client/integrations/google/google.scopes.ts

export const GOOGLE_SCOPES = {
  GA4_READONLY: "https://www.googleapis.com/auth/analytics.readonly",
} as const

export const GA4_SCOPES = [GOOGLE_SCOPES.GA4_READONLY]
