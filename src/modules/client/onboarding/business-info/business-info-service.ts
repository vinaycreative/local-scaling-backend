import { db } from "@/config/db"
import { BusinessFormData } from "./business-info-schema"

export const getBusinessInfoService = async (userId: string) => {
  const { data: client, error } = await db
    .from("business_information")
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

export const saveBusinessInfoService = async (userId: string, data: BusinessFormData) => {
  const payload = {
    ...data,
    user_id: userId,
  }

  const { data: businessInfoData, error: businessError } = await db
    .from("business_information")
    .upsert(payload, { onConflict: "user_id" })
    .eq("user_id", userId)
    .select()
    .single()

  if (businessError) {
    throw new Error("Failed to save business info")
  }

  return businessInfoData
}
