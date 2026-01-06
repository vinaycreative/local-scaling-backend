import { db } from "@/config/db"
import { WebsiteSetupPayload } from "./website-setup.schema"

export const getWebsiteSetupService = async (userId: string) => {
  const { data, error } = await db.from("website_setup").select("*").eq("user_id", userId).single()

  // If a different error occurs
  if (error && error.code !== "PGRST116") {
    console.error("[getWebsiteSetupService]", error.message)
    throw new Error("Failed to fetch website setup details")
  }

  return data ?? null
}

export const saveWebsiteSetupService = async (userId: string, payload: WebsiteSetupPayload) => {
  const dataToSave = {
    ...payload,
    user_id: userId,
  }

  const { data, error } = await db
    .from("website_setup")
    .upsert(dataToSave, { onConflict: "user_id" })
    .select()
    .single()

  if (error) {
    console.error("[saveWebsiteSetupService]", error.message)
    throw new Error("Failed to save website setup details")
  }

  return data
}
