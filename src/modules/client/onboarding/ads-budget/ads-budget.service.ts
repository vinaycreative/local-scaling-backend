import { db } from "@/config/db"
import { AdsBudgetForm } from "./ads-budget.schema"
import { AppError } from "@/utils/appError"

export const getAdsBudgetService = async (userId: string) => {
  const { data, error } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("client_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error(`[getAdsBudgetService]:`, error.message)
    throw new AppError("Failed to fetch Ads Budget", 500)
  }

  return data ?? null
}

export const saveAdsBudgetService = async (userId: string, payload: AdsBudgetForm) => {
  const dataToSave = {
    budget: Number(payload.budget),
    currency: payload.currency,
    seo_locations: payload.locations,
    services_provided: payload.services,
    client_id: userId,
  }

  const { data, error } = await db
    .from("ads_budget_location")
    .upsert(dataToSave, { onConflict: "client_id" })
    .select()
    .single()

  if (error) {
    console.error("[saveAdsBudgetService]:", error.message)
    throw new AppError("Failed to save Ads Budget", 500)
  }

  return data
}
