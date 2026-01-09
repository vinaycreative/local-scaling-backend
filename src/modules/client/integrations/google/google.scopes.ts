// src/modules/client/integrations/google/google.scopes.ts

// export const GOOGLE_SCOPES = {
//   GA4_READONLY: "https://www.googleapis.com/auth/analytics.readonly",
// } as const

export const GOOGLE_SCOPES = {
  GA4: ["https://www.googleapis.com/auth/analytics.readonly"],

  GOOGLE_ADS: ["https://www.googleapis.com/auth/adwords"],

  GTM: ["https://www.googleapis.com/auth/tagmanager.readonly"],

  SEARCH_CONSOLE: ["https://www.googleapis.com/auth/webmasters.readonly"],
}

export const GA4_SCOPES = GOOGLE_SCOPES.GA4
