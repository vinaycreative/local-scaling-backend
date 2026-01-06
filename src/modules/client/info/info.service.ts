import { db } from "@/config/db"
import { AppError } from "@/utils/appError"
import { Database } from "@/types/supabase"

type BusinessInformation = Database["public"]["Tables"]["business_information"]["Row"]
type BrandingAssets = Database["public"]["Tables"]["branding_assets"]["Row"]
type WebsiteSetup = Database["public"]["Tables"]["website_setup"]["Row"]
type AdsBudgetLocation = Database["public"]["Tables"]["ads_budget_location"]["Row"]
type ToolsAccess = Database["public"]["Tables"]["tools_access"]["Row"]

export const statusOfHowMuchFieldAreLeftInEachSection = async (userId: string) => {
  // 1. check on business_information table need to check how many fields are null or empty.
  // 2. check on branding_assets table need to check how many fields are null or empty.
  // 3. check on website_setup table need to check how many fields are null or empty.
  // 4. check on ads_budget_location table need to check how many fields are null or empty.
  // 5. check on website_info table need to check how many fields are null or empty.
  // 6. check on tools_access table need to check how many fields are null or empty.

  let businessInformationFieldLeft = await getBusinessInfoCount(userId)
  const brandingAssetsFieldLeft = await getBrandingInfoCount(userId)
  const adsBudgetFieldLeft = await getAdsBudgetInfoCount(userId)
  const websiteSetupFieldLeft = await getWebsiteSetupCount(userId)
  const toolsAccessFieldLeft = await getToolsAccessCount(userId)

  return {
    "business-information": businessInformationFieldLeft,
    "branding-content": brandingAssetsFieldLeft,
    "website-setup": websiteSetupFieldLeft,
    "locations-budget": adsBudgetFieldLeft,
    "tools-access": toolsAccessFieldLeft,
  }
}

const countRemainingFields = <T extends Record<string, any>>(
  data: T | null,
  columns: readonly (keyof T)[]
): number => {
  if (!data) return columns.length

  return columns.filter((field) => {
    const value = data[field]

    // unfilled conditions
    if (value === null || value === "" || value === undefined) return true
    if (Array.isArray(value) && value.length === 0) return true
    if (typeof value === "boolean" && !value) return true

    return false
  }).length
}

const BUSINESS_INFO_COLUMNS = [
  "company_name",
  "start_year",
  "address",
  "postal_code",
  "city",
  "state",
  "country",
  "vat_id",
  "contact_name",
  "contact_email",
  "contact_number",
  "whatsapp_number",
  "website",
  "facebook",
  "instagram",
  "x",
  "google_business_profile_link",
] as const satisfies readonly (keyof BusinessInformation)[]

const getBusinessInfoCount = async (userId: string) => {
  const { data } = await db
    .from("business_information")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle()

  return countRemainingFields<BusinessInformation>(data, BUSINESS_INFO_COLUMNS)
}

const BRANDING_COLUMNS = [
  "font_link",
  "primary_brand_color",
  "secondary_brand_color",
  "team_photo_urls",
  "team_members",
  "ceo_video_url",
  "video_testimonial_url",
  "logo_url",
] as const satisfies readonly (keyof BrandingAssets)[]

const getBrandingInfoCount = async (userId: string) => {
  const { data } = await db.from("branding_assets").select("*").eq("user_id", userId).maybeSingle()

  return countRemainingFields<BrandingAssets>(data, BRANDING_COLUMNS)
}

const WEBSITE_SETUP_COLUMNS = [
  "business_clients_worked",
  "domain_provider",
  "legal_files",
  "legal_links",
  "seo_locations",
] as const satisfies readonly (keyof WebsiteSetup)[]

const getWebsiteSetupCount = async (userId: string) => {
  const { data } = await db.from("website_setup").select("*").eq("user_id", userId).maybeSingle()

  return countRemainingFields<WebsiteSetup>(data, WEBSITE_SETUP_COLUMNS)
}

const ADS_BUDGET_COLUMNS = [
  "currency",
  "budget",
  "seo_locations",
  "services_provided",
] as const satisfies readonly (keyof AdsBudgetLocation)[]

const getAdsBudgetInfoCount = async (userId: string) => {
  const { data } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("client_id", userId)
    .maybeSingle()

  return countRemainingFields<AdsBudgetLocation>(data, ADS_BUDGET_COLUMNS)
}

const TOOLS_ACCESS_COLUMNS = [
  "ga4_access_granted",
  "google_ads_access_granted",
  "google_search_console_access_granted",
  "gtm_access_granted",
] as const satisfies readonly (keyof ToolsAccess)[]

const getToolsAccessCount = async (userId: string): Promise<number> => {
  const { data } = await db.from("tools_access").select("*").eq("user_id", userId).maybeSingle()

  return countRemainingFields<ToolsAccess>(data, TOOLS_ACCESS_COLUMNS)
}
