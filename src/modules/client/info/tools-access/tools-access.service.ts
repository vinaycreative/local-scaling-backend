import { db } from "@/config/db"
import { ToolsAccessPayload } from "./tools-access.schema"
import { AppError } from "@/utils/appError"

export const getToolsAccessService = async (userId: string) => {
  const { data, error } = await db
    .from("tools_access")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle() // safer than single()

  if (error) {
    console.error("Error fetching tools access:", error)
    throw new Error(error.message)
  }
  return data
}

export const saveToolsAccessService = async (userId: string, payload: ToolsAccessPayload) => {
  // Ensure user_id gets added
  const dataToSave = {
    ...payload,
    user_id: userId,
  }

  // Use UPSERT so it will insert OR update automatically
  const { data, error } = await db
    .from("tools_access")
    .upsert(dataToSave, { onConflict: "user_id" }) // ensure unique on user_id
    .select()
    .single() // return single row

  if (error) {
    console.error("Error saving tools access:", error)
    throw new AppError(error.message, 500)
  }

  return data
}
