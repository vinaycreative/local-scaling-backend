import { db } from "@/config/db"
import { AdsBudgetForm } from "./ads-budget.schema"

export const getAdsBudgetService = async (userId: string) => {
  const { data, error } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("client_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error(`[getAdsBudgetService]:`, error.message)
    throw new Error("Failed to fetch Ads Budget")
  }

  return data ?? null
}

export const saveAdsBudgetService = async (userId: string, payload: AdsBudgetForm) => {
  const dataToSave = {
    ...payload,
    client_id: userId,
    budget: Number(payload.budget),
  }

  const { data, error } = await db
    .from("ads_budget_location")
    .upsert(dataToSave, { onConflict: "client_id" })
    .select()
    .single()

  if (error) {
    console.error("[saveAdsBudgetService]:", error.message)
    throw new Error("Failed to save Ads Budget")
  }

  return data
}
