import { db } from "@/config/db"
import { AdsBudgetForm } from "./ads-budget.schema"
import { AppError } from "@/utils/appError"

export const getAdsBudgetService = async (userId: string) => {
  const { data, error } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("client_id", userId)
    .single()

  if (!data) return null

  return data
}

export const saveAdsBudgetService = async (userId: string, payload: AdsBudgetForm) => {
  const dataToSave = {
    ...payload,
    budget: Number(payload.budget),
    client_id: userId,
  }

  const { data, error } = await db
    .from("ads_budget_location")
    .upsert(dataToSave, { onConflict: "client_id" })
    .select()
    .single()

  if (error) throw new AppError(`Failed to save Ads Budget: ${error.message}`, 500)

  return data
}
