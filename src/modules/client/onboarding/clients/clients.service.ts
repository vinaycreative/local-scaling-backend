import { db } from "@/config/db"
import { ClientsForm } from "./clients.schema"
import { AppError } from "@/utils/appError"

export const getNewClientsService = async (userId: string) => {
  const { data, error } = await db
    .from("business_information")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error(`[getAdsBudgetService]:`, error.message)
    throw new Error("Failed to fetch Ads Budget")
  }

  return data ?? null
}

export const createNewClientsService = async (userId: string, payload: ClientsForm) => {
  const dataToSave = {
    ...payload,
    client_id: userId,
  }

  const { data, error } = await db
    .from("client_leads")
    .upsert(dataToSave, { onConflict: "client_id" })
    .select()
    .single()

  if (error) {
    console.error("[saveAdsBudgetService]:", error.message)
    throw new AppError("Failed to save Ads Budget")
  }

  return data
}
