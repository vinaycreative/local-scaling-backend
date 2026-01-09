import { google } from "googleapis"
import { setOAuthCredentials } from "./google.oauth"

export interface Ga4Property {
  propertyId: string
  displayName: string
  timeZone?: string
}

/**
 * Fetch GA4 properties accessible to the authenticated user
 */
export async function listGa4Properties(tokens: {
  access_token: string
  refresh_token?: string
}): Promise<Ga4Property[]> {
  console.log("tokens: ", tokens)
  console.log("access_token: ", tokens.access_token)
  console.log("refresh_token: ", tokens.refresh_token)

  const authClient = setOAuthCredentials(tokens)
  const analyticsAdmin = google.analyticsadmin({
    version: "v1beta",
    auth: authClient,
  })

  // First, list all accounts
  const accountsResponse = await analyticsAdmin.accounts.list({
    pageSize: 200,
  })

  const accounts = accountsResponse.data.accounts || []

  // Then, list properties for each account
  const allProperties: Ga4Property[] = []

  for (const account of accounts) {
    if (!account.name) continue

    try {
      const propertiesResponse = await analyticsAdmin.properties.list({
        filter: `parent:${account.name}`,
        pageSize: 200,
      })

      const properties = propertiesResponse.data.properties || []
      console.log("properties: ", properties)

      const mappedProperties = properties.map((property) => ({
        propertyId: property.name?.replace("properties/", "") || "",
        displayName: property.displayName || "Unnamed Property",
        timeZone: property.timeZone ?? undefined,
      }))

      allProperties.push(...mappedProperties)
    } catch (error) {
      console.error(`Error fetching properties for account ${account.name}:`, error)
      // Continue with other accounts even if one fails
    }
  }

  return allProperties
}
