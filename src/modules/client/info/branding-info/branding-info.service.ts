import { db } from "@/config/db"
import { BrandingFormData } from "./branding-info.schema"
import { AppError } from "@/utils/appError"

export const getBrandingInfoService = async (userId: string) => {
  const { data: client, error } = await db
    .from("branding_assets")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error(`[getBusinessInfo]:`, error.message)
    throw new Error(`Failed to fetch client info: ${error.message}`)
  }

  if (!client) {
    console.log(`[getBusinessInfo]: ${userId}`)
    return null
  }

  return client
}

export const saveBrandingInfoService = async (userId: string, data: BrandingFormData) => {
  console.log("🚀 ~ saveBrandingInfoService ~ data:", data)
  console.log("🚀 ~ saveBrandingInfoService ~ userId:", userId)
  const payload = {
    ...data,
    user_id: userId,
  }

  const { data: businessInfoData, error: clientError } = await db
    .from("branding_assets")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single()

  if (clientError) {
    throw new AppError(`${clientError?.message}`, 500)
  }
  return businessInfoData
}
