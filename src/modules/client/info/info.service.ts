import { db } from "@/config/db"
import { AppError } from "@/utils/appError"
import { Database } from "@/types/supabase"

type BusinessInformation = Database["public"]["Tables"]["business_information"]["Row"]
type BrandingAssets = Database["public"]["Tables"]["branding_assets"]["Row"]
type WebsiteSetup = Database["public"]["Tables"]["website_setup"]["Row"]
type AdsBudgetLocation = Database["public"]["Tables"]["ads_budget_location"]["Row"]
type WebsiteInfo = Database["public"]["Tables"]["website_info"]["Row"]
type ToolsAccess = Database["public"]["Tables"]["tools_access"]["Row"]

export const statusOfHowMuchFieldAreLeftInEachSection = async (userId: string) => {
  // 1. check on business_information table need to check how many fields are null or empty.
  // 2. check on branding_assets table need to check how many fields are null or empty.
  // 3. check on website_setup table need to check how many fields are null or empty.
  // 4. check on ads_budget_location table need to check how many fields are null or empty.
  // 5. check on website_info table need to check how many fields are null or empty.
  // 6. check on tools_access table need to check how many fields are null or empty.

  let businessInformationFieldLeft = 0
  const { data: businessInformationData, error: businessInformationError } = await db
    .from("business_information")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (businessInformationData) {
    const businessInformationFields = Object.keys(
      businessInformationData
    ) as (keyof BusinessInformation)[]
    const businessInformationFieldsCount = businessInformationFields.length
    const businessInformationFieldsLeft = businessInformationFields.filter(
      (field) => businessInformationData[field] === null || businessInformationData[field] === ""
    )
    const businessInformationFieldsLeftCount = businessInformationFieldsLeft.length
    businessInformationFieldLeft =
      businessInformationFieldsCount - businessInformationFieldsLeftCount
  }
  const brandingAssetsFieldLeft = 0
  const { data: brandingAssetsData, error: brandingAssetsError } = await db
    .from("branding_assets")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (brandingAssetsData) {
    const brandingAssetsFields = Object.keys(brandingAssetsData) as (keyof BrandingAssets)[]
  }
  const websiteSetupFieldLeft = 0
  const { data: websiteSetupData, error: websiteSetupError } = await db
    .from("website_setup")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (websiteSetupData) {
    const websiteSetupFields = Object.keys(websiteSetupData) as (keyof WebsiteSetup)[]
  }
  const adsBudgetLocationFieldLeft = 0
  const { data: adsBudgetLocationData, error: adsBudgetLocationError } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (adsBudgetLocationData) {
    const adsBudgetLocationFields = Object.keys(
      adsBudgetLocationData
    ) as (keyof AdsBudgetLocation)[]
  }
  const websiteInfoFieldLeft = 0
  const { data: websiteInfoData, error: websiteInfoError } = await db
    .from("website_info")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (websiteInfoData) {
    const websiteInfoFields = Object.keys(websiteInfoData) as (keyof WebsiteInfo)[]
  }
  const toolsAccessFieldLeft = 0
  const { data: toolsAccessData, error: toolsAccessError } = await db
    .from("tools_access")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (toolsAccessData) {
    const toolsAccessFields = Object.keys(toolsAccessData) as (keyof ToolsAccess)[]
  }

  return {
    businessInformationFieldLeft,
    brandingAssetsFieldLeft,
    websiteSetupFieldLeft,
    adsBudgetLocationFieldLeft,
    websiteInfoFieldLeft,
    toolsAccessFieldLeft,
  }
}
