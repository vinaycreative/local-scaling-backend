import { db, supabaseAdmin } from "@/config/db"
import { BusinessFormData } from "./business-info-schema"

export const getBusinessInfoService = async (userId: string) => {
  const { data: client, error } = await db
    .from("business_information")
    .select("*, client_social_links(*)")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error(`[getBusinessInfo] 🔴 DB Error fetching client:`, error.message)
    throw new Error(`Failed to fetch client info: ${error.message}`)
  }

  if (!client) {
    console.log(`[getBusinessInfo] 🟡 No existing client profile found for User ID: ${userId}`)
    return null
  }


  return client
}

export const saveBusinessInfoService = async (userId: string, data: BusinessFormData) => {
  const payload = {
    ...data,
    user_id: userId,
  }

  const { data: businessInfoData, error: clientError } = await db
    .from("business_information")
    .insert(payload)
    if (clientError) {
      throw new Error("failed ")
    }
    return businessInfoData
}
