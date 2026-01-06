import { db } from "@/config/db"
import { BusinessFormData } from "./business-info.schema"
import { AppError } from "@/utils/appError"

export const getBusinessInfoService = async (userId: string) => {
  const { data: client, error } = await db
    .from("business_information")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    throw new AppError(`Failed to fetch client info: ${error.message}`, 500)
  }
  if (!client) {
    return {}
  }
  return client
}

export const saveBusinessInfoService = async (userId: string, data: BusinessFormData) => {
  const { ...rest } = data

  const payload = {
    ...rest,
    user_id: userId,
  }

  const { data: businessInfoData, error: businessError } = await db
    .from("business_information")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single()

  if (businessError) {
    throw new AppError(`Failed to save business info: ${businessError.message}`, 500)
  }

  return businessInfoData
}
