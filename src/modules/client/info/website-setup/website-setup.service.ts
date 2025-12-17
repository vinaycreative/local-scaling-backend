import { db } from "@/config/db"
import { WebsiteSetupPayload } from "./website-setup.schema"
import { AppError } from "@/utils/appError"

export const getWebsiteSetupService = async (userId: string) => {
  const { data, error } = await db.from("website_setup").select("*").eq("user_id", userId).single()
  if (error) throw new AppError(`Failed to get website setup details: ${error.message}`, 500)
  if (!data) return {}
  return data
}

export const saveWebsiteSetupService = async (userId: string, payload: WebsiteSetupPayload) => {
  const dataToSave = {
    ...payload,
    user_id: userId,
  }

  console.log("dataToSave", dataToSave)
  console.log("userId", userId)

  // find if user already has a website setup
  // const { data: existingWebsiteSetup, error: existingWebsiteSetupError } = await db
  //   .from("website_setup")
  //   .select("*")
  //   .eq("user_id", userId)
  //   .single()

  // if (existingWebsiteSetup) throw new AppError("User already has a website setup", 400)

  const { data, error } = await db
    .from("website_setup")
    .upsert(dataToSave, { onConflict: "user_id" })
    .select()
    .single()

  if (error) throw new AppError(`Failed to save website setup details: ${error.message}`, 500)

  return data
}
